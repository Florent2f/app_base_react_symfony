<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250122080137 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE enseigne_app_user_app (enseigne_app_id INT NOT NULL, user_app_id INT NOT NULL, INDEX IDX_4F5450E45F3373F9 (enseigne_app_id), INDEX IDX_4F5450E41CD53A10 (user_app_id), PRIMARY KEY(enseigne_app_id, user_app_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE enseigne_app_user_app ADD CONSTRAINT FK_4F5450E45F3373F9 FOREIGN KEY (enseigne_app_id) REFERENCES enseigne_app (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE enseigne_app_user_app ADD CONSTRAINT FK_4F5450E41CD53A10 FOREIGN KEY (user_app_id) REFERENCES user_app (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_app DROP FOREIGN KEY FK_22781144C01FD685');
        $this->addSql('DROP INDEX IDX_22781144C01FD685 ON user_app');
        $this->addSql('ALTER TABLE user_app DROP enseignes_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enseigne_app_user_app DROP FOREIGN KEY FK_4F5450E45F3373F9');
        $this->addSql('ALTER TABLE enseigne_app_user_app DROP FOREIGN KEY FK_4F5450E41CD53A10');
        $this->addSql('DROP TABLE enseigne_app_user_app');
        $this->addSql('ALTER TABLE user_app ADD enseignes_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_app ADD CONSTRAINT FK_22781144C01FD685 FOREIGN KEY (enseignes_id) REFERENCES enseigne_app (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_22781144C01FD685 ON user_app (enseignes_id)');
    }
}
