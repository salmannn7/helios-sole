<template>
  <div class="h-36"></div><!-- Empty space for alignment -->
  <div class="w-full">
    <div class="w-full relative p-6">
      <!-- No products div -->
      <div class="w-full h-screen flex items-center justify-center" v-if="!products.length">
        <p>No Products Favourited</p>
      </div>
      <!-- Products div -->
      <div class="w-full h-auto min-h-screen grid grid-cols-3 gap-6" v-if="products.length">
        <div class="w-full h-80 bg-white flex items-center p-4 relative opacity-0" :class="'product-fade-in'"
          v-for="product in products" :key="product.product_id" :style="{ 'animation-delay': `${index * 0.1}s` }">
          <!-- Product image -->
          <img class="w-full h-auto max-h-full" :src="'/src/resources/Sneaker-Images/' + product.product_code + '.png'">
          <!-- Details overlay -->
          <div class="overlay">
            <div class="w-full h-full grid grid-rows-9 p-4 text-white">
              <router-link class="row-span-2" :to="'/Product/' + product.product_id">
                <div></div>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-2xl self-center">{{ product.product_name }}</p>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-xl self-center">{{ product.product_colourway }}</p>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-lg self-center">{{ product.type + "'s Shoes" }}</p>
              </router-link>
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-2xl self-center">{{ '£' + product.median_price }}</p>
              </router-link>
              <!-- Favourite button -->
              <div class="items-start w-full h-full">
                <button @click.stop="handleFavorite(product)" id="customIconButton"
                  class="text-xl hover:scale-150 hover:text-red-500 duration-150 text-center">
                  <span class="material-icons-outlined text-3xl">{{ isFavourite(product) ? 'favorite' :
        'favorite_border' }}</span>
                </button>
              </div>
              <router-link class="row-span-2" :to="'/Product/' + product.product_id">
                <div></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product amount shown -->
    <div class="flex items-center justify-center w-full h-8 mb-6 text-lg">
      <p>{{ products.length + " of " + products.length + " Favourited Products Shown" }}</p>
    </div>
  </div>
</template>


<script>
// Importing necessary modules and services
import { productsService } from '../../services/products.service';
import { favouritesService } from '../../services/favourites.service';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      products: [],
      favourites: [],
      error: "",
      loading: null,
      submitted: false,
      TotalProd: 0,
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

    // Fetches the favourited products
    this.fetchFavourites();
  },
  methods: {
    // Fetches user's favorited products
    fetchFavourites() {
      // Fetches user's favorited products using their ID from the route parameter
      favouritesService.getUser(this.$route.params.id)
        .then(favourites => {
          // Stores fetched favorites in the favourites array
          this.favourites = favourites;
          this.loading = false;

          // Iterates over each favorite to fetch their corresponding product details
          for (let x = 0; x < this.favourites.length; x++) {
            // Fetches product details for each favorite
            productsService.getOne(this.favourites[x].product_id)
              .then(product => {
                // Stores fetched product details in products array
                this.products.push(product);
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
            this.products.length = 0;
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
    }
  },
};
</script>

<style></style>