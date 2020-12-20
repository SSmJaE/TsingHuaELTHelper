import request from "@utils/proxy";
import { requestErrorHandler } from "@utils/common";

export class Requests {
    @requestErrorHandler("测试答案查询异常")
    static async parseAnswers(pageDetail: any) {
        console.error("in parse answer request");
        const response = await request("/homework/", {
            method: "POST",
            body: pageDetail,
        });

        const returnJson = (await response.json()) as any;
        return returnJson.data;
    }
}
