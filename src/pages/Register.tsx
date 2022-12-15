import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const ref = search ? search.split("=")[1] : null;

  const [name, setName] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [repeatPassword, setRepeatPassword] = useState<string | null>();

  const [emailError, setEmailErr] = useState<string | null>();
  const [passError, setPassErr] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [isSuccess, setIsSuccess] = useState<boolean | null>();

  const register = async (e: any) => {
    setPassErr("");
    setErrorMessage("");
    if (password !== repeatPassword) {
      setPassErr("Password and Repeat Password Must Match");
    }
    const config = {
      method: "post",
      url: `http://localhost:8000/api/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        email: email,
        password: password,
        reference: ref,
      },
    };

    const response = await axios(config)
      .then((response) => {
        setErrorMessage(response.data.message);
        setIsSuccess(response.data.isSuccess);
        console.log(response);
        navigate("/");
      })
      .catch((response) => {
        console.log(response.response.data.message);
        setErrorMessage(response.response.data.message);
        setIsSuccess(response.response.data.isSuccess);
      });
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <p
                        className={`text-center, ${
                          isSuccess ? "text-info" : "text-danger"
                        }`}
                      >
                        {errorMessage}
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={(Event) => register(Event)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(event) => {
                                setName(event.target.value);
                              }}
                              required
                            />
                            <label className="form-label">Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              className="form-control"
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                              required
                            />
                            <label className="form-label">Email</label>
                            <br />
                            <span className="text-danger">{emailError}</span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              minLength={8}
                              className="form-control"
                              onChange={(event) => {
                                setPassword(event.target.value);
                              }}
                              required
                            />
                            <label className="form-label">Password</label>
                            <br />
                            <span className="text-danger">{passError}</span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              minLength={8}
                              className="form-control"
                              onChange={(event) => {
                                setRepeatPassword(event.target.value);
                              }}
                              required
                            />
                            <label className="form-label">
                              Repeat password
                            </label>
                            <br />
                            <span className="text-danger">{passError}</span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={(e) => register(e)}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
