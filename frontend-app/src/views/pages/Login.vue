<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <div class="w-full">
    <!-- Login form -->
    <div class="p-6 w-full h-full grid grid-cols-2">
      <!-- Left column for login form -->
      <div class="p-6 w-full h-96 bg-white">
        <!-- Login header -->
        <p class="font-sans font-bold text-3xl mb-4">Login</p>
        <!-- Form inputs for email and password -->
        <div>
          <!-- Email input -->
          <div class="items-start">
            <p class="font-sans text-xl mb-1">Email:</p>
            <input type="email" name="email" v-model="email" placeholder="Enter Email..."
              class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            <div class="mb-2 text-red-700 text-sm" v-show="submitted && !email">Email is Required</div>
          </div>
          <!-- Password input -->
          <div class="items-start">
            <p class="font-sans text-xl mb-1">Password:</p>
            <input ref="passwordInput" type="password" name="password" v-model="password"
              placeholder="Enter Password..."
              class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            <!-- Button to toggle password visibility -->
            <button id="customIconButton"
              class="absolute translate-x-[-2.5rem] translate-y-[0.25rem] text-xl hover:scale-150 hover:text-red-500 duration-150 text-center mr-4 ml-2"
              @click="togglePasswordVisibility">
              <!-- Icon for password visibility toggle -->
              <span class="material-icons-outlined text-2xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
            <div class="mb-2 text-red-700 text-sm" v-show="submitted && !password">Password is Required</div>
          </div>
          <!-- Login button -->
          <div>
            <button class="text-white text-xl rounded-full bg-black px-4 py-2 mt-2"
              v-on:click=handleSubmit(e)>Login</button>
          </div>
          <!-- Additional options -->
          <div class="items-start flex">
            <!-- Forgot password link -->
            <div @click="Change('Password', 'forgotPassword')" class="mt-2 pr-2 text-black text-sm cursor-pointer">
              Forgot Password?</div>
            <!-- Divider -->
            <div class="mt-2 pr-2 text-black text-sm">-</div>
            <!-- Register link -->
            <router-link to="/Register">
              <div class="mt-2 pr-2 text-black text-sm cursor-pointer">Register?</div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- Right column for login image -->
      <div class="w-full h-96 grid place-items-start bg-black">
        <!-- Overlay image -->
        <img class="h-full w-auto max-h-96 self-center bg-zinc-800 absolute mix-blend-multiply"
          src="/src/resources/fade_001.png" draggable="false" />
        <!-- Main login image -->
        <img class="h-full w-auto max-h-96 self-center bg-zinc-800" src="/src/resources/login-image.jpg"
          draggable="false" />
      </div>
    </div>
    <!-- Change details component -->
    <change-detail ref="ChangeDetail"></change-detail>
    <!-- Alert component -->
    <custom-alert ref="customAlert"></custom-alert>
  </div>
</template>

<script>
// Importing necessary modules and services
import { usersService } from '../../services/users.service';
import ChangeDetail from '../components/ChangeDetail.vue';
import CustomAlert from '../components/CustomAlert.vue';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      email: "",
      password: "",
      error: "",
      submitted: false,
      showPassword: false,
    };
  },
  mounted() {
    // Reloading the page to clear data on refresh
    if (localStorage.getItem('reloaded')) {
      localStorage.removeItem('reloaded');
    } else {
      localStorage.setItem('reloaded', '1');
      location.reload();
    }

    // Checking if the password was recently changed
    const passwordChanged = localStorage.getItem('passwordChanged');
    // If the password was changed, show an alert indicating the update
    if (passwordChanged === 'true') {
      this.$refs.customAlert.showAlert('Password Updated.');
    }
  },
  methods: {
    // Login form submission handler
    handleSubmit(e) {
      // Sets submitted to true to indicate form submission
      this.submitted = true

      // Clears any previous error messages
      this.error = ""

      // Attempts to log in the user using provided email and password
      usersService.login(this.email, this.password)
        .then(result => {
          // If login is successful, navigate to the Dashboard page
          console.log("Auth - go to dash")

          // Setting a flag to indicate successful login
          localStorage.setItem('loggedInSuccess', 'true');

          // Navigating to the Dashboard page
          this.$router.push("/Dashboard")
        })
        .catch(error => {
          this.error = error
          this.loading = false
          // Displays an alert for invalid credentials
          this.$refs.customAlert.showAlert('Invalid Credentials.');
        });
    },
    // Toggling password visibility
    togglePasswordVisibility() {
      // Toggling password input visibility
      const input = this.$refs.passwordInput;
      input.type = this.showPassword ? "password" : "text";
      this.showPassword = !this.showPassword;
    },
    // Triggers a change event with a message and detail that is used to determine the what user detail to change
    Change(message, detail) {
      // Pop up appearing with the requested user detail that can be changed
      this.$refs.ChangeDetail.Show(message, detail);
    },
  },
  components: {
    CustomAlert,
    ChangeDetail
  },
};
</script>

<style></style>