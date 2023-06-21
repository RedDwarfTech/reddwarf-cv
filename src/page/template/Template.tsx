import Header from '@/component/header/Header';
import styles from './Template.module.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/types/AppState';
import { CvTpl } from '@/model/tpl/CvTpl';
import { getTemplateList } from '@/service/tpl/TemplateService';
import { Image } from "antd";

const Template: React.FC = () => {

    const { tplList } = useSelector((state: AppState) => state.tpl);
    const [cvTpl, setCvTpl] = useState<CvTpl[]>([]);

    React.useEffect(() => {
        getTemplateList();
    }, []);

    React.useEffect(() => {
        setCvTpl(tplList);
    }, [tplList]);

    const renderTplList = () => {
        const cvList: JSX.Element[] = [];
        if (!cvTpl || cvTpl.length === 0) {
            return <div></div>
        }
        cvTpl.forEach((item: CvTpl) => {
            cvList.push(
                <div className={styles.templateItem}>
                    <div>
                        <Image width={300} height={400} src={item.preview_url}></Image>
                    </div>
                    <div>{item.name}</div>
                </div>
            );
        });
        return cvList;
    }

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                {renderTplList()}
            </div>
        </div>
    );
}

export default Template;