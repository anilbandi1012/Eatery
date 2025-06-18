
import React, { Component } from "react";
import { myContext } from "../../App";
import { MdLightMode } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub } from "react-icons/si";
import { withRouter } from "../../utils/withRouter"; // ✅ Import custom HOC

class Signin extends Component {
  state = { userName: "", password: "" };

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangeUserPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSignIn = (e) => {
    e.preventDefault();
    const obj = {
      userName: this.state.userName,
      password: this.state.password,
    };
    localStorage.setItem("details", JSON.stringify(obj));
    const { navigate } = this.props.router;
    navigate("/login", { replace: true }); // ✅ Use navigate instead of history.replace
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
                Sign In
              </h1>
              <div className={`inner-login-container ${isdarkMode ? "border-white" : ""}`}>
                <div className="img-section">
                  <img src="/images/redtom.jpg" alt="login" className="login-img" />
                </div>
                <form className={`form-details ${isdarkMode ? "dark-bg" : ""}`} onSubmit={this.onSignIn}>
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
                      type="text"
                      id="name"
                      placeholder="Enter your name..."
                      className={`${isdarkMode ? "input-bg-black text-white" : ""}`}
                      onChange={this.onChangeUserName}
                    />
                  </div>

                  <div className="input-fields">
                    <label htmlFor="password" className={`${isdarkMode ? "text-white" : ""}`}>
                      Password
                    </label>
                    <input
                      required
                      type="password"
                      id="password"
                      placeholder="Enter Password..."
                      className={`${isdarkMode ? "input-bg-black text-white" : ""}`}
                      onChange={this.onChangeUserPassword}
                    />
                  </div>

                  <div className="input-fields">
                    <button type="submit" className="login-btn">
                      Sign In
                    </button>
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

export default withRouter(Signin);
