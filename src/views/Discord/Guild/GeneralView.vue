<script setup lang="ts">
import DropDownComponentVue from "@/components/DropDownComponent.vue";

import { useDiscordGuildStore } from "@/stores/discordGuild";
import { ref } from "vue";
import { useRoute } from "vue-router";

const discordGuildStore = useDiscordGuildStore();
</script>

<template>
  <div class="general instance">
    <div class="about_instance">
      <h1>General</h1>
      <p>
        Bot general settings module. Here you can configure most of the
        important settings on your server.
      </p>
    </div>
    <div class="instance_config">
      <div class="log_channel instance_elem column">
        <div class="instance_elem_title">
          <span class="title">Logs</span>
          <span class="description"
            >Here you can setup logs sending by bot</span
          >
        </div>
        <div class="instance_sub_elem row sbtw">
          <div class="instance_sub_elem_title">
            <span class="title">Log channel:</span>
            <span class="description"
              >Please choose a log channel where bot may send logs</span
            >
          </div>
          <DropDownComponentVue
            :config="{
              clickButtonTitle: 'Click me!',
              dropdownContent: JSON.parse(discordGuildStore.channels).filter(
                (q: any) => q.type === 0
              ),
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
