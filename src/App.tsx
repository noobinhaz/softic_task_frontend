import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./layout/Navbar";

import Affiliates from "./pages/Affiliates";
import Credentials from "./pages/Credentials";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OtherPage from "./pages/OtherPage";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>();

  useEffect((): any => {
    const token = localStorage.getItem("token");
    setLoggedIn(token ? true : false);
  });

  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register?ref:ref" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/affiliates/:id" element={<Affiliates />} />
        <Route path="/otherPages" element={<OtherPage />} />
      </Routes>

      {/* <Route path="/logout" element={< />} /> */}
    </BrowserRouter>
  );
}

export default App;
