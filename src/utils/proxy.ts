import requestBase, { Init, CustomResponse } from "./request-base";

interface RequestProxy {
    (url: string, init?: Init): Promise<Response> | Promise<CustomResponse>;
}

class RequestProxy extends Function {
    __self__: any;

    constructor() {
        super("...args", "return this.__self__.__call__(...args)");
        const self = this.bind(this);
        this.__self__ = self;
        return self;
    }

    __call__(url: string, init: Init = { method: "GET" }) {
        return requestBase(url, init);
    }

    post(url: string, init: Init = {}) {
        return requestBase(url, { ...init, method: "POST" });
    }
    delete(url: string, init: Init = {}) {
        return requestBase(url, { ...init, method: "DELETE" });
    }
    put(url: string, init: Init = {}) {
        return requestBase(url, { ...init, method: "PUT" });
    }
    patch(url: string, init: Init = {}) {
        return requestBase(url, { ...init, method: "PATCH" });
    }
    get(url: string, init: Init = {}) {
        return requestBase(url, { ...init, method: "GET" });
    }
    head(url: string, init: Init = {}) {
        return requestBase(url, { ...init, method: "HEAD" });
    }
    options(url: string, init: Init = {}) {
        return requestBase(url, { ...init, method: "OPTIONS" });
    }
}

/**提供类似axios的接口
 *
 * 既可以axios(url, init)——默认请求方式为get
 *
 * 也可以axios.get()    axios.post()
 */
const finalRequest = new RequestProxy();

export default finalRequest;
