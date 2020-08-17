import React, { useState, useContext } from "react";
import Api from "./../api";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/", {
        name,
        location,
        price,
      });
      addRestaurants(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
          <button
            onClick={submit}
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: 5 }}
          >
            <i class="fas fa-plus mr-1"></i> Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
