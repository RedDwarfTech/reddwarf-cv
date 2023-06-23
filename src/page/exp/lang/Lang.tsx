import { ICvProps } from "@/model/params/ICvProps";
import { Button, Card, Col, Form, Input, Modal, Row, message } from "antd";
import styles from './Lang.module.css';
import { useSelector } from "react-redux";
import React, { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import { ResponseHandler } from "rdjs-wheel";
import { renderFormLabel } from "@/component/common/RenderUtil";
import { AppState } from "@/redux/types/AppState";
import TextArea from "antd/es/input/TextArea";
import { LangModel } from "@/model/cv/lang/LangModel";
import { clearCurrentLang, delLangItem, getLangList, saveLang } from "@/service/cv/lang/LangService";

const Lang: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedLang, langList } = useSelector((state: AppState) => state.lang);
    const [historyLang, setHistoryLang] = useState<LangModel[]>([]);
    const [currLang, setCurrLang] = useState<LangModel>();
    const [duty, setDuty] = useState<String>('');
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (props && props.cv && props.cv.id) {
            getLangList(props.cv.id);
        }
    }, []);

    React.useEffect(() => {
        setHistoryLang(langList);
    }, [langList]);

    React.useEffect(() => {
        form.setFieldsValue(currLang);
    }, [form, currLang]);

    React.useEffect(() => {
        setCurrLang(savedLang as LangModel);
    }, [savedLang]);

    const onFinish = (values: any) => {
        if (!props || !props.cv) {
            return;
        }
        if (props && props.cv && props.cv.id) {
            let params = {
                ...values,
                cv_id: props.cv.id,
                work_start: dayjs(values.start).format('YYYY-MM-DD'),
                work_end: dayjs(values.end).format('YYYY-MM-DD'),
                duty: duty
            };
            saveLang(params).then((resp) => {
                if (ResponseHandler.responseSuccess(resp)) {
                    message.success("保存成功！");
                    clearCurrentLang();
                    setDuty('');
                    if (!props || !props.cv) {
                        return;
                    }
                    getLangList(props.cv.id);
                    form.resetFields();
                }
            });
        } else {
            message.warning("请先填写简历基本信息");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleDelWorkItem = (item: LangModel) => {
        Modal.confirm({
            title: '删除确认',
            content: '确定要永久删除记录吗？删除后无法恢复',
            onOk() {
               
                if (item && item.id) {
                    delLangItem(item.id).then((resp) => {
                        if (ResponseHandler.responseSuccess(resp)) {
                            message.success("删除成功");
                            if (!props || !props.cv) {
                                return;
                            }
                            getLangList(props.cv.id);
                        }
                    });
                }
            },
            onCancel() {

            },
        });
    }

    const handleEditWorkItem = (item: LangModel) => {
        setCurrLang(item);
    }

    const renderStoredLangs = () => {
        if (!historyLang || historyLang.length === 0) {
            return (<div></div>);
        }
        const eduList: JSX.Element[] = [];
        historyLang.forEach((item: LangModel) => {
            eduList.push(
                <div key={uuid()} className={styles.workHistoryItem}>
                    <div><span>技能项：</span><span>{item.name}</span></div>
                    <div><span>熟练程度：</span><span>{item.level}</span></div>
                    <div><span>技能描述：</span><span>{item.memo}</span></div>
                    <div className={styles.operateHistory}>
                        <Button type="primary" onClick={() => handleDelWorkItem(item)}>删除</Button>
                        <Button type="primary" onClick={() => handleEditWorkItem(item)}>编辑</Button>
                    </div>
                </div>
            );
        });
        return eduList;
    }

    const cardStyle = {
        marginTop: '16px',
    }

    return (
        <div>
            <div>
                <Card title="专业技能" style={cardStyle}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                    >
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("技能项")}
                                    name="name"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入技能名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("熟练程度")}
                                    name="level"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入岗位名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("技能描述")}
                                    name="memo"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入所在城市" }
                                    ]}>
                                    <TextArea
                                        rows={4}
                                    >

                                    </TextArea>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("ID")}
                                    name="id"
                                    labelCol={{ span: 8 }}
                                >
                                    <Input disabled={true}></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className={styles.operate}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className={styles.historyWork}>
                {renderStoredLangs()}
            </div>
        </div>
    );
}

export default Lang;