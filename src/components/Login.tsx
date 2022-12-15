import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginComp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();

  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [isSuccess, setIsSuccess] = useState<boolean | null>();

  const loginSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email, password);
    setErrorMessage("");

    const config = {
      method: "post",
      url: `http://localhost:8000/api/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    };

    const response = await axios(config)
      .then((response) => {
        setErrorMessage(response.data.message);
        setIsSuccess(response.data.isSuccess);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("access", response.data.user.role);
        navigate("/home");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setIsSuccess(error.response.data.isSuccess);
      });
  };
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <p
                    className={`text-center ${
                      isSuccess ? "text-success" : "text-danger"
                    }`}
                  >
                    {errorMessage}
                  </p>
                  <form onSubmit={(event) => loginSubmit(event)}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                      <label className="form-label">Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                      onClick={(event) => loginSubmit(event)}
                    >
                      Login
                    </button>

                    <hr className="my-4" />
                    <p>
                      Already Have an account? <i></i>
                      <button
                        className="btn btn-lg btn-block btn-primary"
                        style={{ backgroundColor: "green" }}
                        type="submit"
                      >
                        Login
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginComp;
