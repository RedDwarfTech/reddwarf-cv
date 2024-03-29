import { withConnect } from "rd-component";
import styles from "./ExpertMain.module.css";
import { ReactComponent as HiddenContent } from "@/assets/expert/hidden-content.svg";
import React, { useRef } from "react";

const ExpertMain: React.FC = () => {
    const divRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        resizeLeft("hiddenContentLeft", "prjTree");
        resizeRight("hiddenContentRight", "editor");
    }, []);

    const resizeLeft = (resizeBarName: string, resizeArea: string) => {
        setTimeout(() => {
            let prevCursorOffset = -1;
            let resizing = false;
            const menu: any = document.getElementById(resizeArea);
            const resizeBar: any = document.getElementById(resizeBarName);
            resizeBar.addEventListener("mousedown", () => {
                resizing = true
            });
            window.addEventListener("mousemove", handleResizeMenu);
            window.addEventListener("mouseup", () => {
                resizing = false
            });

            function handleResizeMenu(e: any) {
                if (!resizing) {
                    return
                }
                const { screenX } = e
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
        }, 1500);
    }

    const resizeRight = (resizeBarName: string, resizeArea: string) => {
        setTimeout(() => {
            let prevCursorOffset = -1;
            let resizing = false;
            const menu: HTMLElement | null = document.getElementById(resizeArea);
            const resizeBar: any = document.getElementById(resizeBarName);
            resizeBar.addEventListener("mousedown", () => {
                resizing = true
            });
            window.addEventListener("mousemove", handleResizeMenu);
            window.addEventListener("mouseup", () => {
                resizing = false
            });

            function handleResizeMenu(e: any) {
                if (!resizing || menu == null) {
                    return
                }
                if (!divRef.current) {
                   return;  
                }
                const prjTreeWidth = divRef.current.offsetWidth;
                const { screenX } = e
                e.preventDefault()
                e.stopPropagation()
                if (prevCursorOffset === -1) {
                    prevCursorOffset = screenX
                } else if (Math.abs(prevCursorOffset - screenX) >= 5) {
                    menu.style.flex = `0 0 ${screenX - prjTreeWidth}px`;
                    menu.style.maxWidth = "100vw";
                    prevCursorOffset = screenX;
                }
            }
        }, 1500);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>header</div>
            <div className={styles.body}>
                <div id="prjTree" ref={divRef} className={styles.prjTree}>
                </div>
                <div>
                    <HiddenContent id="hiddenContentLeft" className={styles.hiddenContent} />
                </div>
                <div id="editor" className={styles.editor}>editor</div>
                <div>
                    <HiddenContent id="hiddenContentRight" className={styles.hiddenContent} />
                </div>
                <div id="preview" className={styles.preview}>preview</div>
            </div>
        </div>
    );
}

export default withConnect(ExpertMain);

