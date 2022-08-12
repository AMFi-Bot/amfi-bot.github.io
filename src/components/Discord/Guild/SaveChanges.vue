<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild.js";
import { storeToRefs } from "pinia";
import _ from "lodash";

const discordGuildStore = useDiscordGuildStore();

const { guild, oldGuild } = storeToRefs(discordGuildStore);

const { syncGuild, resetGuildChanges } = discordGuildStore;
</script>

<template>
  <div
    :class="$style.saveChangesAlert"
    v-show="!(guild && oldGuild ? _.isEqual(guild, oldGuild) : true)"
  >
    <div :class="$style.unsavedText">Careful! You have unsaved changes</div>
    <div :class="$style.saveButtons">
      <div :class="$style.resetChangesButton" @click="resetGuildChanges">
        Reset
      </div>
      <div :class="$style.saveChangesButton" @click="syncGuild">
        Save changes
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.saveChangesAlert {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  width: 800px;

  padding: 20px 40px;
  background: rgba($color: #000000, $alpha: 0.7);
  border-radius: 10px;

  position: absolute;
  bottom: 0;

  .unsavedText {
    font-size: 18px;
  }

  .saveButtons {
    display: flex;
    flex-direction: row;

    align-items: center;

    user-select: none;

    .resetChangesButton {
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      margin-right: 20px;

      &:hover {
        text-decoration: underline;
      }
    }
    .saveChangesButton {
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      padding: 10px 15px;
      border-radius: 5px;

      @extend %green_button;
    }
  }
}
</style>
