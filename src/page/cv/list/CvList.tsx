import { Avatar, Card, Modal, message } from "antd";
import styles from "./CvList.module.css";
import React, { useState } from "react";
import { copyCvSummary, delUserCv, getUserCvList } from "@/service/cv/CvService";
import { useSelector } from "react-redux";
import Meta from "antd/es/card/Meta";
import { v4 as uuid } from 'uuid';
import { Cv } from "@/model/cv/Cv";
import { useNavigate } from "react-router-dom";
import Header from "@/component/header/Header";
import addIcon from "@/assets/cv/list/add_icon.png"
import demoIcon from "@/assets/cv/list/cv_demo.jpeg"
import { UserService } from "rd-component";
import { CopyOutlined, DeleteOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";
import { AppState } from "@/redux/types/AppState";
import { ResponseHandler } from "rdjs-wheel";

const CvList: React.FC = () => {

    const { userCvList } = useSelector((state: AppState) => state.cv);
    const [userCv, setUserCv] = useState<Cv[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (UserService.isLoggedIn()) {
            getUserCvList();
        }
    }, []);

    React.useEffect(() => {
        setUserCv(userCvList);
    }, [userCvList]);

    const handleCvDel = (item: Cv) => {
        Modal.confirm({
            title: '删除确认',
            content: '确定要永久删除记录吗？删除后无法恢复',
            onOk() {
                delUserCv(item.id);
            },
            onCancel() {

            },
        });
    }

    const handleCopyCv = (item: Cv) => {
        Modal.confirm({
            title: '复制简历',
            content: '确定要复制简历吗？复制简历会复制一份相同的简历，适合针对某一份心仪的工作对简历进行微调',
            onOk() {
                const params = {
                    id: item.id,
                };
                copyCvSummary(params).then((res) => {
                    if (ResponseHandler.responseSuccess(res)) {
                        message.success("复制成功");
                        getUserCvList();
                    }
                });
            },
            onCancel() {
            }
        });
    }

    const handleCvAdd = () => {
        if (UserService.isLoggedIn()) {
            navigate('/exp');
        } else {
            message.warning("当前还未登录，登录后新增简历");
        }
    }

    const navToSettings = (cvItem: Cv) => {
        navigate('/setting-cv', {
            state: cvItem,
        });
    }

    const renderUserList = () => {
        const cvList: JSX.Element[] = [];
        if (userCv && userCv.length > 0 && (userCv instanceof Array)) {
            userCv.forEach((item: Cv) => {
                cvList.push(
                    <Card
                        hoverable
                        style={{ width: 320, marginBottom: "100px" }}
                        key={uuid()}
                        cover={<img alt="example" src={demoIcon} />}
                        actions={[
                            <EditOutlined key="edit" onClick={() => navigate('/exp', { state: item })} />,
                            <SettingOutlined key="setting" onClick={() => navToSettings(item)} />,
                            <CopyOutlined key="setting" onClick={() => handleCopyCv(item)} />,
                            <DeleteOutlined key="delete" onClick={() => handleCvDel(item)} />,
                        ]}
                    >
                        <Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                            description={item.remark}
                            title={item.cv_name} />
                    </Card>
                );
            });
        }
        cvList.push(
            <div key={uuid()} className={styles.addCv}>
                <img alt="example" src={addIcon} onClick={() => handleCvAdd()} />
            </div>
        );
        return cvList;
    }

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.cvarea}>
                    {renderUserList()}
                </div>
            </div>
        </div>
    );
}

export default CvList;