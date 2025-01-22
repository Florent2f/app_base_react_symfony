<?php

namespace App\Entity\Admin;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\Admin\UserAppRepository;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserAppRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class UserApp implements UserInterface, PasswordAuthenticatedUserInterface
{
    const ROLES = ['superadmin' => 'ROLE_SUPER_ADMIN','admin' => 'ROLE_ADMIN','user'=>'ROLE_USER'];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $name = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    /**
     * @var Collection<int, EnseigneApp>
     */
    #[ORM\ManyToMany(targetEntity: EnseigneApp::class, mappedBy: 'users')]
    private Collection $enseigneApps;

    public function __construct()
    {
        $this->enseigneApps = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        // $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, EnseigneApp>
     */
    public function getEnseigneApps(): Collection
    {
        return $this->enseigneApps;
    }

    public function addEnseigneApp(EnseigneApp $enseigneApp): static
    {
        if (!$this->enseigneApps->contains($enseigneApp)) {
            $this->enseigneApps->add($enseigneApp);
            $enseigneApp->addUser($this);
        }

        return $this;
    }

    public function removeEnseigneApp(EnseigneApp $enseigneApp): static
    {
        if ($this->enseigneApps->removeElement($enseigneApp)) {
            $enseigneApp->removeUser($this);
        }

        return $this;
    }
}
