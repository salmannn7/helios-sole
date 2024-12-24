<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <div class="w-full">
    <!-- Product details container -->
    <div class="w-full relative">
      <!-- Main product information -->
      <div class="w-full h-auto p-6 grid grid-rows-3 divide-y-2 divide-zinc-300">
        <!-- Product image and details -->
        <div class="w-full h-auto bg-white items-center p-4 relative row-span-2 grid grid-cols-2">
          <!-- View count -->
          <div class="absolute top-4 left-4">
            <div class="flex items-center w-16 h-8">
              <span class="material-icons-outlined text-3xl">&#xe8f4;</span>
              <p class="ml-1 text-2xl pb-1">{{ viewAmount }}</p>
            </div>
          </div>
          <!-- Product image -->
          <img class="w-auto h-full max-h-90 max-w-full"
            v-bind:src="'/src/resources/Sneaker-Images/' + product.product_code + '.png'">
          <!-- Product details -->
          <div class="self-start p-2">
            <p class="text-lg">{{ product.type + "'s Shoes" }}</p>
            <p class="font-sans font-bold text-3xl">{{ product.product_name }}</p>
            <p class="text-xl">{{ product.product_colourway }}</p>
            <p class="text-xl">{{ "£" + priceChange }}</p>
            <!-- Size selection and quantity input -->
            <div class="w-full h-auto grid grid-cols-5 gap-2" v-if="sizes.length">
              <!-- Size selection buttons -->
              <div
                class="w-full h-8 shadow-md rounded-lg flex items-center justify-center hover:bg-red-500 transition duration-50 ease-in-out cursor-pointer"
                v-for="s in sizes" :key="s.id" @click="selectSize(s)"
                :class="{ 'bg-black': selectedSize === s.id, 'bg-white': selectedSize !== s.id }">
                <p :class="{ 'text-white': selectedSize === s.id, 'text-black': selectedSize !== s.id }">{{ s.size }}
                </p>
              </div>
              <!-- Quantity input -->
              <p class="font-sans text-xl flex self-center justify-self-center cursor-pointer">Quantity:</p>
              <input
                class="h-8 shadow-md rounded-lg flex items-center justify-center cursor-pointer overflow-y-scroll px-2"
                type="number" v-model="quantity" min="1" max="99" step="1" />
              <!-- Add to basket button -->
              <div class="w-full h-auto col-span-5">
                <button class="text-white text-xl rounded-full px-4 py-2 mt-2 w-full"
                  :class="{ 'bg-zinc-600': disableButton === true, 'bg-black': disableButton === false }"
                  v-on:click=handleSubmit() :disabled="disableButton">{{ MsgBtn + "Basket" }}</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Additional product information -->
        <div class="bg-white h-full w-full grid grid-cols-2">
          <!-- Description -->
          <div class="p-4">
            <p class="text-black font-bold text-xl">Description:</p>
            <p class="text-black text-lg">{{ description }}</p>
          </div>
          <!-- Further product details -->
          <div class="p-4 grid grid-rows-2">
            <div class="w-full h-full grid grid-cols-2">
              <div class="w-full h-full">
                <p class="text-xl font-bold">Manufacturer:</p>
                <p class="text-lg">{{ product.product_manufacturer }}</p>
              </div>
              <div class="w-full h-full">
                <p class="text-xl font-bold">Release Date:</p>
                <p class="text-lg">{{ product.release_date }}</p>
              </div>
            </div>
            <div class="w-full h-full grid grid-cols-2">
              <div class="w-full h-full">
                <p class="text-xl font-bold">Colours:</p>
                <p class="text-lg">{{ product.colours }}</p>
              </div>
              <div class="w-full h-full">
                <p class="text-xl font-bold">Style:</p>
                <p class="text-lg">{{ product.product_code }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Related products carousel -->
      <div class="px-6">
        <div class="bg-white mb-6 p-6">
          <p class="font-sans font-bold text-3xl">Related Sneakers</p>
          <div class="w-full h-auto grid grid-cols-14 gap-6 bg-white overflow-auto py-6" v-if="carousel.length">
            <!-- Left carousel navigation button -->
            <div class="text-black text-6xl justify-center place-items-center flex h-full w-full text-center">
              <button @click="carouselFunc(-3)"
                class="cursor-pointer hover:scale-150 hover:text-red-500 duration-150">&lt;</button>
            </div>
            <!-- Carousel items -->
            <div class="w-full h-68 bg-white flex items-center relative shadow-xl col-span-4 opacity-0"
              :class="{ 'product-fade-in': submitted = true }, { 'overlay-stop': product.product_id == $route.params.id }"
              v-for="(product, index) in carousel" :key="product.product_id"
              :style="{ 'animation-delay': `${index * 0.1}s` }">
              <!-- Product image -->
              <img class="w-full h-auto max-h-full"
                :src="'/src/resources/Sneaker-Images/' + product.product_code + '.png'">
              <!-- Overlay with product details -->
              <div class="overlay" :class="{ 'overlay-stop': product.product_id == $route.params.id }">
                <!-- Product details -->
                <div class="w-full h-full grid grid-rows-9 p-4 text-white">
                  <router-link v-if="product.product_id != $route.params.id" class="row-span-2"
                    :to="'/Product/' + product.product_id">
                    <div></div>
                  </router-link>
                  <router-link v-if="product.product_id != $route.params.id" :to="'/Product/' + product.product_id">
                    <p class="text-lg self-center">{{ product.product_name }}</p>
                  </router-link>
                  <router-link v-if="product.product_id != $route.params.id" :to="'/Product/' + product.product_id">
                    <p class="text-md self-center">{{ product.product_colourway }}</p>
                  </router-link>
                  <router-link v-if="product.product_id != $route.params.id" :to="'/Product/' + product.product_id">
                    <p class="text-sm self-center">{{ product.type + "'s Shoes" }}</p>
                  </router-link>
                  <!-- Indicator for the current item -->
                  <div v-if="product.product_id == $route.params.id" class="row-span-4"></div>
                  <div v-if="product.product_id == $route.params.id" class="flex items-center justify-center">
                    <p class="text-xl">Current Item</p>
                  </div>
                  <!-- Favorite button and link to product details -->
                  <router-link v-if="product.product_id != $route.params.id" :to="'/Product/' + product.product_id">
                    <p class="text-lg self-center">{{ '£' + product.median_price }}</p>
                  </router-link>
                  <div v-if="product.product_id != $route.params.id"
                    class="justify-center place-items-start w-full h-full grid grid-cols-6">
                    <button @click.stop="handleFavorite(product)" id="customIconButton"
                      class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center">
                      <span class="material-icons-outlined text-2xl">{{ isFavourite(product) ? 'favorite' :
                'favorite_border' }}</span>
                    </button>
                    <router-link :to="'/Product/' + product.product_id" class="w-full h-full col-span-5"></router-link>
                  </div>
                  <router-link v-if="product.product_id != $route.params.id" class="row-span-2"
                    :to="'/Product/' + product.product_id">
                    <div></div>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- Right carousel navigation button -->
            <div class="text-black text-6xl justify-center place-items-center flex h-full w-full text-center">
              <button @click="carouselFunc(3)"
                class="cursor-pointer hover:scale-150 hover:text-red-500 duration-150">></button>
            </div>
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
import { fetchRelatedItemsForProduct } from '../automations/RecommendationSystem';
import { productsService } from '../../services/products.service';
import { cartService } from '../../services/cart.service';
import { viewsService } from '../../services/views.service';
import { descriptionsService } from '../../services/descriptions.service';
import CustomAlert from '../components/CustomAlert.vue';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      product: {},
      products: [],
      recommendations: [],
      favourites: [],
      carousel: [],
      items: [],
      views: [],
      view: [],
      descriptions: {},
      viewAmount: 0,
      price: "",
      description: "",
      priceChange: 0,
      error: "",
      loading: null,
      submitted: false,
      forward: false,
      selectedSize: null,
      sizes: [
        { id: 1, size: 6, change: 35 },
        { id: 2, size: 6.5, change: 30 },
        { id: 3, size: 7, change: 25 },
        { id: 4, size: 7.5, change: 20 },
        { id: 5, size: 8, change: 15 },
        { id: 6, size: 8.5, change: 10 },
        { id: 7, size: 9, change: 5 },
        { id: 8, size: 9.5, change: 0 },
        { id: 9, size: 10, change: 5 },
        { id: 10, size: 10.5, change: 10 },
        { id: 11, size: 11, change: 15 },
        { id: 12, size: 11.5, change: 20 },
        { id: 13, size: 12, change: 25 },
        { id: 14, size: 13, change: 30 },
        { id: 15, size: 14, change: 35 },
      ],
      quantity: 1,
      loggedin: 0,
      sizeFinal: 0,
      priceFinal: 0,
      MsgBtn: "Add To ",
      disableButton: false,
      iter: 0,
      submittedCarousel: false,
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

    // Gets the user ID from the account logged in
    this.loggedin = localStorage.getItem('user_id');
    this.loggedin = parseInt(this.loggedin) // Makes User ID into an integer

    // Fetches the details of the product based on the route parameter
    productsService.getOne(this.$route.params.id)
      .then(product => {
        // Sets the product details in the product object
        this.product = product;

        // Sets the price and initialises priceChange
        this.price = product['median_price'];
        this.priceChange = parseInt(this.price) || 0;

        // Fetches recommendations for the current user
        this.fetchRelatedItems();
        this.loading = false;
      })
      .catch(error => this.error = error);

    // Fetches the items in the user's cart
    cartService.getUser(this.loggedin)
      .then(items => {
        this.items = items
      })
      .catch(error => this.error = error);

    // Fetches the description of the product
    descriptionsService.getProduct(this.$route.params.id)
      .then(description => {
        this.descriptions = description;
        // Sets the description property in the object as the product description
        this.description = this.descriptions[0].description
      })
      .catch(error => this.error = error);

    // Adds a view for the current product when entering the page
    this.addView();

    // Fetches all products
    this.fetchProducts();
  },
  watch: {
    // Watches for changes in the route parameters
    '$route'(to, from) {
      // Checks if the route parameters have changed
      if (to.params.id !== from.params.id) {
        // Route parameters have changed, so it fetches new product details based on the new route parameter
        productsService.getOne(to.params.id)
          .then(product => {
            // resets the product details in the product object
            this.product = product;
            this.price = product['median_price'];
            this.priceChange = parseInt(this.price) || 0;
            this.fetchRelatedItems();
            this.loading = false;
          })
          .catch(error => this.error = error);
      }
    },
  },
  methods: {
    // Submits the product to the cart
    handleSubmit() {
      // Sets submitted to true to indicate form submission
      this.submitted = true;

      // Clears any previous error messages
      this.error = "";

      // Calculates the final price based on quantity and price change
      this.priceFinal = this.priceChange * this.quantity;

      // Checks if a size is selected
      if (!this.selectedSize) {
        // If no size is selected, show an error alert
        this.$refs.customAlert.showAlert('Please select a size.');
        return;
      }

      // Checks if the product is already in the cart
      let productAlreadyInCart = this.items.find(item => item.product_id === this.product['product_id'] && item.size === this.sizeFinal);

      if (productAlreadyInCart) {
        // If the product is already in the cart, update the quantity and price of the item in the cart
        const { cart_id, product_id, size, quantity, price } = productAlreadyInCart;
        const newQuantity = quantity + this.quantity;
        const newPrice = this.priceChange * newQuantity;

        // Call the cart service to edit the item in the cart
        cartService.edit(cart_id, product_id, size, newQuantity, newPrice)
          .then(result => {
            console.log("Added to Basket");
            // Show an alert indicating that the item is added to the cart
            this.$refs.customAlert.showAlert('Item Added!');
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
            console.log("error");
          });
      } else {
        // If the product is not in the cart, create a new entry in the cart
        cartService.create(this.product['product_id'], this.sizeFinal, this.quantity, this.priceFinal, this.loggedin)
          .then(result => {
            console.log("Added to Basket");
            // Show an alert indicating that the item is added to the cart
            this.$refs.customAlert.showAlert('Item Added!');
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
            console.log("error");
          });
      }
    },

    // Handles selecting a size for the product
    selectSize(size) {
      console.log("Selected size:", size.size);
      // Selects the size via it's ID
      this.selectedSize = size.id;

      // Stores the actual size by name
      this.sizeFinal = size.size;

      // Updates the price depending on the size
      this.priceChange = this.price
      this.priceChange = this.priceChange - size.change;
    },

    // Adds a view for the current product
    addView() {
      // Fetches the views for the current product
      viewsService.getProduct(this.$route.params.id)
        .then(view => {
          this.view = view;
          const userIdInView = this.view.find(v => v.user_id === this.loggedin);

          if (!userIdInView) {
            // If the user hasn't viewed the product before, create a new view entry
            console.log("Product not viewed yet");
            viewsService.create(this.$route.params.id, 1, this.loggedin)
              .then(result => {
                console.log("Product Viewed");
                this.fetchViews(); // Refreshes the view count
              })
              .catch(error => this.error = error);
          } else {
            // If the user has viewed the product before, update the view count
            console.log("Product already viewed");
            // Changes the view count by adding one
            const { view_id, product_id, amount, user_id } = userIdInView;
            console.log(view_id, product_id, amount, user_id)
            const updatedAmount = amount + 1;
            console.log(view_id, product_id, updatedAmount, user_id)

            // Updates the view count
            viewsService.edit(view_id, updatedAmount)
              .then(result => {
                console.log("Viewed Already")
                this.fetchViews(); // Refreshes the view count
              })
              .catch(error => this.error = error)
          }
        })
        .catch(error => this.error = error);
    },
    // Fetches the views for the current product
    fetchViews() {
      viewsService.getProduct(this.$route.params.id)
        .then(views => {
          this.views = views;
          // Calculate the total number of views for the product
          for (let x = 0; x < this.views.length; x++) {
            this.viewAmount = this.viewAmount + this.views[x].amount;
            console.log(this.viewAmount)
          }
        })
        .catch(error => this.error = error)
    },
    // Fetches related items to the current product
    async fetchRelatedItems() {
      try {
        // Fetches the related items using the current product
        this.recommendations = await fetchRelatedItemsForProduct(this.product);
        console.log(this.recommendations)

        // Sets up the carousel
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
      this.submittedCarousel = false;
    },
    // Fetches all products
    fetchProducts() {
      productsService.getAll()
        .then(products => {
          this.products = products;
        })
        .catch(error => this.error = error)
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
  },
  components: {
    CustomAlert
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
</style>