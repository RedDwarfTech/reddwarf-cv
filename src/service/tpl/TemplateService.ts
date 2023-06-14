import { CvTplActionType } from "@/redux/action/tpl/CvTplAction";
import store from "@/redux/store/store";
import { XHRClient } from "rd-component";

export function getTemplateList() {
    const config = {
        method: 'get',
        url: "/cv/tpl/v1/list",
    };
    const actionTypeString: string = CvTplActionType[CvTplActionType.GET_TPL_LIST];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}