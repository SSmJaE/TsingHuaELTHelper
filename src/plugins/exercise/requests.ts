import request from "@utils/proxy";
import { requestErrorHandler } from "@utils/common";

export class Requests {
    @requestErrorHandler("练习答案查询异常")
    static async parseAnswers(pageDetail: any) {
        const response = await request.post("/exercise/", {
            body: pageDetail,
        });
        const returnJson = (await response.json()) as any;
        return returnJson.data;
    }
}
