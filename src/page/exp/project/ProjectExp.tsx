import { ICvProps } from "@/model/params/ICvProps";
import { Button, Card, Col, Form, Input, Modal, Row, message } from "antd";
import styles from './ProjectExp.module.css';
import { submitRenderTask } from "@/service/cv/work/WorkService";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import { ResponseHandler } from "rdjs-wheel";
import { renderFormLabel } from "@/component/common/RenderUtil";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { AppState } from "@/redux/types/AppState";
import { clearCurrentProject, delProjectItem, getAiGenDuty, getProjectExpList, saveProject } from "@/service/cv/project/ProjectExpService";
import { ProjectExpModel } from "@/model/cv/project/ProjectExpModel";

const ProjectExp: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedProject, projectList, projectDuty } = useSelector((state: AppState) => state.project);
    const [historyProject, setHistoryProject] = useState<ProjectExpModel[]>([]);
    const [currProject, setCurrProject] = useState<ProjectExpModel>();
    const [duty, setDuty] = useState<String>('');
    const [aiLoading, setAiLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (props && props.cv && props.cv.id) {
            getProjectExpList(props.cv.id);
        }
    }, []);

    React.useEffect(() => {
        if(projectDuty && projectDuty.length > 0) {
            const textWithoutQuotes = projectDuty.replace(/^"(.*)"$/, '$1');
            const textToTextArea = textWithoutQuotes.replace(/\n/g, "<br>");
            setDuty(textToTextArea);
        }else{
            setDuty(projectDuty);
        }
    }, [projectDuty]);

    React.useEffect(() => {
        setHistoryProject(projectList);
    }, [projectList]);

    React.useEffect(() => {
        form.setFieldsValue(currProject);
    }, [form, currProject]);

    React.useEffect(() => {
        setCurrProject(savedProject as ProjectExpModel);
    }, [savedProject]);

    const onFinish = (values: any) => {
        if (props && props.cv && props.cv.id) {
            let params = {
                ...values,
                cv_id: props.cv.id,
                work_start: dayjs(values.start).format('YYYY-MM-DD'),
                work_end: dayjs(values.end).format('YYYY-MM-DD'),
                duty: duty
            };
            saveProject(params).then((resp) => {
                if (ResponseHandler.responseSuccess(resp)) {
                    message.success("保存成功！");
                    clearCurrentProject();
                    setDuty('');
                    getProjectExpList(props.cv.id);
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

    const handleDelProjectItem = (item: ProjectExpModel) => {
        if (item && item.id) {
            delProjectItem(item.id).then((resp) => {
                if (ResponseHandler.responseSuccess(resp)) {
                }
            });
        }
    }

    const handleEditProjectItem = (item: ProjectExpModel) => {
        setCurrProject(item);
        setDuty(item.duty);
    }

    const renderStoredWork = () => {
        if (!historyProject || historyProject.length === 0) {
            return (<div></div>);
        }
        const eduList: JSX.Element[] = [];
        historyProject.forEach((item: ProjectExpModel) => {
            eduList.push(
                <div key={uuid()} className={styles.workHistoryItem}>
                    <div><span>项目名称：</span><span>{item.name}</span></div>
                    <div><span>公司名称：</span><span>{item.company}</span></div>
                    <div><span>所在城市：</span><span>{item.city}</span></div>
                    <div><span>开始时间：</span><span>{item.work_start}</span></div>
                    <div><span>结束时间：</span><span>{item.work_end}</span></div>
                    <div className={styles.operateHistory}>
                        <Button type="primary" onClick={() => handleDelProjectItem(item)}>删除</Button>
                        <Button type="primary" onClick={() => handleEditProjectItem(item)}>编辑</Button>
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

    const handleProjectDutyAutoGenerate = () => {
        const projName = form.getFieldValue("name");
        if (!projName  || projName.length === 0) {
            message.warning("请填写项目名称");
            return;
        }
        if (duty && duty.length > 0) {
            Modal.confirm({
                title: '确认生成',
                content: '系统检测到已经填写了内容，生成会覆盖已经填写的内容，确定要生成信息吗？',
                onOk() {
                    setDuty('');
                    setAiLoading(true);
                    genImpl(projName);
                },
                onCancel() {

                },
            });
        }
        else {
            setAiLoading(true);
            genImpl(projName);
        }
    }

    const genImpl = (name: string) => {
        const prompt = "我参加了" + name + "项目，请生成项目职责示例。每一项项目职责以 * 开始，例如：* 负责后台、中台系统后端数据库设计、接口开发、部署和维护 * 负责 C 端游戏的压力测试";
        getAiGenDuty(prompt).then((resp)=>{
            if(ResponseHandler.responseSuccess(resp)){
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
                <Card title="项目经历" style={cardStyle}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                    >
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("项目名称")}
                                    name="name"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入项目名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
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
                        </Row>
                        <Row gutter={200} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label={renderFormLabel("城市")}
                                    name="city"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        { required: true, message: "请输入城市名称" }
                                    ]}>
                                    <Input></Input>
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
                                    <Button onClick={() => { handleProjectDutyAutoGenerate() }} type="primary" loading={aiLoading}>AI自动生成</Button>
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

export default ProjectExp;