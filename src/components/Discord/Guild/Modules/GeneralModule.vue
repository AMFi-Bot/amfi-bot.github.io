<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { storeToRefs } from "pinia";
import DropdownComponent from "@/components/DropdownChooseComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import DropdownCheckboxComponent from "@/components/DropdownCheckboxComponent.vue";
import { ref } from "vue";
import BaseInstance from "./Instances/BaseInstance.vue";
import BaseModule from "./BaseModule.vue";
import BaseElement from "./Elements/BaseElement.vue";

const logEvents = [{ name: "messageCreate", id: "messageCreate" }];

const discordGuildStore = useDiscordGuildStore();

const { guild, loading } = storeToRefs(discordGuildStore);
const { loadModule, updateModule, updateModuleProperty } = discordGuildStore;

if (!guild) throw Error("Guild not loaded");

if (guild.value && !guild.value.module_general) loadModule("general");
</script>

<template>
  <BaseModule
    :module-name="'General'"
    :module-descriprion="`        Bot general settings module. Here you can configure most of the
        important settings on your server.`"
  >
    <div v-if="guild && guild.module_general">
      <BaseInstance
        instance-name="Logs"
        instance-description="Here you can setup logs sending by bot"
      >
        <BaseElement
          element-title="Log channel:"
          element-description="Please choose a log channel where bot may send logs"
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
            :position="'bottom-right'"
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
        </BaseElement>
        <BaseElement
          element-title="Log types:"
          element-description="Please select types of logs to handle:"
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
            :position="'bottom-right'"
            :no-hide-on-click-content="true"
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
        </BaseElement>
        <BaseElement element-title="Log state:">
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
        </BaseElement>
      </BaseInstance>
    </div>
    <LoadingComponent :loader-type="'dotted'" v-else />
  </BaseModule>
</template>
