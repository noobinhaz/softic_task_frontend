import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>();
  const [role, setRole] = useState<number | null>();

  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("access");
    setRole(Number(role));
    setLoggedIn(token ? true : false);
    return token;
  };
  useEffect((): any => {
    checkToken();
  }, [isLoggedIn]);
  return (
    <nav>
      {isLoggedIn ? (
        <>
          <Link to="/home" className="nav-link mx-4">
            Home
          </Link>
          {role && (role === 1 || role === 2) ? (
            <>
              <Link to="/credentials" className="nav-link mx-4">
                Credentials
              </Link>
            </>
          ) : null}

          <Link to="/otherPages" className="nav-link mx-4">
            Others
          </Link>
          <button
            className="nav-link bg-transparent border-0 mx-4"
            onClick={(event) => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/" className="nav-link mx-4">
            Login
          </Link>
          <Link to="/register" className="nav-link mx-4">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
