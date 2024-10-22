import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = ({ product, cart, setToken }) => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav">
            <li className="btn btn-outline-primary m-2">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="btn btn-outline-primary m-2">
              <Link to="/calculator" className="nav-link">
                Calculator
              </Link>
            </li>
            <li className="btn btn-outline-primary m-2">
              <Link to="/animation" className="nav-link">
                Animation
              </Link>
            </li>
            <li className="btn btn-outline-primary m-2">
              <Link to="/componnets" className="nav-link">
                Componnets
              </Link>
            </li>
            <li className="btn btn-outline-primary m-2">
              <Link to="/todo" className="nav-link">
                Todo
              </Link>
            </li>
            <li className="btn btn-outline-primary m-2">
              <Link to="/products" className="nav-link">
                Products {"("}
                {product.length}
                {")"}
              </Link>
            </li>
            <li className="btn btn-outline-primary m-2">
              <Link to="/carts" className="nav-link position-relative">
                Cart{" "}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length > 9 ? "+9" : cart.length}
                </span>
              </Link>
            </li>
            <li className="btn btn-outline-danger m-2">
              <button onClick={() => {setToken('')}} className="nav-link">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
