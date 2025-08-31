import Login from "./prelogin/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./postlogin/home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
