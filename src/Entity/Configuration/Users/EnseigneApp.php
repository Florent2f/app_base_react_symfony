<?php

namespace App\Entity\Configuration\Users;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Repository\Configuration\Users\EnseigneAppRepository;

#[ORM\Entity(repositoryClass: EnseigneAppRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_ENSEIGNE', fields: ['enseigne'])]
class EnseigneApp
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $enseigne = null;

    #[ORM\OneToMany(targetEntity: UserApp::class, mappedBy: 'user')]
    private Collection $user;

    /**
     * @var Collection<int, UserApp>
     */
    #[ORM\ManyToMany(targetEntity: UserApp::class, inversedBy: 'enseigneApps')]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Get the value of enseigne
     */ 
    public function getEnseigne()
    {
        return $this->enseigne;
    }

    /**
     * Set the value of enseigne
     *
     * @return  self
     */ 
    public function setEnseigne($enseigne)
    {
        $this->enseigne = $enseigne;

        return $this;
    }

    /**
     * Get the value of user
     */ 
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set the value of user
     *
     * @return  self
     */ 
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, UserApp>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(UserApp $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
        }

        return $this;
    }

    public function removeUser(UserApp $user): static
    {
        $this->users->removeElement($user);

        return $this;
    }
}
