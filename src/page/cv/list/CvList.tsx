import { Card } from "antd";
import styles from "./CvList.module.css";
import React, { useState } from "react";
import { getUserCvList } from "@/service/cv/CvService";
import { useSelector } from "react-redux";
import Meta from "antd/es/card/Meta";
import { v4 as uuid } from 'uuid';
import { Cv } from "@/model/cv/Cv";
import { useNavigate } from "react-router-dom";
import Header from "@/component/header/Header";
import addIcon from "@/assets/cv/list/add_icon.png"

const CvList: React.FC = () => {

    const { userCvList } = useSelector((state: any) => state.cv);
    const [userCv, setUserCv] = useState<Cv[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getUserCvList();
    }, []);

    React.useEffect(() => {
        if (userCvList.length > 0) {
            setUserCv(userCvList);
        }
    }, [userCvList])

    const renderUserList = () => {
        const cvList: JSX.Element[] = [];
        userCv.forEach((item: Cv) => {
            cvList.push(
                <Card
                    hoverable
                    style={{ width: 240 }}
                    onClick={() => navigate('/exp', {
                        state: item
                    })}
                    key={uuid()}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title={item.cv_name} />
                </Card>
            );
        });
        cvList.push(
            <div className={styles.addCv}>
                <img alt="example" src={addIcon} onClick={() => navigate('/exp')}/>
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