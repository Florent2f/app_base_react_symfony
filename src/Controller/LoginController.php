<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{

    #[Route('/signin', name: 'app.signin')]
    public function signin(): Response 
    {
        return $this->render('base.html.twig');
    }

    #[Route('/signup', name: 'app.signup')]
    public function signup(): Response 
    {
        return $this->render('base.html.twig');
    }

}
