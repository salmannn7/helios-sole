<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <div class="w-full">
    <div class="p-6 w-full relative">
      <!-- Product carousel -->
      <div class="bg-white mb-6 p-6">
        <div class="grid grid-rows-2 justify-center">
          <p class="font-sans font-bold text-4xl text-center">{{ "Hi " + firstName + "! Welcome To Your Dashboard." }}
          </p>
          <p class="font-sans text-3xl text-center">Here Are Some Sneakers For You</p>
        </div>
        <!-- Product carousel container -->
        <div class="w-full h-auto grid grid-cols-14 gap-6 bg-white overflow-auto py-6" v-if="carousel.length">
          <!-- Button to navigate to the previous recommendations -->
          <div class="text-black text-6xl justify-center place-items-center flex h-full w-full text-center">
            <button @click="carouselFunc(-3)"
              class="cursor-pointer hover:scale-150 hover:text-red-500 duration-150">&lt;</button>
          </div>
          <!-- Product cards -->
          <div class="w-full h-68 bg-white flex items-center relative shadow-xl col-span-4 opacity-0"
            :class="{ 'product-fade-in': submitted = true }" v-for="(product, index) in carousel"
            :key="product.product_id" :style="{ 'animation-delay': `${index * 0.1}s` }">
            <!-- Product image -->
            <img class="w-full h-auto max-h-full"
              :src="'/src/resources/Sneaker-Images/' + product.product_code + '.png'">
            <!-- Overlay with product details -->
            <div class="overlay">
              <!-- Product details -->
              <div class="w-full h-full grid grid-rows-9 p-4 text-white">
                <router-link class="row-span-2" :to="'/Product/' + product.product_id">
                  <div></div>
                </router-link>
                <router-link :to="'/Product/' + product.product_id">
                  <p class="text-lg self-center">{{ product.product_name }}</p>
                </router-link>
                <router-link :to="'/Product/' + product.product_id">
                  <p class="text-md self-center">{{ product.product_colourway }}</p>
                </router-link>
                <router-link :to="'/Product/' + product.product_id">
                  <p class="text-sm self-center">{{ product.type + "'s Shoes" }}</p>
                </router-link>
                <router-link :to="'/Product/' + product.product_id">
                  <p class="text-lg self-center">{{ '£' + product.median_price }}</p>
                </router-link>
                <!-- Favorite button -->
                <div class="justify-center place-items-start w-full h-full grid grid-cols-6">
                  <button @click.stop="handleFavorite(product)" id="customIconButton"
                    class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center">
                    <span class="material-icons-outlined text-2xl">{{ isFavourite(product) ? 'favorite' :
            'favorite_border' }}</span>
                  </button>
                  <router-link :to="'/Product/' + product.product_id" class="w-full h-full col-span-5"></router-link>
                </div>
                <router-link class="row-span-2" :to="'/Product/' + product.product_id">
                  <div></div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- Button to navigate to the next recommendations -->
          <div class="text-black text-6xl justify-center place-items-center flex h-full w-full text-center">
            <button @click="carouselFunc(3)"
              class="cursor-pointer hover:scale-150 hover:text-red-500 duration-150">></button>
          </div>
        </div>
      </div>
      <!-- Orders and account settings -->
      <div class="w-full h-auto bg-white">
        <!-- Toggle divs button -->
        <div class="w-full h-auto justify-center p-6 grid grid-cols-2 gap-6">
          <!-- Toggle orders div button -->
          <button @click="toggleWindow(1)"
            class="w-full h-64 bg-white hover:bg-red-500 transition duration-150 ease-in-out shadow-xl"
            :class="{ 'outline outline-2 outline-red-500': windowShow == 1, 'outline-none': windowShow != 1 }">
            <span class="material-symbols-outlined text-4xl">&#xeb14;</span>
            <p class="text-xl">Orders</p>
          </button>
          <!-- Toggle account settings div button -->
          <button @click="toggleWindow(2)"
            class="w-full h-64 bg-white hover:bg-red-500 transition duration-150 ease-in-out shadow-xl"
            :class="{ 'outline outline-2 outline-red-500': windowShow == 2, 'outline-none': windowShow != 2 }">
            <span class="material-icons-outlined text-4xl">&#xe8b8;</span>
            <p class="text-xl">Account Settings</p>
          </button>
        </div>
        <!-- Orders div -->
        <div v-if="windowShow === 1" class="w-full h-auto justify-center p-6">
          <!-- Div title -->
          <p class="font-sans font-bold text-2xl mb-1">Orders</p>
          <!-- No orders div -->
          <div v-if="!orders.length"
            class="w-full h-64 bg-zinc-300 overflow-auto px-1 shadow-md flex items-center justify-center">
            <p>No Items Ordered...</p>
          </div>
          <!-- Orders -->
          <div class="w-full h-auto max-h-64 bg-zinc-300 overflow-auto px-1 shadow-md">
            <div v-for="(orderGroup, groupIndex) in orders" :key="`group_${groupIndex}`">
              <router-link :to="'/Order/' + orderGroup[0].grouping">
                <button class="w-full h-auto bg-white shadow-xl my-1 p-2">
                  <!-- Order icon and order number -->
                  <div class="flex items-center">
                    <span class="material-symbols-outlined text-2xl mx-1">orders</span>
                    <p class="text-xl">{{ "Order No: " + orderGroup[0].grouping }}</p>
                  </div>
                  <!-- Ordered products -->
                  <div class="px-6">
                    <div v-for="(order, orderIndex) in orderGroup" :key="`order_${groupIndex}_${orderIndex}`">
                      <div class="w-full h-auto bg-white shadow-xl flex items-center my-1 p-2">
                        <!-- Product image -->
                        <router-link :to="'/Product/' + order.product_id" class="w-auto h-full flex items-center mr-2">
                          <img class="w-auto h-32 max-w-full"
                            v-bind:src="'/src/resources/Sneaker-Images/' + products[order.product_id - 1].product_code + '.png'">
                        </router-link>
                        <!-- Product details -->
                        <div class="text-start">
                          <p class="text-xl">{{ products[order.product_id - 1].product_name }}</p>
                          <p class="text-lg">{{ products[order.product_id - 1].product_colourway }}</p>
                          <p class="text-md">{{ products[order.product_id - 1].type + "'s Shoes" }}</p>
                          <p class="text-md">{{ "Size: " + order.size }}</p>
                          <p class="text-md">{{ "Style: " + products[order.product_id - 1].product_code }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- Account settings div -->
        <div v-if="windowShow === 2" class="w-full h-auto justify-center p-6">
          <!-- Div title -->
          <p class="font-sans font-bold text-2xl mb-1">Account Settings</p>
          <!-- Account settings -->
          <div class="w-full h-auto grid grid-cols-3">
            <!-- First details column -->
            <div class="grid grid-rows-2 truncate text-lg w-full h-full">
              <div>
                <p class="capitalize font-bold">First Name:</p>
                <!-- Changable First Name -->
                <p @click="Change('First Name', 'firstName')"
                  class="capitalize cursor-pointer text-black hover:text-red-500">{{ user.first_name }}</p>
              </div>
              <div>
                <p class="capitalize font-bold">Birthdate:</p>
                <p class="capitalize">{{ user.birth_date }}</p>
              </div>
            </div>
            <!-- Second details column -->
            <div class="grid grid-rows-2 truncate text-lg w-full h-full">
              <div>
                <p class="capitalize font-bold">Last Name:</p>
                <!-- Changable Last Name -->
                <p @click="Change('Last Name', 'lastName')"
                  class="capitalize cursor-pointer text-black hover:text-red-500">{{ user.last_name }}</p>
              </div>
              <div>
                <p class="capitalize font-bold">Gender:</p>
                <p class="capitalize">{{ user.gender }}</p>
              </div>
            </div>
            <!-- Third details column -->
            <div class="grid grid-rows-2 truncate text-lg w-full h-full">
              <div>
                <p class="capitalize font-bold">Email:</p>
                <p class="capitalize">{{ user.email }}</p>
              </div>
              <div>
                <p class="capitalize font-bold">Password:</p>
                <!-- Changable Password -->
                <p @click="Change('Password', 'password')"
                  class="capitalize cursor-pointer text-black hover:text-red-500">Change Password</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Logout button -->
        <div class="w-full h-full flex items-center justify-center p-6">
          <button class="text-white text-xl rounded-full bg-black px-4 py-2" v-on:click=handleSubmit(e)>Logout</button>
        </div>
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
import { productsService } from '../../services/products.service';
import { favouritesService } from '../../services/favourites.service';
import { fetchRecommendations } from '../automations/RecommendationSystem';
import { ordersService } from '../../services/orders.service';
import CustomAlert from '../components/CustomAlert.vue';
import ChangeDetail from '../components/ChangeDetail.vue';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      user: {},
      products: [],
      carousel: [],
      recommendations: [],
      favourites: [],
      orders: [],
      iniOrders: [],
      Grouping: [],
      firstName: "",
      loggedin: null,
      error: "",
      loading: null,
      submitted: false,
      submittedCarousel: false,
      iter: 0,
      windowShow: 0,
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

    // Checks if any details have changed when the page loads up
    const detailsChanged = localStorage.getItem('detailsChanged');

    if (detailsChanged === 'true') {
      // Displays an alert if details have been changed
      this.$refs.customAlert.showAlert('Details Updated.');
    }

    // Checks if has just logged in when the page loads up
    const loggedInSuccess = localStorage.getItem('loggedInSuccess');

    if (loggedInSuccess === 'true') {
      // Displays an alert if details have been changed
      this.$refs.customAlert.showAlert('Login Successful.');
    }
    console.log(detailsChanged)

    // Gets the user ID from the account logged in
    this.loggedin = localStorage.getItem('user_id');

    // Fetches the user's first name
    usersService.getOne(this.loggedin)
      .then((user) => {
        this.user = user;
        this.firstName = this.user['first_name'];
        console.log(this.firstName)
      })
      .catch((error) => this.error = error);

    // All the methods initialised
    this.fetchRecommendationsForUser();
    this.fetchProducts();
    this.fetchOrders();
  },
  methods: {
    // Handles the logging out of the user
    handleSubmit(e) {
      // Wipes out any previous error messages
      this.error = ""

      // Logs the user out and takes them to the home page
      usersService.logout()
        .then(result => {
          console.log("Logging Out")
          this.$router.push("/")
        })
        .catch(error => {
          this.error = error
          this.loading = false
        });
    },
    // Fetches recommendations for the logged-in user asynchronously
    async fetchRecommendationsForUser() {
      // Get the user ID from the logged-in user
      const userId = this.loggedin;

      try {
        // Fetch recommendations for the user using the user ID
        this.recommendations = await fetchRecommendations(userId);
        console.log(this.recommendations)

        // Displays the fetched recommendations in the carousel
        this.carouselFunc(0);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    },
    // Handles carousel functionality
    carouselFunc(direction) {
      // Sets submittedCarousel to true to indicate carousel function execution
      this.submittedCarousel = true;

      // Calculates the new index for the carousel
      let newIndex = (this.iter + direction) % this.recommendations.length;
      if (newIndex < 0) {
        newIndex += this.recommendations.length; // Adjust negative index to loop back
      }

      // Clears the carousel array
      this.carousel = [];

      // Populates the carousel array with recommendations
      for (let i = newIndex; i < newIndex + 3; i++) {
        const index = i % this.recommendations.length;
        this.carousel.push(this.recommendations[index]);
      }

      // Updates the iteration index
      this.iter = newIndex;

      // Sets submittedCarousel to false to indicate carousel function completion
      this.submittedCarousel = false;
    },
    // Fetches user's favorited products
    fetchFavourites() {
      // Fetches user's favorited products using their ID
      favouritesService.getUser(this.loggedin)
        .then(favourites => {
          // Stores fetched favorites in the favourites array
          this.favourites = favourites;
          this.loading = false;

          // Iterates over each favorite to fetch their corresponding product details
          for (let x = 0; x < this.favourites.length; x++) {
            // Fetches product details for each favorite
            productsService.getOne(this.favourites[x].product_id)
              .then(product => {
                // Stores fetched product details in favProducts array
                this.favProducts.push(product);
                this.loading = false;
              })
              .catch(error => this.error = error);
          }
        })
        .catch(error => this.error = error);
    },
    // Method to check if a product is in favorites
    isFavourite(product) {
      return this.favourites.some(favourite => favourite.product_id === product.product_id);
    },
    // Adds or removes a product from favorites
    handleFavorite(product) {
      // Finds the favorite object for the given product
      const favourite = this.favourites.find(favourite => favourite.product_id === product.product_id);
      if (this.isFavourite(product)) {
        // If the product is already a favorite, remove it
        favouritesService.deleteFavourite(favourite.favourite_id)
          .then(result => {
            console.log("Removed from favorites");
            // Removes the product from the favorites list
            this.favourites = this.favourites.filter(fav => fav.product_id !== product.product_id);
            this.fetchFavourites(); // Refreshes favorites
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
          });
      } else {
        // If the product is not a favorite, add it
        console.log("its working")
        favouritesService.create(product.product_id, this.loggedin)
          .then(result => {
            console.log("Added to favorites");
            // Adds the product to the favorites list
            this.favourites.push({ product_id: product.product_id });
            this.fetchFavourites(); // Refreshes favorites
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
          });
      }
    },
    // Fetches all orders that the user has ordered
    fetchOrders() {
      // Uses the user ID to fetch their orders
      ordersService.getUser(this.loggedin)
        .then(orders => {
          // Stores the orders into the initial orders array
          this.iniOrders = orders;

          // Groups each orders's grouping property (order number) and puts it in the grouping array
          for (let i = 0; i < this.iniOrders.length; i++) {
            this.Grouping.push(this.iniOrders[i].grouping);
          }

          // Creates an array called unique containing only the unique numbers from the Grouping array
          let unique = [...new Set(this.Grouping)];
          for (let x = 0; x < unique.length; x++) {
            // Fetches orders grouped by their unique order numbers
            ordersService.getGroup(unique[x])
              .then(order => {
                // Adds the fetched order group to the orders array
                this.orders.push(order);
                console.log(this.orders)
              })
              .catch(error => this.error = error);
          }
        })
        .catch(error => this.error = error);
    },
    // Fetches all products
    fetchProducts() {
      productsService.getAll()
        .then(products => {
          // Set the products array to contain all fetched products
          this.products = products;
        })
        .catch(error => this.error = error)
    },
    // Triggers a change event with a message and detail that is used to determine the what user detail to change
    Change(message, detail) {
      // Pop up appearing with the requested user detail that can be changed
      this.$refs.ChangeDetail.Show(message, detail);
    },
    // Toggles between the orders div and the account settings div using the window parameter
    toggleWindow(window) {
      // If the clicked window is already open, close it by setting windowShow to 0
      if (this.windowShow === window) {
        this.windowShow = 0;
      } else {
        // Otherwise, open the clicked window by setting windowShow accordingly
        this.windowShow = window;
      }
    },
  },
  components: {
    CustomAlert,
    ChangeDetail
  },
};
</script>

<style></style>