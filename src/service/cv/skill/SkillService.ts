import store from "@/redux/store/store";
import { AxiosRequestConfig } from "axios";
import { XHRClient } from "rd-component";
import { CvGenActionType } from "@/redux/action/cv/CvGenAction";
import { SkillActionType } from "@/redux/action/cv/skill/SkillAction";

export function saveSkill(params: any) {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: '/cv/cv/skills/v1',
        data: JSON.stringify(params)
    };
    const actionTypeString: string = SkillActionType[SkillActionType.SAVE_SKILL];
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

export function getSkillList(cv_id: number) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: '/cv/cv/skills/v1?cv_id=' + cv_id,
    };
    const actionTypeString: string = SkillActionType[SkillActionType.GET_SKILL_LIST];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function delSkillItem(id: number) {
    const config: AxiosRequestConfig = {
        method: 'delete',
        url: '/cv/cv/skills/v1/item?skill_id=' + id,
    };
    const actionTypeString: string = SkillActionType[SkillActionType.DEL_SKILL_ITEM];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function clearCurrentSkill() {
    const actionTypeString: string = SkillActionType[SkillActionType.CLEAR_CURRENT_SKILL];
    const localAction = {
        type: actionTypeString,
        data: {}
    };
    store.dispatch(localAction);
}
