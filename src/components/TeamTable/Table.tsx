import { useEffect, useRef, useState } from "react";
import { FaTrash, FaEdit, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  filterTable,
  sortAsc,
  sortCol,
  sortDesc,
  sortDir,
} from "../../reducers/table";
import { TeamTableProps } from "./types";
import Table from "react-bootstrap/esm/Table";
import { Button, Form } from "react-bootstrap";
import { setId, setName, toggleModal } from "../../reducers/modal";
import { setMessage } from "../../reducers/alerts";

// todo: popovers

const TableRows = (data: any) => {
  console.log(data.data);
  const rows = data.data;
  return (
    <>
      {rows.map((item: any) => (
        <TableRow key={uuid()} item={item} />
      ))}
    </>
  );
};

const TableRow = ({ item }: any) => {
  const row = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = (el: any) => { 
    const [id, teamName] = el.id.split("-");
    dispatch(setId(id));
    dispatch(setMessage(`${teamName} deleted successfully`))
    dispatch(setName(teamName))
    dispatch(toggleModal(true));
  }

  return (
    <tr id={`${item.id}-${item.teamName}`} ref={row}>
      {Object.keys(item).map(
        (key) => key !== "id" && key !== 'image' && <td key={uuid()}>{item[key]}</td>
      )}
      <td>
        <FaEdit className={"text-info"} onClick={() => console.log("edit")} />
        <FaTrash
          className={"text-danger"}
          onClick={() => handleDelete(row.current)}
        />
      </td>
    </tr>
  );
};

const TableHeader = ({ header }: any) => {
  const [showIcon, setShowIcon] = useState(false);
  const [icon, setIcon] = useState(<></>);
  const head = header[Object.keys(header)[0]];
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const tableData = useSelector((state: any) => state.table.value);

  const sortAscending = () => {
    const sortCol = tableData.app.sortCol;
    const sortedAsc = [...tableData.data].sort((a: any, b: any) => a[sortCol] > b[sortCol] ? 1 : -1);
    dispatch(sortAsc(sortedAsc));
    dispatch(sortDir("desc")); // swap sortdir
  }

  const sortDescending = () => {
    const sortCol = tableData.app.sortCol;
    const sortedDesc = [...tableData.data].sort((a: any, b: any) => a[sortCol] < b[sortCol] ? 1 : -1);
    dispatch(sortDesc(sortedDesc));
    dispatch(sortDir("asc")); // swap sortdir
  }

  useEffect(() => {
    if (tableData.app.sortDir === 'asc') {
      if (tableData.app.sortCol === head.id) {
        setShowIcon(true);
        return setIcon(<FaArrowUp />);
      }
    } else if (tableData.app.sortDir === 'desc'){
      if (tableData.app.sortCol === head.id) {
        setShowIcon(true);
        return setIcon(<FaArrowDown/>);
      }
    } else {
      setShowIcon(false);
      return setIcon(<></>);
    }
  }, [showIcon, tableData.app.sortCol, head.id, tableData.app.sortDir])

  const handleHeaderClick = (e: any) => {
    if (e.id === "actions") return;
    dispatch(sortCol(e.id)); // set sortcol
    switch (tableData.app.sortDir) {
      case "asc":
          sortAscending();
          setIcon(<FaArrowDown/>)
        break;
      case "desc":
        sortDescending();
        break;
    }
  };

  return (
    <th
      key={head.id}
      id={head.id}
      ref={headerRef}
      onClick={() => handleHeaderClick(headerRef.current)}
    >
      {head.title} {showIcon ? icon : null}
    </th>
  );
};


export const TeamTable = ({ options, data }: TeamTableProps) => {
  const dispatch = useDispatch();
  const headers = [
    { teamName: { title: "Team name", id: "teamName" } },
    { coachName: { title: "Coach name", id: "coachName" } },
    { coachPhone: { title: "Coach Phone", id: "coachPhone" } },
    { numPlayers: { title: "# of riders", id: "numPlayers" } },
    { actions: { title: "Actions", id: "actions" } },
  ];
  
  const handleChange = (e: any) => dispatch(filterTable(e.target.value));
  const handleSubmit = (e:any) => {
    e.preventDefault();
    e.target.reset();
    dispatch(filterTable(""));
  };

  return (
    <>
      <Form className="d-flex my-3" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit" variant="outline-success">Clear</Button>
      </Form>
      <Table hover>
        <thead className="bg-light">
          <tr>
            {headers.map((header) => (
              <TableHeader key={uuid()} header={header} />
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRows data={data} />
        </tbody>
      </Table>
    </>
  );
};
