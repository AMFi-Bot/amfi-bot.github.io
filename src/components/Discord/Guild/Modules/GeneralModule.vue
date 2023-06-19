<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { storeToRefs } from "pinia";
import DropdownComponent from "@/components/DropdownChooseComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import DropdownCheckboxComponent from "@/components/DropdownCheckboxComponent.vue";
import BaseInstance from "./Instances/BaseInstance.vue";
import BaseModule from "./BaseModule.vue";
import BaseElement from "./Elements/BaseElement.vue";

const logEvents = [{ name: "messageCreate", id: "messageCreate" }];

const discordGuildStore = useDiscordGuildStore();

const { guildManager, discordGuild } = storeToRefs(discordGuildStore);

if (guildManager == undefined || discordGuild == undefined)
  throw new Error("The guild is not loaded");
</script>

<template>
  <BaseModule
    :module-name="'General'"
    :module-descriprion="`        Bot general settings module. Here you can configure most of the
        important settings on your server.`"
  >
    <div v-if="guildManager && discordGuild">
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
            :position="'bottom-right'"
            :refChoosedElement="
              () => {
                const channel = discordGuild?.channels.find(
                  (q) =>
                    q.id === guildManager?.newGuild.module_general?.logChannel
                );

                return channel?.name || channel?.id;
              }
            "
            :dropdownContent="
              discordGuild.channels
                .filter((q) => q.type === 0 && q.name != null)
                .map((cn) => ({
                  name: cn.name || cn.id,
                  id: cn.id,
                }))
            "
            @choose="
              (element) =>
                guildManager &&
                (guildManager.newGuild.module_general.logChannel =
                  typeof element === 'string'
                    ? element
                    : typeof element.id === 'number'
                    ? element.id.toString()
                    : element.id)
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
              guildManager.newGuild.module_general.logTypes
                ? guildManager.newGuild.module_general.logTypes.map(
                    (q) => logEvents.find((a) => a.id === q) || q
                  )
                : []
            "
            :dropdownContent="logEvents"
            :position="'bottom-right'"
            :no-hide-on-click-content="true"
            @choose="
              (elements) =>
                guildManager &&
                (guildManager.newGuild.module_general.logTypes = elements.map(
                  (element) =>
                    typeof element === 'string'
                      ? element
                      : typeof element.id === 'number'
                      ? element.id.toString()
                      : element.id || element.name
                ))
            "
          />
        </BaseElement>
        <BaseElement element-title="Log state:">
          <div
            class="state_checkbox"
            :class="
              guildManager.newGuild.module_general.logEnabled
                ? 'enabled'
                : 'disabled'
            "
            @click="
              guildManager &&
                (guildManager.newGuild.module_general.logEnabled =
                  !guildManager.newGuild.module_general.logEnabled)
            "
          />
        </BaseElement>
      </BaseInstance>
    </div>
    <div style="width: 100px; height: 100px; align-self: center" v-else>
      <LoadingComponent :loader-type="'line'" />
    </div>
  </BaseModule>
</template>
