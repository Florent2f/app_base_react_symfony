<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{

    #[Route('/test', name: 'app.test')]
    public function home(ObjectManager $manager): Response 
    {

        // $test = $manager->getRepository(User:class)->find


        return $this->json(['1' => '10','3' => '30']);
    }

}
