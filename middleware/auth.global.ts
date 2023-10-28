import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated, user, errorMessage } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("token"); // get token from cookies
  errorMessage.value = null;

  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    authenticated.value = true; // update the state to authenticated
    const decoded = jwtDecode(token.value) as { username: string };

    const { data }: any = await useFetch(
      "/api/me/" + decoded.username,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
      }
    );

    user.value = { ...decoded, ...data.value }; // update the state to user
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === "login") {
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});
