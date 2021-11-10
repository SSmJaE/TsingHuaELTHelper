import { Global } from "@src/global";
import { addMessage, sleep, setValue, getValue } from "@utils/common";

import { solveQuestions } from "./solver";

async function outputAnswers(answers: string[]) {
    let index = 1;
    for (const answer of answers) {
        // if (Global.USER_SETTINGS.autoSolveNormal) {
        //     await sleep(Global.USER_SETTINGS.solveInterval);
        // }

        addMessage(`${String(index).padStart(2, "0")}、${answer}`);

        index++;
    }
}

import { Requests } from "./requests";

export async function handleQuestions(pageDetail: any, url: string) {
    const pageId = /pageId=(\w*)/.exec(url)![1];

    const response = await Requests.queryByPageId(pageId);

    let returnJson: any;

    if (response.status) {
        returnJson = response.data;
    } else {
        const data = await Requests.queryByPageDetail(pageDetail);
        returnJson = data;
    }

    const { questionType, answers } = returnJson;

    Global.messages = [];
    console.log(answers);
    outputAnswers(answers);

    // if (Global.USER_SETTINGS.autoSolveNormal && questionType !== "debug") {
    //     solveQuestions(questionType, answers);
    // }
}
