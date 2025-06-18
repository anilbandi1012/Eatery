import "./Login.css";
import React, { Component } from "react";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import { withRouter } from "../../utils/withRouter"; // Import custom HOC
import { MdLightMode } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub } from "react-icons/si";

class Login extends Component {
  state = { userName: "", password: "", errorMsg: "" };

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangeUserPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onLogin = (event) => {
    event.preventDefault();
    const str = localStorage.getItem("details");

    if (!str) {
      this.setState({ errorMsg: "No user data found. Please sign up first." });
      return;
    }

    let details;
    try {
      details = JSON.parse(str);
    } catch {
      this.setState({ errorMsg: "Corrupted user data. Please sign up again." });
      return;
    }

    const { userName: storedUser, password: storedPass } = details;

    if (
      storedUser === this.state.userName &&
      storedPass === this.state.password
    ) {
      const { navigate } = this.props.router;
      navigate("/", { replace: true }); // ✅ Use navigate with replace
    } else {
      this.setState({ errorMsg: "Invalid details. Please check again." });
    }
  };

  render() {
    return (
      <myContext.Consumer>
        {(values) => {
          const { isdarkMode, changeMode } = values;
          return (
            <div className={`login-container ${isdarkMode ? "dark-bg" : ""}`}>
              <div className="light-section">
                <MdLightMode
                  onClick={changeMode}
                  className={`light-icon ${isdarkMode ? "dark-heading" : ""}`}
                />
              </div>
              <h1 className={`login-heading ${isdarkMode ? "dark-heading" : ""}`}>
                Login Form
              </h1>
              <div className={`inner-login-container ${isdarkMode ? "border-white" : ""}`}>
                <div className="img-section">
                  <img src="/images/redtom.jpg" alt="login" className="login-img" />
                </div>
                <form
                  className={`form-details ${isdarkMode ? "dark-bg" : ""}`}
                  onSubmit={this.onLogin}
                >
                  <h1 className={`main-logo-heading-login-pg ${isdarkMode ? "dark-heading" : ""}`}>
                    Delish Dishes
                  </h1>
                  <img src="/images/fooddelicious.png" alt="logo" className="del-food" />

                  <div className="input-fields">
                    <label htmlFor="name" className={`${isdarkMode ? "text-white" : ""}`}>
                      User Name
                    </label>
                    <input
                      required
                      onChange={this.onChangeUserName}
                      type="text"
                      id="name"
                      placeholder="Enter your name..."
                      className={`${isdarkMode ? "input-bg-black text-white" : ""}`}
                    />
                  </div>

                  <div className="input-fields">
                    <label htmlFor="password" className={`${isdarkMode ? "text-white" : ""}`}>
                      Password
                    </label>
                    <input
                      required
                      onChange={this.onChangeUserPassword}
                      type="password"
                      id="password"
                      placeholder="Enter password..."
                      className={`${isdarkMode ? "input-bg-black text-white" : ""}`}
                    />
                  </div>

                  <div className="input-fields">
                    <button className="login-btn">Login</button>
                    {this.state.errorMsg && <p style={{ color: "red" }}>{this.state.errorMsg}</p>}
                  </div>

                  <div className="signup-link">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/signin" className="signin-link">
                        Sign In
                      </Link>
                    </p>
                  </div>

                  <div className={`web-links ${isdarkMode ? "dark-heading" : ""}`}>
                    <FaGoogle className="web-icon" />
                    <ImFacebook2 className="web-icon" />
                    <BsLinkedin className="web-icon" />
                    <SiGithub className="web-icon" />
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </myContext.Consumer>
    );
  }
}

export default withRouter(Login);
