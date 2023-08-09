import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const initialUserState = {
    name: "",
    id: "",
  };
  const [user, setUser] = useState(initialUserState);
  console.log(login, user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signin = () => {
    login(user);
    navigate(-1);
  };

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={signin} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
