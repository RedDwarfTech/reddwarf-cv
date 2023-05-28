import store from "@/redux/store/store";
import { AxiosRequestConfig } from "axios";
import { WorkActionType } from "@/redux/action/cv/work/WorkAction";
import { XHRClient } from "rd-component";
import { CvActionType } from "@/redux/action/cv/CvAction";
import { CvGenActionType } from "@/redux/action/cv/CvGenAction";

export function saveWork(params: any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/cv/work/v1',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = WorkActionType[WorkActionType.SAVE_WORK];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function submitRenderTask(params: any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/gen/v1/submit',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = CvGenActionType[CvGenActionType.SUBMIT_TASK];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function getWorkList(cv_id: number) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/work/v1?cv_id=' + cv_id,
    };
    const actionTypeString: string = WorkActionType[WorkActionType.GET_WORK_LIST];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function delWorkItem(id: number) {
    const config: AxiosRequestConfig = {
        method: 'delete',
        url: '/cv/cv/work/v1/item?work_id=' + id,
    };
    const actionTypeString: string = WorkActionType[WorkActionType.DEL_WORK_ITEM];
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