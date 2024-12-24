<template>
  <!-- Blacked out foreground -->
  <div v-if="show" class="custom-alert-overlay z-50">
    <!-- Pop up window -->
    <div class="custom-alert text-center rounded-md grid w-[32rem] h-auto divide-y-2 divide-[#e0e0e0]">
      <!-- Change details div -->
      <div class="h-full w-full justify-center items-center">
        <!-- Div title -->
        <p class="mt-6 mb-4 font-sans text-lg">{{ "Change Your " + message + " Here:" }}</p>
        <!-- First name / last name input -->
        <div class="w-full px-6" v-if="detail !== 'password' && detail !== 'forgotPassword'">
          <input :type="inputType" :name="inputType" v-model="inputValue" :placeholder="'Enter ' + message + '...'"
            class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
          <div class="mb-2 text-red-700 text-sm" v-show="submitted && !inputValue">{{ message + " is Required" }}</div>
        </div>
        <!-- Change password inputs -->
        <div class="w-full px-6" v-if="detail === 'password' || detail === 'forgotPassword'">
          <!-- Email input -->
          <div v-if="detail === 'forgotPassword'">
            <input type="email" name="email" v-model="email" placeholder="Enter Email..."
              class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            <div class="mb-2 text-red-700 text-sm" v-show="submitted && !email">Email is Required</div>
          </div>
          <!-- Password input -->
          <div>
            <input ref="passwordInput" type="password" name="password" v-model="password"
              placeholder="Enter Password..."
              class="mb-2 text-lg w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            <!-- Password visibility toggle -->
            <button id="customIconButton"
              class="absolute translate-x-[-2.5rem] translate-y-[0.25rem] text-xl hover:scale-150 hover:text-red-500 duration-150 text-center mr-4 ml-2"
              @click="togglePasswordVisibility">
              <span class="material-icons-outlined text-2xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
          <div class="mb-2 text-red-700 text-sm" v-show="submitted && !password">Password is Required</div>
          <!-- Retype password input -->
          <div>
            <input ref="retypePasswordInput" type="password" name="retypePassword" v-model="retypePassword"
              placeholder="Retype Password..."
              class="mb-2 text-lg w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            <!-- Password visibility toggle -->
            <button id="customIconButton"
              class="absolute translate-x-[-2.5rem] translate-y-[0.25rem] text-xl hover:scale-150 hover:text-red-500 duration-150 text-center mr-4 ml-2"
              @click="toggleRetypePasswordVisibility">
              <span class="material-icons-outlined text-2xl">{{ showRetypePassword ? 'visibility_off' : 'visibility'
                }}</span>
            </button>
            <div class="mb-2 text-red-700 text-sm" v-show="submitted && !retypePassword">Retype Password is Required
            </div>
          </div>
        </div>
      </div>
      <!-- Buttons div -->
      <div class="h-auto w-full grid grid-cols-2 divide-x-2 divide-[#e0e0e0]">
        <!-- Change button -->
        <button class="font-sans w-full h-auto flex items-center justify-center" @click="handleSubmit()">
          <p class="my-4">Change</p>
        </button>
        <!-- Cancel button -->
        <button class="font-sans w-full h-auto flex items-center justify-center" @click="Cancel()">
          <p class="my-4">Cancel</p>
        </button>
      </div>
    </div>
  </div>
  <!-- Alert component -->
  <custom-alert ref="customAlert"></custom-alert>
</template>

<script>
// Importing necessary modules and services
import { usersService } from '../../services/users.service';
import CustomAlert from './CustomAlert.vue';

