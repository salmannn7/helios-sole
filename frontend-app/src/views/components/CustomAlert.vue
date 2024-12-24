<template>
  <!-- Blacked out foreground -->
  <div v-if="show" class="custom-alert-overlay z-50">
    <!-- Pop up window -->
    <div class="custom-alert text-center rounded-md grid grid-rows-3 w-72 h-auto divide-y-2 divide-[#e0e0e0]">
      <!-- Message div -->
      <div class="h-full w-full grid justify-center items-center row-span-2">
        <!-- Message -->
        <p class="my-6 font-sans text-lg">{{ message }}</p>
      </div>
      <!-- Close pop up button -->
      <div class="h-full w-full">
        <button class="font-sans w-full h-full flex items-center justify-center" @click="hideAlert">
          <p>Close</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Data properties
      show: false,
      message: ''
    };
  },
  methods: {
    // Displays the alert
    showAlert(message) {
      // Sets the exported message to be displayed
      this.message = message;

      // Displays the alert
      this.show = true;

      // Disables scrolling of the website when the alert is displayed
      document.body.style.overflow = 'hidden';
    },
    // Closes the alert
    hideAlert() {
      // Closes the alert
      this.show = false;

      // Enables the scrolling of the website
      document.body.style.overflow = '';

      // Removes certain items from localStorage related to message display
      localStorage.removeItem('detailsChanged');
      localStorage.removeItem('passwordChanged');
      localStorage.removeItem('loggedInSuccess');
    }
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