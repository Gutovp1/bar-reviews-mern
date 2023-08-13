import http from "./httpCommon";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  get(id) {
    return http.get(`/restaurant?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post("/review_new", data);
  }

  updateReview(data) {
    return http.put("/review_edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review_delete?id=${id}`, {
      data: { user_id: userId },
    });
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RestaurantDataService();
