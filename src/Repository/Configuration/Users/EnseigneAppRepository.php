<?php

namespace App\Repository\Configuration\Users;

use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Configuration\Users\EnseigneApp;
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
