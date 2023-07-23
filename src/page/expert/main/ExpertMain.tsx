import { withConnect } from "rd-component";
import styles from "./ExpertMain.module.css";
import { ReactComponent as HiddenContent } from "@/assets/expert/hidden-content.svg";
import React from "react";

const ExpertMain: React.FC = () => {

    React.useEffect(() => {
        setTimeout(() => {
            let prevCursorOffset = -1;
            let resizing = false;
            const menu: any = document.getElementById("prjTree");
            const resizeBar: any = document.getElementById("hiddenContent");
            resizeBar.addEventListener("mousedown", () => {
                resizing = true
            });
            window.addEventListener("mousemove", handleResizeMenu);
            window.addEventListener("mouseup", () => {
                resizing = false
            });
     
            function handleResizeMenu(e:any) {
                if (!resizing) {
                    return
                }
                const {screenX} = e
                e.preventDefault()
                e.stopPropagation()
                if (prevCursorOffset === -1) {
                    prevCursorOffset = screenX
                } else if (Math.abs(prevCursorOffset - screenX) >= 5) {
                    menu.style.flex = `0 0 ${screenX}px`;
                    menu.style.maxWidth = "100vw";
                    prevCursorOffset = screenX;
                   
                }
            }
        },1500);
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.header}>header</div>
            <div className={styles.body}>
                <div id="prjTree" className={styles.prjTree}></div>
                <div>
                    <HiddenContent id="hiddenContent" className={styles.hiddenContent}/>
                </div>
                <div className={styles.editor}>editor</div>
                <div className={styles.preview}>preview</div>
            </div>
        </div>
    );
}

export default withConnect(ExpertMain);

