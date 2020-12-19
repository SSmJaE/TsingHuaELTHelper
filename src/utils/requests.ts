import request from "@utils/proxy";
import {
    requestErrorHandler,
    addMessage,
    setValue,
    getValue,
    clearHtmlTagAndSplit,
} from "@utils/common";

interface GetTokenReturn {
    openId: string;
    token: string;
}

interface IsExistUserReturn {
    status: boolean;
    message: string;
}

interface CheckVersionReturn {
    status: boolean;
    message: string;
}

export class Requests {
    @requestErrorHandler("脚本版本查询异常")
    static async checkVersion(version: string) {
        const CURRENT_DATE = new Date().toISOString().slice(0, 10);
        const LAST_CHECK_DATE = await getValue("LAST_CHECK_DATE", "2020-01-01");

        if (CURRENT_DATE > LAST_CHECK_DATE) {
            const response = await request("/initial/", {
                method: "POST",
                body: {
                    version: version,
                },
            });
            const checkVersionReturnJson = (await response.json()) as CheckVersionReturn;

            if (checkVersionReturnJson.status) {
                addMessage(checkVersionReturnJson.message, "info");
                setValue("LAST_CHECK_DATE", CURRENT_DATE);
            }
        }
    }
}
