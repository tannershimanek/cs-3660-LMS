# SELECT * FROM teams;


# ----------------------
# GET PERSON BY TEAM
# ----------------------

# SELECT * FROM people
# WHERE team_id = 6;
#
# SELECT * FROM people
# WHERE team_id = 1;
#
# SELECT * FROM people
# WHERE team_id = 2;
#
# SELECT * FROM people
# WHERE team_id = 3;
#
# SELECT * FROM people
# WHERE team_id = 4;
#
# SELECT * FROM people
# WHERE team_id = 5;


# ----------------------
# GET TEAM BY ID
# ----------------------

# SELECT * FROM teams
# WHERE id = 6;
#
# SELECT * FROM teams
# WHERE id = 1;
#
# SELECT * FROM teams
# WHERE id = 2;
#
# SELECT * FROM teams
# WHERE id = 3;
#
# SELECT * FROM teams
# WHERE id = 4;
#
# SELECT * FROM teams
# WHERE id = 5;


# ----------------------
# GET COACH
# ----------------------

# SELECT
#     p.team_id, p.first_name, p.last_name, p.phone FROM people p
#     t.name, t.flag FROM teams t
# WHERE team_id = 3 AND person_type = 'coach';

SELECT
    people.team_id AS team_id,
    people.person_type AS person_type,
    people.first_name AS first_name,
    people.last_name AS last_name,
    people.phone AS coach_phone,
    teams.name AS team_name,
    teams.flag AS image
FROM people
JOIN teams ON teams.id=team_id
WHERE team_id = 3 AND person_type = 'coach';
