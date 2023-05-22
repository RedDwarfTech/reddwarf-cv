import store from "@/redux/store/store";
import { requestWithActionType } from "rd-component";
import { AxiosRequestConfig } from "axios";
import { EduActionType } from "@/redux/action/cv/edu/EduAction";

export function saveEdu(params: any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/cv/edu/v1',
        headers: { 
            'Accept': 'application/json',
            "x-access-token": "dddd",
            "user-id": "1",
            "app-id": "1",
            "device-id": "1",
        },
        data: JSON.stringify(params)
    };
    const actionTypeString: string = EduActionType[EduActionType.SAVE_EDU];
    return requestWithActionType(config, actionTypeString, store);
}

export function getEduList(cv_id: number) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/edu/v1?cv_id=' + cv_id,
        headers: { 
            'Accept': 'application/json',
            "x-access-token": "dddd",
            "user-id": "1",
            "app-id": "1",
            "device-id": "1",
        }
    };
    const actionTypeString: string = EduActionType[EduActionType.GET_EDU_LIST];
    return requestWithActionType(config, actionTypeString, store);
}