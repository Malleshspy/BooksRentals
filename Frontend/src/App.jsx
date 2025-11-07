import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SellBook from "./Pages/SellBook";
import T from "./T";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<T />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="sell" element={<SellBook />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
