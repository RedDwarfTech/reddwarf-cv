import store from "@/redux/store/store";
import { UserActionType, XHRClient } from "rd-component";

export function doSendVerifyCode(params: any) {
    const config = {
        method: 'post',
        url: "/cvpub/user/sms/reset-pwd",
        data: JSON.stringify(params)
    };
    const actionTypeString: string = UserActionType[7];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function doResetPwd(params: any) {
    const config = {
        method: 'patch',
        url: "/cvpub/user/set/reset-pwd",
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(params)
    };
    const actionTypeString: string = UserActionType[8];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}