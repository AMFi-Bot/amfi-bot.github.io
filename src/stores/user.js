import { defineStore } from "pinia";

import { useErrorsStore } from "../stores/errors";
const errorsStore = useErrorsStore();

import { default as axios } from "../api/api";
import _ from "lodash";

import regenerateSession from "../api/regenerateSession";

const backend_url = import.meta.env.VITE_BACKEND_URL;

import router from "../router/index";

export const noUser = {
  name: "",
  email: "",
  avatar: "",
  privilege: 0,
  questionnaire: "",
  logged: false,
  loading: false,
};

export const useUserStore = defineStore("user", {
  state() {
    return { ..._.cloneDeep(noUser) };
  },
  actions: {
    changeUserProperty(user) {
      const cUser = { ..._.cloneDeep(user) };

      this.$state = cUser;
      return cUser;
    },

    nullUser() {
      return this.changeUserProperty(noUser);
    },

    userAuthenticated(user) {
      const cUser = this.changeUserProperty(user);

      cUser.loading = false;
      cUser.logged = this.user_logged;

      return cUser;
    },

    throwAuthError(error) {
      console.error(error);

      const errorsStore = useErrorsStore();

      let err_message = `Oops somtehing went wrong: ${error.message}`;

      if (error.response.data) {
        if (error.response.data.error) {
          if (error.response.data.error.message) {
            err_message += ` ${error.response.data.error.message}`;
          }
        }
      }

      errorsStore.addError(err_message);

      this.nullUser();
    },

    /**
     *
     * @param {{email: string, password: string}} form
     */
    async login(form) {
      try {
        this.loading = true;

        await regenerateSession();

        let response = await axios.post("/auth/login", form);

        let user = response.data.data.user;

        return this.userAuthenticated(user);
      } catch (error) {
        this.throwAuthError(error);

        return false;
      }
    },

    /**
     *
     * @param {{name:string, email: string, password: string, password_confirmation: string}} form
     */
    async register(form) {
      try {
        this.loading = true;

        await regenerateSession();

        let response = await axios.post("/auth/register", form);

        let user = response.data.data.user;

        return this.userAuthenticated(user);
      } catch (error) {
        this.throwAuthError(error);

        return false;
      }
    },

    async logout() {
      await axios.post("/auth/logout");
      this.nullUser();

      router.push("/");
    },

    async loadUser() {
      this.loading = true;

      try {
        let response = await axios.get("/api/v1/user");

        if (response.status !== 200) throw "error";

        let user = response.data.data.user;

        return this.userAuthenticated(user);
      } catch {
        this.nullUser();

        return false;
      }
    },

    login_discord() {
      return this.login_popup(
        `${backend_url}/auth/ext_services/discord/redirect`
      );
    },

    async login_popup(url) {
      await regenerateSession();

      const popup = window.open(url, "", "width=500,height=900");

      console.log("popup opened");

      await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          if (popup.closed) {
            clearInterval(interval);
            resolve();
          }
        }, 500);
      });

      console.log("popup closed");

      if (await this.loadUser()) {
        router.push({ name: "dashboard" });
      } else {
        errorsStore.addError("Login failed.");
      }
    },

    async login_telegram(query_string) {
      this.loading = true;

      await regenerateSession();

      try {
        const response = await axios.get(
          `/auth/ext_services/telegram/callback?${query_string}`
        );

        if (response.status !== 200) throw response;

        const user = response.data.data.user;

        return this.userAuthenticated(user);
      } catch {
        errorsStore.addError(
          `Something went wrong: ${response}. ${response.data}`
        );

        this.nullUser();
        return false;
      }
    },

    load_telegram_widget_script(document) {
      let telegram_widget_script = document.createElement("script");
      telegram_widget_script.setAttribute(
        "src",
        "https://telegram.org/js/telegram-widget.js?19"
      );
      telegram_widget_script.setAttribute(
        "data-telegram-login",
        import.meta.env.VITE_TELEGRAM_LOGIN
      );
      telegram_widget_script.setAttribute("data-size", "large");
      telegram_widget_script.setAttribute(
        "data-auth-url",
        import.meta.env.VITE_TELEGRAM_REDIRECT_URL
      );
      telegram_widget_script.setAttribute("data-request-access", "write");
      telegram_widget_script.setAttribute("data-userpic", "false");
      let load_tg_widget_elem = document.getElementById("telegram_load");

      load_tg_widget_elem.replaceChildren(telegram_widget_script);

      // <script
      //   async
      //   src="https://telegram.org/js/telegram-widget.js?19"
      //   data-telegram-login=import.meta.env.VITE_TELEGRAM_LOGIN
      //   data-size="large"
      //   data-userpic="false"
      //   data-auth-url=import.meta.env.VITE_TELEGRAM_REDIRECT_URL
      //   data-request-access="write"
      // ></script>;
    },
  },

  getters: {
    user() {
      return this.$state;
    },
    user_logged() {
      this.logged = !_.isEqual(this.$state, noUser);

      return this.logged;
    },
  },
});
