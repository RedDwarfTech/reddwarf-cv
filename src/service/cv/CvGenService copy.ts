import store from "@/redux/store/store";
import { FileActionType } from "rd-component";

export function clearPhoto() {
    const actionTypeString: string = FileActionType[FileActionType.FILE_CLEAR];
    const action = {
        type: actionTypeString,
        data: null
    };
    store.dispatch(action);
}
