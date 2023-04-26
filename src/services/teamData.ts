// import { getTeamData } from "./getTeamData";

// const tmdta = getTeamData();

// tmdta.then((data) => {
//   console.log(data);
// });




  // const fetchTeamData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/teams/");
  //     const data = await response.json();
  //     return data;
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // };


  // export const teamData = {app: { sortCol: "teamName", sortDir: "asc"}, data: fetchTeamData()};






// ------------------------------

export const teamData = {
  app: {
    sortCol: "name",
    sortDir: "asc",
  },
  data: [
    {
      id: 0,
      teamName: "United States",
      coachName: "Cedric Murphy",
      coachPhone: "+1 202-918-2132",
      numPlayers: "3",
      image: "United States.svg",
    },
    {
      id: 1,
      teamName: "Canada",
      coachName: "Lewis Torres",
      coachPhone: "+1 346-477-0351",
      numPlayers: "4",
      image: "Canada.svg",
    },
    {
      id: 2,
      teamName: "Mexico",
      coachName: "Clinton Harris",
      coachPhone: "+1 224-290-7759",
      numPlayers: "2",
      image: "Mexico.svg",
    },
    {
      id: 3,
      teamName: "Japan",
      coachName: "Wilfred Vega",
      coachPhone: "+1 505-292-3024",
      numPlayers: "2",
      image: "Japan.svg",
    },
    {
      id: 4,
      teamName: "Sweden",
      coachName: "Darnell Burke",
      coachPhone: "+1 239-538-3914",
      numPlayers: "3",
      image: "Sweden.svg",
    },
    {
      id: 5,
      teamName: "Austria",
      coachName: "Calvin Martinez",
      coachPhone: "+1 505-255-3838",
      numPlayers: "2",
      image: "Austria.svg",
    },
  ],
};

export default teamData;
