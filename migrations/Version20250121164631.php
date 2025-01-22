<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250121164631 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE enseigne_app (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, enseigne VARCHAR(180) NOT NULL, INDEX IDX_85D473FCA76ED395 (user_id), UNIQUE INDEX UNIQ_IDENTIFIER_ENSEIGNE (enseigne), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_app (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE enseigne_app ADD CONSTRAINT FK_85D473FCA76ED395 FOREIGN KEY (user_id) REFERENCES user_app (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enseigne_app DROP FOREIGN KEY FK_85D473FCA76ED395');
        $this->addSql('DROP TABLE enseigne_app');
        $this->addSql('DROP TABLE user_app');
    }
}
