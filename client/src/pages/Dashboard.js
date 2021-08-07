import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../utils/mutations";
import Auth from "../utils/auth";
import { ADD_PRODUCT } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { QUERY_USER } from "../utils/queries";

import { GraphQLUpload } from "graphql-upload";

function DashBoard() {
  const [upload] = useMutation(UPLOAD_FILE);
  // const { data: uploadData } = await upload({ variables: { file } });

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (!validity.valid) {
      alert("Invalid file");
      return;
    }
    // upload({ variables: { file } });
    setFile(file);
  };
  const [file, setFile] = useState();

  const [formState, setFormState] = useState();
  const [addProduct] = useMutation(ADD_PRODUCT);
  const { data } = useQuery(QUERY_USER);

  let user;

  if (data) {
    user = data.user;
    // console.log(user);
  }

  const categories = useQuery(QUERY_CATEGORIES);

  //for form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    console.log(user);

    let image;
    if (file) {
      const { data } = await upload({ variables: { file } });
      image = data.upload.filename;
    }
    console.log(image);
    const mutationResponse = await addProduct({
      variables: {
        name: formState.name,
        description: formState.description,
        size: formState.size,
        color: formState.color,
        price: parseFloat(formState.price),
        quantity: parseInt(formState.quantity),
        category: formState.category,
        condition: formState.condition,
        image: image,
      },
    });
  };

  const handleChange = (event) => {
    console.log(formState);
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  console.log(data);

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <h2>Product Dashboard</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="product-name"
                  aria-describedby="emailHelp"
                  placeholder="Enter product name"
                  onChange={handleChange}
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
                  onChange={handleChange}
                  name="description"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">
                  Product Condition
                </label>
                <select
                  className="form-control"
                  id="product-condition"
                  onChange={handleChange}
                  name="condition"
                >
                  <option>New</option>
                  <option>Used (like-new)</option>
                  <option>Used (good)</option>
                  <option>Used (fair)</option>
                </select>
              </div>

              {categories.data && (
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect2">Category</label>
                  <select
                    className="form-control"
                    id="product-condition"
                    name="category"
                    onChange={handleChange}
                  >
                    {categories.data.categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Product Color
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="color"
                  id="product-quantity"
                  aria-describedby="emailHelp"
                  placeholder="Enter product color"
                  onChange={handleChange}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Product Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  id="product-quantity"
                  aria-describedby="emailHelp"
                  placeholder="Enter product color"
                  onChange={handleChange}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Product Size
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="size"
                  id="product-quantity"
                  aria-describedby="emailHelp"
                  placeholder="Enter product color"
                  onChange={handleChange}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  id="product-quantity"
                  aria-describedby="emailHelp"
                  placeholder="Enter product quantity"
                  onChange={handleChange}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Upload Picture</label>
                <input type="file" onChange={onChange} />
                {/* {data && (
                  <img
                    style={{ maxWidth: "100%" }}
                    src={data.upload.filename}
                    alt=""
                  />
                )} */}
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
