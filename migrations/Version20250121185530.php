<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250121185530 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enseigne_app DROP FOREIGN KEY FK_85D473FCA76ED395');
        $this->addSql('DROP INDEX IDX_85D473FCA76ED395 ON enseigne_app');
        $this->addSql('ALTER TABLE enseigne_app DROP user_id');
        $this->addSql('ALTER TABLE user_app ADD enseignes_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_app ADD CONSTRAINT FK_22781144C01FD685 FOREIGN KEY (enseignes_id) REFERENCES enseigne_app (id)');
        $this->addSql('CREATE INDEX IDX_22781144C01FD685 ON user_app (enseignes_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_app DROP FOREIGN KEY FK_22781144C01FD685');
        $this->addSql('DROP INDEX IDX_22781144C01FD685 ON user_app');
        $this->addSql('ALTER TABLE user_app DROP enseignes_id');
        $this->addSql('ALTER TABLE enseigne_app ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE enseigne_app ADD CONSTRAINT FK_85D473FCA76ED395 FOREIGN KEY (user_id) REFERENCES user_app (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_85D473FCA76ED395 ON enseigne_app (user_id)');
    }
}
