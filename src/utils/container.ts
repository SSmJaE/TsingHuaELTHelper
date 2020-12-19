import Vue from "vue";

//注册vue水波纹效果
import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

import { Global } from "@src/global";
import { makeDraggable } from "@utils/common";

import Panel from "@src/views/Panel.vue";
import Setting from "@src/views/Setting.vue";

// if (
//     location.href.includes("centercourseware.sflep.com") || //练习答题页面
//     location.href.includes("course.sflep.com/2019/test/") //考试答题页面
// ) {
//避免重复创建悬浮窗，先检测页面上是否已存在
if (!document.querySelector("#unipus-helper")) {
    //这部分相当于创建了一个原生页面
    let container = document.createElement("div");
    container.innerHTML = `
        <div id="unipus-helper">
            <div id="container-title">TsingHuaELT Helper</div>
            <div id="container-panel"></div>
        </div>
        <div id="container-setting-base"></div>
    `;
    document.body.appendChild(container);

    //实现双击展开
    const title = document.querySelector("#container-title") as HTMLElement;
    title.addEventListener(
        "dblclick",
        () => {
            Global.collapse = true;
        },
        false,
    );

    //应用拖动
    makeDraggable(title, document.querySelector("#unipus-helper") as HTMLElement);

    //挂载实例
    new Vue(Panel).$mount("#unipus-helper #container-panel");
    new Vue(Setting).$mount("#container-setting-base");
}
// }
