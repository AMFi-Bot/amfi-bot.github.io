<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { storeToRefs } from "pinia";
import DropdownComponent from "@/components/dropdown/DropdownChooseComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import DropdownCheckboxComponent from "@/components/dropdown/DropdownCheckboxComponent.vue";
import BaseInstance from "./Instances/BaseInstance.vue";
import BaseModule from "./BaseModule.vue";
import BaseElement from "./Elements/BaseElement.vue";
import { computed, type ComputedRef } from "vue";
import type { ElementType } from "@/types/components/dropdowns";

import { getKeyOfElement } from "@/helpers/components/dropdown";
import { logTypes } from "@/types/discord/modules/general/logging";

const discordGuildStore = useDiscordGuildStore();

const { guildManager, discordGuild } = storeToRefs(discordGuildStore);

if (guildManager == undefined || discordGuild == undefined)
  throw new Error("The guild is not loaded");

const guildChannelsAsElemType: ComputedRef<ElementType[]> = computed(() => {
  if (!discordGuild?.value) return [];

  return discordGuild.value.channels
    .filter((q) => q.type === 0 && q.name != null)
    .map((cn) => ({
      name: cn.name || cn.id,
      id: cn.id,
    }));
});

const choosedLogChannel: ComputedRef<ElementType | undefined> = computed(() => {
  const channel = guildManager.value?.newGuild.generalModule.log.channel;
  if (!channel) return;

  return guildChannelsAsElemType.value.find(
    (q) => getKeyOfElement(q) === channel
  );
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
            :dropdownContent="guildChannelsAsElemType"
            @choose="
              (element) =>
                guildManager &&
                (guildManager.newGuild.generalModule.log.channel =
                  getKeyOfElement(element)?.toString())
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
              guildManager.newGuild.generalModule.log.types?.map(
                (q) => logTypes.find((a) => a.id == q) ?? q
              ) ?? []
            "
            :dropdownContent="logTypes"
            :position="'bottom-right'"
            :no-hide-on-click-content="true"
            @choose="
              (elements) =>
                guildManager &&
                (guildManager.newGuild.generalModule.log.types = elements.map(
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
              guildManager.newGuild.generalModule.log.enabled
                ? 'enabled'
                : 'disabled'
            "
            @click="
              guildManager &&
                (guildManager.newGuild.generalModule.log.enabled =
                  !guildManager.newGuild.generalModule.log.enabled)
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
@/types/components/dropdowns
