import "./Nav.css";
import React, { Component } from "react";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import { withRouter } from "../../utils/withRouter"; // ✅ Using custom HOC

class Nav extends Component {
  OnLogout = () => {
    this.props.router.navigate("/login", { replace: true });
  };

  render() {
    return (
      <myContext.Consumer>
        {(value) => (
          <div className="bg-nav">
            <nav className="nav-container">
              <h1>Delish Dishes</h1>
              <ul className="nav-items-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li>
                  <button className="logout-btn" onClick={this.OnLogout}>
                    Log Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </myContext.Consumer>
    );
  }
}

export default withRouter(Nav);
