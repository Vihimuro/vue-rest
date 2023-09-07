import axios from "axios";
import Store from "../store";

const API_ADMIN_URL = "http://localhost:8080/api/admin/";

class AdminService {
  headers() {
    const user = Store.getters["user"];
    return {
      authorization: "Basic " + btoa(user.username + ":" + user.password),
      "Content-Type": "application/json",
    };
  }

  delete(userId) {
    return axios.delete(API_ADMIN_URL + "delete/" + userId, {
      headers: this.headers(),
    });
  }

  findAllUsers() {
    return axios.get(API_ADMIN_URL + "all", { headers: this.headers() });
  }
}

export default new AdminService();
