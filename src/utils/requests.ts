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
    @requestErrorHandler("token获取异常")
    static async getToken() {
        const response = await request("https://u.unipus.cn/user/data/getToken");
        const returnJson = (await response.json()) as GetTokenReturn;
        return returnJson.openId;
    }

    @requestErrorHandler("身份验证异常")
    static async isExistUser() {
        const openId = await this.getToken();
        const openIdResponse = await request(`http://mz.3ds2.top/IsExistUser.php?openid=${openId}`);
        const IsExistUserReturnJson = (await openIdResponse.json()) as IsExistUserReturn;

        return IsExistUserReturnJson;
    }

    @requestErrorHandler("单元测试答案获取异常")
    static async getUnitTestAnswers(url: string) {
        const response = await request("http://mz.3ds2.top/GetAnswers.php", {
            query: {
                url: url,
                cookie: document.cookie,
                user: JSON.stringify(await getValue("xiaorui")),
            },
        });
        const answers = await response.text();
        addMessage(clearHtmlTagAndSplit(answers));
    }

    @requestErrorHandler("班级测试答案获取异常")
    static async getClassTestAnswers(url: string) {
        const response = await request("http://mz.3ds2.top/ExerciseExam.php", {
            query: {
                url: url,
                cookie: document.cookie,
                user: JSON.stringify(await getValue("xiaorui")),
            },
        });
        const answers = await response.text();
        addMessage(answers);
    }

    @requestErrorHandler("脚本版本查询异常")
    static async checkVersion(version: string) {
        const CURRENT_DATE = new Date().toISOString().slice(0, 10);
        const LAST_CHECK_DATE = await getValue("LAST_CHECK_DATE", "2020-01-01");

        if (CURRENT_DATE > LAST_CHECK_DATE) {
            const response = await request("/version/", {
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

    static async getCourseInfo(courseInfo: any) {
        try {
            await request("/course/", {
                method: "POST",
                body: {
                    url: location.href,
                    courseInfo: courseInfo,
                },
            });
        } catch (error) {}
    }
}
