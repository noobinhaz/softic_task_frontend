import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState<any>();
  const [info, setInfo] = useState<any>();

  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>();
  const [success, setSuccess] = useState<boolean | null>();
  const [dropDownAccess, setDropDownAccess] = useState<boolean | undefined>(
    true
  );

  const getAdminData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: `http://localhost:8000/api/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config)
      .then((response) => {
        console.log(response.data.data);
        const output = JSON.stringify(response.data.data);

        console.log(JSON.parse(output));
        setData(JSON.parse(output));
        setDropDownAccess(true);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 403) {
          navigate("/");
        }
      });
  };
  const getAffiliationData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: `http://localhost:8000/api/myAffiliateList`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config)
      .then((response) => {
        console.log(response.data.data.affiliated_users);
        const output = JSON.stringify(response.data.data.affiliated_users);
        if (response.data.data.affiliated_users.length < 1) {
          setMessage("No Affiliated Users found for this User");
        } else {
          setMessage("");
        }
        const info = JSON.stringify(response.data.data);
        setData(JSON.parse(output));
        setInfo(JSON.parse(info));
        setDropDownAccess(false);
      })
      .catch((error) => {
        console.log(error.response.data);

        setSuccess(error.response.data.isSuccess);
        setMessage(error.response.data.message);
      });
  };

  const changeRole = async (event: any, id: number) => {
    const token = localStorage.getItem("token");
    const config = {
      method: "post",
      url: `http://localhost:8000/api/admin/dashboard`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        userId: id,
        role: event.target.value,
      },
    };

    const response = await axios(config)
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message);
          setSuccess(response.data.isSuccess);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setSuccess(err.response.data.isSuccess);
        if (err.response.status === 403) {
          navigate("/");
        }
      });
  };

  useEffect((): any => {
    const role = Number(localStorage.getItem("access"));

    if (role === 1) {
      getAdminData();
    } else if (role === 2) {
      getAffiliationData();
    } else {
      navigate("/otherPages");
    }
  }, []);

  console.log({ data });

  return (
    <div className="App">
      <div className="mb-4"></div>
      <div className="App-header">
        <h1>Dashboard</h1>
        <p className={`${success ? "text-success" : "text-danger"}`}>
          {message}
        </p>
      </div>
      <div className="bg-grey text-white">
        <span className="bg-info">User Info</span>
        {info ? (
          <>
            <p>Name : {info.name}</p>
            <p>Email : {info.email}</p>
            <p>Points: {info.point}</p>
          </>
        ) : null}
      </div>
      <hr />
      <div className="row">
        <table className="table table-hover">
          <thead className="bg-white">
            <tr>
              <th scope="col-1">SL</th>
              <th scope="col-2">Name</th>
              <th scope="col-2">Email</th>
              <th scope="col-1">Point</th>
              <th scope="col-1">Role</th>
              {dropDownAccess ? <th scope="col-1">Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((each: any, index: number) => (
                  <tr key={each.id} className="bg-white">
                    <td>{++index}</td>
                    <td>{each.name}</td>
                    <td>{each.email}</td>
                    <td>{each.point}</td>
                    <td>
                      <select
                        name="role"
                        onChange={(event) => changeRole(event, each.id)}
                        disabled={!dropDownAccess}
                      >
                        <option value="1" selected={each.role === 1}>
                          Super Admin
                        </option>
                        <option value="2" selected={each.role === 2}>
                          Affiliate
                        </option>
                        <option value="3" selected={each.role === 3}>
                          General User
                        </option>
                      </select>
                    </td>
                    {each.role === 1 || each.role === 2 ? (
                      <td>
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => navigate(`/affiliates/${each.id}`)}
                        >
                          Affiliated Users
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
