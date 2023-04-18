/*TEAMS SCHEMA SPRING 2022
Create a new schema with your prefix, e.g.
	kj_teams_sp22
Modify the data in  your schema to match your theme.
Note: I've added a 'motto' column for your team motto
Run this script to populate your database
Modify your config.js in your backend with the AWS Credentials
module.exports = {
    HOST: "jenson-mysql.c8qwuofu4md8.us-east-1.rds.amazonaws.com",
    USER: "kennyjay",
    PASSWORD: "mysqluser",
    DB: "YOUR DB NAME"
  };
*/

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `license_levels`;

CREATE TABLE `license_levels`
(
    `id`          int           NOT NULL AUTO_INCREMENT,
    `value`       varchar(32) DEFAULT NULL,
    `description` varchar(2048) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = latin1;


/*
-- Dumping data for table `license_levels`
-- */

LOCK TABLES `license_levels` WRITE;

INSERT INTO `license_levels`
VALUES (1, 'NA', 'Not Applicable'),
       (2, 'A', 'A Level License'),
       (3, 'B', 'B Level License'),
       (4, 'C', 'C Level License'),
       (5, 'D', 'D Level License');

UNLOCK TABLES;

/*
-- Table structure for table `leagues`
-- */

# DROP TABLE IF EXISTS `leagues`;
#
# CREATE TABLE `leagues`
# (
#     `id`          int           NOT NULL AUTO_INCREMENT,
#     `name`        varchar(32) DEFAULT NULL,
#     `description` varchar(2048) NOT NULL,
#     PRIMARY KEY (`id`)
# ) ENGINE = InnoDB
#   AUTO_INCREMENT = 3
#   DEFAULT CHARSET = latin1;
#
# /*
# --
# -- Dumping data for table `leagues`
# -- */
#
# LOCK TABLES `leagues` WRITE;
#
# INSERT INTO `leagues`
# VALUES (1, 'NBA', 'My favorite League'),
#        (2, 'NFL', 'A bunch of Losers');
#
# UNLOCK TABLES;

/*
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: jenson-mysql.c8qwuofu4md8.us-east-1.rds.amazonaws.com    Database: myteams2
-- ------------------------------------------------------
-- Server version	8.0.20
*/


DROP TABLE IF EXISTS `people`;

CREATE TABLE `people`
(
    `id`               int                             NOT NULL AUTO_INCREMENT,
    `first_name`       varchar(32) DEFAULT NULL,
    `last_name`        varchar(32)                     NOT NULL,
    `address1`         varchar(128)                    NOT NULL,
    `address2`         varchar(128)                    NOT NULL,
    `notes`            varchar(2048)                   NOT NULL,
    `city`             varchar(64) DEFAULT NULL,
    `state`            varchar(2)  DEFAULT NULL,
    `zip`              varchar(10) DEFAULT NULL,
    `team_id`          int                             NOT NULL,
    `email`            varchar(128)                    NOT NULL,
    `phone`            varchar(24)                     NOT NULL,
    `password`         varchar(32)                     NOT NULL,
    `user_name`        varchar(32)                     NOT NULL,
    `license_level_id` int                             NOT NULL,
    `person_type`      enum ('coach','player','admin') NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_team` (`team_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 22
  DEFAULT CHARSET = latin1;


/*
--
-- Dumping data for table `people`
-- */

LOCK TABLES `people` WRITE;

INSERT INTO `people`
VALUES (0, 'Cedric', 'Murphy', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '84', 6,
        'Cedric.Murphy@gmail.com', '+1 202-918-2132', 'mypassword', 'kjenson', 2, 'coach'),
       (1, 'Lewis', 'Torres', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 1,
        'Lewis.Torres@gmail.com',
        '+1 346-477-0351', 'mypassword', 'bjenson', 1, 'coach'),
       (2, 'Clinton', 'Harris', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 2, 'charris@gmail.com',
        '+1 224-290-7759', 'mypassword', 'gjenson', 2, 'player'),
       (3, 'Wilfred', 'Vega', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 3, 'w.vega@gmail.com',
        '+1 505-292-3024', 'mypassword', 'hjenson', 3, 'coach'),
       (4, 'Darnell', 'Burke   ', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 4,
        'd.burke@gmail.com',
        '+1 239-538-3914', 'mypassword', 'hjenson', 4, 'coach'),
       (5, 'Calvin', 'Martinez   ', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 5,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 5, 'coach'),
       (6, 'rider', 'one', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 5,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 0, 'player'),
       (7, 'rider', 'two', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 6,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 0, 'player'),
       (8, 'rider', 'three', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 6,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 0, 'player'),
       (9, 'rider', 'four', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 6,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 1, 'player'),
       (10, 'rider', 'five', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 1,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 1, 'player'),
       (11, 'rider', 'six', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 1,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 1, 'player'),
       (12, 'rider', 'seven', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 1,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 1, 'player'),
       (13, 'rider', 'eight', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 1,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 2, 'player'),
       (14, 'rider', 'nine', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 2,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 2, 'player'),
       (15, 'rider', 'ten', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 2,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 3, 'player'),
       (16, 'rider', 'eleven', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 3,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 3, 'player'),
       (17, 'rider', 'twelve', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 3,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 4, 'player'),
       (18, 'rider', 'thirteen', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 4,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 4, 'player'),
       (19, 'rider', 'fourteen', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 4,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 4, 'player'),
       (20, 'rider', 'fifteen', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 5,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 5, 'player'),
       (21, 'rider', 'sixteen', '1527 N. 230 w.', 'Apt. 3', 'My notes', 'Orem', 'UT', '1', 5,
        'c.martinez@gmail.com',
        '+1 505-255-3838', 'mypassword', 'hjenson', 5, 'player');

UNLOCK TABLES;


/*
-- GTID state at the beginning of the backup
--

--
-- Table structure for table `teams`
--
*/

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams`
(
    `id`             int           NOT NULL AUTO_INCREMENT,
    `name`           varchar(128) DEFAULT NULL,
    `coach_id`       int           NOT NULL,
    `flag`           varchar(1024) NOT NULL,
    `number_players` varchar(1024) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `coach_id_2` (`coach_id`),
    CONSTRAINT `fk_coach_person` FOREIGN KEY (`coach_id`) REFERENCES `people` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = latin1;

/*
 * Dumping data for table `teams`
 */

LOCK TABLES `teams` WRITE;

INSERT INTO `teams`
VALUES (6, 'United States', 22, 'United States.svg', '3'),
       (1, 'Canada', 1, 'Canada.svg', '4'),
       (2, 'Mexico', 2, 'Mexico.svg', '2'),
       (3, 'Japan', 3, 'Japan.svg', '2'),
       (4, 'Sweden', 4, 'Sweden.svg', '3'),
       (5, 'Austria', 5, 'Austria.svg', '2');

UNLOCK TABLES;

/*
-- Dump completed on 2020-11-03 23:00:44
*/