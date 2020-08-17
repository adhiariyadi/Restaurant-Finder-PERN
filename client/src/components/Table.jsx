import React, { useEffect, useContext } from "react";
import Api from "./../api";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const Table = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("/");
        setRestaurants(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const buttonDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await Api.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const buttonEdit = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurant/${id}/edit`);
  };

  const restaurantSelect = (id) => {
    history.push(`/restaurant/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div>
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    onClick={() => restaurantSelect(restaurant.id)}
                    key={restaurant.id}
                  >
                    <th>{restaurant.name}</th>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price)}</td>
                    <td>{renderRating(restaurant)}</td>
                    <td>
                      <button
                        onClick={(e) => buttonEdit(e, restaurant.id)}
                        className="btn btn-warning text-white btn-sm mr-3 mb-1"
                      >
                        <i class="fas fa-edit mr-1"></i> Update
                      </button>
                      <button
                        onClick={(e) => buttonDelete(e, restaurant.id)}
                        className="btn btn-danger btn-sm mb-1"
                      >
                        <i class="fas fa-trash-alt mr-1"></i> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
