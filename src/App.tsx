import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.scss";
import { Home } from "./views/Home";
import { Teams } from "./views/Teams";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { NoMatch } from "./components/Router/NoMatch";

function App() {
  return (
    <div>
         <Routes>
           <Route path="/" index element={<Layout><Home /></Layout>} />
           <Route path="/teams" element={<Layout><Teams /></Layout>} />
           <Route path="*" element={<Layout><NoMatch /></Layout>} />
         </Routes>
    </div>
  );
}

export default App;
