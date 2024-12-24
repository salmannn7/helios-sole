<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <div class="w-full">
    <!-- Filters and sort section -->
    <div class="w-full relative p-6">
      <div class="bg-white w-full h-12 grid grid-cols-10 gap-2 items-center justify-center p-2 product-fade-in">
        <!-- Filter button -->
        <button @click="filtersDiv()" class="bg-zinc-200 h-full w-full rounded-full">
          <span class="material-icons-outlined text-2xl">&#xe429;</span>
        </button>
        <!-- Hover divs section -->
        <div
          class="col-span-8 bg-zinc-300 w-full h-full p-1 flex items-center justify-center space-x-1 overflow-hidden">
          <div class="w-full h-[2.125rem] absolute top-8 left-0 px-8 grid grid-cols-10 pointer-events-none z-10">
            <div></div> <!-- Empty divs for spacing -->
            <!-- Left hover div -->
            <div
              class="w-full h-full col-span-2 pointer-events-auto grid grid-cols-3 bg-gradient-to-r from-white to-transparent">
              <div class="w-full h-full" @mouseleave="stopWraps" @mouseenter="moveWraps(1, 7)"></div>
              <div class="w-full h-full" @mouseleave="stopWraps" @mouseenter="moveWraps(1, 5)"></div>
              <div class="w-full h-full" @mouseleave="stopWraps" @mouseenter="moveWraps(1, 1)"></div>
            </div>
            <!-- Right hover div -->
            <div class="col-span-4"></div>
            <div
              class="w-full h-full col-span-2 pointer-events-auto grid grid-cols-3 bg-gradient-to-r from-transparent to-white">
              <div class="w-full h-full" @mouseleave="stopWraps" @mouseenter="moveWraps(-1, 1)"></div>
              <div class="w-full h-full" @mouseleave="stopWraps" @mouseenter="moveWraps(-1, 5)"></div>
              <div class="w-full h-full" @mouseleave="stopWraps" @mouseenter="moveWraps(-1, 7)"></div>
            </div>
          </div>
          <!-- Filtering via tags section -->
          <div id="wraps" class="w-full h-full flex">
            <!-- Left scroll stopper -->
            <button id="startBtn" class="h-full w-auto rounded-full z-0 whitespace-nowrap mr-1">
              <p class="mx-4 text-sm text-zinc-300">Start</p>
            </button>
            <!-- Filtering tags -->
            <button v-for="(tag, index) in uniqueTags" :key="index" @click="selectTags(tag)"
              class="h-full w-auto rounded-full z-0 whitespace-nowrap mr-1 shadow-xl opacity-0 product-fade-in"
              :class="{ 'bg-black text-white': selectedTags.includes(tag), 'bg-white text-black': !selectedTags.includes(tag) }"
              :style="{ 'animation-delay': `${index * 0.1}s` }">
              <p class="mx-4 text-sm">{{ tag }}</p>
            </button>
            <!-- Right div stopper -->
            <button id="endBtn" class="h-full w-auto rounded-full z-0 whitespace-nowrap mr-1">
              <p class="mx-4 text-sm text-zinc-300">End</p>
            </button>
          </div>
        </div>
        <!-- Sort button -->
        <button @click="sortBysDiv()" class="bg-zinc-200 h-full w-full rounded-full">
          <span class="material-icons-outlined text-2xl">&#xe164;</span>
        </button>
      </div>
      <!-- Filter options section -->
      <div v-if="filterDiv == true" class="bg-white h-auto w-full mt-1 p-2 product-fade-in">
        <!-- Title -->
        <p class="font-sans font-bold text-2xl ml-2">Filter</p>
        <div class="w-full h-full grid grid-cols-4 p-2">
          <!-- Name filters -->
          <div class="w-full h-full">
            <p class="font-bold text-xl">Names</p>
            <button @click="filterTags(id.tags, 'name', id.id)" v-for="(id, index) in fixedNameTags" :key="id"
              class="h-8 w-auto rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
              :class="{ 'bg-zinc-300 text-black': nameIds != id.id, 'bg-black text-white': nameIds == id.id }"
              :style="{ 'animation-delay': `${index * 0.1}s` }">
              <p class="mx-4 text-sm">{{ id.name }}</p>
            </button>
          </div>
          <!-- Colour filters -->
          <div class="w-full h-full">
            <p class="font-bold text-xl">Colours</p>
            <button @click="filterTags(id.tags, 'colour', id.id)" v-for="(id, index) in fixedColourTags" :key="id"
              class="h-8 w-auto rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
              :class="{ 'bg-zinc-300 text-black': colourIds != id.id, 'bg-black text-white': colourIds == id.id }"
              :style="{ 'animation-delay': `${index * 0.1}s` }">
              <div class="flex h-full w-full rounded-full items-center pl-1">
                <div class="h-6 w-6 rounded-full" :class="id.colour"></div>
                <p class=" ml-1 mr-4 text-sm">{{ id.name }}</p>
              </div>
            </button>
          </div>
          <!-- Shoe height filters -->
          <div class="w-full h-full">
            <p class="font-bold text-xl">Shoe Height</p>
            <button @click="filterTags(id.tags, 'height', id.id)" v-for="(id, index) in fixedHeightTags" :key="id"
              class="w-auto rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
              :class="id.height, { 'bg-zinc-300 text-black': heightIds != id.id, 'bg-black text-white': heightIds == id.id }"
              :style="{ 'animation-delay': `${index * 0.1}s` }">
              <p class="mx-4 text-sm">{{ id.name }}</p>
            </button>
          </div>
          <!-- Sport filters -->
          <div class="w-full h-full">
            <p class="font-bold text-xl">Sports</p>
            <button @click="filterTags(id.tags, 'sport', id.id)" v-for="(id, index) in fixedSportsTags" :key="id"
              class="w-auto h-8 rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
              :class="{ 'bg-zinc-300 text-black': sportsIds != id.id, 'bg-black text-white': sportsIds == id.id }"
              :style="{ 'animation-delay': `${index * 0.1}s` }">
              <p class="mx-4 text-sm">{{ id.name }}</p>
            </button>
          </div>
        </div>
        <!-- Clear filters button -->
        <button @click="clearFilters"
          class="w-auto h-10 rounded-full z-0 whitespace-nowrap bg-black text-white m-1 shadow-xl opacity-0 product-fade-in"
          :style="{ 'animation-delay': '0.4s' }">
          <p class="mx-4 text-lg">Clear Filters</p>
        </button>
      </div>
      <!-- Sort options section -->
      <div v-if="sortByDiv == true" class="bg-white h-auto w-full mt-1 p-2 product-fade-in">
        <p class="font-sans font-bold text-2xl ml-2">Sort By</p>
        <div class="w-full h-auto grid grid-cols-4 gap-2">
          <!-- Featured option -->
          <button @click="sortOptions(1)"
            class="w-full h-8 rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
            :class="{ 'bg-zinc-300 text-black': sortOpt != 1, 'bg-black text-white': sortOpt == 1 }"
            :style="{ 'animation-delay': '0.1s' }">
            <p class="mx-4 text-sm">Featured</p>
          </button>
          <!-- Newest option -->
          <button @click="sortOptions(2)"
            class="w-full h-8 rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
            :class="{ 'bg-zinc-300 text-black': sortOpt != 2, 'bg-black text-white': sortOpt == 2 }"
            :style="{ 'animation-delay': '0.2s' }">
            <p class="mx-4 text-sm">Newest</p>
          </button>
          <!-- Low to high option -->
          <button @click="sortOptions(3)"
            class="w-full h-8 rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
            :class="{ 'bg-zinc-300 text-black': sortOpt != 3, 'bg-black text-white': sortOpt == 3 }"
            :style="{ 'animation-delay': '0.3s' }">
            <p class="mx-4 text-sm">£: Low to High</p>
          </button>
          <!-- High to low option -->
          <button @click="sortOptions(4)"
            class="w-full h-8 rounded-full z-0 whitespace-nowrap m-1 shadow-xl opacity-0 product-fade-in"
            :class="{ 'bg-zinc-300 text-black': sortOpt != 4, 'bg-black text-white': sortOpt == 4 }"
            :style="{ 'animation-delay': '0.4s' }">
            <p class="mx-4 text-sm">£: High to Low</p>
          </button>
        </div>
      </div>
      <div v-if="message == 1" class="h-8 w-full"></div> <!-- Empty space for design -->
      <div v-if="message == 1"
        class="w-full h-auto bg-blue-300 p-2 opacity-0 flex items-center justify-center product-fade-in"
        :style="{ 'animation-delay': '0.25s' }">
        <span @click="CustomAlert()"
          class="material-icons-outlined text-lg mr-1 translate-y-[2.5%] text-blue-900">&#xe88e;</span>
        <p class="text-blue-900">
          This page is populated with recommendations tailored to your activity and those of other users who share
          similar interests.
        </p>
      </div>
      <div class="h-8 w-full"></div> <!-- Empty space for design -->
      <!-- No products div -->
      <div class="w-full h-screen flex items-center justify-center" v-if="!products.length">
        <p>No Products Available</p>
      </div>
      <!-- Products div -->
      <div class="w-full h-auto min-h-screen grid grid-cols-3 gap-6" v-if="products.length">
        <div class="w-full h-80 bg-white flex items-center p-4 relative opacity-0" :class="'product-fade-in'"
          v-for="(product, index) in products" :key="product.product_id"
          :style="{ 'animation-delay': `${index * 0.1}s` }">
          <!-- Product image -->
          <img class="w-full h-auto max-h-full" :src="'/src/resources/Sneaker-Images/' + product.product_code + '.png'">
          <!-- Details overlay -->
          <div class="overlay">
            <div class="w-full h-full grid grid-rows-9 p-4 text-white">
              <router-link class="row-span-2" :to="'/Product/' + product.product_id">
                <div></div>
              </router-link>
              <!-- Product name -->
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-2xl self-center">{{ product.product_name }}</p>
              </router-link>
              <!-- Product colourway -->
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-xl self-center">{{ product.product_colourway }}</p>
              </router-link>
              <!-- Product type -->
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-lg self-center">{{ product.type + "'s Shoes" }}</p>
              </router-link>
              <!-- Product price -->
              <router-link :to="'/Product/' + product.product_id">
                <p class="text-2xl self-center">{{ '£' + product.median_price }}</p>
              </router-link>
              <!-- Favourite button -->
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
      </div>
    </div>
    <!-- Product amount shown -->
    <div class="flex items-center justify-center w-full h-8 mb-6 text-lg">
      <p>{{ products.length + " of " + TotalProd + " Products Shown" }}</p>
    </div>
  </div>
