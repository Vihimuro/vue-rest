<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="https://vuejs.org/">
        <img
          src="./assets/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
        />
        Vue
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/home">
              Home <i class="fa fa-home" />
            </a>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="!user">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/register">
              Sign Up <i class="fa fa-user-plus" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/login">
              Login <i class="fa fa-sign-in" />
            </a>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="user">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/profile">
              <i class="fa fa-user" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click="logOut">
              LogOut
              <i class="fa fa-sign-out" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import UserService from "./services/user.service";
import vuex from "vuex";

export default {
  computed: {
    ...vuex.mapGetters(["user"]),
  },
  methods: {
    ...vuex.mapActions(["updateUser"]),
    logOut() {
      UserService.logOut().then(() => {
        this.updateUser(null);
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
