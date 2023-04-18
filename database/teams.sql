SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `people`;

CREATE TABLE `people`
(
    `id`               int                             NOT NULL AUTO_INCREMENT,
    `name`             varchar(1024)                   DEFAULT NULL,
    `address1`         varchar(128)                    NOT NULL,
    `address2`         varchar(128)                    DEFAULT NULL,
    `city`             varchar(64)                     DEFAULT NULL,
    `state`            varchar(2)                      DEFAULT NULL,
    `zip`              varchar(10)                     DEFAULT NULL,
    `team_id`          int                             NOT NULL,
    `phone`            varchar(24)                     NOT NULL,
    `person_type`      enum ('coach','player','admin') NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_team` (`team_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 22
  DEFAULT CHARSET = latin1;


LOCK TABLES `people` WRITE;

INSERT INTO `people`
VALUES (1, 'Cedric Murphy', '1527 N. 230 w.', 'Apt. 3', 'Orem', 'UT', '84003', 1234, '+1 202-918-2132', 'coach'),
       (2, 'Lewis Torres', '400 N. Center St.', 'Apt. 216', 'provo', 'UT', '84063', 8274, '+1 346-477-0351', 'coach'),
       (3, 'Clinton Harris', '324 S. 900 w.', 'Apt. 1', 'American Fork', 'UT', '84003', 2334, '+1 224-290-7759', 'coach'),
       (4, 'Wilfred Vega', '100 S. 200 e.', 'Apt. 342', 'Heber', 'UT', '85033', 3432, '+1 505-292-3024', 'coach'),
       (5, 'Darnell Burke', '900 W. Major st.', 'Apt. 100', 'Salt Lake', 'UT', '87493', 4983, '+1 239-538-3914', 'coach'),
       (6, 'Calvin Martinez', '500 E. Cullen ct.', 'Apt. 450', 'St. George', 'UT', '87493', 5623, '+1 239-538-3914', 'coach');

UNLOCK TABLES;


DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams`
(
    `id`              int           NOT NULL AUTO_INCREMENT,
    `teamName`        varchar(128)  DEFAULT NULL,
    `coach_id`        int           NOT NULL,
    `image`           varchar(1024) NOT NULL,
    `numPlayers`      varchar(128)  NOT NULL,
    PRIMARY KEY (`id`),
    KEY `coach_id_2` (`coach_id`),
    CONSTRAINT `fk_coach_person` FOREIGN KEY (`coach_id`) REFERENCES `people` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = latin1;


LOCK TABLES `teams` WRITE;

INSERT INTO `teams`
VALUES (1234, 'United States', 1, 'United States.svg', '3'),
       (8274, 'Canada', 2, 'Canada.svg', '4'),
       (2334, 'Mexico', 3, 'Mexico.svg', '2'),
       (3432, 'Japan', 4, 'Japan.svg', '2'),
       (4983, 'Sweden', 5, 'Sweden.svg', '3'),
       (5623, 'Austria', 6, 'Austria.svg', '2');

UNLOCK TABLES;