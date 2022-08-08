<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { storeToRefs } from "pinia";
import DropdownComponent from "@/components/DropdownChooseComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import DropdownCheckboxComponent from "@/components/DropdownCheckboxComponent.vue";
import { ref } from "vue";
import BaseInstance from "./Instances/BaseInstance.vue";
import SubInstance from "./Instances/Helpers/SubInstance.vue";

const logEvents = [{ name: "messageCreate", id: "messageCreate" }];

const discordGuildStore = useDiscordGuildStore();

const { guild, loading } = storeToRefs(discordGuildStore);
const { loadModule, updateModule, updateModuleProperty } = discordGuildStore;

if (!guild) throw Error("Guild not loaded");

if (guild.value && !guild.value.module_general) loadModule("general");
</script>

<template>
  <div class="general module">
    <div class="module_about">
      <h1>General</h1>
      <p>
        Bot general settings module. Here you can configure most of the
        important settings on your server.
      </p>
    </div>
    <div class="module_body" v-if="guild && guild.module_general">
      <BaseInstance
        instance-name="Logs"
        instance-description="Here you can setup logs sending by bot"
      >
        <SubInstance
          subinstance-title="Log channel:"
          subinstance-description="Please choose a log channel where bot may send logs"
        >
          <DropdownComponent
            clickButtonTitle="Choose a channel"
            :useChoosedElementAsTitle="true"
            :refChoosedElement="
              guild.channels.filter(
                (q) =>
                  q.id ===
                  (guild && guild.module_general
                    ? guild.module_general.logChannel
                    : undefined)
              )[0]
            "
            :dropdownContent="guild.channels.filter((q) => q.type === 0)"
            @choose="
              (element) => {
                discordGuildStore.updateModuleProperty(
                  'general',
                  'logChannel',
                  typeof element === 'string' ? element : element.id
                );
              }
            "
          />
        </SubInstance>
        <SubInstance
          subinstance-title="Log types:"
          subinstance-description="Please select types of logs to handle:"
        >
          <DropdownCheckboxComponent
            clickButtonTitle="Choose types"
            :refChoosedElements="
              guild.module_general.logTypes
                ? guild.module_general.logTypes.map(
                    (q) => logEvents.find((a) => a.id === q) || q
                  )
                : []
            "
            :dropdownContent="logEvents"
            @choose="
              (elements) => {
                discordGuildStore.updateModuleProperty(
                  'general',
                  'logTypes',
                  elements.map((q) => (typeof q === 'string' ? q : q.id))
                );
              }
            "
          />
        </SubInstance>
        <SubInstance subinstance-title="Log state:">
          <div
            class="state_checkbox"
            :class="guild.module_general.logEnabled ? 'enabled' : 'disabled'"
            @click="
              guild &&
                guild.module_general &&
                (guild.module_general.logEnabled
                  ? updateModuleProperty('general', 'logEnabled', false)
                  : updateModuleProperty('general', 'logEnabled', true))
            "
          />
        </SubInstance>
      </BaseInstance>
    </div>
    <LoadingComponent v-else />
  </div>
</template>
