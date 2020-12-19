<template>
  <div v-show="Global.collapse" id="container-panel">
    <div
      id="container-setting-button"
      class="iconfont icon-setting"
      @click="showSetting()"
    ></div>
    <div id="container-control">
      <Button label="折叠" @click="collapsePanel()"></Button>
      <Button
        label="Github"
        onclick="window.open('https://github.com/SSmJaE/UnipusHelper','_blank')"
      ></Button>
      <Button
        label="交流群"
        onclick="window.open('https://jq.qq.com/?_wv=1027&k=AyERrFvN','_blank')"
      ></Button>
    </div>
    <div id="container-messages">
      <div
        v-for="(message, index) in Global.messages"
        :key="index"
        class="container-message"
        :class="message.type"
        @click="autoCopy(message.info)"
        v-html="message.type == 'hr' ? '<hr>' : message.info"
      >
        <!-- {{ message.info }} -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";

import { Global } from "../global";
import { copyToClipboard } from "@utils/common";

import Button from "./components/Button.vue";

@Component({
  components: {
    Button,
  },
})
export default class Panel extends Vue {
  Global = Global;

  autoCopy(text: string) {
    if (Global.USER_SETTINGS.autoCopy) copyToClipboard(text);
  }

  showSetting() {
    let settingBase = document.querySelector(
      "#container-setting-base"
    ) as HTMLElement;
    settingBase.style.display =
      settingBase.style.display == "table" ? "none" : "table";
  }

  collapsePanel() {
    this.Global.collapse = false;
  }
}
</script>

<style>
#unipus-helper {
  top: 100px;
  left: 100px;
  z-index: 9999;
  position: fixed;

  min-width: 350px;
  max-width: 500px;

  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);

  font-family: Georgia, "Times New Roman", Times, serif;
  line-height: normal;
}

#unipus-helper:not(:hover) {
  filter: brightness(98%);
}

#container-title {
  cursor: grab;
  user-select: none;

  font-size: 28px;
  text-align: center;

  background: rgba(0, 0, 0, 0);
}

#container-setting-button {
  position: absolute;
  top: 3px;
  left: 3px;

  font-size: 23px;

  cursor: pointer;
}

#container-setting-button:hover {
  color: rgb(0, 230, 227);
}

#container-control button {
  font-size: 16px;
}

#container-messages {
  /* margin: 0 10px; */
  border: black 1px solid;
  max-height: 400px;
  overflow-y: auto;
}

.container-message {
  font-size: 18px;
  /* white-space: pre-wrap; */
  position: relative;
  animation: content_slide_in 0.5s;
  animation-timing-function: ease-out;

  margin: 5px 10px;
  padding: 0px;
  padding-bottom: 3px;
  line-height: 120%;
}
.container-message:hover:not(hr) {
  padding-bottom: 1px;
  border-bottom: 2px solid black;
  cursor: copy;
}

#container-messages .error {
  color: red;
}

#container-messages .success {
  color: green;
}

#container-messages .info {
  color: #2196f3;
}

#container-messages hr {
  margin: 5px 0px;
}

@keyframes content_slide_in {
  from {
    left: -50%;
    opacity: 0;
  }

  to {
    left: 0%;
    opacity: 1;
  }
}
</style>
