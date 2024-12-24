<template>
  <div class="h-36"></div> <!-- Empty space for alignment -->
  <div class="w-full">
    <div class="p-6 w-full h-full">
      <!-- Products div -->
      <div class="p-6 w-full h-96 bg-white grid grid-rows-8">
        <!-- Div title -->
        <p class="font-sans font-bold text-3xl">Products</p>
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
              <p class="text-lg">{{ products[item.product_id - 1].product_code }}</p>
              <p class="text-xl">{{ "£" + item.price }}</p>
              <div class="flex items-center">
                <p class="font-sans text-xl mr-2 flex self-center justify-self-center cursor-pointer">Size:</p>
                <p class="text-xl">{{ item.size }}</p>
              </div>
              <div class="flex items-center">
                <p class="font-sans text-xl mr-2 flex self-center justify-self-center cursor-pointer">Quantity:</p>
                <p class="text-xl">{{ item.quantity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Cards div -->
      <div class="p-6 w-full h-auto bg-white mt-6">
        <!-- Div title -->
        <p class="font-sans font-bold text-3xl mb-1">Cards</p>
        <!-- Cards selection list -->
        <div class="w-full bg-zinc-300 pt-1 px-1 overflow-auto">
          <!-- Cards -->
          <div @click="selectCard(card.card_id)" class="w-full h-12 bg-white mb-1 pl-4 grid grid-cols-2 cursor-pointer"
            v-for="card in cards" :key="card.card_id">
            <div class="w-full h-full flex items-center">
              <!-- Select icon -->
              <div class="w-4 h-4 outline outline-black outline-offset-4 outline-4 rounded-full mr-4"
                :class="{ 'bg-black': selectedCard === card.card_id, 'bg-none': selectedCard !== card.card_id }"></div>
              <!-- Card icon -->
              <span class="material-icons-outlined text-3xl mr-1">&#xe870;</span>
              <!-- Card number -->
              <p class="font-sans font-bold text-xl">{{ "**** **** **** " + card.last_four }}</p>
            </div>
            <!-- Card removal button -->
            <div class="flex items-center justify-end">
              <span @click="removeCard(card.card_id)" class="material-icons text-5xl mr-1">&#xe15b;</span>
            </div>
          </div>
          <!-- Add new card div button -->
          <div @click="OpenCardDiv" class="w-full h-12 bg-white mb-1 pl-4 grid grid-cols-2 cursor-pointer">
            <div class="w-full h-full flex items-center">
              <span class="material-icons-outlined text-2xl mr-1">&#xe145;</span>
              <p class="font-sans font-bold text-lg">Add New Card</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Add new card div -->
      <div class="w-full h-full grid grid-cols-2 mt-1 transition-opacity duration-500 ease-in-out"
        :class="{ 'hidden': NewCardDiv == false, 'block': NewCardDiv == true }">
        <!-- Left card details column -->
        <div class="p-6 w-full h-auto min-h-96 bg-white">
          <!-- Div title -->
          <p class="font-sans font-bold text-3xl mb-4">New Card</p>
          <!-- Card details inputs -->
          <div>
            <div class="grid grid-cols-5 gap-2">
              <!-- Card number - XXXX XXXX XXXX XXXX -->
              <div class="items-start col-span-3">
                <p class="font-sans text-xl mb-1">Card Number:</p>
                <input type="cardNumber" name="cardNumber" v-model="cardNumber" placeholder="Enter Card Number..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !cardNumber">Card Number is Required</div>
              </div>
              <!-- Expiry date - XX/XX -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Expiry Date:</p>
                <input type="expDate" name="expDate" v-model="expDate" placeholder="MM/YY"
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !expDate">Expiry Date is Required</div>
              </div>
              <!-- Cvv - XXX -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">CVV:</p>
                <input type="cvv" name="cvv" v-model="cvv" placeholder="CVV"
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !cvv">CVV is Required</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <!-- First name -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">First Name:</p>
                <input type="firstName" name="firstName" v-model="BfirstName" placeholder="Enter First Name..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !BfirstName">First Name is Required</div>
              </div>
              <!-- Last name -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Last Name:</p>
                <input type="lastName" name="lastName" v-model="BlastName" placeholder="Enter Last Name..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !BlastName">Last Name is Required</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <!-- Address line 1 -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Address Line 1:</p>
                <input type="addLine1" name="addLine1" v-model="BaddLine1" placeholder="Enter Address Line 1..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !BaddLine1">Address Line 1 is Required</div>
              </div>
              <!-- Address line 2 -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Address Line 2:</p>
                <input type="addLine2" name="addLine2" v-model="BaddLine2"
                  placeholder="Enter Address Line 2 (Optional)..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
              </div>
            </div>
          </div>
        </div>
        <!-- Right card details column -->
        <div class="p-6 w-full h-96 bg-white">
          <p class="font-sans font-bold text-3xl mb-4 text-white">-</p>
          <!-- Card details inputs -->
          <div>
            <div class="grid grid-cols-2 gap-2">
              <!-- Town or city -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Town/City:</p>
                <input type="townCity" name="townCity" v-model="BtownCity" placeholder="Enter Town/City..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !BtownCity">Town/City is Required</div>
              </div>
              <!-- Postcode -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Postcode:</p>
                <input type="postcode" name="postcode" v-model="Bpostcode" placeholder="Enter Postcode..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !Bpostcode">Postcode is Required</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <!-- Phone number -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Phone Number:</p>
                <input type="phoneNo" name="phoneNo" v-model="BphoneNo" placeholder="Enter Phone Number..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !BphoneNo">Phone Number is Required</div>
              </div>
              <!-- Country -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Country:</p>
                <select name="selectedCountry" v-model="BselectedCountry"
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                  <option value="" disabled selected>Select Country...</option>
                  <option v-for="country in countries" :key="country">{{ country }}</option>
                </select>
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !BselectedCountry">Country is Required</div>
              </div>
            </div>
            <!-- Add new card button -->
            <div>
              <p class="font-sans text-xl text-white mb-1">:</p>
              <button class="text-white text-xl rounded-full bg-black px-4 py-2" v-on:click=AddNewCard()>Add New
                Card</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Addresses div -->
      <div class="p-6 w-full h-auto bg-white mt-6">
        <!-- Div title -->
        <p class="font-sans font-bold text-3xl mb-1">Addresses</p>
        <!-- Address selection list -->
        <div class="w-full bg-zinc-300 pt-1 px-1 overflow-auto">
          <!-- Address -->
          <div @click="selectAddress(address.address_id)"
            class="w-full h-12 bg-white mb-1 pl-4 grid grid-cols-2 cursor-pointer" v-for="address in addresses"
            :key="address.address_id">
            <div class="w-full h-full flex items-center">
              <!-- Select icon -->
              <div class="w-4 h-4 outline outline-black outline-offset-4 outline-4 rounded-full mr-4"
                :class="{ 'bg-black': selectedAddress === address.address_id, 'bg-none': selectedAddress !== address.address_id }">
              </div>
              <!-- Home icon -->
              <span class="material-icons-outlined text-4xl mr-1">&#xe88a;</span>
              <!-- Address basic details -->
              <p class="font-sans font-bold text-xl">{{ address.postcode + " - " + address.addressline1 + " " +
          address.addressline2 }}</p>
            </div>
            <!-- Address removal button -->
            <div class="flex items-center justify-end">
              <span @click="removeCard(address.address_id)" class="material-icons text-5xl mr-1">&#xe15b;</span>
            </div>
          </div>
          <!-- Add new address div button -->
          <div @click="OpenAddressDiv" class="w-full h-12 bg-white mb-1 pl-4 grid grid-cols-2 cursor-pointer">
            <div class="w-full h-full flex items-center">
              <span class="material-icons-outlined text-2xl mr-1">&#xe145;</span>
              <p class="font-sans font-bold text-lg">Add New Address</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Add new address div -->
      <div class="w-full h-full grid grid-cols-2 mt-1 transition-opacity duration-500 ease-in-out"
        :class="{ 'hidden': NewAddressDiv == false, 'block': NewAddressDiv == true }">
        <!-- Left address details column -->
        <div class="p-6 w-full h-auto min-h-96 bg-white">
          <!-- Div title -->
          <p class="font-sans font-bold text-3xl mb-4">New Address</p>
          <!-- Address details inputs -->
          <div>
            <div class="grid grid-cols-2 gap-2">
              <!-- First name -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">First Name:</p>
                <input type="firstName" name="firstName" v-model="firstName" placeholder="Enter First Name..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !firstName">First Name is Required</div>
              </div>
              <!-- Last name -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Last Name:</p>
                <input type="lastName" name="lastName" v-model="lastName" placeholder="Enter Last Name..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !lastName">Last Name is Required</div>
              </div>
            </div>
            <!-- Address line 1 -->
            <div class="items-start">
              <p class="font-sans text-xl mb-1">Address Line 1:</p>
              <input type="addLine1" name="addLine1" v-model="addLine1" placeholder="Enter Address Line 1..."
                class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
              <div class="mb-2 text-red-700 text-sm" v-show="submitted && !addLine1">Address Line 1 is Required</div>
            </div>
            <!-- Address line 2 -->
            <div class="items-start">
              <p class="font-sans text-xl mb-1">Address Line 2:</p>
              <input type="addLine2" name="addLine2" v-model="addLine2" placeholder="Enter Address Line 2 (Optional)..."
                class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
            </div>
          </div>
        </div>
        <!-- Right address details column -->
        <div class="p-6 w-full h-96 bg-white">
          <p class="font-sans font-bold text-3xl mb-4 text-white">-</p>
          <!-- Address details inputs -->
          <div>
            <div class="grid grid-cols-2 gap-2">
              <!-- Town or city -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Town/City:</p>
                <input type="townCity" name="townCity" v-model="townCity" placeholder="Enter Town/City..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !townCity">Town/City is Required</div>
              </div>
              <!-- Postcode -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Postcode:</p>
                <input type="postcode" name="postcode" v-model="postcode" placeholder="Enter Postcode..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !postcode">Postcode is Required</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <!-- Phone number -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Phone Number:</p>
                <input type="phoneNo" name="phoneNo" v-model="phoneNo" placeholder="Enter Phone Number..."
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !phoneNo">Phone Number is Required</div>
              </div>
              <!-- Country -->
              <div class="items-start">
                <p class="font-sans text-xl mb-1">Country:</p>
                <select name="selectedCountry" v-model="selectedCountry"
                  class="mb-2 text-xl w-full h-10 px-2 rounded-full border border-black focus:outline-none focus:border-red-500">
                  <option value="" disabled selected>Select Country...</option>
                  <option v-for="country in countries" :key="country">{{ country }}</option>
                </select>
                <div class="mb-2 text-red-700 text-sm" v-show="submitted && !selectedCountry">Country is Required</div>
              </div>
            </div>
            <!-- Add new address button -->
            <div>
              <p class="font-sans text-xl text-white mb-1">:</p>
              <button class="text-white text-xl rounded-full bg-black px-4 py-2" v-on:click=AddNewAddress()>Add New
                Address</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Summary div -->
      <div class="p-6 w-full h-96 bg-white grid grid-rows-8 mt-6">
        <!-- Div title -->
        <p class="font-sans font-bold text-3xl">Summary</p>
        <!-- Summary details -->
        <div class="w-full h-full row-span-7 grid grid-rows-5 divide-black divide-y-2">
          <!-- Subtotal and other costs -->
          <div class="row-span-4 grid grid-rows-5 font-sans text-xl">
            <!-- Subtotal -->
            <div class="flex items-center">
              <p>{{ "Subtotal: " + formattedSubtotal }}</p>
            </div>
            <!-- Discount -->
            <div class="flex items-center">
              <p>{{ "Discount: " + formattedDiscount }}</p>
            </div>
            <!-- Delivery selection label -->
            <div class="flex items-center">
              <p>Select Delivery:</p>
            </div>
            <!-- Delivery selection -->
            <div class="flex items-center">
              <select
                class="h-8 w-1/3 shadow-md rounded-lg flex items-center justify-center cursor-pointer overflow-y-scroll px-2"
                v-model="selectDelivery" v-if="deliveryOptions.length">
                <option value="" disabled selected>Select a Delivery Option</option>
                <option :value="option.id" v-for="option in deliveryOptions" :key="option.id">{{ option.option }}
                </option>
              </select>
            </div>
            <!-- Delivery cost -->
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
            <button @click="Checkout" id="customIconButton"
              class="text-xl text-white font-bold bg-black hover:bg-red-500 duration-150 text-center h-full w-full rounded-full">
              <p>Checkout</p>
            </button>
          </div>
          <!-- Paypal alternative - NON FUNCTIONAL -->
          <div class="py-1">
            <button id="customIconButton"
              class="bg-white hover:bg-blue-700 duration-150 text-center h-full w-full flex justify-center rounded-full shadow-md">
              <img class="h-5 w-auto m-1" src="/src/resources/PayPal.png" />
            </button>
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
import { productsService } from '../../services/products.service';
import { cartService } from '../../services/cart.service';
import { cardsService } from '../../services/cards.service';
import { addressesService } from '../../services/addresses.service';
import { ordersService } from '../../services/orders.service';
import CustomAlert from '../components/CustomAlert.vue';
import "../assets/MainCSS.css";

export default {
  data() {
    return {
      // Data properties
      products: [],
      items: [],
      cards: [],
      addresses: [],
      countries: [],
      cardNumber: "",
      expDate: "",
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
      selectDelivery: "",
      total: 0,
      deliveryOptions: [
        { id: 1, option: "Standard Delivery (2-5 Days) - Free", cost: 0 },
        { id: 2, option: "Standard Collection (2-5 Days) - Free", cost: 0 },
        { id: 3, option: "Express Delivery (Next Day) - £3.99", cost: 3.99 },
        { id: 3, option: "Express Collection (Next Day) - £3.99", cost: 3.99 },
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

    // Fetches countries for selection
    this.loadCountries();

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
        this.loading = false;
      })
      .catch(error => this.error = error);

    // Fetches the cards and addresses when the page loads up
    this.getCards();
    this.getAddresses();
  },
  methods: {
    // Fetches countries for selection use asynchronously
    async loadCountries() {
      try {
        // Retrieves the contents of the Countries.txt file
        const response = await fetch('/src/resources/Text/Countries.txt');

        // Logs the response status to the console
        console.log('Response status:', response.status);

        // Converts the response body to text format
        const data = await response.text();

        // Splits the text into an array of country names and trims whitespace from each entry
        const countries = data.split('\n').map(country => country.trim());

        // Assigns the array of country names to the component's countries property
        this.countries = countries;
      } catch (error) {
        console.error('Error loading countries:', error);
      }
    },
    // Updates the total cost of the order based on the selected delivery option
    updateTotal() {
      // Finds the delivery option object that matches the selected delivery option ID
      const deliveryOption = this.deliveryOptions.find(option => option.id === parseInt(this.selectDelivery));

      if (deliveryOption) {
        // Retrieves the delivery cost from the selected delivery option
        const deliveryCost = deliveryOption.cost;

        // Updates the total cost by adding the delivery cost to the subtotal
        this.total = this.subtotal + deliveryCost;
      }
    },
    // Toggles the visibility of the add new card div
    OpenCardDiv() {
      // If the add new card div is currently closed, open it; otherwise, close it
      if (this.NewCardDiv == false) {
        this.NewCardDiv = true;
      }
      else {
        this.NewCardDiv = false
      }
    },
    // Adds a new card to the user's account
    AddNewCard() {
      // Sets submitted to true to indicate the addition of a new card
      this.submitted = true;

      // Extracts the last four digits of the card number for privacy
      this.lastFour = this.cardNumber.substring(12, 16)

      // Creates a new card with the inputted information
      cardsService.create(this.cardNumber, this.lastFour, this.expDate, this.cvv, this.BfirstName, this.BlastName,
        this.BaddLine1, this.BaddLine2, this.BtownCity, this.Bpostcode, this.BphoneNo, this.BselectedCountry, this.loggedin)
        .then(result => {
          // Displays an alert when the card is added
          this.$refs.customAlert.showAlert("Card Added")
          this.getCards(); // Refreshes the list of cards

          // Sets submitted to false to indicate the completion of the addition of a new card
          this.submitted = false;
        })
        .catch(error => this.error = error)
    },
    // Selects a card from the list of saved cards
    selectCard(card) {
      // Sets the selected card
      this.selectedCard = card
      console.log(this.selectedCard)
    },
    // Removes a card from the user's account
    removeCard(card) {
      // Deletes the selected card
      cardsService.deleteCard(card)
        .then(result => {
          // Displays an alert when the card is deleted
          this.$refs.customAlert.showAlert("Card Removed")
          this.getCards(); // Refreshes the list of cards
        })
        .catch(error => this.error = error)
    },
    // Fetches the list of cards associated with the user's account
    getCards() {
      // Fetches the user's cards using the user ID
      cardsService.getUser(this.loggedin)
        .then(cards => {
          // Updates the list of cards with the fetched cards
          this.cards = cards;
        })
        .catch(error => this.error = error);
    },
    // Toggles the visibility of the add new address div
    OpenAddressDiv() {
      // If the add new address div is currently closed, open it; otherwise, close it
      if (this.NewAddressDiv == false) {
        this.NewAddressDiv = true;
      }
      else {
        this.NewAddressDiv = false
      }
    },
    // Adds a new address to the user's account
    AddNewAddress() {
      // Sets submitted to true to indicate the addition of a new address
      this.submitted = true;

      // Creates a new address with the inputted information
      addressesService.create(this.firstName, this.lastName, this.addLine1, this.addLine2, this.townCity,
        this.postcode, this.phoneNo, this.selectedCountry, this.loggedin)
        .then(result => {
          // Displays an alert when the address is added
          this.$refs.customAlert.showAlert("Address Added")
          this.getAddresses();// Refreshes the list of cards
          this.submitted = false;
        })
        .catch(error => this.error = error)
    },
    // Selects a address from the list of saved addresses
    selectAddress(address) {
      // Sets the selected address
      this.selectedAddress = address
      console.log(this.selectedAddress)
    },
    // Removes an address from the user's account
    removeAddress(address) {
      // Deletes the selected address
      addressesService.deleteAddress(address)
        .then(result => {
          // Displays an alert when the address is deleted
          this.$refs.customAlert.showAlert("Address Removed")
          this.getAddresses(); // refreshes the list of addresses
        })
        .catch(error => this.error = error)
    },
    // Fetches the list of addresses associated with the user's account
    getAddresses() {
      // Fetches the user's addresses using the user ID
      addressesService.getUser(this.loggedin)
        .then(addresses => {
          // Updates the list of addresses with the fetched cards
          this.addresses = addresses;
        })
        .catch(error => this.error = error);
    },
    // Completes the checkout process by creating orders for the selected items
    Checkout() {
      // Sets submitted to true to indicate that checkout process is in progress
      this.submitted = true;

      // Creates a group as the first item's cart ID which will be used as an order ID
      let grouping = this.items[0].cart_id;

      // Initialises an array to store promises for each order creation request
      let promises = [];

      // Iterates over each item in the cart
      for (let x = 0; x < this.items.length; x++) {
        // Pushes a promise for creating an order for the current item to the promises array
        promises.push(
          // Creates an ordered item
          ordersService.create(this.items[x].product_id, this.items[x].size, this.items[x].quantity, this.items[x].price,
            this.selectDelivery, this.selectedCard, this.selectedAddress, this.items[x].user_id, grouping
          )
            .then(result => {
              // Displays an alert showing that the items have been ordered
              this.$refs.customAlert.showAlert("Item(s) Ordered");

              // Deletes the item from the cart after ordering
              return cartService.deleteItem(this.items[x].cart_id);
            })
            .catch(error => {
              this.error = error;
              return Promise.reject(error);
            })
        );
      }

      // Executes all promises in parallel
      Promise.all(promises)
        .then(() => {
          // Redirects the user to the order confirmation page after successful checkout
          this.$router.push("/Order/" + grouping);
        })
        .catch(error => {
          console.error("Error during checkout:", error);
        });
    }
  },
  watch: {
    selectDelivery(newValue) {
      // Checks if the new value of the selected delivery option is not empty
      if (newValue !== "") {
        // Calls the updateTotal method to recalculate the total cost of the order
        this.updateTotal();
      }
    }
  },
  components: {
    CustomAlert
  },
};
</script>

<style></style>