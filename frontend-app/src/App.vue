<template>
  <!-- Navigation section -->
  <div>
    <nav class="relative h-auto z-50">
      <!-- Top navigation bar -->
      <div class="fixed w-full">
        <div class="w-full h-8 bg-gray-100">
          <div class="grid grid-cols-5">
            <div class="col-span-4"></div>
            <div class="flex justify-end">
              <!-- User name and profile / login link -->
              <router-link class="h-full w-auto flex items-center" to="/Dashboard">
                <p class="font-sans font-bold text-sm text-end">{{ userName + firstName }}</p>
              </router-link>
              <!-- Button for the Dashboard -->
              <router-link class="h-full w-auto flex items-center" to="/Dashboard">
                <button id="customIconButton"
                  class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center mr-4 ml-2">
                  <span class="material-icons-outlined text-2xl">&#xe853;</span>
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- Product categories and search -->
        <div class="bg-white h-28 grid grid-cols-3 place-items-start">
          <div class="w-full h-28 pl-6">
            <div class="h-full w-28">
              <router-link class="h-full w-full" to="/">
                <!-- The logo(s) -->
                <img v-if="logo == 0" @mouseenter="change(1)" class="product-fade-in" id="logo"
                  src="/src/resources/Logo.png" draggable="false">
                <img v-if="logo == 1" @mouseleave="change(0)" class="product-fade-in" id="logo"
                  src="/src/resources/Logo2.png" draggable="false">
              </router-link>
            </div>
          </div>
          <!-- Product category links -->
          <div class="col-span-1 w-full h-full grid grid-cols-5">
            <!-- Each category link -->
            <div class="w-full h-full justify-center place-items-center flex">
              <!-- Info Button -->
              <span @click="PopUp()"
                class="material-icons-outlined text-lg cursor-pointer hover:scale-150 hover:text-red-500 duration-150 mr-0.5 translate-y-[-2.5%]">&#xe88e;</span>
              <router-link
                class="font-sans font-bold text-lg hover:scale-150 hover:text-red-500 duration-150 w-full h-8 text-center"
                to="/Products?type=Featured">
                <p>Featured</p>
              </router-link>
            </div>
            <div class="w-full h-full justify-center place-items-center flex">
              <router-link
                class="font-sans font-bold text-lg hover:scale-150 hover:text-red-500 duration-150 w-full h-8 text-center"
                to="/Products?type=Men">
                <p>Men</p>
              </router-link>
            </div>
            <div class="w-full h-full justify-center place-items-center flex">
              <router-link
                class="font-sans font-bold text-lg hover:scale-150 hover:text-red-500 duration-150 w-full h-8 text-center"
                to="/Products">
                <p>Women</p>
              </router-link>
            </div>
            <div class="w-full h-full justify-center place-items-center flex">
              <router-link
                class="font-sans font-bold text-lg hover:scale-150 hover:text-red-500 duration-150 w-full h-8 text-center"
                to="/Products">
                <p>Kids</p>
              </router-link>
            </div>
            <div class="w-full h-full justify-center place-items-center flex">
              <router-link
                class="font-sans font-bold text-lg hover:scale-150 hover:text-red-500 duration-150 w-full h-8 text-center"
                to="/Products?type=New">
                <p>New</p>
              </router-link>
            </div>
          </div>
          <!-- Search and cart buttons -->
          <div class="w-full h-full grid grid-cols-6">
            <!-- Search input -->
            <div class="col-span-3 flex items-center justify-end">
              <input @mouseover="AppearSearch()" @mouseleave="HideSearch()" v-model="searchQuery"
                @keyup.enter="searchProducts" id="search" type="text" placeholder="Search..."
                class="w-full h-8 px-2 rounded-full border border-black focus:outline-none focus:border-red-500 hidden">
            </div>
            <!-- Search button -->
            <div @mouseover="AppearSearch()" @mouseleave="HideSearch()"
              class="w-full h-full flex items-center justify-center">
              <button @click="searchProducts" id="customIconButton"
                class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center">
                <span class="material-icons-outlined text-3xl">&#xe8b6;</span>
              </button>
            </div>
            <!-- Favourites page button -->
            <div class="w-full h-full flex items-center justify-center">
              <router-link :to="'/Favourites/' + loggedin">
                <button id="customIconButton"
                  class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center">
                  <span class="material-icons-outlined text-3xl">{{ 'favorite_border' }}</span>
                </button>
              </router-link>
            </div>
            <!-- Baskets page button -->
            <div class="w-full h-full flex items-center justify-center">
              <router-link to="/Basket">
                <button id="customIconButton"
                  class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center">
                  <div v-if="cart > 0"
                    class="absolute w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <p class="text-sm text-white font-bold">{{ cart }}</p>
                  </div>
                  <span class="material-icons-outlined text-3xl">&#xe8cb;</span>
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- Alert component -->
        <custom-alert ref="customAlert"></custom-alert>
        <!-- Pop Up Message component -->
        <pop-up ref="popUpMessage"></pop-up>
      </div>
    </nav>
    <router-view />
    <!-- Footer -->
    <nav class="relative bottom-0 left-0 right-0 bg-black border-t border-gray-200 text-white font-sans">
      <!-- Footer content - NON-FUNCTIONAL -->
      <div class="max-w-screen-xl mx-auto px-4">
        <!-- The Logo -->
        <div class="w-full flex justify-center items-center">
          <img class="invert h-24 w-auto m-1" src="/src/resources/Logo.png" />
        </div>
        <!-- Rest of the Footer Content -->
        <div class="grid grid-rows-12 divide-y-2">
          <div class="row-span-11 grid grid-cols-4">
            <!-- Help Section -->
            <div class="w-full h-full grid grid-rows-11">
              <div class="w-full h-full flex items-center justify-center border-b-2">
                <p class="font-bold text-xl">Help</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Get Help</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Order Status</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Shipping and Delivery</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Returns</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Payment Options</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Contact Us</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Reviews</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Promo Codes Help</p>
              </div>
            </div>
            <!-- Company Section -->
            <div class="w-full h-full grid grid-rows-11">
              <div class="w-full h-full flex items-center justify-center border-b-2">
                <p class="font-bold text-xl">Company</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>About Helios Sole</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>News</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Careers</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Investors</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Sustainability</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Purpose</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>UK Tax</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>UK Pension</p>
              </div>
            </div>
            <!-- Policies Section -->
            <div class="w-full h-full grid grid-rows-11">
              <div class="w-full h-full flex items-center justify-center border-b-2">
                <p class="font-bold text-xl">Policies</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Guides</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Terms of Use</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Terms of Sale</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Company Details</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>UK Data Protection Act Disclosure</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>UK Modern Slavery Act Disclosure</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Privacy & Cookie Policy</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Cookie Settings</p>
              </div>
            </div>
            <!-- Miscellaneous Section -->
            <div class="w-full h-full grid grid-rows-11">
              <div class="w-full h-full flex items-center justify-center border-b-2">
                <p class="font-bold text-xl">Miscellaneous</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Gift Cards</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Stores</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Sole Stories</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Become a Member</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Student Discount</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Feedback</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Promo Codes</p>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <p>Recommandation System</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3">
            <!-- Location - NON-FUNCTIONAL -->
            <div class="w-full h-full flex items-center justify-center">
              <span class="material-icons-outlined text-xl mr-1">&#xe0c8;</span>
              <p class="">{{ Location }}</p>
            </div>
            <!-- Copyright Text -->
            <p class="self-center justify-self-center">© 2024 Helios Sole, Inc. All Rights Reserved</p>
            <!-- Contact Us Link - NON-FUNCTIONAL -->
            <div class="w-full h-full flex items-center justify-center">
              <span class="material-icons-outlined text-xl mr-1">&#xe80d;</span>
              <p class="">Contact Us</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// Importing necessary modules and services
