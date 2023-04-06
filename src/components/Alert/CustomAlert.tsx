import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../reducers/alerts";

export const CustomAlert = () => {
  const alert = useSelector((state: any) => state.alert);
  const dispatch = useDispatch();

  return (
    <Alert
      className="mt-3"
      variant="success"
      onClose={() => {
        dispatch(toggleAlert(false));
      }}
      dismissible
    >
      <p className="text-center">{alert.value.message}</p>
    </Alert>
  );
};
