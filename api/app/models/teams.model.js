const sql = require("./db.js");
const isValidColumn = require("../utils/sanitize.js");

// constructor
const Teams = function (team) {
  this.id = team.id;
  this.teamName = team.teamName;
  this.coach_id = team.coach_id;
  this.image = team.image;
  this.numPlayers = team.numPlayers;
};

Teams.create = (newTeam, result) => {
  sql.query("INSERT INTO teams SET ?", newTeam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created team: ", { id: res.insertId, ...newTeam });
    result(null, { id: res.insertId, ...newTeam });
  });
};

Teams.isUnique = (teamName, result) => {
  sql.query(
    `SELECT EXISTS (
      SELECT 1
      FROM teams
      WHERE teamName = '${teamName}'
    ) AS team_exists;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found team: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found team with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Teams.findById = (id, result) => {
  sql.query(`SELECT * FROM team WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found team: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found team with the id
    result({ kind: "not_found" }, null);
  });
};

Teams.getAllCoaches = (title, result) => {
  let query = `SELECT
  p.name AS coachName,
  p.id AS coachId
FROM people p`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("coaches: ", res);
    result(null, res);
  });
};

Teams.getAllTeams = (
  name,
  sortCol,
  sortDir,
  limit,
  offset,
  filterCol,
  filterStr,
  result
) => {
  let query = `
  SELECT
    t.id,
    t.teamName,
    p.name AS coachName,
    p.phone AS coachPhone,
    t.numPlayers,
    t.image
  FROM people p
  JOIN teams t ON t.coach_id = p.id
  `;

  if (name) query += ` WHERE name LIKE '%${name}%'`;

  if (sortCol && isValidColumn(sortCol)) {
    let table = "t";
    if (sortCol === "coachName" || sortCol === "coachPhone") table = "p";
    if (sortCol === "coachName") sortCol = "name";
    if (sortCol === "coachPhone") sortCol = "phone";
    query += `ORDER BY ${table}.${sortCol} ${sortDir.toUpperCase()}`;
  }

  if (limit) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  if (filterCol && isValidColumn(filterCol)) {
    query += ` WHERE ${filterCol} LIKE '%${filterStr}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Teams.getTeam = (id, result) => {
  sql.query(
    `
  SELECT
    t.id,
    t.teamName,
    p.name AS coachName,
    p.phone AS coachPhone,
    t.numPlayers,
    t.image
  FROM people p
  JOIN teams t ON t.coach_id = p.id
  WHERE t.id = ${id};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found team: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Teams.fetchTeam = (id, result) => {
  sql.query(
    `
  SELECT
    t.id,
    t.teamName,
    p.name AS coachName,
    p.phone AS coachPhone,
    p.id as coachId,
    t.numPlayers,
    t.image
  FROM people p
  JOIN teams t ON t.coach_id = p.id
  WHERE t.id = ${id};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found team: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Teams.updateById = (id, team, result) => {
  sql.query(
    `UPDATE teams SET image = ?, 
        teamName = ?,
        numPlayers = ?,
        coach_id = ?
     WHERE id = ?`,
    [team.image, team.teamName, team.numPlayers, team.coach_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated team: ", { id: id, ...team });
      result(null, { id: id, ...team });
    }
  );
};

Teams.remove = (id, result) => {
  sql.query("DELETE FROM teams WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found team with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted team with id: ", id);
    result(null, res);
  });
};

module.exports = Teams;
