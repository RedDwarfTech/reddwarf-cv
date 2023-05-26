import { Button, Card } from "antd";
import styles from "./CvList.module.css";
import React, { useState } from "react";
import { delUserCv, getUserCvList } from "@/service/cv/CvService";
import { useSelector } from "react-redux";
import Meta from "antd/es/card/Meta";
import { v4 as uuid } from 'uuid';
import { Cv } from "@/model/cv/Cv";
import { useNavigate } from "react-router-dom";
import Header from "@/component/header/Header";
import addIcon from "@/assets/cv/list/add_icon.png"
import demoIcon from "@/assets/cv/list/cv_demo.jpeg"

const CvList: React.FC = () => {

    const { userCvList } = useSelector((state: any) => state.cv);
    const [userCv, setUserCv] = useState<Cv[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getUserCvList();
    }, []);

    React.useEffect(() => {
        setUserCv(userCvList);
    }, [userCvList]);

    const handleCvDel = (item: Cv) => {
        delUserCv(item.id);
    }

    const renderUserList = () => {
        const cvList: JSX.Element[] = [];
        userCv.forEach((item: Cv) => {
            cvList.push(
                <Card
                    hoverable
                    style={{ width: 240 }}
                    key={uuid()}
                    cover={<img alt="example" src={demoIcon} />}
                >
                    <Meta title={item.cv_name} />
                    <div className={styles.cvOperation}>
                        <Button type="primary" onClick={() => navigate('/exp', { state: item })}>编辑</Button>
                        <Button type="primary" onClick={() => handleCvDel(item)}>删除</Button>
                    </div>
                </Card>
            );
        });
        cvList.push(
            <div key={uuid()} className={styles.addCv}>
                <img alt="example" src={addIcon} onClick={() => navigate('/exp')} />
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