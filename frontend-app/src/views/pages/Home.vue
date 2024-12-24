<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <!-- Container for the slideshow -->
  <div class="w-full">
    <!-- Slideshow container with blurred background image -->
    <div class="w-full h-[600px] absolute top-36 z-0 overflow-hidden shadow-xl bg-black">
      <img class="w-full h-auto translate-y-[-100px] blur-md opacity-50"
        :src="'/src/resources/slide' + (slideNo + 1) + '.png'">
    </div>
    <!-- Slideshow controls and slides -->
    <div class="w-full relative">
      <!-- Button to navigate to the previous slide -->
      <div class="flex w-full">
        <div class="text-white text-8xl justify-start place-items-center flex w-full h-[600px] pl-6 text-center">
          <button @click="Minus()" class="cursor-pointer hover:scale-150 hover:text-red-500 duration-150">&lt;</button>
        </div>
        <!-- Slide images and navigation buttons -->
        <div class="w-full h-[600px] justify-center flex overflow-hidden">
          <!-- Slide images -->
          <img id="img1" class="absolute opacity-0" :class="{ 'opacity-100': slideNo === 0 }"
            src="../../resources/slide1.png" :alt="subtitles[0]" />
          <img id="img2" class="absolute opacity-0" :class="{ 'opacity-100': slideNo === 1 }"
            src="../../resources/slide2.png" :alt="subtitles[1]" />
          <img id="img3" class="absolute opacity-0" :class="{ 'opacity-100': slideNo === 2 }"
            src="../../resources/slide3.png" :alt="subtitles[2]" />
          <img id="img4" class="absolute opacity-0" :class="{ 'opacity-100': slideNo === 3 }"
            src="../../resources/slide4.png" :alt="subtitles[3]" />
          <img id="img5" class="absolute opacity-0" :class="{ 'opacity-100': slideNo === 4 }"
            src="../../resources/slide5.png" :alt="subtitles[4]" />
          <img id="img6" class="absolute opacity-0" :class="{ 'opacity-100': slideNo === 5 }"
            src="../../resources/slide6.png" :alt="subtitles[5]" />
          <p class="absolute text-white text-xl bottom-20 text-shadow underline">{{ subtitles[slideNo] }}</p>
        </div>
        <!-- Button to navigate to the next slide -->
        <div class="text-white text-8xl justify-end place-items-center flex w-full h-[600px] pr-6 text-center">
          <button @click="Plus()" class="cursor-pointer hover:scale-150 hover:text-red-500 duration-150">></button>
        </div>
      </div>
      <!-- Slide navigation buttons -->
      <div class="w-full h-6 flex translate-y-[-2.5rem] justify-center gap-8">
        <!-- Slide navigation buttons -->
        <div id="slidebtn1" @click="slidebtn(0)"
          class="bg-white h-6 w-6 rounded-full cursor-pointer outline outline-white outline-offset-4"></div>
        <div id="slidebtn2" @click="slidebtn(1)" class="bg-white h-6 w-6 rounded-full cursor-pointer"></div>
        <div id="slidebtn3" @click="slidebtn(2)" class="bg-white h-6 w-6 rounded-full cursor-pointer"></div>
        <div id="slidebtn4" @click="slidebtn(3)" class="bg-white h-6 w-6 rounded-full cursor-pointer"></div>
        <div id="slidebtn5" @click="slidebtn(4)" class="bg-white h-6 w-6 rounded-full cursor-pointer"></div>
        <div id="slidebtn6" @click="slidebtn(5)" class="bg-white h-6 w-6 rounded-full cursor-pointer"></div>
      </div>
    </div>
    <!-- Product carousel -->
    <div class="bg-white mb-6 p-6">
      <!-- Title for the recommendations carousel -->
      <p class="font-sans font-bold text-3xl">For You</p>
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
  </div>
</template>

