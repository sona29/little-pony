import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <div className="offset-md-4">
        <Link to="/login">← Go to Login</Link>

        <h2>Create Account</h2>
        <form onSubmit={handleFormSubmit} className="border-blue my-1">
          <div className="form-group my-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="Enter First Name"
              name="firstName"
              type="firstName"
              id="firstName"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="Enter Last Name"
              name="lastName"
              type="lastName"
              id="lastName"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
