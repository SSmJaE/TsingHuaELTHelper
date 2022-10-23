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

export async function handleHomework(pageDetail: any, url: string) {
    const pageId = /id=(\w*)/.exec(url)![1];

    const response = await Requests.queryByPageId(pageId);

    let returnJson: any;

    if (response.status) {
        returnJson = response.data;
    } else {
        // const data = await Requests.queryByPageDetail(pageDetail);
        // returnJson = data;

        console.log("no answer");
    }

    const { questionType, answers } = returnJson;

    Global.messages = [];
    console.log(answers);
    outputAnswers(answers);
}
