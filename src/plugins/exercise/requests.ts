import request from "@utils/proxy";
import { requestErrorHandler } from "@utils/common";

export class Requests {
    @requestErrorHandler("练习答案查询异常")
    static async queryByPageId(pageId: string) {
        console.error("in parse answer request");
        const response = await request.post<ICommonResponse<IAnswer>>("/query/", {
            body: {
                queryType: 0,
                pageId: pageId,
            },
        });

        return await response.json();
    }

    @requestErrorHandler("练习答案查询异常", "both")
    static async queryByPageDetail(pageDetail: any) {
        console.error("in parse answer request");
        const response = await request.post<ICommonResponse<IAnswer>>("/query/", {
            body: {
                queryType: 1,
                pageDetail: pageDetail,
            },
        });

        const returnJson = await response.json();

        if (returnJson.status === false) {
            throw new Error(returnJson.error);
        } else {
            return returnJson.data;
        }
    }
}
