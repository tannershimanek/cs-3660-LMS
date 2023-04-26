import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FeaturedImage } from "../components/FeaturedImage/FeaturedImage";
import { AppDispatch } from "../app/store";
import { Button, Form } from "react-bootstrap";
import { CustomAlert } from "../components/Alert/CustomAlert";
import { AlertState } from "../types";
import { setMessage, toggleAlert, setVariant } from "../reducers/alerts";
import { createTeam, getCoaches } from "../services/apiCalls";

export const Create: React.FC = () => {
    document.title = "Create MTB Teams";
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
  const [coachPhone, setCoachPhone] = useState(editTeamData.coachPhone);
  const [coachId, setCoachId] = useState(editTeamData.coachId);
  const [teamId, setTeamId] = useState(0);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    getCoaches().then((data: any) => setCoaches(data));
  }, [setNumRiders, setCoachId, setCoachPhone, setTeamName, TEAM_ID]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const body = {
      id: teamId,
      teamName: teamName,
      coach_id: coachId,
      coachPhone: coachPhone,
      numPlayers: numRiders,
      image: "new team image.svg",
    };

    createTeam(`${teamId}`, body)
      .then((resp) => {
        if (resp.status !== 200) {
            dispatch(setMessage(`uh oh, something went wrong!`));
            dispatch(setVariant("danger"));
            dispatch(toggleAlert(true));
        } else {
            dispatch(setMessage(`team ${teamName}, created successfully`));
            dispatch(setVariant("success"));
            dispatch(toggleAlert(true));
        }
      })
      .catch((err) =>  {
        console.error(err);
        dispatch(setMessage(`${teamName} uh oh!`));
        dispatch(setVariant("danger"));
        dispatch(toggleAlert(true));
      });

    setTimeout(() => {
      dispatch(toggleAlert(false));
    }, 1000 * 2);
  };

  return (
    <>
      <FeaturedImage
        src={
          "https://img.redbull.com/images/c_crop,x_0,y_0,h_1000,w_2000/c_fill,w_1350,h_700/q_auto,f_auto/redbullcom/2018/08/19/1c066c31-6a41-4d74-b4e4-eb43aeddbf8a/red-bull-joyride-2018"
        }
        alt={"bike-race"}
      />

      <h1 className="text-dark my-4 py-4 text-center">Add new team</h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="teamName">
          <Form.Label>Team id</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter team id number"
            onChange={(e) => setTeamId(parseInt(e.target.value, 10))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="teamName">
          <Form.Label>Team name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter team name"
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

        <Form.Group className="mb-3" controlId="numberOfPlayers">
          <Form.Label># of riders</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter number of riders"
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


