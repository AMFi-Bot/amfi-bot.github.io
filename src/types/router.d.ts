export {};

import type { Component } from "vue";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    layout?: string | Component;
    type?: "discordGuild";
  }
}
