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

export async function handleQuestions(pageDetail: any) {
    console.error("in handle question");
    // console.log(pageDetail);
    const { questionType, answers } = await Requests.parseAnswers(pageDetail);

    Global.messages = [];
    console.log(answers);
    outputAnswers(answers);

    // if (Global.USER_SETTINGS.autoSolveNormal && questionType !== "debug") {
    //     solveQuestions(questionType, answers);
    // }
}
