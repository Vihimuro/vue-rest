import { createStore } from "vuex";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("currentUser")),
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    ["UPDATE_USER"](s, user) {
      s.user = user;
    },
  },
  actions: {
    updateUser({ commit }, user) {
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
      commit("UPDATE_USER", user);
    },
  },
  modules: {},
});
