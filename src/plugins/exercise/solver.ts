import * as $ from "jquery";

import { sleep, addMessage } from "@utils/common";
import { Global } from "@src/global";

function generateRandomInterval() {
    let interval = Math.random() * Global.USER_SETTINGS.solveIntervalMax;
    interval =
        interval < Global.USER_SETTINGS.solveIntervalMin
            ? Global.USER_SETTINGS.solveIntervalMin
            : interval;
    return interval;
}

function handleChoice(element: HTMLInputElement) {
    if (!element.checked) element.click();
}

// class MyQuery extends Function {
//     __self__: any;
//     element: Element | null = null;

//     constructor() {
//         super("...args", "return this.__self__.__call__(...args)");
//         const self = this.bind(this);
//         this.__self__ = self;

//         this.__call__ = this.__call__.bind(this);
//         this.eventTrigger = this.eventTrigger.bind(this);
//         return self;
//     }

//     public eventTrigger(event: string, init?: any) {
//         const e = new Event(event, init);
//         this.element!.dispatchEvent(e);
//     }

//     __call__(element: Element) {
//         this.element = element;
//         const query=new MyQuery()
//         return que;
//     }
// }

// const myQuery = new MyQuery();

function handleInput(element: Element, answerText: string) {
    // myQuery(element)
    //     .eventTrigger("click")
    //     .eventTrigger("focus")
    //     .eventTrigger("keydown")
    //     .eventTrigger("input");
    // // $(element)
    // //     .trigger("click")
    // //     .trigger("focus")
    // //     .trigger("keydown")
    // //     .trigger("input");
    // if (/input/i.test(element.tagName)) {
    //     console.error(12345);
    //     var setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!
    //         .set;
    //     (setValue as Function).call(element, answerText);

    //     myQuery(element).eventTrigger("input", { bubbles: true });
    //     // var e = new Event("input", { bubbles: true });
    //     // element.dispatchEvent(e);
    // } else {
    //     (element as HTMLTextAreaElement).value = answerText;
    // }
    // myQuery(element)
    //     .eventTrigger("keyup")
    //     .eventTrigger("change")
    //     .eventTrigger("blur");

    // $(element)
    //     .trigger("keyup")
    //     .trigger("change")
    //     .trigger("blur");
}

export async function solveQuestions(questionType: string, answers: string[]) {
    const inputOnPaper = document.querySelectorAll('input[class^="fill-blank--bc-input"]');
    const inputOnPaper3 = document.querySelectorAll('input[class^="cloze-text-pc--bc-input"]');
    const textareaOnPaper = document.querySelectorAll('textarea[class^="writing--textarea"]');
    const textareaOnPaper2 = document.querySelectorAll('div[class^="cloze-text-pc--fill-blank"]');

    for (const [questionIndex, answerText] of answers.entries()) {
        await sleep(generateRandomInterval());

        switch (questionType) {
            case "singleChoice":
                const optionIndex = answerText.toUpperCase().charCodeAt(0) - 65;
                handleChoice(
                    document.querySelectorAll(`[name=single-${questionIndex + 1}]`)[
                        optionIndex
                    ] as HTMLInputElement,
                );
                break;

            case "multiChoice":
                for (const option of answerText) {
                    const optionIndex = option.toUpperCase().charCodeAt(0) - 65;
                    handleChoice(
                        document.querySelectorAll(`[name=multichoice-${questionIndex + 1}]`)[
                            optionIndex
                        ] as HTMLInputElement,
                    );
                }
                break;

            case "input1":
            case "input2":
                handleInput(inputOnPaper[questionIndex], answerText);
                break;

            case "input3":
                handleInput(inputOnPaper3[questionIndex], answerText);
                break;

            case "textarea":
                handleInput(textareaOnPaper[questionIndex], answerText);
                break;

            case "textarea2":
                handleInput(
                    textareaOnPaper2[questionIndex].firstElementChild as Element,
                    answerText,
                );
                break;

            default:
                addMessage("此题型尚未实现自动答题，请在Github的Issue中反馈", "error");
                addMessage(`${questionType}`, "error");
                break;
        }
    }
}
