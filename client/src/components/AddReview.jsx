import React, { useState } from "react";
import Api from "./../api";
import { useLocation, useParams, useHistory } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await Api.post(`/${id}/addReview`, {
        name,
        review,
        rating,
      });
      history.push("/");
      history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
  };

  const buttonBack = (e) => {
    e.stopPropagation();
    history.push("/");
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option value="" disabled>
                Rating
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            id="Review"
            placeholder="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          onClick={(e) => buttonBack(e)}
          className="btn btn-outline-primary mr-3"
        >
          <i class="fas fa-arrow-left mr-1"></i> Back
        </button>
        <button type="submit" onClick={submit} className="btn btn-primary">
          <i class="fas fa-plus mr-1"></i> Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
