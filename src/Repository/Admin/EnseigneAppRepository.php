<?php

namespace App\Repository\Admin;

use App\Entity\Admin\EnseigneApp;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<User>
 */
class EnseigneAppRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EnseigneApp::class);
    }

}
