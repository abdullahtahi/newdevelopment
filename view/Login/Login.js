import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/auth.action";
import Alert from "../../components/Alert/Alert";
// import { messaging } from "../../init-fcm";
// import cars from "../../assets/img/cars.png";
// import logo from "../../assets/img/white_logo.svg";
import { makeStyles, CircularProgress, Box } from "@material-ui/core";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, settoken] = useState("");
  const { authenticated, loading } = useSelector((state) => state.auth);

  const loginHandler = async () => {
    const body = { email: email, password: password, registrationToken: token };
    dispatch(login(body));
  };
  if (authenticated) {
    // dispatch(getAllData());
    // dispatch(getmostActiveRenter());
    // dispatch(getmostActiveOwner());
    // dispatch(getMostBookedCars());
    // dispatch(getSevenDaysEarning());
    // dispatch(getSevenDaysBookings());
    return <Redirect to="/customers" />;
  }

  return (
    <>
      <div className="signupcontainer">
        <div className="col1signup">
          <div className="signupform">
            <h2>Login</h2>
            <div
              className="alert-container"
              style={{ width: 330, marginBottom: 10 }}
            >
              <Alert />
            </div>
            <div className="inputphone">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                tabIndex={1}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="inputphone">
              <input
                tabIndex={2}
                style={{ backgroundColor: "white" }}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="createaccountbutton"
              style={{ color: "#fff" }}
              onClick={() => {
                loginHandler();
              }}
            >
              Login
            </button>
            <p className="check" id="check">
              Forgot Password?
              <Link to="/forgotpassword" style={{ color: "#1F1D61" }}>
                Click here
              </Link>
            </p>
          </div>
        </div>
        <div className="col2signup container">
          {/* <img src={cars} alt="" /> */}
          <div class="centered">
            <>
              {/* <img src={logo} width={"130px"} height="130px" /> */}
              <p>
                Sign in for Deliver it mini as Admin and become
                <br />
                part of the family.
              </p>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  heading2: {
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: 1.2,
    color: "#2D1967",
    textAlign: "center",
  },
}));
export default Login;