import "../src/views/assets/MainCSS.css";
import { usersService } from './services/users.service';
import { cartService } from './services/cart.service';
import router from "./router/index";
import CustomAlert from './views/components/CustomAlert.vue';
import PopUpMessage from './views/components/PopUpMessage.vue';

export default {
  data() {
    return {
      // Data properties
      logo: 0,
      loggedin: null,
      user: {},
      items: [],
      error: "",
      firstName: "",
      userName: "",
      LoginLog: "",
      cart: 0,
      searchQuery: "",
      Location: "United Kingdom",
    }
  },
  methods: {
    // Method to switch logo image
    change(to) {
      this.logo = to;
    },
    // Method to show search input
    AppearSearch() {
      document.getElementById("search").classList.remove('hidden');
    },
    // Method to hide search input
    HideSearch() {
      document.getElementById("search").classList.add('hidden');
    },
    // Method to search for products
    searchProducts() {
      // Construct the path with query parameters
      const path = `/Products?search=${this.searchQuery}`;
      router.push(path);
    },
    // Triggers a custom message
    PopUp() {
      // A custom message appearing with info about the featured page
      this.$refs.popUpMessage.showMessage('This page is populated with recommendations tailored to your activity and those of other users who share similar interests.');
    },
  },
  mounted() {
    // Gets the user ID from the account logged in
    this.loggedin = localStorage.getItem('user_id');

    // Displays a login or register message if the user is not logged in
    if (this.loggedin === null) {
      this.userName = "Login / Register";
    } else {
      // Fetch user's first name if logged in
      usersService.getOne(this.loggedin)
        .then((user) => {
          this.user = user;
          this.firstName = this.user['first_name'] + "!";
          this.userName = "Welcome Back ";
          console.log(this.firstName)
        })
        .catch((error) => this.error = error);
    }

    // Fetch cart items for the user to be used for display
    cartService.getUser(this.loggedin)
      .then(items => {
        this.items = items
        this.cart = this.items.length
      })
      .catch(error => {
        this.error = error;
      })
  },
  components: {
    CustomAlert,
    'pop-up': PopUpMessage,
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
</style>
