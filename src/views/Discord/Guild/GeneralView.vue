<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import DropdownComponent from "../../../components/DropdownComponent.vue";
import LoadingComponent from "../../../components/LoadingComponent.vue";

const discordGuildStore = useDiscordGuildStore();

if (!discordGuildStore.module_general) discordGuildStore.loadModule("general");
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
    <div class="instance_config" v-if="discordGuildStore.module_general">
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
          <DropdownComponent
            :config="{
              clickButtonTitle: 
                ( discordGuildStore.module_general.log_channel
                  ? discordGuildStore.channels.filter(
                      (q: any) => q.id === discordGuildStore.module_general.log_channel
                    )[0].name
                  : 'qwerty'
                ) || 'Choose a channel',                
                
              dropdownContent: discordGuildStore.channels.filter((q: any) => q.type === 0),
              onChoose: async (element) => {
                discordGuildStore.updateModuleProperty('general','log_channel', typeof element === 'string' ? element: element.id);
              }
            }"
          />
        </div>
      </div>
    </div>
    <LoadingComponent v-else />
  </div>
</template>
