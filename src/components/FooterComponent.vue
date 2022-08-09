<script setup lang="ts">
import DropdownComponent from "./DropdownComponent.vue";
import DiscordLogoWhite from "./Icons/DiscordLogoWhite.vue";
import TelegramLogo from "./Icons/TelegramLogo.vue";
import LanguagesContent from "./LanguagesContent.vue";
</script>

<template>
  <div class="footer">
    <div class="up_grid">
      <DropdownComponent
        :elem_class="'grid_dropdown_elem'"
        :conent_class="'footer_languages'"
        :position="'top-left'"
      >
        <template #dropdownTitle> {{ $t("language") }}/Language </template>

        <template #default>
          <LanguagesContent />
        </template>
      </DropdownComponent>

      <a class="grid_elem" href="/tos">
        {{ $t("check_tos") }}
      </a>
      <a class="grid_elem" href="/r_bug">{{ $t("report_bug") }}</a>
      <a class="grid_elem" href="/sug_ftrs">{{ $t("suggest_features") }}</a>
    </div>
    <div class="down_panel">
      <div class="links_panel">
        <a
          class="link_elem discord_logo logo element"
          href="https://discord.gg/3qZCnzNXcq"
          target="_blank"
        >
          <DiscordLogoWhite />
        </a>
        <a
          class="link_elem github_logo logo element"
          href="https://github.com/Waujito"
          target="_blank"
        >
          <img src="/img/GitHub-Mark-Light-64px.png" />
        </a>
        <a
          class="link_elem telegram_logo logo element"
          href="https://t.me/cat_bot_ds"
          target="_blank"
        >
          <TelegramLogo />
        </a>
      </div>
      <div class="copyrights">
        <div class="copyright" style="margin-bottom: 5px">
          Icons made by
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
            >Pixel perfect</a
          >,
          <a
            href="https://www.flaticon.com/authors/aswell-studio"
            title="Aswell Studio"
            >Aswell Studio</a
          >,
          <a href="https://www.freepik.com" title="Freepik">Freepik</a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </div>
        <div class="copyright">
          © Vetrov V. D., 2021 - 2022 {{ $t("rights_reserved") }}
        </div>
      </div>
    </div>
  </div>
</template>
