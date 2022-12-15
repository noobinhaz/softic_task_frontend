import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Affiliates = () => {
  const [data, setData] = useState<any>();
  const [message, setMessage] = useState<string | null>();
  const [success, setSuccess] = useState<boolean | null>(true);
  const [info, setInfo] = useState<any>();

  const navigate = useNavigate();
  const { id } = useParams();

  const getAffiliationData = async (id: string | undefined) => {
    const token = localStorage.getItem("token");

    if (id) {
      const config = {
        method: "get",
        url: `http://localhost:8000/api/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(config)
        .then((response) => {
          console.log(response.data);
          const output = JSON.stringify(response.data.data.affiliated_users);
          if (response.data.data.affiliated_users.length < 1) {
            setMessage("No Affiliated Users found for this User");
          } else {
            setMessage("");
          }
          const info = JSON.stringify(response.data.data);
          setData(JSON.parse(output));
          setInfo(JSON.parse(info));
        })
        .catch((error) => {
          console.log(error.response);
          setSuccess(error.response.data.isSuccess);
          setMessage(error.response.data.message);
        });
    }
  };
  useEffect(() => {
    getAffiliationData(id);
  }, []);
  return (
    <div className="App">
      <div className="mb-4"></div>
      <div className="App-header">
        <h1>Dashboard</h1>
        <p className={`${success ? "text-success" : "text-danger"}`}>
          {message}
        </p>
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead className="bg-white">
            <tr>
              <th scope="col-2">SL</th>
              <th scope="col-4">Name</th>
              <th scope="col-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((each: any, index: number) => (
                  <tr key={each.id} className="bg-white">
                    <td>{++index}</td>
                    <td>{each.name}</td>
                    <td>{each.email}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Affiliates;
