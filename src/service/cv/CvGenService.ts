import { CvGenActionType } from "@/redux/action/cv/CvGenAction";
import store from "@/redux/store/store";
import { AxiosRequestConfig } from "axios";
import {  XHRClient } from "rd-component";

export function getCvGenPage() {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/gen/v1/page',
    };
    const actionTypeString: string = CvGenActionType[CvGenActionType.CV_GEN_PAGE];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function getCvGenList() {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/gen/v1/list',
    };
    const actionTypeString: string = CvGenActionType[CvGenActionType.CV_GEN_LIST];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function delGen(id: number) {
    const config: AxiosRequestConfig = {
        method: 'delete',
        url: '/cv/gen/v1/' + id,
    };
    const actionTypeString: string = CvGenActionType[CvGenActionType.DEL_CV_GEN];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function checkGenStatus(ids: string) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/gen/v1/status?ids=' + ids,
    };
    const actionTypeString: string = CvGenActionType[CvGenActionType.CHECK_GEN_STATUS];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function getSrc(id: number) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/gen/v1/src?id=' + id,
    };
    const actionTypeString: string = CvGenActionType[CvGenActionType.GET_TEX_SRC];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}