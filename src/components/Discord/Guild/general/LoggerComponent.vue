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
    <div :class="$style.loggerAbout">
      <div :class="$style.loggerName">{{ loggerName }}</div>
      <div :class="$style.loggerDescription">{{ loggerDescription }}</div>
    </div>
    <div :class="$style.loggerSettings">
      <div :class="$style.loggerState">
        <div>Logger enabled:</div>
        <TogglerComponent
          :state="logger.state"
          @state-changed="(st) => emit('stateChanged', st)"
        />
      </div>
      <div :class="$style.loggerChannel">
        <div :class="$style.label">Please choose a logging channel</div>
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
.logger {
}
</style>
