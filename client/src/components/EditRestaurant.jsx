import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Api from "./../api";

const EditRestaurant = () => {
  const { id } = useParams();
  let history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPrice(response.data.data.restaurant.price);
    };

    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await Api.put(`/${id}`, {
      name,
      location,
      price,
    });
    history.push("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            className="custom-select"
          >
            <option value="" disabled>
              Price Range
            </option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button type="submit" onClick={submit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