export default {
  data() {
    return {
      // Data properties
      show: false,
      submitted: false,
      user: [],
      users: [],
      message: "",
      detail: "",
      inputType: "",
      inputValue: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      retypePassword: "",
      loggedin: "",
      error: "",
      showPassword: false,
      showRetypePassword: false
    };
  },
  methods: {
    // Displays the change detail pop up
    Show(message, detail) {
      // Sets the exported message and detail to be displayed
      this.message = message;
      this.detail = detail;

      // Checks if the detail is not 'password'
      if (this.detail !== 'password') {
        // Sets the input type to the detail type
        this.inputType = this.detail;
      }
      else {
        // Resets input type if detail is 'password'
        this.inputType = null;
      }

      // Displays the change detail pop up
      this.show = true;
      console.log(this.inputType)

      // Disables scrolling of the website when message popup is displayed
      document.body.style.overflow = 'hidden';
    },
    // Closes the change detail popup
    Cancel() {
      // Closes the change detail popup
      this.show = false;

      // Resets form input values and states
      this.submitted = false;
      this.inputType = "";
      this.inputValue = "";
      this.password = "";
      this.retypePassword = "";

      // Enables the scrolling of the website
      document.body.style.overflow = '';
    },
    // Changes the user details
    handleSubmit() {
      // Sets submitted to true to indicate the changing of user details
      this.submitted = true
      // Handles the change details scenario based on the detail type
      if (this.detail === 'forgotPassword') {
        // Handles forgot password
        if (this.password === "" || this.retypePassword === "" || this.email === "") {
          // Displays an alert if there is either no password, retype password, or email inputted
          this.$refs.customAlert.showAlert('Fill In Email & Password.');
        }
        else {
          // Checks if passwords match
          if (this.retypePassword === this.password) {
            console.log("Password Ready")
            // Calls the forgot password method to initialise the changing of the password when the user is not logged in
            this.forgotPassword(this.email, this.password);
          }
          else {
            // Displays an alert if the password and retype password inputs don't match
            this.$refs.customAlert.showAlert('Passwords Need to Match.');
          }
        }
      }
      else {
        // Handling other detail changes like first name, last name, or password (When the user is logged in)
        // Gets the user ID from the account logged in
        this.loggedin = localStorage.getItem('user_id');

        // Fetches the user details using the user ID
        usersService.getOne(this.loggedin)
          .then(user => {
            this.user = user;
            // Gets the user ID, first name, and last name from the user object
            const { user_id, first_name, last_name } = this.user;

            if (this.detail === 'firstName') {
              // Handles first name change
              if (this.inputValue === "") {
                // Displays an alert if there is no first name inputted
                this.$refs.customAlert.showAlert('Fill In First Name.');
              }
              else {
                console.log("First Name Ready")
                // Sets the first name to the input value
                this.firstName = this.inputValue;

                // Calls the change detail method, inputting the changed first name but leaving the rest as the same
                this.changeDetail(user_id, this.firstName, last_name, null)
              }
            }
            else if (this.detail === 'lastName') {
              // Handles last name change
              if (this.inputValue === "") {
                // Displays an alert if there is no last name inputted
                this.$refs.customAlert.showAlert('Fill In Last Name.');
              }
              else {
                console.log("Last Name Ready")
                // Sets the last name to the input value
                this.lastName = this.inputValue;

                // Calls the change detail method, inputting the changed last name but leaving the rest as the same
                this.changeDetail(user_id, first_name, this.lastName, null)
              }
            }
            else if (this.detail === 'password') {
              // Handles password change
              if (this.password === "" || this.retypePassword === "") {
                // Displays an alert if there is either no password, or no retype password inputted
                this.$refs.customAlert.showAlert('Fill In Password.');
              }
              else {
                // Checks if passwords match
                if (this.retypePassword === this.password) {
                  console.log("Password Ready")
                  // Calls the change detail method, inputting the changed password but leaving the rest as the same
                  this.changeDetail(user_id, first_name, last_name, this.password)
                }
                else {
                  // Displays an alert if the password and retype password inputs don't match
                  this.$refs.customAlert.showAlert('Passwords Need to Match.');
                }
              }
            }
          })
          .catch(error => this.error = error)
      }
    },
    // Toggling password visibility
    togglePasswordVisibility() {
      // Toggling password input visibility
      const input = this.$refs.passwordInput;
      input.type = this.showPassword ? "password" : "text";
      this.showPassword = !this.showPassword;
    },
    // Toggling retype password visibility
    toggleRetypePasswordVisibility() {
      // Toggling retype password input visibility
      const input = this.$refs.retypePasswordInput;
      input.type = this.showRetypePassword ? "password" : "text";
      this.showRetypePassword = !this.showRetypePassword;
    },
    // Changes user details that is either the first name, last name, or password when logged in
    changeDetail(id, firstName, lastName, password) {
      console.log(id, firstName, lastName, password)
      // Updates user details
      usersService.edit(id, firstName, lastName, password)
        .then(result => {
          console.log("Update Success")
          // Sets an item in local storage to indicate that a user detail has changed
          localStorage.setItem('detailsChanged', 'true');

          // Refreshes the page
          location.reload();
        })
        .catch(error => this.error = error)
    },
    // Changes the password if the user is trying to login but has forgotten the password
    forgotPassword(email, password) {
      // Fetches all users
      usersService.getAll()
        .then(users => {
          this.users = users;
          // Finds the user based on the inputted email
          const user = this.users.find(user => user.email === email);

          // Handles the password change if the email has been validation
          if (user) {
            // Gets the user details that won't be changed
            const { user_id, first_name, last_name } = user;

            // Updates the password of the user while keeping every other detail the same
            usersService.edit(user_id, first_name, last_name, password)
              .then(result => {
                console.log("Update Success")
                // Sets an item in local storage to indicate that the user's password has changed
                localStorage.setItem('passwordChanged', 'true');

                // Refreshes the page
                location.reload();
              })
              .catch(error => this.error = error)
          } else {
            // Displays an alert if the email is not validated
            this.$refs.customAlert.showAlert('Email Invalid.');
          }
        })
        .catch(error => this.error = error)
    }
  },
  components: {
    CustomAlert
  }
};
</script>

<style scoped>
.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-alert {
  background-color: white;
  color: black;
}

.custom-alert button {
  color: black;
  cursor: pointer;
}
</style>