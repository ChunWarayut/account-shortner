import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies

  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    authenticated.value = true; // update the state to authenticated
    const decoded = jwtDecode(token.value);
    user.value = decoded; // update the state to user
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  }
});