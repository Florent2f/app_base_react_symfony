<?php

namespace App\Controller\Configuration\Users;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Configuration\Users\UserApp;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Configuration\Users\EnseigneApp;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AdminUsersController extends AbstractController
{
    #[Route('/admin/users', name: 'admin.users')]
    public function index()
    {
        return $this->render('base.html.twig');
    }

    #[Route('/admin/users/fetchall', name: 'admin.users.fetchall')]
    public function getAllUsers(EntityManagerInterface $em): Response
    {
        $users = [];
        $getUsers = $em->getRepository(UserApp::class)->findAll();
        foreach ($getUsers as $user) {

            $enseignes = [];
            foreach ($user->getEnseigneApps()->toArray() as $e) {
                $enseignes[] = ['id' => $e->getId(), 'enseignes' => $e->getEnseigne()];
            }

            $users[] = [
                'id' => $user->getId(), 'name' => $user->getName(), 'email' => $user->getEmail(), 'enseigne' => $enseignes, 'role' => $user->getRoles()[0]
            ];
        }
        return $this->json(['users' => $users]);
    }

    #[Route('/admin/users/add', name: 'admin.users.add')]
    public function adminUserAdd(UserPasswordHasherInterface $passwordHasher, Request $request, EntityManagerInterface $em): Response
    {
        $roles = UserApp::ROLES;
        $datas = json_decode($request->getContent());
        $user = new UserApp();
        $user->setName($datas->user->name);
        $user->setEmail($datas->user->email);
        
        foreach ($datas->enseignes as $enseigne) {
            if(!$enseigne->selected) continue;
            $user->addEnseigneApp($em->getReference(EnseigneApp::class, $enseigne->id));
        }
        $user->setRoles([$roles[$datas->role]]);
        $plaintextPassword = $datas->user->password;
        
        // hash the password (based on the security.yaml config for the $user class)
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();

        //Return new user
        //----------------------------------------------------------
        $enseignes = [];
        foreach ($user->getEnseigneApps()->toArray() as $e) {
            $enseignes[] = ['id' => $e->getId(), 'enseignes' => $e->getEnseigne()];
        }
        $newUser = [
            'id' => $user->getId(), 'name' => $user->getName(), 'email' => $user->getEmail(), 'enseigne' => $enseignes, 'role' => $user->getRoles()[0]
        ];

        return $this->json(['newUser' => $newUser]);
    }

    #[Route('/admin/users/remove', name: 'admin.users.remove')]
    public function adminUserRemove(Request $request, EntityManagerInterface $em): Response
    {
        $id = json_decode($request->getContent());
        $em->remove($em->getReference(UserApp::class, $id));
        $em->flush();
        return $this->json(['userRemoved' => true]);
    }

}