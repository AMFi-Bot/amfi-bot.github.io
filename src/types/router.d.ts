export {};

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    noAuth?: boolean;
    layout?: string;
  }
}
