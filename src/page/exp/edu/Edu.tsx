import { Button, Card, Col, DatePicker, Form, Input, Row, message } from "antd";
import styles from './Edu.module.css';
import { delEduItem, getEduList, saveEdu } from "@/service/cv/edu/EduService";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
import { EduModel } from "@/model/cv/edu/EduModel";
import { v4 as uuid } from 'uuid';
import { ICvProps } from "@/model/params/ICvProps";
import { ResponseHandler } from "rdjs-wheel";
import { renderFormLabel } from "@/component/common/RenderUtil";
import dayjs from "dayjs";

const Edu: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedEdu } = useSelector((state: any) => state.edu);
    const { eduList } = useSelector((state: any) => state.edu);
    const [edu, setEdu] = useState<EduModel>();
    const [eduHistory, setEduHistory] = useState<EduModel[]>([]);
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (props && Object.keys(props).length > 0 && props.cv && props.cv.id) {
            getEduList(props.cv.id);
        }
    }, []);

    React.useEffect(() => {
        // https://stackoverflow.com/questions/61422607/update-antd-form-if-initialvalue-is-changed
        form.setFieldsValue(edu)
    }, [form, edu]);

    React.useEffect(() => {
        if (eduList && eduList.length > 0) {
            setEduHistory(eduList);
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

    const handleDelEduItem = (item: EduModel) => {
        if (item && item.id) {
            delEduItem(item.id).then((resp) => {
                if (ResponseHandler.responseSuccess(resp)) {
                    getEduList(item.cv_id);
                }
            });
        }
    }

    const handleEditEduItem = (item: EduModel) => {
        setEdu(item);
    }

    const renderStoredEdu = () => {
        if (!eduHistory || eduHistory.length === 0) {
            return (<div></div>);
        }
        const eduList: JSX.Element[] = [];
        eduHistory.forEach((item: EduModel) => {
            eduList.push(
                <div key={uuid()} className={styles.eduHistoryItem}>
                    <div><span>学校名称：</span><span>{item.edu_addr}</span></div>
                    <div><span>最高学历：</span><span>{item.degree}</span></div>
                    <div><span>专业：</span><span>{item.major}</span></div>
                    <div><span>开始时间：</span><span>{item.admission}</span></div>
                    <div><span>结束时间：</span><span>{item.graduation}</span></div>
                    <div className={styles.operateHistory}>
                        <Button type="primary" onClick={() => handleDelEduItem(item)}>删除</Button>
                        <Button type="primary" onClick={() => handleEditEduItem(item)}>编辑</Button>
                    </div>
                </div>
            );
        });
        return eduList;
    }

    const onFinish = (values: any) => {
        if (props && props.cv && props.cv.id) {
            let params = {
                ...values,
                id: props.cv.id,
                cv_id: props.cv.id
            };
            saveEdu(params).then((resp: any) => {
                if (ResponseHandler.responseSuccess(resp)) {
                    message.success("保存成功");
                } else {
                    message.error("保存失败");
                }
            });
        }else{
            message.warning("请先填写简历基本信息");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div>
                <Card title="教育经历" style={cardStyle}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                    >
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("学校名称")}
                                    name="edu_addr"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入学校名称" }
                                    ]}>
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("最高学历")}
                                    name="degree"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入最高学历" }
                                    ]}>
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("专业")}
                                    name="major"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入专业" }
                                    ]}>
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("开始时间")}
                                    name="admission"
                                    getValueFromEvent={(...[, dateString]) => dateString}
                                    getValueProps={(value) => ({
                                        value: value ? dayjs(value) : undefined
                                    })}
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入开始时间" }
                                    ]}
                                >
                                    <DatePicker format="YYYY-MM-DD"></DatePicker>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("结束时间")}
                                    name="graduation"
                                    labelCol={{ span: 8 }}
                                    getValueFromEvent={(...[, dateString]) => dateString}
                                    getValueProps={(value) => ({
                                        value: value ? dayjs(value) : undefined
                                    })}
                                    rules={[
                                        { required: true, message: "请输入结束时间" }
                                    ]}
                                >
                                    <DatePicker ></DatePicker>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className={styles.operate}>
                            <Button type="primary" size="large" htmlType="submit">保存</Button>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className={styles.eduHistory}>
                {renderStoredEdu()}
            </div>
        </div>
    );
}

export default Edu;