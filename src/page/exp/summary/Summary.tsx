import { Button, Card, Col, Input, Row } from 'antd';
import styles from './Summary.module.css';
import { ICvProps } from '@/model/params/ICvProps';
import { EditSummary } from '@/model/cv/summary/EditSummary';
import { clearCvSummary, editCvSummary, getCvSummary } from '@/service/cv/CvService';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';
import { Cv } from '@/model/cv/Cv';

const Summary: React.FC<ICvProps> = (props: ICvProps) => {

    const { summary } = useSelector((state: any) => state.cv);
    const [currentCv, setCurrentCv] = useState<Cv|null>();

    React.useEffect(() => {
        if (props && props.cv && props.cv.id) {
            getCvSummary(props.cv.id);
        } else {
            clearCvSummary(); 
        }
    }, []);

    React.useEffect(() => {
        setCurrentCv(summary);
    }, [summary]);

    const cardStyle = {
        marginTop: '16px',
    }

    const handleSaveSummary = () => {
        let summary: EditSummary = {
            id: currentCv ? currentCv.id : undefined,
            employee_name: currentCv ? currentCv.employee_name : '',
            phone: currentCv ? currentCv.phone : '',
            email: currentCv ? currentCv.email : '',
            birthday: currentCv ? currentCv.birthday : '',
            job: currentCv ? currentCv.job : '',
            workplace: currentCv ? currentCv.workplace : '',
        };
        editCvSummary(summary);
    }

    const handleCvUpdate = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        setCurrentCv((prevState: any) => {
            const clonedState = { ...prevState };
            if (clonedState) {
                clonedState[key] = e.target.value;
            }
            return clonedState;
        });
    }

    return (
        <Card title="基本信息" style={cardStyle}>
            <Row gutter={400} style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <div className={styles.itemcomposite}><span>职位名称：</span>
                        <Input
                            value={currentCv?.job}
                            onChange={(e) => handleCvUpdate(e, "job")}></Input>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.itemcomposite}><span>姓名：</span>
                        <Input value={currentCv?.employee_name}
                            onChange={(e) => handleCvUpdate(e, "employee_name")}></Input>
                    </div>
                </Col>
            </Row>
            <Row gutter={400} style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <div className={styles.itemcomposite}><span>工作地点：</span>
                        <Input value={currentCv?.workplace} onChange={(e) => handleCvUpdate(e, "workplace")}></Input>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.itemcomposite}><span>手机号码：</span>
                        <Input value={currentCv?.phone} onChange={(e) => handleCvUpdate(e, "phone")}></Input>
                    </div>
                </Col>
            </Row>
            <Row gutter={400} style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <div className={styles.itemcomposite}><span>邮箱：</span>
                        <Input value={currentCv?.email} onChange={(e) => handleCvUpdate(e, "email")}></Input>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.itemcomposite}><span>出生日期：</span>
                        <Input value={currentCv?.birthday} onChange={(e) => handleCvUpdate(e, "birthday")}></Input>
                    </div>
                </Col>
            </Row>
            <div className={styles.operate}>
                <Button type="primary" size="large" onClick={handleSaveSummary}>保存</Button>
            </div>
        </Card>
    );
}

export default Summary;