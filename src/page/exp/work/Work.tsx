import { ICvProps } from "@/model/params/ICvProps";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, message } from "antd";
import styles from './Work.module.css';
import { clearCurrentWork, delWorkItem, getAiWorkDuty, getWorkList, saveWork, submitRenderTask } from "@/service/cv/work/WorkService";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import { WorkModel } from "@/model/cv/work/WorkModel";
import { ResponseHandler } from "rdjs-wheel";
import { renderFormLabel } from "@/component/common/RenderUtil";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { AppState } from "@/redux/types/AppState";

const Work: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedWork, workList, workDuty } = useSelector((state: AppState) => state.work);
    const [historyWork, setHistoryWork] = useState<WorkModel[]>([]);
    const [currWork, setCurrWork] = useState<WorkModel>();
    const [duty, setDuty] = useState<String>('');
    const [aiLoading, setAiLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (props && props.cv && props.cv.id) {
            getWorkList(props.cv.id);
        }
    }, []);

    React.useEffect(() => {
        if (workList && workList.length > 0) {
            setHistoryWork(workList);
        }
    }, [workList]);

    React.useEffect(() => {
        if (workDuty && workDuty.length > 0) {
            const dutyText = workDuty.slice(1, -1);
            const jsonStr = `{"text": "${dutyText}"}`;
            const jsonObj = JSON.parse(jsonStr);
            setDuty(jsonObj.text);
        } else {
            setDuty(workDuty);
        }
    }, [workDuty]);

    React.useEffect(() => {
        form.setFieldsValue(currWork);
    }, [form, currWork]);

    React.useEffect(() => {
        setCurrWork(savedWork as WorkModel);
    }, [savedWork]);

    const onFinish = (values: any) => {
        if (props && props.cv && props.cv.id) {
            let params = {
                ...values,
                cv_id: props.cv.id,
                work_start: dayjs(values.start).format('YYYY-MM-DD'),
                work_end: dayjs(values.end).format('YYYY-MM-DD'),
                duty: duty
            };
            saveWork(params).then((resp) => {
                if (ResponseHandler.responseSuccess(resp)) {
                    message.success("保存成功！");
                    clearCurrentWork();
                    setDuty('');
                    getWorkList(props.cv.id);
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

    const handleDelWorkItem = (item: WorkModel) => {
        if (item && item.id) {
            delWorkItem(item.id).then((resp) => {
                if (ResponseHandler.responseSuccess(resp)) {
                }
            });
        }
    }

    const handleEditWorkItem = (item: WorkModel) => {
        setCurrWork(item);
        setDuty(item.duty);
    }

    const renderStoredWork = () => {
        if (!historyWork || historyWork.length === 0) {
            return (<div></div>);
        }
        const eduList: JSX.Element[] = [];
        historyWork.forEach((item: WorkModel) => {
            eduList.push(
                <div key={uuid()} className={styles.workHistoryItem}>
                    <div><span>公司名称：</span><span>{item.company}</span></div>
                    <div><span>岗位名称：</span><span>{item.job}</span></div>
                    <div><span>所在城市：</span><span>{item.city}</span></div>
                    <div><span>开始时间：</span><span>{item.work_start}</span></div>
                    <div><span>结束时间：</span><span>{item.work_end}</span></div>
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

    const handleCvRender = () => {
        let params = {
            template_id: 1,
            cv_id: props.cv.id,
            cv_name: props.cv.cv_name
        };
        submitRenderTask(params).then((resp) => {
            if (ResponseHandler.responseSuccess(resp)) {
                navigate("/user/cv/gen/list", {
                    state: {
                        showHeader: true
                    }
                });
            }
        });
    }

    const handleDutyAutoGenerate = () => {
        const jobName = form.getFieldValue("job");
        if (!jobName || jobName.length === 0) {
            message.warning("请填写工作名称");
            return;
        }
        if (duty && duty.length > 0) {
            Modal.confirm({
                title: '确认生成',
                content: '系统检测到已经填写了内容，生成会覆盖已经填写的内容，确定要生成信息吗？',
                onOk() {
                    setDuty('');
                    setAiLoading(true);
                    genImpl(jobName);
                    setInterval(() => {
                        setAiLoading(false);
                    }, 5000);
                },
                onCancel() {

                },
            });
        }
        else {
            setAiLoading(true);
            genImpl(jobName);
        }
    }

    const genImpl = (jobName: string) => {
        const prompt =
            "请生成 " + jobName + "职责列表。每一项工作职责以 * 开始，以下是一个工作职责列表的例子：* 负责公司持续集成工作流构建 * 负责公司C端游戏的压力测试。";
        getAiWorkDuty(prompt).then((resp) => {
            if (ResponseHandler.responseSuccess(resp)) {
                setAiLoading(false);
            }
        });
    }

    const handleDutyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDuty(e.target.value);
    }

    return (
        <div>
            <div>
                <Card title="工作经历" style={cardStyle}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                    >
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("公司名称")}
                                    name="company"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入公司名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("岗位名称")}
                                    name="job"
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
                                    label={renderFormLabel("所在城市")}
                                    name="city"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入所在城市" }
                                    ]}>
                                    <Input>

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("开始时间")}
                                    name="work_start"
                                    labelCol={{ span: 8 }}
                                    getValueFromEvent={(...[, dateString]) => dateString}
                                    getValueProps={(value) => ({
                                        value: value ? dayjs(value) : undefined
                                    })}
                                    rules={[
                                        { required: true, message: "请输入开始时间" }
                                    ]}>
                                    <DatePicker></DatePicker>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("结束时间")}
                                    name="work_end"
                                    labelCol={{ span: 8 }}
                                    getValueFromEvent={(...[, dateString]) => dateString}
                                    getValueProps={(value) => ({
                                        value: value ? dayjs(value) : undefined
                                    })}
                                    rules={[
                                        { required: true, message: "请输入结束时间" }
                                    ]}>
                                    <DatePicker></DatePicker>
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
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={20}>
                                <Form.Item
                                    label={renderFormLabel("工作内容")}
                                    labelCol={{ span: 4 }}
                                    rules={[
                                        { required: true, message: "请输入工作内容" }
                                    ]}>
                                    <TextArea
                                        rows={15}
                                        value={duty.toString()}
                                        onChange={handleDutyChange}
                                        placeholder="不知道如何写？点击“AI自动生成”工作内容，在AI生成的基础上修改" />
                                    <Button onClick={() => { handleDutyAutoGenerate() }} type="primary" loading={aiLoading}>AI自动生成</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className={styles.operate}>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button type="primary" onClick={() => { handleCvRender() }}>渲染简历</Button>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className={styles.historyWork}>
                {renderStoredWork()}
            </div>
        </div>
    );
}

export default Work;