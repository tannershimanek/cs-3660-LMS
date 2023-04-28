
module.exports = (app) => {
  const teams = require("../controllers/teams.controller.js");

  const router = require("express").Router();

  // Create a new team
  router.post("/teams", teams.validate('createTeam'), teams.create);

  // Retrieve all team
  router.get("/", teams.findAll);

  // Retrieve all teams
  router.get("/teams", teams.findAllTeams);

  // Update a team with id
  router.put("/teams/:id", teams.validate('updateTeam'), teams.update);

  // Delete a team with id
  router.delete("/teams/:id", teams.delete);

  // Retrieve a single team with id
  router.get("/teams/:id", teams.findTeam);
  
  // Retrieve a single team with id
  router.get('/teams/coach/:id', teams.fetchTeam);

  // Retrieve all coaches
  router.get("/coaches", teams.findAllCoaches);

  // Sorting: GET http://localhost:8080/teams/?sortCol=teamName&sortDir=desc
  // Paging: GET http://localhost:8080/teams/?limit=2&offset=2
  // Filtering: GET http://localhost:8080/teams/?filterCol=teamName&filterStr=un

  // app.use('/api/mtbleague', router);
  app.use("/", router);
};
