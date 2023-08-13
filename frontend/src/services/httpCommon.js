import axios from "axios";

export default axios.create({
  baseURL:
  // "http://localhost:5000/api/v1/restaurants",
  "https://sa-east-1.aws.data.mongodb-api.com/app/bar-reviews-igeal/endpoint/",
  headers: {
    "Content-type": "application/json",
  },
});
