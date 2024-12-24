<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <div class="w-full">
    <!-- Cart div -->
    <div class="p-6 w-full h-full grid grid-cols-3 gap-6">
      <!-- Products div -->
      <div class="p-6 w-full h-96 bg-white col-span-2 grid grid-rows-8">
        <!-- Div title -->
        <p class="font-sans font-bold text-3xl">Bag</p>
        <!-- No products in cart div -->
        <div class="w-full bg-zinc-300 row-span-7 flex items-center justify-center shadow-md" v-if="!items.length">
          <p>No Items in Bag</p>
        </div>
        <!-- Products -->
        <div class="w-full bg-zinc-300 row-span-7 pt-1 px-1 overflow-auto shadow-md" v-if="items.length">
          <div class="w-full h-[16.25rem] bg-white mb-1 p-4 grid grid-cols-2" v-for="item in items" :key="item.cart_id">
            <!-- Product image -->
            <router-link :to="'/Product/' + item.product_id" class="w-full h-full flex items-center">
              <img class="w-auto h-full max-h-[14.25rem] max-w-full"
                v-bind:src="'/src/resources/Sneaker-Images/' + products[item.product_id - 1].product_code + '.png'">
            </router-link>
            <!-- Product details -->
            <div class="w-full h-full">
              <p class="font-sans font-bold text-3xl">{{ products[item.product_id - 1].product_name }}</p>
              <p class="text-2xl">{{ products[item.product_id - 1].product_colourway }}</p>
              <p class="text-lg">{{ products[item.product_id - 1].type + "'s Shoes" }}</p>
              <p class="text-xl">{{ "£" + item.price }}</p>
              <!-- Size selection -->
              <div class="flex items-center">
                <p class="font-sans text-xl mr-2 flex self-center justify-self-center cursor-pointer">Size:</p>
                <input
                  class="h-6 w-16 shadow-md rounded-lg flex items-center justify-center cursor-pointer overflow-y-scroll px-2"
                  type="number" v-model="item.size" min="6" max="14" :step="item.stepIncrement" />
              </div>
              <!-- Quantity selection -->
              <div class="flex items-center">
                <p class="font-sans text-xl mr-2 flex self-center justify-self-center cursor-pointer">Quantity:</p>
                <input
                  class="h-6 w-16 shadow-md rounded-lg flex items-center justify-center cursor-pointer overflow-y-scroll px-2"
                  type="number" v-model="item.quantity" min="1" max="99" step="1" />
              </div>
              <!-- Item removal button -->
              <div class="w-full h-auto col-span-5 py-1">
                <button class="text-white text-lg rounded-full px-2 py-1 w-full bg-black"
                  v-on:click=handleSubmit(item.cart_id)>Remove Item</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Summary div -->
      <div class="p-6 w-full h-96 bg-white grid grid-rows-8">
        <!-- Div title -->
        <p class="font-sans font-bold text-3xl">Summary</p>
        <!-- Summary -->
        <div class="w-full h-full row-span-7 grid grid-rows-5 divide-black divide-y-2">
          <!-- Subtotal and other costs -->
          <div class="row-span-4 grid grid-rows-5 font-sans text-xl">
            <!-- Subtotal -->
            <div class="flex items-center">
              <p>{{ "Subtotal: " + formattedSubtotal }}</p>
            </div>
            <!-- Promo label -->
            <div class="flex items-end">
              <p>Promo:</p>
            </div>
            <!-- Promo input - NON-FUNCTIONAL -->
            <div class="flex items-start">
              <input type="text" placeholder="Enter Promo..."
                class="w-full h-8 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            </div>
            <!-- Discount via promo -->
            <div class="flex items-center">
              <p>{{ "Discount: " + formattedDiscount }}</p>
            </div>
            <!-- Estimated delivery -->
            <div class="flex items-center">
              <p>{{ "Estimated Delivery: " + delivery }}</p>
            </div>
          </div>
          <!-- Total -->
          <div class="flex items-center font-sans text-xl">
            <p>{{ "Total: " + formattedTotal }}</p>
          </div>
          <!-- Checkout button -->
          <div class="py-1">
            <button @click="Checkout()" id="customIconButton"
              class="text-xl text-white font-bold bg-black hover:bg-red-500 duration-150 text-center h-full w-full rounded-full">
              <p>Checkout</p>
            </button>
          </div>
          <!-- Paypal alternative button -->
          <div class="py-1">
            <a href="https://www.paypal.com">
              <button id="customIconButton"
                class="bg-white hover:bg-red-500 duration-150 text-center h-full w-full flex justify-center rounded-full shadow-md">
                <img class="h-5 w-auto m-1" src="/src/resources/PayPal.png" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Product carousel -->
    <div class="bg-white mb-6 p-6">
      <!-- Title for the recommendations carousel -->
      <p class="font-sans font-bold text-3xl">You Also May Like:</p>
      <!-- Product carousel container -->
      <div class="w-full h-92 grid grid-cols-14 gap-6 bg-white overflow-auto py-6" v-if="carousel.length">
        <!-- Button to navigate to the previous recommendations -->
        <div class="text-black text-6xl justify-center place-items-center flex h-full w-full text-center">
          <button @click="carouselFunc(-3)"
            class="cursor-pointer hover:scale-150 hover:text-red-500 duration-150">&lt;</button>
        </div>
        <!-- Product cards -->
        <div class="w-full h-full bg-white flex items-center relative shadow-xl col-span-4 opacity-0"
          :class="{ 'product-fade-in': submitted = true }" v-for="(product, index) in carousel"
          :key="product.product_id" :style="{ 'animation-delay': `${index * 0.1}s` }">
          <!-- Product image -->
          <img class="w-full h-auto max-h-full" :src="'/src/resources/Sneaker-Images/' + product.product_code + '.png'">
          <!-- Overlay with product details -->
          <div class="overlay">
            <!-- Product details -->
            <div class="w-full h-full grid grid-rows-9 p-4 text-white">
              <router-link class="row-span-2" :to="'/Product/' + product.product_id">
                <div></div>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-xl self-center">{{ product.product_name }}</p>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-lg self-center">{{ product.product_colourway }}</p>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-md self-center">{{ product.type + "'s Shoes" }}</p>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-xl self-center">{{ '£' + product.median_price }}</p>
              </router-link>
              <!-- Favorite button -->
              <div class="justify-center place-items-start w-full h-full grid grid-cols-6">
                <button @click.stop="handleFavorite(product)" id="customIconButton"
                  class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center">
                  <span class="material-icons-outlined text-3xl">{{ isFavourite(product) ? 'favorite' :
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
    <!-- Alert component -->
    <custom-alert ref="customAlert"></custom-alert>
  </div>
</template>

<script>
// Importing necessary modules and services
import { fetchRecommendations } from '../automations/RecommendationSystem';
import { fetchRelatedItemsForProducts } from '../automations/RecommendationSystem';
import { productsService } from '../../services/products.service';
import { favouritesService } from '../../services/favourites.service';
import { cartService } from '../../services/cart.service';
import CustomAlert from '../components/CustomAlert.vue';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      products: [],
      items: [],
      favProducts: [],
      favourites: [],
      carousel: [],
      recommendations: [],
      size: 6,
      stepIncrement: 0.5,
      loggedin: null,
      subtotal: 0,
      discount: 0,
      delivery: "Free",
      total: 0,
      iter: 0
    };
  },
  computed: {
    // Method to format the subtotal amount with pound symbol (£), two decimal places, and comma separators for thousands
    formattedSubtotal() {
      // Converts the subtotal to a string with two decimal places
      // Replaces each digit followed by groups of three digits (before the decimal point) with the same digit followed by a comma
      return "£" + this.subtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    // Method to format the discount amount with pound symbol (£), two decimal places, and comma separators for thousands
    formattedDiscount() {
      // Converts the discount to a string with two decimal places
      // Replaces each digit followed by groups of three digits (before the decimal point) with the same digit followed by a comma
      return "£" + this.discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    // Method to format the total amount with pound symbol (£), two decimal places, and comma separators for thousands
    formattedTotal() {
      // Converts the total to a string with two decimal places
      // Replaces each digit followed by groups of three digits (before the decimal point) with the same digit followed by a comma
      return "£" + this.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  },
  mounted() {
    // Reloading the page to clear data on refresh
    if (localStorage.getItem('reloaded')) {
      localStorage.removeItem('reloaded');
    } else {
      localStorage.setItem('reloaded', '1');
      location.reload();
    }

    // Gets the user ID from the account logged in
    this.loggedin = localStorage.getItem('user_id');

    // Fetches all products
    productsService.getAll()
      .then(products => {
        this.products = products;
        this.loading = false;
      })
      .catch(error => this.error = error);

    // Fetches all items from user's cart
    cartService.getUser(this.loggedin)
      .then(items => {
        this.items = items;
        // Adds up all the items in cart's prices
        for (let x = 0; x < this.items.length; x++) {
          this.subtotal = this.subtotal + this.items[x].price
        }

        // Initially makes the total equal to the subtotal
        this.total = this.subtotal

        // Initialises the fetching of recommendations based on the user and the cart items
        this.fetchRecommendationsForUser(this.loggedin);
        this.loading = false;
      })
      .catch(error => this.error = error);
  },
  methods: {
    // Updates the step increment for selecting shoe size based on the shoe size value
    updateStepIncrement(item) {
      // Check if size is greater than 11 for the current item, then update step increment
      item.stepIncrement = item.size > 11 ? 1 : 0.5;
    },
    // Removes an item from the cart
    handleSubmit(id) {
      console.log(id)
      // Deletes the item from the cart
      cartService.deleteItem(id)
        .then(result => {
          console.log("Deletion Successful")
          // Displays an alert when the cart item is deleted
          this.$refs.customAlert.showAlert('Item Removed!');

          // Fetches the updated cart items after deletion
          cartService.getUser(this.loggedin)
            .then(items => {
              // Updates the cart items list
              this.items = items;

              // Resets the subtotal
              this.subtotal = 0;

              // Calculates the subtotal of the items in the cart
              for (let x = 0; x < this.items.length; x++) {
                this.subtotal = this.subtotal + this.items[x].price
              }

              // Sets the total equal to the subtotal
              this.total = this.subtotal
              this.loading = false;
            })
            .catch(error => this.error = error);
        })
        .catch(error => this.error = error);
    },
    // Takes the carted items to the checkout page
    Checkout() {
      // Checks if there are items in the cart
      if (this.items.length == 0) {
        // Displays an alert when there is no item in cart
        this.$refs.customAlert.showAlert('No Items in Bag.');
      }
      else {
        // Redirects to the checkout page if there are items in the cart
        this.$router.push("/Checkout")
      }
    },
    // Fetches recommendations for the logged-in user asynchronously
    async fetchRecommendationsForUser() {
      // Get the user ID from the logged-in user
      const userID = this.loggedin;

      try {
        // Fetch recommendations for the user using the user ID if there is nothing in the cart
        if (this.items.length === 0) {
          this.recommendations = await fetchRecommendations(userID);
        } else {
          // Fetch recommendations based on the items in cart
          this.recommendations = await fetchRelatedItemsForProducts(this.items);
        }
        console.log(this.recommendations)

        // Displays the fetched recommendations in the carousel
        this.carouselFunc(0);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    },
    // Handles carousel functionality
    carouselFunc(direction) {
      // Sets submitted to true to indicate carousel function execution
      this.submitted = true;

      // Calculates the new index for the carousel
      let newIndex = (this.iter + direction) % this.recommendations.length;
      if (newIndex < 0) {
        newIndex += this.recommendations.length;
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

      // Set submittedCarousel to false to indicate carousel function completion
      this.submitted = false;
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
            // Adds the product to the favorites list
            console.log("Added to favorites");
            this.favourites.push({ product_id: product.product_id });
            this.fetchFavourites(); // Refreshes favorites
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
          });
      }
    },
  },
  watch: {
    items: {
      // Watches for changes in the properties of carted items as well
      deep: true,
      // Executes the handler function when changes occur in the carted items
      handler(newItems) {
        // Iterates over each item in the updated items array
        newItems.forEach(item => {
          // Calls the update step increment method to update step increments for each item
          this.updateStepIncrement(item);
        });
      }
    }
  },
  components: {
    CustomAlert
  },
};
</script>

<style></style>