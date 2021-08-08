import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../utils/mutations";
import Auth from "../utils/auth";
import { ADD_PRODUCT } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { QUERY_USER } from "../utils/queries";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";

import { GraphQLUpload } from "graphql-upload";

function DashBoard() {
  const [upload] = useMutation(UPLOAD_FILE);

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
  // const [addProduct] = useMutation(ADD_PRODUCT);

  const [addProduct, { error }] = useMutation(ADD_PRODUCT, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { addProduct } }) {
      try {
        // First we retrieve existing product data that is stored in the cache under the `QUERY_ALL_PRODUCTS` query
        // Could potentially not exist yet, so wrap in a try/catch
        const { products } = cache.readQuery({ query: QUERY_ALL_PRODUCTS });

        // Then we update the cache by combining existing proDUCT data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_PRODUCTS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { products: [...products, addProduct] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

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

    let image;
    if (file) {
      const { data } = await upload({ variables: { file } });
      image = data.upload.filename;
    }

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
        <div className="align-items-center">
          <Link to="/">← Back to Products</Link>

          {user ? (
            <>
              <h2 className="text-center">Product Dashboard</h2>
              <form
                onSubmit={handleFormSubmit}
                className="border-blue my-1 align-items-center"
              >
                <div className="form-group my-2">
                  <label htmlFor="exampleInputEmail1">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="product-name"
                    aria-describedby="emailHelp"
                    placeholder="Enter product name"
                    onChange={handleChange}
                    required
                  ></input>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="exampleFormControlTextarea1">
                    Product Description
                  </label>
                  <textarea
                    className="form-control"
                    id="product-description"
                    rows="3"
                    onChange={handleChange}
                    name="description"
                    required
                  ></textarea>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="exampleFormControlSelect2">
                    Product Condition
                  </label>
                  <select
                    className="form-control"
                    id="product-condition"
                    onChange={handleChange}
                    name="condition"
                    required
                  >
                    <option>New</option>
                    <option>Used (like-new)</option>
                    <option>Used (good)</option>
                    <option>Used (fair)</option>
                  </select>
                </div>

                {categories.data && (
                  <div className="form-group my-2">
                    <label htmlFor="exampleFormControlSelect2">Category</label>
                    <select
                      className="form-control"
                      id="product-condition"
                      name="category"
                      onChange={handleChange}
                      required
                    >
                      {categories.data.categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group my-2">
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
                    required
                  ></input>
                </div>

                <div className="form-group my-2">
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
                    required
                  ></input>
                </div>

                <div className="form-group my-2">
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
                    required
                  ></input>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="exampleFormControlTextarea1">Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    name="quantity"
                    id="product-quantity"
                    aria-describedby="emailHelp"
                    placeholder="Enter product quantity"
                    onChange={handleChange}
                    required
                  ></input>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="exampleFormControlFile1">
                    Upload Picture
                  </label>
                  <input type="file" onChange={onChange} />
                  {/* {data && (
                  <img
                    style={{ maxWidth: "100%" }}
                    src={data.upload.filename}
                    alt=""
                  />
                )} */}
                </div>

                <button type="submit" className="btn btn-primary my-2">
                  Add new product
                </button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
