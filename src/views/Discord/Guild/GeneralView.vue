<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { storeToRefs } from "pinia";
import DropdownComponent from "@/components/DropdownComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import DropdownCheckboxComponent from "@/components/DropdownCheckboxComponent.vue";

const logEvents = [{ name: "messageCreate", id: "messageCreate" }];

const discordGuildStore = useDiscordGuildStore();

const { guild, loading } = storeToRefs(discordGuildStore);
const { loadModule, updateModule, updateModuleProperty } = discordGuildStore;

if (!guild) throw Error("Guild not loaded");

if (guild.value && !guild.value.module_general) loadModule("general");
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
    <div class="instance_config" v-if="guild && guild.module_general">
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
              clickButtonTitle: 'Choose a channel',
              useChoosedElementAsTitle: true,
              initChoosedElement: guild.channels.filter(
                (q) =>
                  q.id ===
                  (guild && guild.module_general
                    ? guild.module_general.logChannel
                    : undefined)
              )[0],

              dropdownContent: guild.channels.filter((q) => q.type === 0),
              onChoose: async (element) => {
                discordGuildStore.updateModuleProperty(
                  'general',
                  'logChannel',
                  typeof element === 'string' ? element : element.id
                );
              },
            }"
          />
        </div>
        <div class="instance_sub_elem row sbtw">
          <div class="instance_sub_elem_title">
            <span class="title">Log types:</span>
            <span class="description"
              >Please choose types of logs to handle:</span
            >
          </div>
          <DropdownCheckboxComponent
            :config="{
              clickButtonTitle: 'Choose types',
              initChoosed: guild.module_general.logTypes
                ? guild.module_general.logTypes.map(
                    (q) => logEvents.find((a) => a.id === q) || q
                  )
                : undefined,

              dropdownContent: logEvents,
              onChoose: async (elements) => {
                discordGuildStore.updateModuleProperty(
                  'general',
                  'logTypes',
                  elements.map((q) => (typeof q === 'string' ? q : q.id))
                );
              },
            }"
          />
        </div>
        <div class="instance_sub_elem row sbtw">
          <div class="instance_sub_elem_title">
            <span class="title">Log state:</span>
          </div>
          <div
            class="slider"
            :class="guild.module_general.logEnabled ? 'enabled' : 'disabled'"
            @click="
              guild &&
                guild.module_general &&
                (guild.module_general.logEnabled
                  ? updateModuleProperty('general', 'logEnabled', false)
                  : updateModuleProperty('general', 'logEnabled', true))
            "
          >
            State:
            {{ guild.module_general.logEnabled ? "enabled" : "disabled" }} Click
            me!
          </div>
        </div>
      </div>
    </div>
    <LoadingComponent v-else />
  </div>
</template>
