import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import CreatePost from '../views/posts/CreatePost.vue';
import UserProfile from  '../views/UserProfile.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: "Home Page",
      isPublic: false,
      hideNavbar: false,
    },
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: "Profile Page",
      isPublic: false,
      hideNavbar: false,
    },
    component: ProfileView
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "Login Page",
      isPublic: true,
      hideNavbar: true,
    },
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      title: "Signup Page",
      isPublic: true,
      hideNavbar: true,
    },
    component: SignupView
  },
  {
    path: '/posts/create',
    name: 'create-post',
    meta: {
      title: "Create a new post",
      isPublic: false,
      hideNavbar: false,
    },
    component: CreatePost
  },
  {
    path: '/UserProfile/:userId',
    name: 'user-profile',
    component: UserProfile, 
    props: true, 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Add navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const userData = localStorage.getItem('userData');
  const requiresAuth = !to.meta.isPublic;

  if (requiresAuth && !userData) {
    // If the route requires authentication and userData is null,
    // redirect to the login page
    next('/login');
  } else {
    // Continue with the navigation
    next();
  }
});


export default router;