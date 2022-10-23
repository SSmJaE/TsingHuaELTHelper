import request from "@utils/proxy";
import { handleQuestions } from "./main";

//对于油猴脚本来说，unsafeWindow是必须的，不然装饰器无法正常hook
if (!process.env.CRX) {
    window = <Window & typeof globalThis>unsafeWindow;
}

(function() {
    // console.log(1234543312);
    const origOpen = XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function() {
        this.addEventListener("load", function() {
            if (/com\/tsenglish\/textbook\/content_detail/.test(this.responseURL)) {
                handleQuestions(JSON.parse(this.responseText),this.responseURL);
            }
        });
        return origOpen.apply(this, arguments as any);
    };
})();

// let lastUrl = "";

// setInterval(async () => {
//     // console.error(location.href);
//     // console.error("in interval");
//     try {
//         // https://www.tsinghuaelt.com/course-study-student/172/17074/338697/5fa0fa32eea79333a6e01daa
//         // https://www.tsinghuaelt.com/tsenglish/textbook/pageDetail?pageId=5d2d4cdfa4dff330af57d71b&courseId=17074&clientTime=50cd2531-8c17-fd64-7bab-c826a2580b15&diResU=338697
//         const tags = location.href.split("/");
//         const pageId = tags[tags.length - 1];
//         const diResU = tags[tags.length - 2];
//         const courseId = tags[tags.length - 3];
//         // console.error("in interval2");

//         if (lastUrl !== location.href) {
//             const response = await request(
//                 "https://www.tsinghuaelt.com/tsenglish/textbook/pageDetail",
//                 {
//                     cache: "force-cache",
//                     headers: {
//                         referer: location.href,
//                     },
//                     query: {
//                         pageId,
//                         diResU,
//                         courseId,
//                     },
//                 },
//             );
//             console.log(response);
//         }
//         // console.error("in interval3");

//         lastUrl = location.href;
//     } catch (error) {
//         console.error("非作答页面");
//     }
// }, 2000);
// https://www.tsinghuaelt.com/tsenglish/textbook/pageDetail?pageId=5d2d6954a4dff3690ceb1798&courseId=17074&clientTime=772797db-a9fb-8c55-1f8d-9896522575e4&diResU=338697
// https://www.tsinghuaelt.com/tsenglish/textbook/pageDetail?courseId=17074&diResU=338697&pageId=5fa0fa32eea79333a6e01dc0
