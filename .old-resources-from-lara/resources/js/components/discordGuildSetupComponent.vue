<!--

list of modules:

- general
- moderation
- automoderation
- commands
- features


-->


<template>
  <div id="discord-guild-setup">
    <div class="leftside_nav">
      <div class="nav_opened" v-if="leftside_open">
        <div class="toggle_visible" v-on:click="leftside_open = false">
          <img src="/img/menu.svg" />
          <span>Visible</span>
        </div>
        <i class="separator_1" style="width: 93%"></i>
        <div class="general" v-on:click="setup_page = 'general'">
          <img src="/img/home.svg" />
          <span>General</span>
        </div>
        <div v-on:click="setup_page = 'moderation'">
          <img src="/img/moderation.svg" />
          <span>Moderation</span>
        </div>
        <div v-on:click="setup_page = 'automoderation'">
          <img src="/img/automoderation.svg" />
          <span>Automoderation</span>
        </div>
        <div v-on:click="setup_page = 'commands'">
          <img src="/img/terminal.svg" />
          <span>Commands</span>
        </div>
        <div v-on:click="setup_page = 'features'">
          <img src="/img/star.svg" />
          <span>Features</span>
        </div>
      </div>
      <div class="nav_hidden" v-else>
        <div class="toggle_visible" v-on:click="leftside_open = true">
          <img src="/img/menu.svg" />
        </div>
        <i class="separator_1" style="width: 80%"></i>
        <div class="general" v-on:click="setup_page = 'general'">
          <img src="/img/home.svg" />
        </div>
        <div v-on:click="setup_page = 'moderation'">
          <img src="/img/moderation.svg" />
        </div>
        <div v-on:click="setup_page = 'automoderation'">
          <img src="/img/automoderation.svg" />
        </div>
        <div v-on:click="setup_page = 'commands'">
          <img src="/img/terminal.svg" />
        </div>
        <div v-on:click="setup_page = 'features'">
          <img src="/img/star.svg" />
        </div>
      </div>
    </div>
    <div class="setup_content">
      <div class="guild_head">
        <img
          :src="
            `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` ||
            '/img/automoderation.svg'
          "
        />
        <h1>{{ guild.name }}</h1>
      </div>
      <div class="features instance" v-if="setup_page == 'features'">
        <div class="about_instance">
          <h1>Features</h1>
          <p>
            Server features. Make communication on the server easily and more
            interesting with powerful features such as games, music etc.
          </p>
        </div>
      </div>
      <div class="moderation instance" v-else-if="setup_page == 'moderation'">
        <div class="about_instance">
          <h1>Moderation</h1>
          <p>
            Provide your admins with a cool moderation system that provides
            powerful features like warnings, mute, kicks, bans, etc.
          </p>
        </div>
      </div>
      <div
        class="automoderation instance"
        v-else-if="setup_page == 'automoderation'"
      >
        <div class="about_instance">
          <h1>Automoderation</h1>
          <p>
            Server moderation has never been easy, right? Now you can set up
            AUTO moderation very easily and let your admins sleep Zzzzz
          </p>
        </div>
      </div>
      <div class="commands instance" v-else-if="setup_page == 'commands'">
        <div class="about_instance">
          <h1>Commands</h1>
          <p>
            Commands of the bot on your server. Here you can set up more bot
            commands
          </p>
        </div>
      </div>
      <div class="general instance" v-else>
        <div class="about_instance">
          <h1>General</h1>
          <p>
            Bot general settings module. Here you can configure most of the
            important settings on your server.
          </p>
        </div>
        <div class="instance_config">
          <div class="log_channel instance_elem column">
            <div class="instance_elem_title">
              <span class="title">Logs</span>
              <span class="description"
                >Here you can setup logs sending by bot</span
              >
            </div>
            <div class="instance_sub_elem row sbtw">
              <div class="instance_sub_elem_title">
                <span class="title">Log channel:</span>
                <span class="description"
                  >Please choose a log channel where bot may send logs</span
                >
              </div>
              <div class="dropdown_elem">
                <div
                  class="dropdown_title"
                  v-on:click="log_dropdown_shown = !log_dropdown_shown"
                >
                  <i
                    class="dropdown_arrow"
                    :class="
                      log_dropdown_shown ? 'dropdown_shown' : 'dropdown_hidden'
                    "
                  ></i>
                  <span class="title">{{
                    !new_module_general.log_channel
                      ? "--Choose a log channel--"
                      : channels.filter(
                          (f) => f.id == new_module_general.log_channel
                        )[0].name
                  }}</span>
                </div>

                <div class="dropdown_list down" v-show="log_dropdown_shown">
                  <span
                    v-for="channel in text_channels"
                    :key="channel"
                    v-on:click="
                      new_module_general.log_channel = channel.id;
                      log_dropdown_shown = false;
                      unsaved_changes = true;
                    "
                  >
                    {{ channel.name }}
                  </span>
                </div>
              </div>
            </div>

            <div class="instance_sub_elem row sbtw">
              <div class="instance_sub_elem_title">
                <span class="title">Log types:</span>
                <span class="description"
                  >Please choose types of logs that will be sended in your
                  channel</span
                >
              </div>
              <div class="dropdown_elem">
                <div
                  class="dropdown_title"
                  v-on:click="
                    log_types_dropdown_shown = !log_types_dropdown_shown
                  "
                >
                  <i
                    class="dropdown_arrow"
                    :class="
                      log_types_dropdown_shown
                        ? 'dropdown_shown'
                        : 'dropdown_hidden'
                    "
                  ></i>
                  <span class="title">--Choose log types--</span>
                </div>

                <div
                  class="dropdown_list down"
                  v-show="log_types_dropdown_shown"
                >
                  <div
                    class="dropdown_list_elem"
                    v-for="log_type in log_types_values"
                    :key="log_type"
                    v-on:click="
                      new_module_general.log_types &&
                      typeof new_module_general.log_types == 'object'
                        ? new_module_general.log_types.indexOf(
                            log_type.ename
                          ) !== -1
                          ? new_module_general.log_types.splice(
                              new_module_general.log_types.indexOf(
                                log_type.ename
                              ),
                              1
                            )
                          : new_module_general.log_types.push(log_type.ename)
                        : (new_module_general.log_types = [log_type.ename]);
                      unsaved_changes = true;
                      log(new_module_general.log_types);
                      log(old_module_general.log_types);
                    "
                  >
                    <span>
                      <i
                        class="checkbox dark_2"
                        :class="
                          new_module_general.log_types &&
                          typeof new_module_general.log_types == 'object' &&
                          new_module_general.log_types.indexOf(
                            log_type.ename
                          ) !== -1
                            ? 'checked'
                            : 'unchecked'
                        "
                        style="height: 20px; width: 20px; margin-right: 10px"
                      ></i>
                      {{ log_type.title }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <i class="separator_1"></i>
            <div class="ielem_state">
              <span class="title"
                >You can enable this module by pressing button below</span
              >
              <input
                type="checkbox"
                class="toggle_ielem_state"
                v-on:click="
                  new_module_general.log_state = !(
                    new_module_general.log_state || false
                  );
                  unsaved_changes = true;
                "
                :checked="new_module_general.log_state || false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="unsaved_changes_alert" v-show="unsaved_changes">
      <span class="title">Careful — you have unsaved changes!</span>
      <div class="buttons">
        <span class="reset_button" v-on:click="resetChanges">Reset</span>
        <div class="green_button" v-on:click="saveChanges">Save changes</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["guild"],
  data() {
    return {
      leftside_open: false,

      setup_page: "general",

      old_module_general: {},
      old_module_moderation: {},
      old_module_automoderation: {},
      old_module_commands: {},
      old_module_features: {},

      new_module_general: {},
      new_module_moderation: {},
      new_module_automoderation: {},
      new_module_commands: {},
      new_module_features: {},

      channels: [],
      roles: [],
      text_channels: [],
      voice_channels: [],

      log_dropdown_shown: false,
      log_types_dropdown_shown: false,
      unsaved_changes: false,

      log_types_values: [
        {
          ename: "messageCreate",
          title: "messageCreate",
        },
        {
          ename: "messageDelete",
          title: "messageDelete",
        },
        {
          ename: "messageUpdate",
          title: "messageUpdate",
        },
        {
          ename: "channelCreate",
          title: "channelCreate",
        },
        {
          ename: "channelDelete",
          title: "channelDelete",
        },
        {
          ename: "channelUpdate",
          title: "channelUpdate",
        },
        {
          ename: "channelPinsUpdate",
          title: "channelPinsUpdate",
        },
        {
          ename: "emojiCreate",
          title: "emojiCreate",
        },
        {
          ename: "emojiDelete",
          title: "emojiDelete",
        },
        {
          ename: "emojiUpdate",
          title: "emojiUpdate",
        },
        {
          ename: "guildBanAdd",
          title: "guildBanAdd",
        },
        {
          ename: "guildBanRemove",
          title: "guildBanRemove",
        },
        {
          ename: "guildIntegrationsUpdate",
          title: "guildIntegrationsUpdate",
        },
        {
          ename: "guildMemberAdd",
          title: "guildMemberAdd",
        },
        {
          ename: "guildMemberRemove",
          title: "guildMemberRemove",
        },
        {
          ename: "guildMemberUpdate",
          title: "guildMemberUpdate",
        },
        {
          ename: "guildScheduledEventCreate",
          title: "guildScheduledEventCreate",
        },
        {
          ename: "guildScheduledEventDelete",
          title: "guildScheduledEventDelete",
        },
        {
          ename: "guildScheduledEventUpdate",
          title: "guildScheduledEventUpdate",
        },
        {
          ename: "guildUpdate",
          title: "guildUpdate",
        },
        {
          ename: "inviteCreate",
          title: "inviteCreate",
        },
        {
          ename: "inviteDelete",
          title: "inviteDelete",
        },
        {
          ename: "roleCreate",
          title: "roleCreate",
        },
        {
          ename: "roleDelete",
          title: "roleDelete",
        },
        {
          ename: "roleUpdate",
          title: "roleUpdate",
        },
      ],
    };
  },
  mounted() {
    console.log("discord guild setup component mounted");

    this.old_module_general = _.cloneDeep(
      JSON.parse(this.guild.module_general)
    );
    this.old_module_moderation = _.cloneDeep(
      JSON.parse(this.guild.module_moderation)
    );
    this.old_module_automoderation = _.cloneDeep(
      JSON.parse(this.guild.module_automoderation)
    );
    this.old_module_commands = _.cloneDeep(
      JSON.parse(this.guild.module_commands)
    );
    this.old_module_features = _.cloneDeep(
      JSON.parse(this.guild.module_features)
    );

    this.new_module_general = _.cloneDeep(this.old_module_general);
    this.new_module_moderation = _.cloneDeep(this.old_module_moderation);
    this.new_module_automoderation = _.cloneDeep(
      this.old_module_automoderation
    );
    this.new_module_commands = _.cloneDeep(this.old_module_commands);
    this.new_module_features = _.cloneDeep(this.old_module_features);

    this.channels = JSON.parse(this.guild.channels);
    this.roles = JSON.parse(this.guild.roles);

    console.log(this.channels);

    this.text_channels = this.channels.filter((f) => f.type === 0);
    this.voicet_channels = this.channels.filter((f) => f.type === 2);

    document.addEventListener("click", this.closeDropdown);

    this.log_state_checkbox = this.new_module_general.log_state || false;
  },
  methods: {
    log(e) {
      console.log(e);
    },
    closeDropdown(e) {
      for (let elem of document.getElementsByClassName("dropdown_elem")) {
        if (elem.contains(e.target)) {
          return;
        }
      }

      this.log_dropdown_shown = false;
      this.log_types_dropdown_shown = false;
    },
    resetChanges() {
      this.new_module_general = _.cloneDeep(this.old_module_general);
      this.new_module_moderation = _.cloneDeep(this.old_module_moderation);
      this.new_module_automoderation = _.cloneDeep(
        this.old_module_automoderation
      );
      this.new_module_commands = _.cloneDeep(this.old_module_commands);
      this.new_module_features = _.cloneDeep(this.old_module_features);

      this.unsaved_changes = false;
    },
    saveChanges() {
      let th = this;
      if (
        JSON.stringify(this.old_module_general) !==
        JSON.stringify(this.new_module_general)
      ) {
        window.apiRequest(
          "PUT",
          `/api/discord/guilds/${this.guild.id}/modules/general`,
          JSON.stringify(th.new_module_general),
          {},
          (response) => {
            console.log(response);
            th.old_module_general = _.cloneDeep(th.new_module_general);
            th.unsaved_changes = false;
          }
        );
      }
      if (
        JSON.stringify(this.old_module_moderation) !=
        JSON.stringify(this.new_module_moderation)
      ) {
        window.apiRequest(
          "PUT",
          `/api/discord/guilds/${this.guild.id}/modules/moderation`,
          JSON.stringify(th.new_module_moderation),
          {},
          (response) => {
            console.log(response);
            th.old_module_moderation = _.cloneDeep(th.new_module_moderation);
            th.unsaved_changes = false;
          }
        );
      }
      if (
        JSON.stringify(this.old_module_automoderation) !=
        JSON.stringify(this.new_module_automoderation)
      ) {
        window.apiRequest(
          "PUT",
          `/api/discord/guilds/${this.guild.id}/modules/automoderation`,
          JSON.stringify(th.new_module_automoderation),
          {},
          (response) => {
            console.log(response);
            th.old_module_automoderation = _.cloneDeep(
              th.new_module_automoderation
            );
            th.unsaved_changes = false;
          }
        );
      }
      if (
        JSON.stringify(this.old_module_commands) !=
        JSON.stringify(this.new_module_commands)
      ) {
        window.apiRequest(
          "PUT",
          `/api/discord/guilds/${this.guild.id}/modules/commands`,
          JSON.stringify(th.new_module_commands),
          {},
          (response) => {
            console.log(response);
            th.old_module_commands = _.cloneDeep(th.new_module_commands);
            th.unsaved_changes = false;
          }
        );
      }
      if (
        JSON.stringify(this.old_module_features) !=
        JSON.stringify(this.new_module_features)
      ) {
        window.apiRequest(
          "PUT",
          `/api/discord/guilds/${this.guild.id}/modules/features`,
          JSON.stringify(th.new_module_features),
          {},
          (response) => {
            console.log(response);
            th.old_module_features = _.cloneDeep(th.new_module_features);
            th.unsaved_changes = false;
          }
        );
      }
    },
  },
};
</script>
