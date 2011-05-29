BEGIN;

CREATE TABLE `posts` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `title` varchar(255) NOT NULL,
    `summary` text NULL,
    `body` text NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
);

CREATE TABLE `comments` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `post_id` integer NOT NULL,
    `email` varchar(100) NOT NULL,
    `body` text NOT NULL,
    `created_at` datetime NOT NULL
);

ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_refs_posts_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

CREATE INDEX `posts_created_at` ON `posts` (`created_at`);
CREATE INDEX `posts_title` ON `posts` (`title`);
CREATE INDEX `comments_created_at` ON `comments` (`created_at`);

COMMIT;
