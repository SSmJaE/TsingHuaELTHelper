import { Global } from "../global";
import Communication from "./bridge";

export const injectToContent = process.env.CRX
    ? new Communication("client", "inject", "content")
    : ({} as Communication);

export function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**添加多条消息 */
export async function addMessage(message: Array<string | number> | Array<Message>): Promise<void>;
/**添加一条消息 */
export async function addMessage(message: string | number, type?: InfoType): Promise<void>;
export async function addMessage(
    message: Array<string | number> | Array<Message> | string | number,
    type: InfoType = "normal",
) {
    function scrollDown() {
        (<HTMLElement>document.querySelector("#container-messages")).scrollBy(0, 1000);
    }

    async function add(finalInfo: string, finalType: InfoType, single = true) {
        if (finalType !== "hr") {
            //除了添加分隔线以外的情况，消息都不应为空
            if (finalInfo === "") return;
        }
        Global.messages.push({ info: finalInfo, type: finalType });

        if (Global.USER_SETTINGS.autoSlide && single === true) {
            await sleep(10); //等待message渲染完成，不然不会拉到最底
            scrollDown();
        }
    }

    if (Array.isArray(message)) {
        for (const line of message) {
            if (typeof line === "object") {
                //Message[]
                await add(line.info, line.type, false);
            } else {
                //未提供消息类型，(string|number)[]
                await add(String(line), "normal", false);
            }
        }
        scrollDown();
    } else {
        //可能提供了type，所以用默认值参数
        await add(String(message), type);
    }
}

/**实现拖动，带边界检测*/
export function makeDraggable(handle: HTMLElement, container: HTMLElement) {
    function getProperty(ele: HTMLElement, prop: any) {
        return parseInt(window.getComputedStyle(ele)[prop]);
    }

    let draggable = false,
        pastX: number,
        pastY: number,
        containerWidth: number,
        containerHeight: number,
        containerLeft = getProperty(container, "left"),
        containerTop = getProperty(container, "top"),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

    handle.addEventListener(
        "mousedown",
        (e) => {
            handle.style.cursor = "grabbing";
            draggable = true;
            pastX = e.clientX;
            pastY = e.clientY;
            containerWidth = getProperty(container, "width");
            containerHeight = getProperty(container, "height");
        },
        false,
    );

    document.addEventListener("mousemove", (e) => {
        if (draggable === true) {
            let currentX = e.clientX,
                currentY = e.clientY,
                diffX = currentX - pastX,
                diffY = currentY - pastY;

            let targetX = containerLeft + diffX;
            let targetY = containerTop + diffY;

            if (targetX <= 0) targetX = 0;
            if (targetY <= 0) targetY = 0;
            if (targetX >= windowWidth - containerWidth) targetX = windowWidth - containerWidth;
            if (targetY >= windowHeight - containerHeight) targetY = windowHeight - containerHeight;

            container.style.left = targetX + "px";
            container.style.top = targetY + "px";
        }
    });

    handle.addEventListener(
        "mouseup",
        () => {
            handle.style.cursor = "grab";
            draggable = false;
            containerLeft = getProperty(container, "left");
            containerTop = getProperty(container, "top");
        },
        false,
    );

    //防止意外未退出拖动状态
    document.body.addEventListener(
        "keydown",
        (e) => {
            if (e.key === "Escape") {
                // console.log(e);
                handle.style.cursor = "grab";
                draggable = false;
                containerLeft = getProperty(container, "left");
                containerTop = getProperty(container, "top");
            }
        },
        false,
    );
}

/** 通过装饰器，实现请求失败时，输出定制化的提示信息
 *
 * 如果不对request进行装饰器包裹，异常直接输出至console
 *
 * 如果使用了装饰器，但是未提供message，输出默认值
 */
export function requestErrorHandler(message: string = "请求异常，稍后再试") {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            result.catch((error: Error) => {
                addMessage(`${message}`, "error");
                // addMessage(`${error}`, "error");
            });
            return result;
        };

        return descriptor;
    };
}

/**调用GM_setValue或者chrome.storage
 *
 * 如果调用的是GM_setValue，会对value进行JSON.stringify */
export async function setValue(key: string, value: any) {
    typeof GM_setValue === "function" || function GM_setValue() {};

    if (process.env.CRX) {
        await injectToContent.request({
            type: "setValue",
            key: key,
            value: value,
        });
    } else {
        GM_setValue(key, JSON.stringify(value));
    }
}

/**调用GM_getValue或者chrome.storage
 *
 * 如果调用的是GM_getValue，返回JSON.parse后的结果 */
export async function getValue(key: string, defaultValue?: any) {
    typeof GM_getValue === "function" || function GM_getValue() {};

    let returnValue: any;
    if (process.env.CRX) {
        returnValue = await injectToContent.request({
            type: "getValue",
            key: key,
            defaultValue: defaultValue,
        });

        console.error(returnValue);
    } else {
        const temp = GM_getValue(key, defaultValue);
        try {
            returnValue = JSON.parse(temp);
        } catch (error) {
            returnValue = temp;
        }
    }
    return returnValue;
}

/**针对带数字索引的答案 */
export async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text.replace(/^.*、/, ""));
}

/**格式化单元测试接口返回的html格式答案 */
export function clearHtmlTagAndSplit(text: string) {
    return text.split(/<(?:br|hr) *\/?>/).map((answer) => {
        let buffer = answer.replace(/<.*?>/g, "").replace(/&nbsp;/g, "");

        const temp = buffer.split(/:/);

        if (temp.length === 2) {
            const [index, answerText] = temp;
            const realIndex = index.padStart(2, "0");
            buffer = `${realIndex}、${answerText}`;
        }

        return buffer;
    });
}
