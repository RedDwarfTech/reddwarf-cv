import { Button, Card, Col, DatePicker, DatePickerProps, Form, Input, Row } from "antd";
import styles from './Edu.module.css';
import { delEduItem, getEduList, saveEdu } from "@/service/cv/edu/EduService";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
import { EduModel } from "@/model/cv/edu/EduModel";
import { v4 as uuid } from 'uuid';
import { ICvProps } from "@/model/params/ICvProps";
import { ResponseHandler } from "rdjs-wheel";

const Edu: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedEdu } = useSelector((state: any) => state.edu);
    const { eduList } = useSelector((state: any) => state.edu);
    const [edu, setEdu] = useState<EduModel[]>([]);
    const [eduAddr, setEduAddr] = useState<String>('');
    const [eduDegree, setDegree] = useState<String>('');
    const [eduMajor, setMajor] = useState<String>('');
    const [eduAdmission, setAdmission] = useState<String>('');
    const [eduGraduation, setGraduation] = useState<String>('');

    React.useEffect(() => {
        if (props && Object.keys(props).length > 0 && props.cv && props.cv.id) {
            getEduList(props.cv.id);
        }
    }, []);

    React.useEffect(() => {
        if (eduList && eduList.length > 0) {
            setEdu(eduList);
        }
    }, [eduList]);

    React.useEffect(() => {
        if (savedEdu && savedEdu.length > 0) {
            setEdu(savedEdu);
        }
    }, [savedEdu]);

    const cardStyle = {
        marginTop: '16px',
    }

    const handleSaveEdu = () => {
        let edu: EduModel = {
            cv_id: 1,
            edu_addr: eduAddr,
            degree: eduDegree,
            major: eduMajor,
            admission: eduAdmission,
            graduation: eduGraduation
        };
        saveEdu(edu);
    }

    const handleDelEduItem = (item: EduModel) => {
        if (item && item.id) {
            delEduItem(item.id).then((resp)=>{
                if(ResponseHandler.responseSuccess(resp)){
                    getEduList(item.cv_id);
                }
            });
        }
    }

    const renderStoredEdu = () => {
        if (!edu || edu.length === 0) {
            return (<div></div>);
        }
        const eduList: JSX.Element[] = [];
        edu.forEach((item: EduModel) => {
            eduList.push(
                <div key={uuid()} className={styles.eduHistoryItem}>
                    <div><span>学校名称：</span><span>{item.edu_addr}</span></div>
                    <div><span>最高学历：</span><span></span></div>
                    <div><span>开始时间：</span><span></span></div>
                    <div><span>结束时间：</span><span></span></div>
                    <Button type="primary" onClick={() => handleDelEduItem(item)}>删除</Button>
                </div>
            );
        });
        return eduList;
    }

    const onAdmissionChange: DatePickerProps['onChange'] = (_, dateString) => {
        setAdmission(dateString);
    };

    const onGraduationChange: DatePickerProps['onChange'] = (_, dateString) => {
        setGraduation(dateString);
    };

    return (
        <div>
            <div>
                <Card title="教育经历" style={cardStyle}>
                    <Row gutter={400} style={{ marginTop: '20px' }}>
                        <Col span={12}>
                            <div className={styles.itemcomposite}>
                                <span>学校名称：</span>
                                <Input onChange={(e) => setEduAddr(e.target.value)}
                                    required={true}
                                >
                                </Input>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.itemcomposite}>
                                <span>最高学历：</span>
                                <Input onChange={(e) => setDegree(e.target.value)}></Input>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={400} style={{ marginTop: '20px' }}>
                        <Col span={12}>
                            <div className={styles.itemcomposite}>
                                <span>专业：</span>
                                <Input onChange={(e) => setMajor(e.target.value)} ></Input>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.itemcomposite}>
                                <span>开始时间：</span>
                                <DatePicker onChange={onAdmissionChange}></DatePicker>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={400} style={{ marginTop: '20px' }}>
                        <Col span={12}>
                            <div className={styles.itemcomposite}>
                                <span>结束时间：</span>
                                <DatePicker onChange={onGraduationChange}></DatePicker>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles.operate}>
                        <Button type="primary" size="large" onClick={handleSaveEdu}>保存</Button>
                    </div>
                </Card>
            </div>
            <div className={styles.eduHistory}>
                {renderStoredEdu()}
            </div>
        </div>
    );
}

export default Edu;