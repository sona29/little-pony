import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { QUERY_USER } from "../utils/queries";

function DashBoard() {
  const { data } = useQuery(QUERY_USER);

  let user;

  if (data) {
    user = data.user;
    // console.log(user);
  }

  const categories = useQuery(QUERY_CATEGORIES);

  console.log(categories.data);

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <h2>Product Dashboard</h2>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Product Name</label>
                <input
                  type="email"
                  className="form-control"
                  id="product-name"
                  aria-describedby="emailHelp"
                  placeholder="Enter product name"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Product Description
                </label>
                <textarea
                  className="form-control"
                  id="product-description"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">
                  Product Condition
                </label>
                <select className="form-control" id="product-condition">
                  <option>New</option>
                  <option>Used (like-new)</option>
                  <option>Used (good)</option>
                  <option>Used (fair)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Product Color
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="product-quantity"
                  aria-describedby="emailHelp"
                  placeholder="Enter product color"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Quantity</label>
                <input
                  type="email"
                  className="form-control"
                  id="product-quantity"
                  aria-describedby="emailHelp"
                  placeholder="Enter product quantity"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Upload Picture</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                ></input>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </>
        ) : null}
      </div>
    </>
  );
}

export default DashBoard;
