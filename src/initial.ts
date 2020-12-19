import swal from "sweetalert";

import { DEBUG_MODE } from "./global";
import { setValue, getValue } from "@utils/common";

//用户协议
(async () => {
    if (!DEBUG_MODE) {
        //sweat alert 2 在u校园上会占用整个屏幕，找不到解决方案，故弃用，使用sweat alert 1

        // let status = eval(getValue("acceptAgreement", "false"));

        // if (!status) {
        //     Swal.fire({
        //         title: "使用须知",
        //         heightAuto: false,
        //         width: 700,
        //         // <li>本脚本完全开源免费，基于GPL3.0，欢迎一起<a href="https://github.com/SSmJaE/WELearnHelper" target="_blank">开发</a></li>
        //         html: `
        //             <ul style="text-align: left">
        //                 <li>本脚本仅供个人学习交流使用，勿用于任何违法与商业行为</li>
        //                 <li>因使用本脚本造成的任何问题，均由使用者本人承担</li>
        //                 <li>反馈问题请带截图 + 题目链接 + 具体描述</li>
        //             </ul>
        //             `,
        //         icon: "warning",
        //         confirmButtonText: "接受",
        //         allowOutsideClick: false,
        //         showCancelButton: false,
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             Swal.fire({
        //                 title: "使用提示",
        //                 heightAuto: false,
        //                 width: 700,
        //                 html: `
        //                     <ul style="text-align: left;font-size: 20px;">
        //                         <li>此处仅包含部分使用方法，详情请自行阅读安装页面</li>
        //                         <li>点击齿轮进行功能设定</li>
        //                         <li>Unipus Helper”方可拖动悬浮窗</li>
        //                         <li>双击“Unipus Helper”展开悬浮窗</li>
        //                     </ul>
        //                     `,
        //                 icon: "info",
        //             });

        //             setValue("acceptAgreement", "true");
        //         }
        //     });
        // }

        const agreement = document.createElement("ul");
        agreement.style.textAlign = "left";
        agreement.innerHTML = `
        <li>本脚本仅供个人学习交流使用，勿用于任何违法与商业行为</li>
        <li>本脚本完全开源免费，基于GPL3.0，欢迎一起<a href="https://github.com/SSmJaE/UnipusHelper">开发</a></li>
        <li>因使用本脚本造成的任何问题，均由使用者本人承担</li>
        <li>反馈问题请带截图 + 具体描述</li>
    `;

        const hint = document.createElement("ul");
        hint.style.textAlign = "left";
        hint.innerHTML = `
        <li>此处仅包含部分使用方法，详情请自行阅读油猴安装页面/Github</li>
        <li>点击齿轮进行功能设定</li>
        <li>按住“Unipus Helper”方可拖动悬浮窗</li>
        <li>双击“Unipus Helper”展开悬浮窗</li>
    `;

        let status = await getValue("acceptAgreement", false);
        if (!status) {
            swal({
                title: "使用须知",
                content: agreement as any,
                icon: "warning",
                buttons: {
                    confirm: {
                        text: "接受",
                        value: true,
                    },
                },
                closeOnClickOutside: false,
                closeOnEsc: false,
            }).then((value) => {
                if (value) {
                    swal({
                        title: "使用提示",
                        content: hint as any,
                        icon: "info",
                    });
                    setValue("acceptAgreement", true);
                }
            });
        }
    }
})();
