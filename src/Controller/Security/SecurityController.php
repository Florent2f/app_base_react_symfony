<?php

namespace App\Controller\Security;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SecurityController extends AbstractController
{

    #[Route('/api/user', name: 'api_user')]
    public function user(#[CurrentUser] ?User $user)
    {
        if (null === $user) {
            return $this->json(['user'  => null,'userName'  => null]);
        }

        return $this->json([
            'user'  => $user->getUserIdentifier(),
            'userName'  => $user->getName()
        ]);
    }

    #[Route('/api/login', name: 'api_login')]
    public function login(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json(['message' => 'missing credentials',], Response::HTTP_UNAUTHORIZED);
        }
                
        $token = 'MSGpwIjFoeacgI'; // somehow create an API token for $user

        return $this->json([
            'user'  => $user->getUserIdentifier(),
            'userName'  => $user->getName(),
            'token' => $token,
        ]);
    }

    #[Route('/logout', name: 'api_logout')]
    public function logout(Security $security): Response
    {
        // logout the user in on the current firewall
        $response = $security->logout();

        // you can also disable the csrf logout
        $response = $security->logout(false);

        // ... return $response (if set) or e.g. redirect to the homepage
        return $this->json(true);
    }
}