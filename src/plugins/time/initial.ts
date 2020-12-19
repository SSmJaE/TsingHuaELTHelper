import { recur, handleAlert } from "./main";
import { Global } from "@src/global";

if (location.href.includes("https://ucontent.unipus.cn/_pc_default/pc.html?")) {
    if (Global.USER_SETTINGS.autoRefresh) {
        recur();
        handleAlert();
    }
}
