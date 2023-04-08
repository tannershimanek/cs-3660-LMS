import Table from "react-bootstrap/esm/Table";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { filterTable } from "../../reducers/table";
import { Button, Form } from "react-bootstrap";
import { TableRows } from "./TableRow";
import { TableHeader } from "./TableHeader";
import { headers } from "../../services/tableHeaders";
import { TeamTableProps } from "../../types";

export const TeamTable: React.FC<TeamTableProps> = ({ options, data }) => {
  const dispatch = useDispatch();
  const handleChange = (e: any) => dispatch(filterTable(e.target.value));
  const handleSubmit = (e: any) => {
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
        <Button type="submit" variant="outline-success">
          Clear
        </Button>
      </Form>
      <Table hover>
        <thead className="bg-light">
          <tr>
            {headers.map((header) => (
              <TableHeader key={uuid()} headerObject={header} />
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRows rows={data} />
        </tbody>
      </Table>
    </>
  );
};
