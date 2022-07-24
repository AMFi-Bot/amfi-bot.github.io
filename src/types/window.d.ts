import { type NProgress } from "@types/nprogress";
import type { Router } from "vue-router";

declare global {
  interface Window {
    NProgress?: NProgress;
    router?: Router;
  }
}
