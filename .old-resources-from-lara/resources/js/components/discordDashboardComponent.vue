<template>
  <div id="discord_dashboard" class = "discord_dashboard">
    {{user}}
    <div class = "guild_list" v-if="guilds_loaded && guilds.length !== 0">
      <div class="guild_list_text">Please choose a guild to setup</div>
      <div v-for="guild in guilds" v-bind:key="guild">
        <div class = "guild">
          <div class = "guild_desc">
            <img class = "guild_icon"
            v-bind:src = '`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`'
            width = "40" height = "40" v-if="guild.icon">
            <div v-else>No img</div>
            <div class = "guild_name">{{guild.name}}</div>
          </div>
          <div class = "guild_setup setup_button green_button"
              @click="guild.bot_exists?setupGuild(guild.id):setupBot(guild.id)"
          >
            Set up
          </div>
        </div>
      </div>
    </div>
    <div class = "guilds_load_error" v-else-if="guilds_load_error">
      {{guilds_load_error}}
    </div>
    <div class = "no_guilds" v-else-if="guilds_loaded && guilds.length === 0">
      Oops you dont have any guilds
    </div>
    <div class = "guilds_loading"
    v-else-if="!guilds_loaded">
      Loading guilds...
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  mounted() {
    console.log('Discord dashboard is mounted!');
    const th = this;
    window.apiRequest('GET','/api/user/discord/guilds', null, {},
      (response)=>{
        console.log(response);
        let guilds = response.data;

        th.guilds = guilds;
        th.guilds_loaded = true;
      });

  },
  data() {
    return {
      guilds: [],
      guilds_loaded: false,
      guilds_load_error: '',
    };
  },
  methods: {
    setupGuild(guild_id) {
      window.location = `/discord/guilds/${guild_id}`
    },
    setupBot(guild_id) {
      window.location = `https://discord.com/api/oauth2/authorize` +
      `?client_id=735374790403031051&permissions=8` +
      `&redirect_uri=http%3A%2F%2Fmy-app-dev.com%2Fdiscord%2Fnew_guild`+
      `&response_type=code&scope=bot%20applications.commands`+
      `&guild_id=${guild_id}&disable_guild_select=true`
    },
  }
};
</script>

<style>

</style>
