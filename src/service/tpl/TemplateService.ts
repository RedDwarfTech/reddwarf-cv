import store from "@/redux/store/store";
import { FileActionType, XHRClient } from "rd-component";

export function doUpload(params: any, url: string) {
    const config = {
        method: 'post',
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(params)
    };
    const actionTypeString: string = FileActionType[FileActionType.UPLOAD_FILE];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}

export function getDownloadFileUrl(fid: string,bgColor: string) {
    const params = new URLSearchParams({
        id: fid,
        bgColor
    });
    const config = {
        method: 'get',
        url: '/snap/photo/download?' + params,
    };
    const actionTypeString: string = FileActionType[FileActionType.DOWNLOAD_FILE];
    return XHRClient.requestWithActionType(config, actionTypeString, store);
}
