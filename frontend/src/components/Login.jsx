import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const initialUserState = {
    name: "",
    id: "",
  };
  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signin = () => {
    login(user);
    navigate(-1);
  };

  return (
    <div className="submit-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div style={{ maxWidth: '20rem', width: '100%', padding: '2rem', border: '0.1rem solid #ccc', borderRadius: '0.25rem' }}>
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
            style={{ width: '100%', marginBottom: '0.75rem' }}
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
            style={{ width: '100%', marginBottom: '0.75rem' }}
          />
        </div>

        <button onClick={signin} className="btn btn-success" style={{ width: '100%' }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
