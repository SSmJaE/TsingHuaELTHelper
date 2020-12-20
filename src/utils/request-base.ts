import { injectToContent } from "./common";

export type METHOD = "POST" | "DELETE" | "PUT" | "PATCH" | "GET" | "HEAD" | "OPTIONS";

export interface Init {
    method?: METHOD;
    headers?: object;
    body?: string | object;
    /**注意query不能是嵌套对象，必须是扁平的 */
    query?: string | StringifiableRecord;
    [propName: string]: any;
}

interface GM_xmlhttpResponse {
    /**
     * the final URL after all redirects from where the data was loaded
     */
    finalUrl: string;
    /**
     * the ready state
     */
    readyState: number;
    /**
     *the request status
     */
    status: number;
    /**
     * the request status text
     */
    statusText: string;
    /**
     * the request response headers
     */
    responseHeaders: object;
    /**
     * the response data as object if details.responseType was set
     */
    response: object;
    /**
     * the response data as XML document
     */
    responseXML: XMLDocument;
    /**
     *the response data as plain string
     */
    responseText: string;
}

export interface CustomResponse extends GM_xmlhttpResponse {
    json(): Promise<any>;
    text(): Promise<string>;
}

import { BASE_URL } from "@src/global";
import * as queryString from "query-string";

declare let GM_xmlhttpRequest: any;
process.env.CRX && function GM_xmlhttpRequest() {};

/**原生fetch并不支持query，所以还是要自己实现 */
function generateFinalUrlWithQueryParams(url: string, query: StringifiableRecord) {
    for (const [, value] of Object.entries(query || {})) {
        if (typeof value === "object")
            throw new Error("query params不应为嵌套对象，拍平或者手动序列化子对象");
    }

    const absoluteUrl = url.startsWith("/") ? BASE_URL + url : url;
    return queryString.stringifyUrl({ url: absoluteUrl, query: query });
}

/**对GM_xmlhttpRequest的封装，以实现一致的fetch风格的request通用接口 */
function requestOfGm(
    url: string,
    init: Init = { method: "GET", headers: {}, body: undefined, query: undefined },
) {
    console.error("in gm request");
    //可以直接传入object，而不用每次手动stringify
    let body = typeof init.body === "object" ? JSON.stringify(init.body) : init.body;

    return new Promise<CustomResponse>((resolve, reject) => {
        GM_xmlhttpRequest({
            url: generateFinalUrlWithQueryParams(url, init.query as StringifiableRecord),
            method: init.method,
            headers: init.headers,
            data: body,
            timeout: 5000,
            responseType: "json",
            onload(response: CustomResponse) {
                const code = response.status;
                if (code >= 200 && code < 300) {
                    response.json = () => new Promise<any>((resolve) => resolve(response.response));
                    response.text = () =>
                        new Promise<string>((resolve) => resolve(response.responseText));

                    resolve(response);
                } else reject(response);
            },
            onabort: (response: GM_xmlhttpResponse) => reject(response),
            onerror: (response: GM_xmlhttpResponse) => reject(response),
            ontimeout: (response: GM_xmlhttpResponse) => reject(response),
        });
    });
}

/**对crx sendMessage的封装，以实现一致的fetch风格的request通用接口 */
async function requestOfCrx(
    url: string,
    init: Init = { method: "GET", headers: {}, body: undefined, query: undefined },
): Promise<Response> {
    return new Promise<Response>(async (resolve, reject) => {
        const { body, query, ...realisticInit } = init;

        //todo background return interface
        const response = await injectToContent.request({
            type: "fetch",
            url: generateFinalUrlWithQueryParams(url, init.query as StringifiableRecord),
            init: {
                ...realisticInit,
                body: JSON.stringify(body),
            },
        });

        const text = response ? response.text : undefined;
        response.json = () => new Promise<any>((resolve) => resolve(JSON.parse(text)));
        response.text = () => new Promise<string>((resolve) => resolve(text));

        response.ok ? resolve(response) : reject(response);
    });
}

console.error("precess env crx" + process.env.CRX);
export default process.env.CRX ? requestOfCrx : requestOfGm;
