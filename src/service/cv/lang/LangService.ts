import store from "@/redux/store/store";
import { AxiosRequestConfig } from "axios";
import { XHRClient } from "rd-component";
import { CvGenActionType } from "@/redux/action/cv/CvGenAction";
import { LangActionType } from "@/redux/action/cv/lang/LangAction";

export function saveLang(params: any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/cv/Langs/v1',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = LangActionType[LangActionType.SAVE_LANG];
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

export function getLangList(cv_id: number) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/langs/v1?cv_id=' + cv_id,
    };
    const actionTypeString: string = LangActionType[LangActionType.GET_LANG_LIST];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function delLangItem(id: number) {
    const config: AxiosRequestConfig = {
        method: 'delete',
        url: '/cv/cv/langs/v1/item?lang_id=' + id,
    };
    const actionTypeString: string = LangActionType[LangActionType.DEL_LANG_ITEM];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function clearCurrentLang() {
    const actionTypeString: string = LangActionType[LangActionType.CLEAR_CURRENT_LANG];
    const localAction = {
        type: actionTypeString,
        data: {}
    };
    store.dispatch(localAction);
}
