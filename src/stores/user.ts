import { defineStore } from "pinia";

import { useErrorsStore } from "@/stores/errors";

import axios from "@/api";
import _, { toInteger } from "lodash";

import regenerateSession from "@/api/regenerateSession";

const backend_url = import.meta.env.VITE_BACKEND_URL;

import router from "@/router/index";
import js_cookie from "js-cookie";

import nProgress from "@/nprogress";
import { AxiosError } from "axios";

type userType = {
  name: string;
  email: string;
  avatar: string;
  privilege: number;
  questionnaire: string;
  telegram_id: string;
  discord_id: string;
  discord_token: string;
  discordd_refresh_token: string;
  logged: boolean;
  loading: boolean;
};

export const noUser: userType = {
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
  state(): userType {
    return _.cloneDeep(noUser);
  },
  actions: {
    changeUserProperty(user: userType) {
      const cUser = _.cloneDeep(user);

      this.$state = cUser;
      return this.$state;
    },

    nullUser() {
      nProgress.done();
      return this.changeUserProperty(noUser);
    },

    userAuthenticated(user: userType) {
      var cUser = this.changeUserProperty(user);

      cUser.loading = false;
      cUser.logged = this.user_logged;

      return cUser;
    },

    throwAuthError(error: AxiosError) {
      const errorsStore = useErrorsStore();

      let err_message = `Oops somtehing went wrong: ${error.message}`;

      if (error.response && error.response.data) {
        type responseType = {
          error: {
            message: string;
          };
        };
        const response_data = <responseType>error.response.data;
        if (response_data.error && response_data.error.message) {
          err_message += ` ${response_data.error.message}`;
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

    async login(form: { email: string; password: string }) {
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
        if (error instanceof AxiosError) this.throwAuthError(error);

        return false;
      }
    },

    async register(form: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) {
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
        if (error instanceof AxiosError) this.throwAuthError(error);

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
                resolve(undefined);
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

      if (!popup) return useErrorsStore().addError("Cannot open popup");

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
            resolve(undefined);
          }
        }, 500);
      });

      console.log("popup closed");

      if (await this.loadUser()) {
        this.postLogin();
      } else {
        useErrorsStore().addError("Login failed.");
      }
    },

    async discord_callback(query_string: string) {
      this.loading = true;

      nProgress.inc();

      await regenerateSession();

      nProgress.inc();

      await axios.get(`/auth/ext_services/discord/callback?${query_string}`);

      nProgress.done();

      window.close();
    },

    async login_telegram(query_string: string) {
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
        const errorsStore = useErrorsStore();

        if (error instanceof AxiosError)
          errorsStore.addError(
            `Something went wrong: ${error.message}. ${
              error.response ? error.response.data : ""
            }`
          );

        this.nullUser();
        return false;
      }
    },

    load_telegram_widget_script(mount_to = "telegram_load") {
      console.log("function");
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
      const load_tg_widget_elems = document.getElementsByClassName(mount_to);

      for (const i in load_tg_widget_elems) {
        const load_tg_widget_elem = load_tg_widget_elems.item(toInteger(i));
        if (!load_tg_widget_elem) continue;

        load_tg_widget_elem.replaceChildren(telegram_widget_script);
      }

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

    async isAuthenticated(): Promise<boolean> {
      if (this.logged) {
        return true;
        // User not loaded. Trying load User
      }
      if (await this.loadUser()) return true;

      return false;
    },
  },

  getters: {
    user(state: userType): userType | false {
      return state.logged ? state : false;
    },

    user_logged(state) {
      // this.logged = !_.isEqual(this.$state, noUser);

      return !_.isEqual(state, noUser);
    },
  },
});
