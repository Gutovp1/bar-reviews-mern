import React, { useEffect, useState } from "react";
import RestaurantDataService from "../services/restaurantDS";
import { Link, useLocation, useParams } from "react-router-dom";

const AddReview = ({ user }) => {
  const [initialReviewState, setInitialReviewState] = useState("");
  const [editing, setEditing] = useState(false);

  const location = useLocation();
  console.log(location);
  // useEffect(() => {
    if (location.state && location.state.currentReview) {
      setEditing(true);
      setInitialReviewState(location.state.currentReview.text);
    }
  // }, [location.state]);

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = async () => {
    let data = {
      text: review,
      name: user.name,
      user_id: user.id,
      restaurant_id: id,
    };

    if (editing) {
      data.review_id = location.state.currentReview._id;
      console.log("edit ", data.review_id);
      const respReviewUpdate = await RestaurantDataService.updateReview(data);
      console.log("edit2 ", respReviewUpdate);
      try {
        setSubmitted(true);
        console.log(respReviewUpdate.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      const respReviewCreate = await RestaurantDataService.createReview(data);
      console.log("create ", respReviewCreate);
      try {
        setSubmitted(true);
        console.log(respReviewCreate.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      {user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link
                to={"/restaurants/" + id}
                // to={"/restaurants/" + match.params.id}
                className="btn btn-success"
              >
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default AddReview;
