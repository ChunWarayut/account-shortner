import { defineStore } from "pinia";
interface UserPayloadInterface {
  username: string;
  password: string;
}
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    authenticated: false,
    loading: false,
    errorMessage: null as string | null,
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      this.loading = true;
      this.errorMessage = null;
      const { data, pending }: any = await useFetch(
        "https://my-account.thpsd.com/api/auth/login",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            username,
            password,
          },
        }
      );
      this.loading = pending;

      if (data) {
        this.user = data;
        const token = useCookie("token"); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      } else {
        this.errorMessage = "username or password is incorrect";
      }
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      this.user = null;
    },
  },
});
