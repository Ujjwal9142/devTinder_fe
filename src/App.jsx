import Login from "./prelogin/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./postlogin/home";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </>
  );
}

export default App;
