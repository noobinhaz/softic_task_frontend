import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Credentials = () => {
  const [data, setData] = useState();
  const [isChange, setChange] = useState<boolean | null>(false);

  const navigate = useNavigate();

  const getData = async () => {
    const token = await localStorage.getItem("token");

    const config = {
      method: "get",
      url: `http://localhost:8000/api/dashboard`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data[0]));
        const output = JSON.stringify(response.data[0]);

        console.log(JSON.parse(output));
        setData(JSON.parse(output));
      })
      .catch((err) => {
        console.error(err.response.data);
        if (err.response.status == 403) {
          navigate("/otherPages");
        }
      });
  };
  useEffect(() => {
    getData();
  }, [isChange]);

  const regenerateCode = async (event: any) => {
    event.preventDefault();
    setChange(true);
    const token = await localStorage.getItem("token");
    console.log(token);
    const config = {
      method: "get",
      url: `http://localhost:8000/api/updateCredentials`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config)
      .then((response) => {
        const output = JSON.stringify(response.data[0]);

        console.log(JSON.parse(output));
        setData(JSON.parse(output));
      })
      .catch((error) => console.error(error.response.data));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <hr />
          <p>
            Reference Id : <strong>{data ? data["ref_id"] : null}</strong>
          </p>
          <p>
            Share Url : <strong>{data ? data["url"] : null}</strong>
          </p>
          <p>
            Random Generated Code :{" "}
            <strong>{data ? data["rand_code"] : null}</strong>
          </p>
        </div>
        <hr />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(event) => regenerateCode(event)}
        >
          Regenerate
        </button>
        <hr />
      </div>
    </div>
  );
};

export default Credentials;
