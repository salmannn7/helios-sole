// Imports the Vue Router functions
import { createRouter, createWebHistory } from 'vue-router';

// Imports the Vue components for routing
import Home from "../views/pages/Home.vue"
import Basket from "../views/pages/Basket.vue"
import Checkout from "../views/pages/Checkout.vue"
import Dashboard from "../views/pages/Dashboard.vue"
import Login from "../views/pages/Login.vue"
import Products from "../views/pages/Products.vue"
import Product from "../views/pages/Product.vue"
import Favourites from "../views/pages/Favourites.vue"
import Order from "../views/pages/Order.vue"
import Register from "../views/pages/Register.vue"

// Function to check if the user is authenticated
const ifAuthenticated = (to, from, next) => {
    // Checks if a session token exists in local storage
    const loggedin = localStorage.getItem('session_token');
    if (loggedin) {
        next() // Continues with the navigation
        return
    }
    next('/Login') // Redirects to the login page if not authenticated
}

// Defines routes for the application
const routes = [
    { path: "/", component: Home },
    { path: "/Basket", component: Basket, beforeEnter: ifAuthenticated },
    { path: "/Checkout", component: Checkout, beforeEnter: ifAuthenticated },
    { path: "/Dashboard", component: Dashboard, beforeEnter: ifAuthenticated },
    { path: "/Login", component: Login },
    { path: "/Products", component: Products },
    { path: "/Product/:id", component: Product },
    { path: "/Favourites/:id", component: Favourites, beforeEnter: ifAuthenticated },
    { path: "/Order/:id", component: Order, beforeEnter: ifAuthenticated },
    { path: "/Register", component: Register },
]

// Defines routes for the application
const router = createRouter({
    history: createWebHistory(), // Creates web history for router
    routes, // Passes defined routes to router instance
})

// Executes this function before each route navigation
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
    next(); // Continues with the navigation
});

// Exports the router instance
export default router;