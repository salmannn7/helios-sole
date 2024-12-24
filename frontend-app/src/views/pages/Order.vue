<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <div class="w-full">
    <!-- Summary Section -->
    <div id="summarySection" class="p-6 w-full h-full">
      <!-- Products Section -->
      <div class="p-6 w-full h-auto bg-white">
        <p class="font-sans font-bold text-3xl mb-4">Products</p>
        <!-- List of Products -->
        <div class="w-full bg-zinc-300 row-span-7 p-1 shadow-md" v-if="items.length">
          <!-- Product Item -->
          <div class="w-full h-auto bg-white p-4 grid grid-cols-2 mb-1" v-for="item in items" :key="item.cart_id">
            <!-- Product Image -->
            <router-link :to="'/Product/' + item.product_id" class="w-full h-full flex items-center">
              <img class="w-auto h-full max-h-[14.25rem] max-w-full"
                v-bind:src="'/src/resources/Sneaker-Images/' + products[item.product_id - 1].product_code + '.png'">
            </router-link>
            <!-- Product Details -->
            <div class="w-full h-full">
              <p class="font-sans font-bold text-3xl">{{ products[item.product_id - 1].product_name }}</p>
              <p class="text-2xl">{{ products[item.product_id - 1].product_colourway }}</p>
              <p class="text-lg">{{ products[item.product_id - 1].type + "'s Shoes" }}</p>
              <p class="text-lg">{{ products[item.product_id - 1].product_code }}</p>
              <p class="text-xl">{{ "£" + item.price }}</p>
              <!-- Product Size -->
              <div class="flex items-center">
                <p class="font-sans text-xl mr-2 flex self-center justify-self-center cursor-pointer">Size:</p>
                <p class="text-xl">{{ item.size }}</p>
              </div>
              <!-- Product Quantity -->
              <div class="flex items-center">
                <p class="font-sans text-xl mr-2 flex self-center justify-self-center cursor-pointer">Quantity:</p>
                <p class="text-xl">{{ item.quantity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Order Number Section -->
      <div class="p-6 w-full h-auto bg-white mt-6">
        <p class="font-sans font-bold text-3xl mb-4">Order Number</p>
        <div class="w-full bg-zinc-300 pt-1 px-1 overflow-auto">
          <!-- Display Order Number -->
          <div class="w-full h-12 bg-white mb-1 pl-4 grid grid-cols-2">
            <div class="w-full h-full flex items-center">
              <span class="material-icons-outlined text-3xl mr-1">&#xf1cc;</span>
              <p class="font-sans font-bold text-xl">{{ group }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Payment Section -->
      <div class="p-6 w-full h-auto bg-white mt-6">
        <p class="font-sans font-bold text-3xl mb-4">Payment</p>
        <div class="w-full bg-zinc-300 pt-1 px-1 overflow-auto">
          <!-- Display Payment Information -->
          <div class="w-full h-12 bg-white mb-1 pl-4 grid grid-cols-2">
            <div class="w-full h-full flex items-center">
              <span class="material-icons-outlined text-3xl mr-1">&#xe870;</span>
              <p class="font-sans font-bold text-xl">{{ "**** **** **** " + card.last_four }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Delivery Section -->
      <div class="p-6 w-full h-auto bg-white mt-6">
        <p class="font-sans font-bold text-3xl mb-4">Delivery</p>
        <div class="w-full bg-zinc-300 py-1 px-1">
          <!-- Display Delivery Information -->
          <div class="w-full h-72 bg-white mb-1 pl-4 grid grid-cols-2">
            <div class="w-full h-full items-center grid grid-rows-6">
              <div class="w-full h-full flex items-center">
                <span class="material-icons-outlined text-4xl mr-1">&#xe88a;</span>
                <p class="font-sans text-xl">{{ "Name: " + address.first_name + " " + address.last_name }}</p>
              </div>
              <div class="w-full h-full flex items-center">
                <p class="font-sans text-xl">{{ "Address: " + address.addressline1 + " " + address.addressline2 }}</p>
              </div>
              <div class="w-full h-full flex items-center">
                <p class="font-sans text-xl">{{ "Town/City: " + address.towncity }}</p>
              </div>
              <div class="w-full h-full flex items-center">
                <p class="font-sans text-xl">{{ "Postcode: " + address.postcode }}</p>
              </div>
              <div class="w-full h-full flex items-center">
                <p class="font-sans text-xl">{{ "Email: " + user.email }}</p>
              </div>
              <div class="w-full h-full flex items-center">
                <p class="font-sans text-xl">{{ "Phone Number: " + address.phone_no }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Summary Section -->
      <div class="p-6 w-full h-96 bg-white grid grid-rows-8 mt-6">
        <p class="font-sans font-bold text-3xl">Summary</p>
        <!-- Summary Details -->
        <div class="w-full h-full row-span-7 grid grid-rows-5 divide-black divide-y-2">
          <!-- Subtotal, Discount, Delivery, and Total -->
          <div class="row-span-4 grid grid-rows-4 font-sans text-xl">
            <div class="flex items-center">
              <p>{{ "Subtotal: " + formattedSubtotal }}</p>
            </div>
            <div class="flex items-center">
              <p>{{ "Discount: " + formattedDiscount }}</p>
            </div>
            <div class="flex items-center">
              <p>{{ "Selected Delivery: " + pickedDelivery }}</p>
            </div>
            <div class="flex items-center">
              <p>{{ "Estimated Delivery: " + delivery }}</p>
            </div>
          </div>
          <!-- Total Amount -->
          <div class="flex items-center font-sans text-xl">
            <p>{{ "Total: " + formattedTotal }}</p>
          </div>
          <!-- Button to Save Receipt -->
          <div class="py-1">
            <button @click="saveReceipt" id="customIconButton"
              class="text-xl text-white font-bold bg-black hover:bg-red-500 duration-150 text-center h-full w-full rounded-full my-2">
              <p>Save As Receipt</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Custom Alert Component -->
    <custom-alert ref="customAlert"></custom-alert>
  </div>
</template>

<script>
// Importing necessary modules and services
import { usersService } from '../../services/users.service';
import { productsService } from '../../services/products.service';
import { cardsService } from '../../services/cards.service';
import { addressesService } from '../../services/addresses.service';
import { ordersService } from '../../services/orders.service';
import CustomAlert from '../components/CustomAlert.vue';
import html2canvas from 'html2canvas';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      products: [],
      items: [],
      card: {},
      address: {},
      user: {},
      countries: [],
      group: 0,
      names: "",
      cvv: "",
      lastFour: "",
      BfirstName: "",
      BlastName: "",
      BaddLine1: "",
      BaddLine2: "",
      BtownCity: "",
      Bpostcode: "",
      BphoneNo: "",
      BselectedCountry: "",
      selectedCard: null,
      firstName: "",
      lastName: "",
      addLine1: "",
      addLine2: "",
      townCity: "",
      postcode: "",
      phoneNo: "",
      selectedCountry: "",
      selectedAddress: null,
      submitted: false,
      size: 6,
      stepIncrement: 0.5,
      loggedin: null,
      subtotal: 0,
      discount: 0,
      delivery: "Free",
      selectedDelivery: 0,
      pickedDelivery: "",
      total: 0,
      deliveryOptions: [
        { id: 1, option: "Standard Delivery (2-5 Days)", cost: 0 },
        { id: 2, option: "Standard Collection (2-5 Days)", cost: 0 },
        { id: 3, option: "Express Delivery (Next Day)", cost: 3.99 },
        { id: 3, option: "Express Collection (Next Day)", cost: 3.99 },
      ],
      NewCardDiv: false,
      NewAddressDiv: false,
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

    // Fetches group orders based on the route parameter ID
    ordersService.getGroup(this.$route.params.id)
      .then(items => {
        // Assign the fetched group order items to the items array
        this.items = items;


        // Extracts group details from the first item in the group
        this.group = this.items[0].grouping;
        this.selectedDelivery = this.items[0].delivery;
        this.pickedDelivery = this.deliveryOptions[this.selectedDelivery - 1].option

        // Fetches card details based on the card ID associated with the group order
        cardsService.getOne(this.items[0].card_id)
          .then(card => {
            this.card = card;
          })
          .catch(error => this.error = error);

        // Fetches address details based on the address ID associated with the group order
        addressesService.getOne(this.items[0].address_id)
          .then(address => {
            this.address = address;
          })
          .catch(error => this.error = error);

        // Calculates the subtotal by summing the prices of all items in the group order
        for (let x = 0; x < this.items.length; x++) {
          this.subtotal = this.subtotal + this.items[x].price
        }

        // Assigns the subtotal to the total
        this.total = this.subtotal
        this.loading = false;
      })
      .catch(error => this.error = error);

    // Fetches user details based on the logged-in user ID
    usersService.getOne(this.loggedin)
      .then(user => {
        this.user = user;

        // Combines the user's first name and last name to form 'names'
        this.names = this.user['first_name'] + " " + this.user['last_name']
        console.log(this.names)
      })
      .catch(error => this.error = error);
  },
  methods: {
    // Saves the page as a receipt
    saveReceipt() {
      // Gets the HTML element containing the receipt summary
      const element = document.getElementById('summarySection');

      // Uses html2canvas library to capture the content of the element as an image
      html2canvas(element).then(canvas => {
        // Converts the captured canvas data to a data URL representing a PNG image
        const imageData = canvas.toDataURL('image/png');

        // Calls the downloadImage method to save the image
        this.downloadImage(imageData, this.names + "_" + this.group + '_receipt.png');
      });
    },
    // Method to download the image
    downloadImage(imageData, fileName) {
      // Creates a link element
      const link = document.createElement('a');

      // Sets the href attribute of the link to the image data URL
      link.href = imageData;

      // Sets the download attribute of the link to the desired file name
      link.download = fileName;

      // Simulates a click on the link to trigger the download
      link.click();
    }
  },
  components: {
    CustomAlert
  },
};
</script>

<style></style>