</template>

<script>
// Importing necessary modules and services
import { fetchRecommendations } from '../automations/RecommendationSystem';
import { productsService } from '../../services/products.service';
import { favouritesService } from '../../services/favourites.service';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      products: [],
      favourites: [],
      favProducts: [],
      selectedTags: [],
      filteringTags: [],
      loggedin: null,
      error: "",
      message: 0,
      loading: null,
      submitted: false,
      iniProducts: [],
      uniqueTags: [],
      fixedNameTags: [
        { id: "1", name: "Jordan 1", tags: "Jordan One 1" },
        { id: "2", name: "Jordan 3", tags: "Jordan Three 3" },
        { id: "3", name: "Jordan 4", tags: "Jordan Four 4" },
        { id: "4", name: "Jordan 5", tags: "Jordan Five 5" },
        { id: "5", name: "Nike Dunk", tags: "Nike Dunk" },
        { id: "6", name: "Nike Airforce 1", tags: "Nike Airforce 1" },
        { id: "7", name: "Nike Air Max 95", tags: "Nike Air Max 95" },
        { id: "8", name: "Nike Air Max 97", tags: "Nike Air Max 97" },
        { id: "9", name: "New Balance 530", tags: "New Balance 530" },
        { id: "10", name: "New Balance 550", tags: "New Balance 550" },
        { id: "11", name: "Dior B22", tags: "Dior B B22" },
        { id: "12", name: "Dior B30", tags: "Dior B B30" },
      ],
      fixedColourTags: [
        { id: "1", name: "Black", colour: "bg-black text-white", tags: "Black" },
        { id: "2", name: "White", colour: "bg-white", tags: "White" },
        { id: "3", name: "Red", colour: "bg-red-500", tags: "Red" },
        { id: "4", name: "Blue", colour: "bg-blue-500", tags: "Blue" },
        { id: "5", name: "Yellow", colour: "bg-yellow-500", tags: "Yellow" },
        { id: "6", name: "Green", colour: "bg-green-500", tags: "Green" },
        { id: "7", name: "Orange", colour: "bg-orange-500", tags: "Orange" },
        { id: "8", name: "Purple", colour: "bg-purple-500", tags: "Purple" },
        { id: "9", name: "Pink", colour: "bg-pink-500", tags: "Pink" },
        { id: "10", name: "Brown", colour: "bg-amber-950 text-white", tags: "Brown" },
        { id: "11", name: "Grey", colour: "bg-zinc-500", tags: "Grey" },
        { id: "12", name: "Multi-Colour", colour: "bg-gradient-to-r from-red-500 to-blue-500", tags: "Multi-Colour" }
      ],
      fixedHeightTags: [
        { id: "1", name: "High", height: "h-12", tags: "High" },
        { id: "2", name: "Mid", height: "h-10", tags: "Mid" },
        { id: "3", name: "Low", height: "h-8", tags: "Low" }
      ],
      fixedSportsTags: [
        { id: "1", name: "Lifestyle", tags: "Lifestyle" },
        { id: "2", name: "Basketball", tags: "Basketball" }
      ],
      nameFilters: [],
      nameIds: 0,
      colourFilters: [],
      colourIds: 0,
      heightFilters: [],
      heightIds: 0,
      sportsFilters: [],
      sportsIds: 0,
      filterDiv: false,
      sortByDiv: false,
      sortOpt: 1,
      filtersTags: "",
      TotalProd: 0,
    };
  },
  mounted() {
    // Gets the user ID from the account logged in
    this.loggedin = localStorage.getItem('user_id');

    // All the methods initialised
    this.totalProducts();
    this.fetchProducts();
    this.fetchFavourites();
    this.getAllUniqueTags();
  },
  watch: {
    // Check if the search query in the link has changed and resets the products shown
    '$route.query.search'(newSearchQuery, oldSearchQuery) {
      if (newSearchQuery !== oldSearchQuery) {
        this.fetchProducts();
      }
    },
    // Check if the tags query in the link has changed and resets the products shown
    '$route.query.tags'(newTags, oldTags) {
      if (newTags !== oldTags) {
        this.fetchProducts();
      }
    },
    // Check if the type query in the link has changed and resets the products shown
    '$route.query.type'(newType, oldType) {
      if (newType !== oldType) {
        this.fetchProducts();
      }
    }
  },
  methods: {
    //Fetches products to be displayed
    fetchProducts() {
      // Declares queries in link as variables
      const searchQuery = this.$route.query.search;
      const tagsQuery = this.$route.query.tags;
      const typeQuery = this.$route.query.type;

      // Checking if there is a query in the link, otherwise it will show every product in a normal order
      if (searchQuery) {
        // Removes tags
        this.selectedTags = [];
        // Filters products by the search query
        this.filterProductsBySearch(searchQuery);
      } else if (tagsQuery) {
        // Uses the tags query and split them into individual words
        this.selectedTags = tagsQuery.split(' ');
        // Filters products by the selected tags
        this.filterProductsByTags(tagsQuery);
      } else if (typeQuery) {
        // Removes tags
        this.selectedTags = [];
        // Filters products by the type
        this.getTypeProducts(typeQuery);
      } else {
        // Removes tags
        this.selectedTags = [];
        // Displays products without filters
        this.getAllProducts();
      }
    },
    // Filters products via a search query
    filterProductsBySearch(searchQuery) {
      // Fetches all products
      productsService.getAll()
        .then(products => {
          // Filters the products array based on the search query
          this.products = products.filter(product => {
            // Creates a regular expression with the search query, ignoring case
            const searchRegex = new RegExp(searchQuery, 'i');
            return (
              // Tests if any of the product properties match the search query
              searchRegex.test(product.product_name) ||
              searchRegex.test(product.product_code) ||
              searchRegex.test(product.product_colourway) ||
              searchRegex.test(product.colours) ||
              searchRegex.test(product.type) ||
              searchRegex.test(product.tags)
            );
          });
          // Applies additional filters based on filter tags
          this.filterProductsByFilters(this.filtersTags, this.products)
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    },
    // Filters products via a tags query
    filterProductsByTags(tagsQuery) {
      // Fetches all products
      productsService.getAll()
        .then(products => {
          // Splits the tagsQuery into individual tags
          const tags = tagsQuery.split(' ');
          // Filters the products array to include only those that contain all specified tags
          this.products = products.filter(product => {
            return tags.every(tag => product.tags.includes(tag));
          });
          // Applies additional filters based on tags
          this.filterProductsByFilters(this.filtersTags, this.products)
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    },
    // Filters products via a type query
    getTypeProducts(typeQuery) {
      // If the query type is 'Featured', fetch recommended products
      if (typeQuery === 'Featured') {
        this.fetchRecommendationsForUser();
        this.message = 1;
      }
      // If the query type is 'Men', filter products to include only those for men
      else if (typeQuery === 'Men') {
        productsService.getAll()
          .then(products => {
            this.products = products.filter(product => product.type === 'Men');
            // Apply additional filters based on tags
            this.filterProductsByFilters(this.filtersTags, this.products);
            this.message = 0;
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
          });
      }
      // If the query type is 'Women', currently fetch recommendations (though incomplete due to the lack of women's products)
      else if (typeQuery === 'Women') {
        this.fetchRecommendationsForUser();
        this.message = 1;
      }
      // If the query type is 'Kids', currently fetch recommendations (though incomplete due to the lack of kid's products)
      else if (typeQuery === 'Kids') {
        this.fetchRecommendationsForUser();
        this.message = 1;
      }
      // If the query type is 'New', fetch all products and sort them by release date
      else if (typeQuery === 'New') {
        productsService.getAll()
          .then(products => {
            this.products = products;
            // Sort products by release date (newest first)
            this.products.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            this.message = 1;
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
          });
      }
    },
    // Fetches recommendations for the logged-in user asynchronously
    async fetchRecommendationsForUser() {
      // Get the user ID from the logged-in user
      const userID = this.loggedin;
      try {
        // Fetch recommendations for the user using the user ID
        this.products = await fetchRecommendations(userID);
        console.log(this.products)
        // Apply additional filters based on tags
        this.filterProductsByFilters(this.filtersTags, this.products)
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    },
    // Fetches all products
    getAllProducts() {
      productsService.getAll()
        .then(products => {
          // Set the products array to contain all fetched products
          this.products = products;
          // Apply additional filters based on tags
          this.filterProductsByFilters(this.filtersTags, this.products)
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
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
    // Fetches all unique tags from products
    getAllUniqueTags() {
      // fetches all products
      productsService.getAll()
        .then(products => {
          // Array to store unique tags
          const uniqueTags = [];
          // Iterate over each product
          for (let i = 0; i < products.length; i++) {
            // Split the tags string of each product and trim whitespace and commas
            const tags = products[i].tags.split(',').map(tag => tag.trim());
            // Iterate over each tag of the product
            for (let j = 0; j < tags.length; j++) {
              // Check if the tag is not already in the uniqueTags array
              if (!uniqueTags.includes(tags[j])) {
                // Add the tag to the uniqueTags array
                uniqueTags.push(tags[j]);
              }
            }
          }
          // Store the unique tags in the unique tags array
          this.uniqueTags = uniqueTags;
          console.log(this.uniqueTags);
        })
        .catch(error => {
          this.error = error;
        });
    },
    // Moves the wraps container based on direction and step
    moveWraps(direction, steppa) {
      // Gets necessary DOM elements
      const wraps = document.getElementById('wraps');
      const startBtn = document.getElementById('startBtn');
      const endBtn = document.getElementById('endBtn');

      // Defines variables for step and window width
      const step = steppa;
      const windowWidth = window.innerWidth / 2;

      // Gets the bounding rectangles for start and end buttons
      const startRect = startBtn.getBoundingClientRect();
      const endRect = endBtn.getBoundingClientRect();

      // Calculates the start and end positions
      const start = startRect.right + window.pageXOffset;
      const end = endRect.left + window.pageXOffset;

      // Checks if wraps should stop moving
      if ((start > windowWidth && direction === 1) || (end < windowWidth && direction === -1)) {
        console.log("Stop moving wraps because reached the starting or ending point.");
        return;
      }

      // Function to check positions and stop moving if necessary
      function checkPositions() {
        // Gets the bounding rectangles for start and end buttons again
        const startRect = startBtn.getBoundingClientRect();
        const endRect = endBtn.getBoundingClientRect();

        // Calculates the start and end positions again
        const start = startRect.right + window.pageXOffset;
        const end = endRect.left + window.pageXOffset;

        // Double checks if wraps should stop moving
        if ((start > windowWidth && direction === 1) || (end < windowWidth && direction === -1)) {
          console.log("Stop moving wraps because reached the starting or ending point.");
          clearInterval(intervalId);
          return;
        }
      }

      // Interval to continuously move wraps
      const intervalId = setInterval(() => {
        checkPositions(); // Check positions to stop if necessary

        // Calculate the new translate value
        let currentTranslate = wraps.style.transform ? parseInt(wraps.style.transform.replace(/[^\d.-]/g, '')) : 0;
        let newTranslate = currentTranslate + direction * step;

        // Apply the new translate value
        wraps.style.transform = `translateX(${newTranslate}px)`;
      }, 10);

      // Store the interval ID in the wraps element
      wraps.setAttribute('data-interval-id', intervalId);
    },
    // Function to stop wraps movement via clearing interval
    stopWraps() {
      const wraps = document.getElementById('wraps');
      const intervalId = wraps.getAttribute('data-interval-id');
      clearInterval(intervalId);
    },
    // Function to handle selection of tags
    selectTags(tag) {
      // Check if the tag is already selected
      const index = this.selectedTags.indexOf(tag);

      // If the tag is already selected, remove it
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      } else { // If the tag is not selected, add it
        this.selectedTags.push(tag);
      }

      // Generate a query string with selected tags
      let tagsQuery = this.selectedTags.join(' ');

      // Construct the path with the query string
      const path = `/Products?tags=${tagsQuery}`;

      // Navigate to the new path
      this.$router.push(path);

      // Fetch products based on the selected tags
      this.fetchProducts();
    },
    // Filters products based on selected tags and type
    filterTags(tag, type, id) {
      //this.filteringTags.length = 0;
      // Clear previous filters based on type and set the new filter
      if (type === 'name') {
        this.nameFilters.length = 0;
        this.nameIds = id;
        this.nameFilters.push(tag)
      }
      else if (type === 'colour') {
        this.colourFilters.length = 0;
        this.colourIds = id;
        this.colourFilters.push(tag)
      }
      else if (type === 'height') {
        this.heightFilters.length = 0;
        this.heightIds = id;
        this.heightFilters.push(tag)
      }
      else if (type === 'sport') {
        this.sportsFilters.length = 0;
        this.sportsIds = id;
        this.sportsFilters.push(tag)
      }

      // Clear previous filtering tags and update with new filters
      this.filteringTags.length = 0;
      this.filteringTags.push(this.nameFilters);
      this.filteringTags.push(this.colourFilters);
      this.filteringTags.push(this.heightFilters);
      this.filteringTags.push(this.sportsFilters);

      // Generate a query string with filtering tags
      let filtersQuery = this.filteringTags.join(' ');

      // Update the filter tags property
      this.filtersTags = filtersQuery;

      // Fetch products based on the selected filters
      this.fetchProducts();
    },
    // Function to display or hide the filters div
    filtersDiv() {
      if (this.filterDiv == true) {
        this.filterDiv = false;
      }
      else if (this.filterDiv == false) {
        this.filterDiv = true;
        this.sortByDiv = false;
      }
    },
    // Function to display or hide the sort div
    sortBysDiv() {
      if (this.sortByDiv == true) {
        this.sortByDiv = false;
      }
      else if (this.sortByDiv == false) {
        this.sortByDiv = true;
        this.filterDiv = false;
      }
    },
    // Sorts products based on selected sorting option
    sortBy(products) {
      if (this.sortOpt == 2) { // Sort by newest
        products.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        this.products = products
      }
      else if (this.sortOpt == 3) { // Sort by low to high price
        products.sort((a, b) => a.median_price - b.median_price);
        this.products = products
      }
      else if (this.sortOpt == 4) { // Sort by high to low price
        products.sort((a, b) => b.median_price - a.median_price);
        this.products = products
      }
      else { // Default sorting (featured)
        this.products = products
      }
    },
    // Sets the sorting option and fetch products accordingly
    sortOptions(option) {
      this.sortOpt = option; // Set the sorting option
      this.fetchProducts(); // Fetch products based on the selected sorting option
    },
    // Filters products based on filters set by the user
    filterProductsByFilters(tagsQuery, Products) {
      // Split the tags query into an array
      const tags = tagsQuery.split(' ');
      // Filter the products based on whether every tag in the query is included in the product's tags
      this.products = Products.filter(product => {
        return tags.every(tag => product.tags.includes(tag));
      });
      // Sort the filtered products via user sorting selection
      this.sortBy(this.products)
    },
    // Clears filters set by user
    clearFilters() {
      this.filtersTags = "";
      this.nameIds = 0;
      this.colourIds = 0;
      this.heightIds = 0;
      this.sportsIds = 0;
      this.fetchProducts();
    },
    // Calculates the total number of products
    totalProducts() {
      // An array to store all products in total
      let TotalProd = [];

      // Fetches all products
      productsService.getAll()
        .then(products => {
          // Store the fetched products in the TotalProd array
          TotalProd = products;
          // Update the TotalProd property with the length of the array
          this.TotalProd = TotalProd.length;
        })
        .catch(error => this.error = error)
    }
  },
};
</script>

<style></style>