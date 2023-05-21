import store from "@/redux/store/store";
import { requestWithActionType } from "rd-component";
import { AxiosRequestConfig } from "axios";
import { CvActionType } from "@/redux/action/cv/CvAction";

export function getUserCvList() {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/v1/cv/list',
        headers: { 
            'Accept': 'application/json',
            "x-access-token": "dddd",
            "user-id": "1",
            "app-id": "1",
            "device-id": "1",
        }
    };
    const actionTypeString: string = CvActionType[CvActionType.USER_CV_LIST];
    return requestWithActionType(config, actionTypeString, store);
}