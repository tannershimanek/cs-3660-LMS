import { useRef } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setMessage } from "../../reducers/alerts";
import { setId, setName, toggleModal } from "../../reducers/modal";
import { SvgElement } from "../SvgElement/SvgElement";
import {
  TableRowsProps,
  TableRowProps,
  TableDataObject,
} from "../../types";


const TableRow: React.FC<TableRowProps> = ({ item }) => {
  const row = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = (el: any) => {
    const [id, teamName] = el.id.split("-");
    dispatch(setId(id));
    dispatch(setMessage(`${teamName} deleted successfully`));
    dispatch(setName(teamName));
    dispatch(toggleModal(true));
  };

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      key={item.id}
      placement={"top"}
      overlay={
        <Popover id={`popover-positioned-${"top"}`}>
          <Popover.Header as="h3">
            {<SvgElement src={`./Images/${item.image}`} width={20} />}{" "}
            {item.teamName}
          </Popover.Header>
          <Popover.Body>
            <div>
              <strong>Coach</strong>: {item.coachName}
            </div>
            <div>
              <strong>Phone</strong>: {item.coachPhone}
            </div>
            <div>
              <strong># of riders</strong>: {item.numPlayers}
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <tr id={`${item.id}-${item.teamName}`} ref={row}>
        {Object.keys(item).map(
          (key) =>
            key !== "id" &&
            key !== "image" && (
              <td key={uuid()}>{item[key as keyof TableDataObject]}</td>
            )
        )}
        <td>
          <FaEdit className={"text-info"} onClick={() => console.log("edit")} />
          <FaTrash
            className={"text-danger"}
            onClick={() => handleDelete(row.current)}
          />
        </td>
      </tr>
    </OverlayTrigger>
  );
};


export const TableRows: React.FC<TableRowsProps> = ({ rows }) => {
  return (
    <>
      {rows.map((item: any) => (
        <TableRow key={uuid()} item={item} />
      ))}
    </>
  );
};
