import store from "@/redux/store/store";
import { UserActionType, XHRClient } from "rd-component";

export function doSendVerifyCode(params: any) {
    const config = {
        method: 'post',
        url: "/cvpub/user/sms",
        data: JSON.stringify(params)
    };
    const actionTypeString: string = UserActionType[7];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}