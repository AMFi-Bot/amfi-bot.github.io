<script setup lang="ts"></script>

<template>
  <div class="saveChangesAlert" v-show="true">
    <div class="unsavedText">Careful! You have unsaved changes</div>
    <div class="saveButtons">
      <div class="resetChangesButton">Reset</div>
      <div class="saveChangesButton green_button">Save changes</div>
    </div>
  </div>
</template>

<style lang="scss">
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
    }
  }
}
</style>
