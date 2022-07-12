<script setup>
import { useErrorsStore } from "../stores/errors";
const errorsStore = useErrorsStore();
</script>

<template>
  <div id="errors">
    <div class="error" v-for="error in errorsStore.errors" :key="error">
      {{ error.text }} {{ error.count > 1 ? `(${error.count})` : "" }}

      <i class="removeError" @click="errorsStore.removeError(error.id)"></i>
    </div>
  </div>
</template>
