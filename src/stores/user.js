import { defineStore } from "pinia";

import { useErrorsStore } from "../stores/errors";
const errorsStore = useErrorsStore();

import axios from "../axios";
import _ from "lodash";

import regenerateSession from "../api/regenerateSession";

const backend_url = import.meta.env.VITE_BACKEND_URL;

import router from "../router/index";
import js_cookie from "js-cookie";

import nProgress from "../nProgress";

export const noUser = {
  name: "",
  email: "",
  avatar: "",
  privilege: 0,
  questionnaire: "",
  telegram_id: "",
  discord_id: "",
  discord_token: "",
  discordd_refresh_token: "",
  logged: false,
  loading: false,
};

export const useUserStore = defineStore("user", {
  state() {
    return { ..._.cloneDeep(noUser) };
  },
  actions: {
    changeUserProperty(user) {
      const cUser = _.cloneDeep(user);

      this.$state = cUser;
      return this.$state;
    },

    nullUser() {
      nProgress.done();
      return this.changeUserProperty(noUser);
    },

    userAuthenticated(user) {
      var cUser = this.changeUserProperty(user);

      cUser.loading = false;
      cUser.logged = this.user_logged;

      return cUser;
    },

    throwAuthError(error) {
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

      nProgress.done();

      this.nullUser();
    },

    async postLogin() {
      nProgress.done();
      router.push({ name: "dashboard" });
    },

    /**
     *
     * @param {{email: string, password: string}} form
     */
    async login(form) {
      try {
        this.loading = true;

        nProgress.inc();

        await regenerateSession();

        nProgress.inc();

        let response = await axios.post("/auth/login", form);

        let user = response.data.data.user;

        this.userAuthenticated(user);
        return this.postLogin();
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

        nProgress.inc();

        await regenerateSession();

        nProgress.inc();

        let response = await axios.post("/auth/register", form);

        let user = response.data.data.user;

        this.userAuthenticated(user);
        return this.postLogin();
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

    checkUserCokkieExists() {
      return js_cookie.get("XSRF-TOKEN") ? true : false;
    },

    async loadUser() {
      if (!this.checkUserCokkieExists()) return false;

      if (this.loading) {
        if (this.logged) {
          return this.user;
        } else {
          await new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
              if (!this.loading) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });

          return this.user;
        }
      }

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

    async login_discord() {
      const popup = window.open("/loading", "", "width=500,height=900");

      nProgress.inc();

      await regenerateSession();

      nProgress.inc();

      const response = await axios.get(
        `${backend_url}/auth/ext_services/discord/redirect`,
        { maxRedirects: 0 }
      );

      nProgress.done();

      popup.location = response.data.redirectTo;

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
        this.postLogin();
      } else {
        errorsStore.addError("Login failed.");
      }
    },

    async discord_callback(query_string) {
      this.loading = true;

      nProgress.inc();

      await regenerateSession();

      nProgress.inc();

      await axios.get(`/auth/ext_services/discord/callback?${query_string}`);

      nProgress.done();

      window.close();
    },

    async login_telegram(query_string) {
      this.loading = true;

      nProgress.inc();

      await regenerateSession();

      try {
        const response = await axios.get(
          `/auth/ext_services/telegram/callback?${query_string}`
        );

        nProgress.inc();

        if (response.status !== 200) throw response;

        const user = response.data.data.user;

        this.userAuthenticated(user);
        return this.postLogin();
      } catch (error) {
        errorsStore.addError(
          `Something went wrong: ${error.message}. ${error.response.data}`
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
      return this.logged ? this.$state : false;
    },
    user_logged() {
      // this.logged = !_.isEqual(this.$state, noUser);

      return !_.isEqual(this.$state, noUser);
    },
  },
});
