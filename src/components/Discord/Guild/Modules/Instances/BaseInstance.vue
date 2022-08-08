<script setup lang="ts">
const props = defineProps<{
  instanceName: string;
  instanceDescription: string;
}>();
</script>

<template>
  <div class="instance">
    <div class="instance_title">
      <span class="title">Logs</span>
      <span class="description">Here you can setup logs sending by bot</span>
    </div>
    <div class="instance_body">
      <slot />
    </div>
  </div>
</template>
