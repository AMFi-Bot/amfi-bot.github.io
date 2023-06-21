<script setup lang="ts">
import { computed, ref } from "vue";
import DropdownArrow from "@/components/dropdown/DropdownArrow.vue";

const props = defineProps<{
  instanceName: string;
  instanceDescription: string;
  instanceBaseClass?: string;
  instanceAboutClass?: string;
  instanceBodyClass?: string;
  hiddenable?: boolean;
}>();

const hiddenable = computed(() => props.hiddenable || true);
const instanceShow = ref(!hiddenable.value);
</script>

<template>
  <div :class="[$style.instance, instanceBaseClass]">
    <div
      :class="[$style.instance_title, instanceAboutClass]"
      @click="hiddenable && (instanceShow = !instanceShow)"
    >
      <h2 :class="$style.title">{{ instanceName }}</h2>
      <p :class="$style.description">{{ instanceDescription }}</p>

      <div :class="$style.dropdown_arrow">
        <DropdownArrow
          :arrow-state="instanceShow"
          :arrow-animation-side="'left'"
          :width="'3px'"
          :side-size="'12px'"
          :animation-speed="'400ms'"
        />
      </div>
    </div>
    <Transition>
      <div
        :class="[$style.instance_body, instanceBodyClass]"
        v-show="instanceShow"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
  overflow: hidden;
}

.v-enter-from {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}
</style>

<style module lang="scss">
@import "@/assets/scss/library";
.instance {
  display: flex;

  flex-direction: column;

  &.row {
    flex-direction: row;
    align-items: center;
  }

  background-color: $dark_2;
  padding: 10px;
  border-radius: 5px;

  margin-bottom: 20px;

  .instance_title {
    width: 100%;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;

    align-self: center;

    align-items: center;

    position: relative;

    user-select: none;

    .title {
      font-size: 26px;

      color: $font_color_1;
    }

    .description {
      font-size: 16px;
      color: $font_color_2;
    }

    .dropdown_arrow {
      position: absolute;
      right: 0;
      top: calc(50% - 10px);
    }
  }

  .instance_body {
    border: 2px solid rgba($color: #000000, $alpha: 0.2);
  }
}
</style>
