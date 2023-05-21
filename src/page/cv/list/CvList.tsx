import { Card } from "antd";
import styles from "./CvList.module.css";
import React, { useState } from "react";
import { getUserCvList } from "@/service/cv/CvService";
import { useSelector } from "react-redux";
import Meta from "antd/es/card/Meta";
import { v4 as uuid } from 'uuid';
import { Cv } from "@/model/cv/Cv";
import { useNavigate } from "react-router-dom";

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
        if (!userCv || userCv.length === 0) {
            return (<div>暂无简历，<a>去创建</a></div>);
        }
        userCv.forEach((item: Cv) => {
            cvList.push(
                <Card
                    hoverable
                    style={{ width: 240 }}
                    onClick={() => navigate('/exp',{
                        state: item
                    })}
                    key={uuid()}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title={item.cv_name}/>
                </Card>
            );
        });
        return cvList;
    }

    return (
        <div className={styles.container}>
            {renderUserList()}
        </div>
    );
}

export default CvList;