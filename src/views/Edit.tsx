import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FeaturedImage } from "../components/FeaturedImage/FeaturedImage";
import { AppDispatch } from "../app/store";
import { Button, Form } from "react-bootstrap";
import { CustomAlert } from "../components/Alert/CustomAlert";
import { AlertState } from "../types";
import { setMessage, setVariant, toggleAlert } from "../reducers/alerts";
import { getTeamData, updateTeam, getCoaches } from "../services/apiCalls";


export const Edit: React.FC = () => {
  document.title = "Edit MTB Teams";
  const dispatch = useDispatch<AppDispatch>();
  const [validated, setValidated] = useState(false);
  const teamData = useSelector((state: any) => state.edit) as any;
  const alertData = useSelector((state: AlertState) => state.alert);
  let TEAM_ID: number;
  TEAM_ID =
    localStorage.getItem("editTeamId") !== null
      ? parseInt(JSON.parse(localStorage.getItem("editTeamId") || "0"), 10)
      : 0;
  const editTeamData = teamData.value.team;
  const [numRiders, setNumRiders] = useState(editTeamData.numPlayers);
  const [teamName, setTeamName] = useState(editTeamData.teamName);
  const [coachName, setCoachName] = useState(editTeamData.coachName);
  const [coachPhone, setCoachPhone] = useState(editTeamData.coachPhone);
  const [coachId, setCoachId] = useState(editTeamData.coachId);
  const [teamImage, setTeamImage] = useState("");
  const [coaches, setCoaches] = useState([]);


  useEffect(() => {
    getTeamData(`${TEAM_ID}`).then((data: any) => {
      setNumRiders(data.numPlayers);
      setTeamName(data.teamName);
      setCoachPhone(data.coachPhone);
      setCoachName(data.coachName);
      setCoachId(data.coachId);
      setTeamImage(data.image);
      console.log(data, "sdfsdf");
    });
    getCoaches().then((data: any) => {
      setCoaches(data);
      setCoachId(data.filter((coach: any) => coach.coachName === coachName)[0].coachId);
      
    });
  }, [setNumRiders, setCoachId, setCoachPhone, setTeamName, coachName, TEAM_ID]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const body = {
      id: TEAM_ID,
      teamName: teamName,
      coach_id: coachId,
      coachPhone: coachPhone,
      numPlayers: numRiders,
      image: teamImage,
    };

    // console.log("body", body);
    // console.log("current id", teamData.value.team);

    updateTeam(`${TEAM_ID}`, body)
      .then((resp) =>  {
        if (resp.status !== 200) {
          dispatch(setMessage(`uh oh, something went wrong!`));
          dispatch(setVariant("danger"));
          dispatch(toggleAlert(true));
      } else {
          dispatch(setMessage(`team ${teamName}, updated successfully`));
          dispatch(setVariant("success"));
          dispatch(toggleAlert(true));
      }
      })
      .catch((err) => console.error(err));


    setTimeout(() => {
      dispatch(toggleAlert(false))
    }, 1000 * 2);

  };

  return (
    <>
      <FeaturedImage
        src={
          "https://img.redbull.com/images/c_crop,x_0,y_0,h_4000,w_6000/c_fill,w_1350,h_900/q_auto,f_auto/redbullcom/2023/3/26/hhqswcjiupmataxtlecn/emil-johansson-rotorua-slopestyle-practice"
        }
        alt={"bike-race"}
      />

      <h1 className="text-dark my-4 py-4 text-center">Edit</h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="teamName">
          <Form.Label>Team id</Form.Label>
          <Form.Control
            required
            disabled
            type="text"
            placeholder="Enter team name"
            value={TEAM_ID}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="teamName">
          <Form.Label>Team name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="coachId">
          <Form.Label>Coach</Form.Label>
          <Form.Select
            aria-label="Select a coach"
            value={coachId}
            onChange={(e) => setCoachId(e.target.value)}
          >
            <option disabled>Select a coach</option>
            {coaches.map((coach: any) => (
              <option key={coach.coachId} value={coach.coachId}>{coach.coachName}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="coachPhone">
          <Form.Label>Coach phone number</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="Enter coach phone number"
            value={coachPhone}
            onChange={(e) => setCoachPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPlayers">
          <Form.Label># of riders</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter number of riders"
            value={numRiders}
            onChange={(e) => setNumRiders(e.target.value)}
          />
        </Form.Group>

        <Button variant="secondary" className={"text-white"} type="submit">
          Submit
        </Button>
      </Form>

      {alertData.value.showAlert ? <CustomAlert /> : null}
    </>
  );
};