<script>
// Importing necessary modules and services
import { fetchRecommendations } from '../automations/RecommendationSystem';
import { favouritesService } from '../../services/favourites.service';
import { productsService } from '../../services/products.service';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      recommendations: [],
      favourites: [],
      slideNo: 0,
      slideTimer: null,
      loggedin: null,
      carousel: [],
      iter: 0,
      submitted: false,
      subtitles: [
        "Jordan 1 'Chicago Lost & Found'",
        "Jordan 3 'White Cement Reimagined'",
        "Jordan 4 'University Blue'",
        "Jordan 1 'Travis Scott Phantom'",
        "Jordan 1 'Spider-Man Across the Spider-Verse'",
        "Nike SB Dunk 'Travis Scott'"
      ]
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

    // Starts the slideshow when the page starts up
    this.startSlideShow();

    // Fetches the recommendations when the page starts
    this.fetchRecommendationsForUser();
  },
  beforeDestroy() {
    // Stops the slideshow when the page is closed
    this.stopSlideShow();
  },
  methods: {
    // Starts the slideshow by setting the interval if it's not already running
    startSlideShow() {
      if (!this.slideTimer) {
        this.slideTimer = setInterval(this.nextSlide, 5000);
      }
    },
    // Stops the slideshow by clearing the interval
    stopSlideShow() {
      clearInterval(this.slideTimer);
    },
    // Moves to the next slide and displays it
    nextSlide() {
      this.slideNo = (this.slideNo + 1) % 6;
      this.displaySlide();
    },
    // Moves to the next slide and displays it, resetting the slideshow timer
    Plus() {
      this.slideNo = (this.slideNo + 1) % 6;
      this.displaySlide();
      this.resetSlideTimer();
    },
    // Moves to the previous slide and displays it, resetting the slideshow timer
    Minus() {
      this.slideNo = (this.slideNo - 1 + 6) % 6;
      this.displaySlide();
      this.resetSlideTimer();
    },
    // Displays the current slide and updates the corresponding slide button outlines
    displaySlide() {
      // Get references to the slide images and slide buttons
      const img1 = document.getElementById("img1");
      const img2 = document.getElementById("img2");
      const img3 = document.getElementById("img3");
      const img4 = document.getElementById("img4");
      const img5 = document.getElementById("img5");
      const img6 = document.getElementById("img6");
      const slidebtn1 = document.getElementById("slidebtn1");
      const slidebtn2 = document.getElementById("slidebtn2");
      const slidebtn3 = document.getElementById("slidebtn3");
      const slidebtn4 = document.getElementById("slidebtn4");
      const slidebtn5 = document.getElementById("slidebtn5");
      const slidebtn6 = document.getElementById("slidebtn6");

      // Check if all slide elements are available
      if (img1 && img2 && img3 && img4 && img5 && img6 &&
        slidebtn1 && slidebtn2 && slidebtn3 && slidebtn4 && slidebtn5 && slidebtn6) {
        // Update outline based on the current slide number
        if (this.slideNo == 0) {
          // Update outline for slide 1
          slidebtn1.style.outline = "solid";
          slidebtn1.style.outlineColor = "white";
          slidebtn1.style.outlineOffset = "4px";

          // Reset outline for other slides
          slidebtn2.style.outline = "none";
          slidebtn3.style.outline = "none";
          slidebtn4.style.outline = "none";
          slidebtn5.style.outline = "none";
          slidebtn6.style.outline = "none";
        }
        else if (this.slideNo == 1) {
          // Update outline for slide 2
          slidebtn2.style.outline = "solid";
          slidebtn2.style.outlineColor = "white";
          slidebtn2.style.outlineOffset = "4px";

          // Reset outline for other slides
          slidebtn1.style.outline = "none";
          slidebtn3.style.outline = "none";
          slidebtn4.style.outline = "none";
          slidebtn5.style.outline = "none";
          slidebtn6.style.outline = "none";
        }
        else if (this.slideNo == 2) {
          // Update outline for slide 3
          slidebtn3.style.outline = "solid";
          slidebtn3.style.outlineColor = "white";
          slidebtn3.style.outlineOffset = "4px";

          // Reset outline for other slides
          slidebtn2.style.outline = "none";
          slidebtn1.style.outline = "none";
          slidebtn4.style.outline = "none";
          slidebtn5.style.outline = "none";
          slidebtn6.style.outline = "none";
        }
        else if (this.slideNo == 3) {
          // Update outline for slide 4
          slidebtn4.style.outline = "solid";
          slidebtn4.style.outlineColor = "white";
          slidebtn4.style.outlineOffset = "4px";

          // Reset outline for other slides
          slidebtn2.style.outline = "none";
          slidebtn1.style.outline = "none";
          slidebtn3.style.outline = "none";
          slidebtn5.style.outline = "none";
          slidebtn6.style.outline = "none";
        }
        else if (this.slideNo == 4) {
          // Update outline for slide 5
          slidebtn5.style.outline = "solid";
          slidebtn5.style.outlineColor = "white";
          slidebtn5.style.outlineOffset = "4px";

          // Reset outline for other slides
          slidebtn2.style.outline = "none";
          slidebtn1.style.outline = "none";
          slidebtn4.style.outline = "none";
          slidebtn3.style.outline = "none";
          slidebtn6.style.outline = "none";
        }
        else if (this.slideNo == 5) {
          // Update outline for slide 6
          slidebtn6.style.outline = "solid";
          slidebtn6.style.outlineColor = "white";
          slidebtn6.style.outlineOffset = "4px";

          // Reset outline for other slides
          slidebtn2.style.outline = "none";
          slidebtn1.style.outline = "none";
          slidebtn4.style.outline = "none";
          slidebtn5.style.outline = "none";
          slidebtn3.style.outline = "none";
        }
      }
    },
    // Displays the current slide and highlights the corresponding slide button
    slidebtn(numero) {
      this.slideNo = numero;
      this.displaySlide();
      // Resets the slideshow timer
      this.resetSlideTimer();
    },
    // Resets the slideshow timer by stopping it, setting it to null, and then starting it again
    resetSlideTimer() {
      clearInterval(this.slideTimer);
      this.slideTimer = null;
      this.startSlideShow();
    },
    // Fetches recommendations for the logged-in user asynchronously
    async fetchRecommendationsForUser() {
      // Get the user ID from the logged-in user
      const userID = this.loggedin;

      try {
        // Fetch recommendations for the user using the user ID
        this.recommendations = await fetchRecommendations(userID);
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
};
</script>

<style></style>