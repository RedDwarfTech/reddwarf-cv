import store from "@/redux/store/store";
import { AxiosRequestConfig } from "axios";
import { CvActionType } from "@/redux/action/cv/CvAction";
import { XHRClient } from "rd-component";

export function getUserCvList() {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/v1/cv/list',
    };
    const actionTypeString: string = CvActionType[CvActionType.USER_CV_LIST];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function delUserCv(cv_id: number) {
    const config: AxiosRequestConfig = {
        method: 'delete',
        url: '/cv/cv/v1/cv/' + cv_id,
    };
    const actionTypeString: string = CvActionType[CvActionType.DELETE_USER_CV];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function getCvSummary(cv_id: number) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/v1/summary/' + cv_id,
    };
    const actionTypeString: string = CvActionType[CvActionType.EDIT_CV_SUMMAY];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function clearCvSummary() {
    const actionTypeString: string = CvActionType[CvActionType.CLEAR_CV_SUMMAY];
    const localAction = {
        type: actionTypeString,
        data: {}
    };
    store.dispatch(localAction);
}

export function copyCvSummary(params:any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/cv/v1/cv-copy',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = CvActionType[CvActionType.COPY_CV_SUMMAY];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function editCvSummary(params: any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/cv/v1/cv',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = CvActionType[CvActionType.EDIT_CV_SUMMAY];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function updateCvMainOrder(params: any) {
    const config: AxiosRequestConfig = {
        method: 'put',
        url: '/cv/cv/v1/cv-order',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = CvActionType[CvActionType.UPDATE_CV_ORDER];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function setCurrCvTpl(params: any) {
    const config = {
        method: 'put',
        url: "/cv/cv/v1/tpl",
        data: JSON.stringify(params),
    };
    const actionTypeString: string = CvActionType[CvActionType.SET_CURR_TPL];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}