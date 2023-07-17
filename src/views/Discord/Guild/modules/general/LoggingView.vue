<script setup lang="ts">
import ModuleComponentVue from "@/components/Discord/Guild/ModuleComponent.vue";
import LoggerComponent from "@/components/Discord/Guild/general/LoggerComponent.vue";
import TogglerComponentVue from "@/components/TogglerComponent.vue";
import DropdownChooseComponent from "@/components/dropdown/DropdownChooseComponent.vue";
import {
  channelToElementType,
  elementTypeToChannelId,
} from "@/helpers/discord/modules/general/logging";
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { ChannelType } from "discord-api-types/v10";
import { computed } from "vue";

const { guildManager, discordGuild } =
  useDiscordGuildStore().getDiscordAndBotGuildOrError();

const logModule = computed(() => guildManager.newGuild.general.log);
</script>

<template>
  <ModuleComponentVue>
    <div :class="$style.welcome">The logging module</div>
    <div :class="$style.setup">
      <div :class="$style.state">
        <div>Logging enabled:</div>
        <TogglerComponentVue
          :state="logModule.enabled"
          @state-changed="(st) => (logModule.enabled = st)"
        />
      </div>
      <div :class="$style.defaultChannel">
        <div :class="$style.label">Please choose a default logging channel</div>
        <DropdownChooseComponent
          click-button-title="Choose a channel"
          :dropdownContent="
            discordGuild.channels
              .filter((channel) => channel.type == ChannelType.GuildText)
              .map((channel) => ({
                name: channel.name ?? channel.id,
                id: channel.id,
              }))
          "
          :ref-choosed-element="
            channelToElementType(
              discordGuild.channels.find(
                (channel) => channel.id == logModule.defaultChannel
              )
            )
          "
          @choose="
            (element) =>
              (logModule.defaultChannel = elementTypeToChannelId(element))
          "
          :use-choosed-element-as-title="true"
        />
      </div>
      <div :class="$style.loggers">
        <LoggerComponent
          :logger="logModule.loggers.messageCreate"
          :guild-channels="discordGuild.channels"
          logger-name="Message sent"
          logger-description="Logs all sent messages"
          @state-changed="(st) => (logModule.loggers.messageCreate.state = st)"
          @logging-channel-changed="
            (element) =>
              (logModule.loggers.messageCreate.loggingChannel =
                elementTypeToChannelId(element) ?? null)
          "
        ></LoggerComponent>
      </div>
    </div>
  </ModuleComponentVue>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.setup {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 20px;

  .state {
    display: flex;
    flex-direction: row;
    align-items: center;

    > div:first-child {
      margin-right: 20px;
    }
  }

  .defaultChannel {
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    > div:first-child {
      margin-right: 20px;
    }
  }
}
</style>
