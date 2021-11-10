import request from "@utils/proxy";
import { requestErrorHandler, addMessage, setValue, getValue } from "@utils/common";
import { VERSION } from "@src/global";

interface InitialReturn {
    status: boolean;
    message: string;
}

export class Requests {
    @requestErrorHandler("脚本版本查询异常")
    static async checkVersion() {
        const hasChecked = sessionStorage.getItem("LAST_CHECK_DATE");

        if (!hasChecked) {
            const response = await request.post("/version/", {
                body: {
                    version: VERSION,
                },
            });

            const returnJson = await response.json();

            if (returnJson.status === false) {
                throw new Error(returnJson.error);
            } else {
                addMessage(returnJson.data, "info");

                sessionStorage.setItem("LAST_CHECK_DATE", new Date().toISOString());
            }
        }
    }
}
