import { Global } from "@src/global";
import { addMessage, sleep, setValue, getValue } from "@utils/common";

async function outputAnswers(answers: string[]) {
    let index = 1;
    for (const answer of answers) {
        await addMessage(`${String(index).padStart(2, "0")}、${answer}`);

        index++;
    }
}

import { Requests } from "./requests";

export async function handleHomework(doDetail: any) {
    const { questionType, answers } = await Requests.parseAnswers(doDetail);

    Global.messages = [];
    console.log(answers);
    outputAnswers(answers);
}
