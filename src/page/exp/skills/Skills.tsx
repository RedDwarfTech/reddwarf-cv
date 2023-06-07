import { ICvProps } from "@/model/params/ICvProps";
import { Button, Card, Col, Form, Input, Modal, Row, message } from "antd";
import styles from './Skills.module.css';
import { useSelector } from "react-redux";
import React, { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import { ResponseHandler } from "rdjs-wheel";
import { renderFormLabel } from "@/component/common/RenderUtil";
import { AppState } from "@/redux/types/AppState";
import { clearCurrentSkill, delSkillItem, getSkillList, saveSkill } from "@/service/cv/skill/SkillService";
import { SkillModel } from "@/model/cv/skill/SkillModel";
import TextArea from "antd/es/input/TextArea";

const Skills: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedSkill } = useSelector((state: AppState) => state.skill);
    const { skillList } = useSelector((state: AppState) => state.skill);
    const [historySkill, setHistorySkill] = useState<SkillModel[]>([]);
    const [currSkill, setCurrSkill] = useState<SkillModel>();
    const [duty, setDuty] = useState<String>('');
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (props && props.cv && props.cv.id) {
            getSkillList(props.cv.id);
        }
    }, []);

    React.useEffect(() => {
        setHistorySkill(skillList);
    }, [skillList]);

    React.useEffect(() => {
        form.setFieldsValue(currSkill);
    }, [form, currSkill]);

    React.useEffect(() => {
        setCurrSkill(savedSkill as SkillModel);
    }, [savedSkill]);

    const onFinish = (values: any) => {
        if (props && props.cv && props.cv.id) {
            let params = {
                ...values,
                cv_id: props.cv.id,
                work_start: dayjs(values.start).format('YYYY-MM-DD'),
                work_end: dayjs(values.end).format('YYYY-MM-DD'),
                duty: duty
            };
            saveSkill(params).then((resp) => {
                if (ResponseHandler.responseSuccess(resp)) {
                    message.success("保存成功！");
                    clearCurrentSkill();
                    setDuty('');
                    getSkillList(props.cv.id);
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

    const handleDelWorkItem = (item: SkillModel) => {
        Modal.confirm({
            title: '删除确认',
            content: '确定要永久删除记录吗？删除后无法恢复',
            onOk() {
                if (item && item.id) {
                    delSkillItem(item.id).then((resp) => {
                        if (ResponseHandler.responseSuccess(resp)) {
                            message.success("删除成功");
                            getSkillList(props.cv.id);
                        }
                    });
                }
            },
            onCancel() {

            },
        });
    }

    const handleEditWorkItem = (item: SkillModel) => {
        setCurrSkill(item);
    }

    const renderStoredSkills = () => {
        if (!historySkill || historySkill.length === 0) {
            return (<div></div>);
        }
        const eduList: JSX.Element[] = [];
        historySkill.forEach((item: SkillModel) => {
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
                {renderStoredSkills()}
            </div>
        </div>
    );
}

export default Skills;