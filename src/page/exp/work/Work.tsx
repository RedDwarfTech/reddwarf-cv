import { ICvProps } from "@/model/params/ICvProps";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, message } from "antd";
import styles from './Work.module.css';
import { delWorkItem, getWorkList, saveWork, submitRenderTask } from "@/service/cv/work/WorkService";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import { WorkModel } from "@/model/cv/work/WorkModel";
import { ResponseHandler } from "rdjs-wheel";
import { renderFormLabel } from "@/component/common/RenderUtil";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { ISse35ServerMsg } from "@/model/ai/Sse35ServerMsg";
import { EventSourcePolyfill } from "event-source-polyfill";
import { SseClientService } from "rd-component";

const Work: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedWork } = useSelector((state: any) => state.work);
    const { workList } = useSelector((state: any) => state.work);
    const [historyWork, setHistoryWork] = useState<WorkModel[]>([]);
    const [currWork, setCurrWork] = useState<WorkModel>();
    const [duty, setDuty] = useState<string>('');
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
        form.setFieldsValue(currWork);
    }, [form, currWork]);

    React.useEffect(() => {
        setCurrWork(savedWork);
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
                    getWorkList(props.cv.id);
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
                    //getEduList(item.cv_id);
                }
            });
        }
    }

    const handleEditWorkItem = (item: WorkModel) => {
        setCurrWork(item);
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
                    <div>
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

    const onSseMessage = (msg: string, eventSource: EventSourcePolyfill) => {
        const serverMsg: ISse35ServerMsg = JSON.parse(msg);
        if (serverMsg.choices[0] && serverMsg.choices[0].finish_reason === "vip-expired") {
            //setLoadings(false);
            message.info("充值会员继续使用");
            eventSource.close();
            //setShowGoodsPopup(true);
            return;
        }
        if (serverMsg.choices[0] && serverMsg.choices[0].finish_reason === "rate-limit") {
            //setLoadings(false);
            message.info("超出频率限制，请稍后再试一试");
            eventSource.close();
            return;
        }
        if (serverMsg.choices[0].delta.content && serverMsg.choices[0].delta.content.length > 0) {
            appenSseMsg(serverMsg);
        }
        if (serverMsg.choices[0].finish_reason && serverMsg.choices[0].finish_reason === "stop") {
            //setLoadings(false);
            eventSource.close();
        }
    }

    const appenSseMsg = (data: ISse35ServerMsg) => {
        const msg = data.choices[0].delta.content;
        if (msg && msg.length > 0) {
            setDuty((prevDuty) => {
                const oldDuty = prevDuty;
                const newDuty = oldDuty + msg;
                return newDuty;
            });
        }
    }

    const handleDutyAutoGenerate = () => {
        if (duty && duty.length > 0) {
            Modal.confirm({
                title: '确认生成',
                content: '系统检测到已经填写了内容，生成会覆盖已经填写的内容，确定要生成信息吗？',
                onOk() {
                    setDuty('');
                    genImpl();
                },
                onCancel() {

                },
            });
        }
        else {
            genImpl();
        }
    }

    const genImpl = () => {
        let ask = {
            prompt: encodeURIComponent("test"),
            cid: 1
        };
        SseClientService.doAskPreCheck(ask, onSseMessage, "/cvpub/stream/work/gen");
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
                                        value={duty}
                                        onChange={handleDutyChange}
                                        placeholder="不知道如何写？点击“AI自动生成”工作内容，在AI生成的基础上修改" />
                                    <Button onClick={() => { handleDutyAutoGenerate() }} type="primary">AI自动生成</Button>
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