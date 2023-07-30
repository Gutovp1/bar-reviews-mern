import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams } from "react-router-dom";

const Restaurant = ({ user }) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  let { id } = useParams();
  const getRestaurant = async (id) => {
    const respID = await RestaurantDataService.get(id);
    try {
      setRestaurant(respID.data);
      console.log(respID.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);
  //   getRestaurant(props.match.params.id);
  // }, [props.match.params.id]);

  const deleteReview = async (reviewId, index) => {
    await RestaurantDataService.deleteReview(reviewId, user.id);
    try {
      setRestaurant((prevState) => {
        prevState.reviews.splice(index, 1);
        return {
          ...prevState,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <b>Cuisine: </b>
            {restaurant.cuisine}
            <br />
            <b>Address: </b>
            {restaurant.address.building} {restaurant.address.street},{" "}
            {restaurant.address.zipcode}
          </p>
          <Link
            to={"/restaurants/" + id + "/review"}
            // to={"/restaurants/" + props.match.params.id + "/review"}
            className="btn btn-primary"
          >
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <b>User: </b>
                          {review.name}
                          <br />
                          <b>Date: </b>
                          {review.date}
                        </p>
                        {user && user.id === review.user_id && (
                          <div className="row">
                            <a
                              onClick={() => deleteReview(review._id, index)}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Delete
                            </a>
                            <Link
                              to={{
                                pathname:
                                  "/restaurants/" +
                                  id +
                                  // props.match.params.id +
                                  "/review",
                                state: {
                                  currentReview: review,
                                },
                              }}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
