import Header from '@/component/header/Header';
import styles from './Template.module.css';
import templateDemo from '@/assets/template/moderncv-legacy-template-zh.jpg';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/types/AppState';
import { CvTpl } from '@/model/tpl/CvTpl';
import { getTemplateList } from '@/service/tpl/TemplateService';

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
                        <img src={templateDemo}></img>
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