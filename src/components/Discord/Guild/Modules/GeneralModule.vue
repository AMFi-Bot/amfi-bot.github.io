<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { storeToRefs } from "pinia";
import DropdownComponent from "@/components/DropdownChooseComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import DropdownCheckboxComponent from "@/components/DropdownCheckboxComponent.vue";
import BaseInstance from "./Instances/BaseInstance.vue";
import BaseModule from "./BaseModule.vue";
import BaseElement from "./Elements/BaseElement.vue";
import { computed, type ComputedRef } from "vue";
import type { ElementType } from "@/types/components/DropdownComponents";

const logEvents = [{ name: "messageCreate", id: "messageCreate" }];

const discordGuildStore = useDiscordGuildStore();

const { guildManager, discordGuild } = storeToRefs(discordGuildStore);

if (guildManager == undefined || discordGuild == undefined)
  throw new Error("The guild is not loaded");

const choosedLogChannel: ComputedRef<ElementType | undefined> = computed(() => {
  if (!guildManager.value?.newGuild.generalModule?.logChannel) return;

  const channel = discordGuild.value?.channels.find(
    (q) => q.id === guildManager.value?.newGuild.generalModule?.logChannel
  );

  return channel?.name || channel?.id;
});
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
            :refChoosedElement="choosedLogChannel"
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
                (guildManager.newGuild.generalModule.logChannel =
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
              guildManager.newGuild.generalModule.logTypes
                ? guildManager.newGuild.generalModule.logTypes.map(
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
                (guildManager.newGuild.generalModule.logTypes = elements.map(
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
              guildManager.newGuild.generalModule.logEnabled
                ? 'enabled'
                : 'disabled'
            "
            @click="
              guildManager &&
                (guildManager.newGuild.generalModule.logEnabled =
                  !guildManager.newGuild.generalModule.logEnabled)
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
