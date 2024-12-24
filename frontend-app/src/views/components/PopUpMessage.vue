<template>
  <!-- Blacked out foreground -->
  <div v-if="show" class="pop-up-overlay z-50">
    <!-- Pop up window -->
    <div class="pop-up rounded-md w-auto max-w-[32rem] h-auto divide-[#e0e0e0] px-4">
      <!-- Close pop up button -->
      <div class="h-full w-full py-2 items-center justify-end flex">
        <button class="font-sans" @click="hideMessage"><span class="material-icons-outlined">&#xe5cd;</span></button>
      </div>
      <!-- Message div -->
      <div class="h-auto w-full flex justify-start items-start text-pretty">
        <!-- Message -->
        <p class="font-sans text-lg  text-center">{{ message }}</p>
      </div>
      <!-- Extra div for design purposes -->
      <div class="h-full w-full py-2 items-center justify-end flex">
        <p class="text-white select-none">.</p>
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
    // Displays the message pop up
    showMessage(message) {
      // Sets the exported message to be displayed
      this.message = message;

      // Displays the message pop up
      this.show = true;

      // Disables scrolling of the website when message popup is displayed
      document.body.style.overflow = 'hidden';
    },
    // Closes the message popup
    hideMessage() {
      // Closes the message popup
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
.pop-up-overlay {
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

.pop-up {
  background-color: white;
  color: black;
}

.pop-up button {
  color: black;
  cursor: pointer;
}
</style>