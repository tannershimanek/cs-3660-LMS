import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../reducers/alerts";
import { AlertState } from "../../types";

export const CustomAlert: React.FC = () => {
  const alert = useSelector((state: AlertState) => state.alert);
  const dispatch = useDispatch();

  return (
    <Alert
      className="mt-3"
      variant={alert.value.variant}
      onClose={() => {
        dispatch(toggleAlert(false));
      }}
      dismissible
    >
      <p className="text-center">{alert.value.message}</p>
    </Alert>
  );
};
