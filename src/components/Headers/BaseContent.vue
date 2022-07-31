<template>
  <div class="header">
    <div class="menu_panel">
      <RouterLink class="bot_name" to="/">AMFi-Bot</RouterLink>
      <div class="menu_ops">
        <a href="/tutorials">
          <span>{{ $t("tutorials") }}</span>
        </a>

        <a href="/premium" class="premium">
          <span>{{ $t("premium") }}</span>
          <img src="/img/premium-yellow.svg" class="premium_icon" alt="" />
        </a>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
