<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild.js";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { computed, ref, type Ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

const unsavedChangesAlertProperty = ref(false);
const unsavedChangesAlertTimeout: Ref<any> = ref();

const unsavedChangesAlert = computed({
  get() {
    return unsavedChangesAlertProperty.value;
  },
  set(value) {
    if (value) {
      if (unsavedChangesAlertProperty.value) {
        clearTimeout(unsavedChangesAlertTimeout.value);
        unsavedChangesAlertTimeout.value = undefined;
      }
      unsavedChangesAlertProperty.value = true;
      unsavedChangesAlertTimeout.value = setTimeout(
        () => (unsavedChangesAlertProperty.value = false),
        820
      );
    } else unsavedChangesAlertProperty.value = false;
  },
});

const discordGuildStore = useDiscordGuildStore();

const { guild, oldGuild } = storeToRefs(discordGuildStore);

const { syncGuild, resetGuildChanges } = discordGuildStore;

const unsavedChanges = computed(
  () =>
    !(guild.value && oldGuild.value
      ? _.isEqual(guild.value, oldGuild.value)
      : true)
);

onBeforeRouteLeave(() => {
  if (unsavedChanges.value) {
    unsavedChangesAlert.value = true;
    // cancel the navigation and stay on the same page
    return false;
  }
});
</script>

<template>
  <Transition>
    <div
      :class="[
        $style.saveChangesAlert,
        unsavedChangesAlert && $style['unsaved-changes-shake'],
      ]"
      v-show="unsavedChanges"
    >
      <div :class="$style.unsavedText" @click="unsavedChangesAlert = true">
        Careful! You have unsaved changes
      </div>
      <div :class="$style.saveButtons">
        <div :class="$style.resetChangesButton" @click="resetGuildChanges">
          Reset
        </div>
        <div :class="$style.saveChangesButton" @click="syncGuild">
          Save changes
        </div>
      </div>
    </div>
  </Transition>
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

  transform: translateX(0);

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

  &.unsaved-changes-shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) alternate
      infinite;
  }

  @keyframes shake {
    from {
      background: rgba($color: $red_color_1, $alpha: 0.7);
    }
    10%,
    90% {
      transform: translateX(-1px);
      background: rgba($color: $red_color_1, $alpha: 0.7);
    }

    20%,
    80% {
      transform: translateX(2px);
    }

    30%,
    50%,
    70% {
      transform: translateX(-4px);
      background: rgba($color: $red_color_1, $alpha: 0.5);
    }

    40%,
    60% {
      transform: translateX(4px);
      background: rgba($color: $red_color_1, $alpha: 0.7);
    }

    to {
      background: rgba($color: $red_color_1, $alpha: 0.7);
    }
  }
}
</style>

<style scoped lang="scss">
.v-enter-active {
  animation: bounce-in 0.5s;
}
.v-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(120px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
