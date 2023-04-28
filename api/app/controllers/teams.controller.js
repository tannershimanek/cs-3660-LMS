const Team = require("../models/teams.model.js");
const sanitize = require("../utils/sanitize.js");
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  let rules = [
    body("id", "cannot be empty and must be an int").isInt().notEmpty(),
    body("teamName").trim().escape(),
    body("coach_id", "cannot be empty and must be an int").isInt().notEmpty(),
    body("image").trim().escape(),
    body("numPlayers").trim().escape(),
  ];

  switch (method) {
    case "updateTeam": {
      return rules;
    }
    case "createTeam": {
      body("teamName").custom((value) => {
        Team.isUnique(value).then((res) => {
          if (res[0].team_exists === 1) {
            return Promise.reject("Team name already exists");
          } 
          return Promise.resolve();
        });
      });
      return rules;
    }
  }
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  // Create a Team
  const team = new Team({
    id: req.body.id,
    teamName: req.body.teamName,
    coach_id: req.body.coach_id,
    image: req.body.image,
    numPlayers: req.body.numPlayers,
  });

  // Save Team in the database
  Team.create(team, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Team.",
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Team.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

// Retrieve all teams from the database.
exports.findAllTeams = (req, res) => {
  const name = sanitize(req.query.name);
  const sortCol = sanitize(req.query.sortCol);
  const sortDir = sanitize(req.query.sortDir);
  const limit = sanitize(req.query.limit);
  const offset = sanitize(req.query.offset);
  const filterCol = sanitize(req.query.filterCol);
  const filterStr = sanitize(req.query.filterStr);

  // console.log(`col: ${sortCol}`, `dir: ${sortDir}`);

  Team.getAllTeams(
    name,
    sortCol,
    sortDir,
    limit,
    offset,
    filterCol,
    filterStr,
    (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving teams.",
        });
      else res.send(data);
    }
  );
};

// Find a single Tutorial with a id
exports.findTeam = (req, res) => {
  Team.getTeam(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Team with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.fetchTeam = (req, res) => {
  Team.fetchTeam(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Team with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.findCoach = (req, res) => {
  Team.getCoach(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Coach with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Coach with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a team identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Team.updateById(req.params.id, new Team(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Team with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Team.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Team with id " + req.params.id,
        });
      }
    } else res.send({ message: `Team was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Team.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    else res.send({ message: `All Teams were deleted successfully!` });
  });
};


// exports.findAllCoaches = (req, res) => {
//   Team.getAllCoaches((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while getting all coaches.",
//       });
//     else res.send({ message: `Success!` });
//   });
// };


exports.findAllCoaches = (req, res) => {
  Team.getAllCoaches(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Coach with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Coach with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};