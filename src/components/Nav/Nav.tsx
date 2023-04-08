import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

export const Navigation: React.FC = () => {
  return (
    <Navbar
      bg="white"
      expand="lg"
      fixed="top"
      style={{
        borderBottom: "1px solid #E6E6E6",
        maxWidth: "1320px",
        margin: "auto",
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src="../images/mtb-logo.png" width="90px" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Teams">Teams</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
