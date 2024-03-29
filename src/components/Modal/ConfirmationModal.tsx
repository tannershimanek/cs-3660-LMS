import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteRow } from "../../reducers/table";
import { toggleAlert } from "../../reducers/alerts";

export const ConfirmationModal: React.FC<any> = (props: any) => {
  const modalData = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete team {modalData.value.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Are you sure that you want to delete team '{modalData.value.name}'
        </h4>
        <p>
          Are you sure that you want to delete {modalData.value.name}? Deleting
          a team cannot be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={"btn-light btn-outline-danger"}
          onClick={props.onHide}
        >
          Cancel
        </Button>
        <Button
          className={"btn-danger"}
          onClick={() => {
            props.onHide();
            dispatch(deleteRow(modalData.value.id));
            dispatch(toggleAlert(true));
          }}
        >
          Delete team
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
