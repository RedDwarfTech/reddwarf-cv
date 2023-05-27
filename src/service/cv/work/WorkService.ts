import store from "@/redux/store/store";
import { AxiosRequestConfig } from "axios";
import { EduActionType } from "@/redux/action/cv/edu/EduAction";
import { WorkActionType } from "@/redux/action/cv/work/WorkAction";
import { XHRClient } from "rd-component";

export function saveWork(params: any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/cv/work/v1',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = WorkActionType[WorkActionType.SAVE_WORK];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function getWorkList(cv_id: number) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/edu/v1?cv_id=' + cv_id,
    };
    const actionTypeString: string = EduActionType[EduActionType.GET_EDU_LIST];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function delWorkItem(id: number) {
    const config: AxiosRequestConfig = {
        method: 'delete',
        url: '/cv/cv/work/v1/item?work_id=' + id,
    };
    const actionTypeString: string = EduActionType[EduActionType.DEL_EDU_ITEM];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function clearWork() {
    const actionTypeString: string = WorkActionType[WorkActionType.CLEAR_WORK];
    const localAction = {
        type: actionTypeString,
        data: {}
    };
    store.dispatch(localAction);
}