import Body from "./Body";
import Login from "./components/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
