<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild.js";
import { storeToRefs } from "pinia";
import { computed, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const shakeProperty = ref(false);
const shakeTimeout: Ref<ReturnType<typeof setTimeout> | undefined> = ref();

/**
 * Shakes the component
 *
 * Assign true to shake
 */
const shake = computed({
  get() {
    return shakeProperty.value;
  },
  set(value) {
    if (value) {
      if (shakeProperty.value) {
        clearTimeout(shakeTimeout.value);
        shakeTimeout.value = undefined;
      }
      shakeProperty.value = true;
      shakeTimeout.value = setTimeout(() => (shakeProperty.value = false), 820);
    } else shakeProperty.value = false;
  },
});

const discordGuildStore = useDiscordGuildStore();

const { guildManager } = storeToRefs(discordGuildStore);

const unsavedChanges = computed(() => !guildManager.value?.synced());

useRouter().beforeEach((to, from, next) => {
  if (
    from.meta.type === "discordGuild" &&
    to.meta.type !== "discordGuild" &&
    unsavedChanges.value
  ) {
    shake.value = true;
  } else {
    return next();
  }
});
</script>

<template>
  <Transition>
    <div
      :class="[
        $style.saveChangesAlert,
        shake && $style['unsaved-changes-shake'],
      ]"
      v-show="unsavedChanges"
    >
      <div :class="$style.unsavedText" @click="shake = true">
        Careful! You have unsaved changes
      </div>
      <div :class="$style.saveButtons">
        <div
          :class="$style.resetChangesButton"
          @click="guildManager?.resetChanges()"
        >
          Reset
        </div>
        <div :class="$style.saveChangesButton" @click="guildManager?.sync()">
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
