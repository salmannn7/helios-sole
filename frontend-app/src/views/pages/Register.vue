<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <!-- Registration form -->
  <div class="w-full">
    <!-- Form layout -->
    <div class="p-6 w-full h-full grid grid-cols-2">
      <!-- Left column - Registration form -->
      <div class="p-6 w-full h-auto min-h-96 bg-white">
        <!-- Title -->
        <p class="font-sans font-bold text-3xl mb-4">Register</p>
        <!-- Form inputs -->
        <div>
          <!-- First Name -->
          <div class="items-start">
            <p class="font-sans text-xl mb-1">First Name:</p>
            <input type="firstName" name="firstName" v-model="firstName" placeholder="Enter First Name..."
              class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            <div class="mb-2 text-red-700 text-sm" v-show="submitted && !firstName">First Name is Required</div>
          </div>
          <!-- Last Name -->
          <div class="items-start">
            <p class="font-sans text-xl mb-1">Last Name:</p>
            <input type="lastName" name="lastName" v-model="lastName" placeholder="Enter Last Name..."
              class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            <div class="mb-2 text-red-700 text-sm" v-show="submitted && !lastName">Last Name is Required</div>
          </div>
          <!-- Birth Date -->
          <div class="grid grid-cols-2 gap-2">
            <div class="items-start">
              <p class="font-sans text-xl mb-1">Birth Date:</p>
              <input type="birthDate" name="birthDate" v-model="birthDate" @input="formatBirthDate" maxlength="10"
                placeholder="DDMMYYYY"
                class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
              <div class="mb-2 text-red-700 text-sm" v-show="submitted && !birthDate">Birth Date is Required</div>
            </div>
            <!-- Gender -->
            <div class="items-start">
              <p class="font-sans text-xl mb-1">Gender:</p>
              <select name="gender" v-model="gender" placeholder="Select Gender..."
                class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <option value="" disabled selected>Select Gender...</option>
                <option v-for="g in genders" :key="g.id">{{ g.name }}</option>
              </select>
              <div class="mb-2 text-red-700 text-sm" v-show="submitted && !gender">Gender is Required</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Right column - Email and Password -->
      <div class="p-6 w-full h-96 bg-white">
        <p class="font-sans font-bold text-3xl mb-4 text-white">-</p>
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
            <!-- Password visibility toggle -->
            <button id="customIconButton"
              class="absolute translate-x-[-2.5rem] translate-y-[0.25rem] text-xl hover:scale-150 hover:text-red-500 duration-150 text-center mr-4 ml-2"
              @click="togglePasswordVisibility">
              <span class="material-icons-outlined text-2xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
            <div class="mb-2 text-red-700 text-sm" v-show="submitted && !password">Password is Required</div>
          </div>
          <!-- Consent Tickbox -->
          <div class="items-center flex flex-nowrap">
            <input type="checkbox" id="checkbox" v-model="checked" />
            <div class="ml-2 text-sm text-black" :class="{ 'text-black': redo === false, 'text-red-500': redo === true }">I consent to
              the use of my purchasing and viewing data for personalisation purposes.</div>
          </div>
          <!-- Registration button -->
          <div>
            <button class="text-white text-xl rounded-full bg-black px-4 py-2 mt-2"
              v-on:click=handleSubmit(e)>Register</button>
          </div>
          <!-- Login link -->
          <div class="items-start flex">
            <router-link to="/Login">
              <div class="mt-2 pr-2 text-black text-sm cursor-pointer">Already have an account?</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Alert component -->
    <custom-alert ref="customAlert"></custom-alert>
  </div>
</template>

<script>
// Importing necessary modules and services
import { usersService } from '../../services/users.service';
import CustomAlert from '../components/CustomAlert.vue';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      birthDateJson: "",
      error: "",
      submitted: false,
      genders: [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
      ],
      showPassword: false,
      checked: false,
      redo: false,
    };
  },
  mounted() {
    // Reloading the page to clear form data on refresh
    if (localStorage.getItem('reloaded')) {
      localStorage.removeItem('reloaded');
    } else {
      localStorage.setItem('reloaded', '1');
      location.reload();
    }
  },
  methods: {
    // Registration form submission handler
    handleSubmit(e) {
      // Sets submitted to true to indicate form submission
      this.submitted = true

      // Clears any previous error messages
      this.error = ""
      //console.log(this.gender)

      if (this.checked === true) {

        // Unhighlight the consent tick
        this.redo = false;

        // Handling form validation and data formatting
        if (this.birthDate) {
          let parts = this.birthDate.split('/');
          this.birthDateJson = parts[2] + "-" + parts[1] + "-" + parts[0];
        } else {
          this.birthDateJson = "";
        }
        console.log(this.birthDateJson);

        // Calling usersService to create a new user
        usersService.create(this.firstName, this.lastName, this.birthDateJson, this.gender, this.email, this.password)
          .then(result => {
            // Redirecting to login page on successful registration
            console.log("Auth - go to login")

            // Navigates to the new path
            this.$router.push("/Login")
          })
          .catch(error => {
            // Displaying error message on registration failure
            this.$refs.customAlert.showAlert('Invalid Credentials.');
            this.error = error
            this.loading = false
          });
      }
      else {
        // Highlight the consent tick
        this.redo = true;
      }
    },
    // Formatting birth date input
    formatBirthDate() {
      // Reformatting birth date input to DD/MM/YYYY format
      let cleanedInput = this.birthDate.replace(/\D/g, "");
      let formattedInput = cleanedInput.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
      this.birthDate = formattedInput;
    },
    // Toggling password visibility
    togglePasswordVisibility() {
      // Toggling password input visibility
      const input = this.$refs.passwordInput;
      input.type = this.showPassword ? "password" : "text";
      this.showPassword = !this.showPassword;
    },
  },
  components: {
    CustomAlert
  },
};
</script>

<style></style>