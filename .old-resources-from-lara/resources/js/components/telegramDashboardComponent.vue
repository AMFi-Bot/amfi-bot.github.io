<template>
 <div id = "telegram_dashboard" class = "telegram_dashboard">
     {{user}}

 </div>
</template>

<script>
export default {
  props: ['user'],
  mounted() {
    console.log('Telegram dashboard is mounted!');
  },
};
</script>

<style>

</style>
