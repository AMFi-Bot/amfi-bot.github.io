<script setup lang="ts">
import TogglerComponent from "@/components/TogglerComponent.vue";
import DropdownChooseComponent from "@/components/dropdown/DropdownChooseComponent.vue";
import type { ElementType } from "@/types/components/dropdowns";
import type { Logger } from "@/types/discord/modules/general/logging";
import { ChannelType, type APIChannel } from "discord-api-types/v10";
import { toRefs } from "vue";
import { channelToElementType } from "@/helpers/discord/modules/general/logging";

const props = defineProps<{
  logger: Logger;
  guildChannels: APIChannel[];
  loggerName: string;
  loggerDescription: string;
}>();

const { logger, guildChannels } = toRefs(props);

const emit = defineEmits<{
  (e: "stateChanged", state: boolean): void;
  (e: "loggingChannelChanged", channel: ElementType | undefined): void;
}>();
</script>
<template>
  <div :class="$style.logger">
    <div :class="$style.about">
      <div :class="$style.name">{{ loggerName }}</div>
      <div :class="$style.description">{{ loggerDescription }}</div>
    </div>
    <div :class="$style.settings">
      <div :class="$style.state">
        <div>Logger enabled:</div>
        <TogglerComponent
          :state="logger.state"
          @state-changed="(st) => emit('stateChanged', st)"
        />
      </div>
      <div :class="$style.loggingChannel">
        <div :class="$style.label">Please choose a logging channel:</div>
        <DropdownChooseComponent
          click-button-title="Choose a channel"
          :dropdownContent="
            guildChannels
              .filter((channel) => channel.type == ChannelType.GuildText)
              .map((channel) => ({
                name: channel.name ?? channel.id,
                id: channel.id,
              }))
          "
          :ref-choosed-element="
            channelToElementType(
              guildChannels.find(
                (channel) => channel.id == logger.loggingChannel
              )
            )
          "
          @choose="(element) => emit('loggingChannelChanged', element)"
          :use-choosed-element-as-title="true"
        />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.logger {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  width: 100%;

  border: 3px solid $dark_3;
  border-radius: 10px;
  .about {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 18px;

    text-align: center;

    .description {
      margin-top: 5px;
      color: $font_color_2;
    }
  }

  .settings {
    display: flex;
    flex-direction: column;

    .state {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      & > :first-child {
        margin-right: 20px;
      }
    }
    .loggingChannel {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      margin-top: 20px;

      & > :first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>
