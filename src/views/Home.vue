<template>
  <div style="padding-top: 30px">
    <div
      v-if="infoMessage"
      class="alert alert-sucess"
      role="alert"
      onclick="hideAlert()"
    >
      {{ infoMessage }}
    </div>
    <div
      v-if="errorMessage"
      class="alert alert-danger"
      role="alert"
      onclick="hideAlert()"
    >
      {{ errorMessage }}
    </div>

    <div class="card">
      <div class="card-header">All Users</div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, ind) in userList" :key="ind">
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button
                  class="btn btn-danger btn-sm"
                  :disabled="user.role == 'ROLE_ADMIN'"
                  @click="deleteUser(user, ind)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "../services/admin.service";
export default {
  name: "home-name",
  data() {
    return {
      userList: [],
      errorMessage: "",
      infoMessage: "",
    };
  },
  methods: {
    deleteUser(user, ind) {
      AdminService.delete(user.id).then(() => {
        this.userList.splice(ind, 1);
        this.infoMessage = "User excluded!";
      }),
        (error) => {
          console.log(error);
          this.errorMessage = "Unexpected error occured.";
        };
    },
    hideAlert() {
      var alert = document.getElementsByClassName("alert");
      if (alert.style.display == "block") {
        alert.style.display = "none";
      }
    },
  },
  mounted() {
    AdminService.findAllUsers().then((response) => {
      this.userList = response.data;
    });
  },
};
</script>

<style scoped></style>
