<script setup lang="ts">
import DropdownComponent from "./DropdownComponent.vue";
import DiscordLogoWhite from "./Icons/DiscordLogoWhite.vue";
import TelegramLogo from "./Icons/TelegramLogo.vue";
import LanguagesContent from "./LanguagesContent.vue";
</script>

<template>
  <div :class="$style.footer">
    <div :class="$style.up_grid">
      <DropdownComponent
        :elem_class="$style.grid_dropdown_elem"
        :content_class="$style.footer_languages"
        :title_class="$style.dropdown_title"
        :position="'top-left'"
      >
        <template #dropdownTitle> {{ $t("language") }}/Language </template>

        <template #default>
          <LanguagesContent />
        </template>
      </DropdownComponent>

      <a :class="$style.grid_elem" href="/tos">
        {{ $t("check_tos") }}
      </a>
      <a :class="$style.grid_elem" href="/r_bug">{{ $t("report_bug") }}</a>
      <a :class="$style.grid_elem" href="/sug_ftrs">{{
        $t("suggest_features")
      }}</a>
    </div>
    <div :class="$style.down_panel">
      <div :class="$style.links_panel">
        <a
          :class="[
            $style.link_elem,
            $style.discord_logo,
            $style.logo,
            $style.element,
          ]"
          href="https://discord.gg/3qZCnzNXcq"
          target="_blank"
        >
          <DiscordLogoWhite />
        </a>
        <a
          :class="[
            $style.link_elem,
            $style.github_logo,
            $style.logo,
            $style.element,
          ]"
          href="https://github.com/Waujito"
          target="_blank"
        >
          <img src="/img/GitHub-Mark-Light-64px.png" />
        </a>
        <a
          :class="[
            $style.link_elem,
            $style.telegram_logo,
            $style.logo,
            $style.element,
          ]"
          href="https://t.me/cat_bot_ds"
          target="_blank"
        >
          <TelegramLogo />
        </a>
      </div>
      <div :class="$style.copyrights">
        <div :class="$style.copyright" style="margin-bottom: 5px">
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
        <div :class="$style.copyright">
          © Vetrov V. D., 2021 - 2022 {{ $t("rights_reserved") }}
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.footer {
  background-color: rgb(33, 36, 38);
  width: 100%;

  z-index: 999999;

  * {
    user-select: none;
  }

  .up_grid {
    width: 100%;
    min-height: 100px;
    display: grid;
    gap: 10px;
    max-height: 260px;
    grid-template-columns: repeat(auto-fit, minmax(174px, 1fr));

    margin-bottom: 25px;

    .grid_elem,
    .grid_dropdown_elem {
      display: flex;

      margin: 5px;

      max-height: 60px;

      align-items: center;
      justify-content: center;
    }

    .grid_elem,
    .grid_dropdown_elem .dropdown_title {
      display: flex;

      padding: 15px;

      align-items: center;
      justify-content: center;

      background-color: $dark_3;
      border-radius: 5px;

      @extend %hover_1;

      color: $font_color_1;

      cursor: pointer;
    }

    .grid_dropdown_elem {
      .footer_languages {
        background: $dark_3;
        box-shadow: $box_shadow_1;
        border-radius: $border_radius_1;

        margin-bottom: 10px;

        padding: 5px 10px;

        & > * {
          display: flex;
          padding: 5px 10px;

          color: $font_color_2;

          border-radius: $border_radius_1;

          @include hover($hover_3);

          span {
            margin-right: 5px;
          }

          cursor: pointer;
        }
      }
    }
  }

  .down_panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10px;

    align-items: flex-end;

    @media (max-width: 480px) {
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;

      .copyrights {
        justify-content: flex-start !important;
        align-items: flex-start !important;
        text-align: start !important;
      }
      .links_panel {
        margin-top: 20px;
      }
    }

    .links_panel {
      display: flex;
      flex-direction: row;
      align-items: center;

      .logo {
        background: none;

        margin-left: 10px;

        > * {
          max-height: 40px;
          max-width: 40px;
        }
      }
    }
    .copyrights {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      text-align: end;
      user-select: text;

      font-size: 14px;
      font-family: "Open Sans";
      font-weight: 400;
      color: $font_color_2;

      margin-left: 20px;

      a {
        text-decoration: underline;
        color: rgb(166, 170, 181);
      }

      .copyright {
      }
    }
  }
}
</style>
