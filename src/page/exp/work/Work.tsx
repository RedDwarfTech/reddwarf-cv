import { ICvProps } from "@/model/params/ICvProps";
import { Button, Card, Col, DatePicker, Form, Input, Row } from "antd";
import styles from './Work.module.css';
import { delWorkItem, getWorkList, saveWork } from "@/service/cv/work/WorkService";
import { useSelector } from "react-redux";
// import { WorkModel } from "@/model/cv/work/WorkModel";
// import { useState } from "react";
import React, { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import { WorkModel } from "@/model/cv/work/WorkModel";
import { ResponseHandler } from "rdjs-wheel";

const Work: React.FC<ICvProps> = (props: ICvProps) => {

    const { savedWork } = useSelector((state: any) => state.work);
    // const { workList } = useSelector((state: any) => state.work);
    // const [currentWork, setCurrentWork] = useState<WorkModel | null>();
    const [historyWork, setHistoryWork] = useState<WorkModel[]>([]);

    React.useEffect(() => {
        if (props && props.cv && props.cv.id) {
            getWorkList(props.cv.id);
        } else {
            // clearWorkSummary();
        }
    }, []);

    React.useEffect(() => {
        if (savedWork  && savedWork.length > 0) {
            setHistoryWork(savedWork);
        }
    }, [savedWork]);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        let params = {
            ...values,
            cv_id: props.cv.id,
            start: dayjs(values.start).format('YYYY-MM-DD'),
            end: dayjs(values.end).format('YYYY-MM-DD')
        };
        saveWork(params);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleDelWorkItem = (item: WorkModel) => {
        if (item && item.id) {
            delWorkItem(item.id).then((resp)=>{
                if(ResponseHandler.responseSuccess(resp)){
                    //getEduList(item.cv_id);
                }
            });
        }
    }

    const renderStoredWork = () => {
        if (!historyWork || historyWork.length === 0) {
            return (<div></div>);
        }
        const eduList: JSX.Element[] = [];
        historyWork.forEach((item: WorkModel) => {
            eduList.push(
                <div key={uuid()} className={styles.eduHistoryItem}>
                    <div><span>学校名称：</span><span>{item.edu_addr}</span></div>
                    <div><span>最高学历：</span><span></span></div>
                    <div><span>开始时间：</span><span></span></div>
                    <div><span>结束时间：</span><span></span></div>
                    <Button type="primary" onClick={() => handleDelWorkItem(item)}>删除</Button>
                </div>
            );
        });
        return eduList;
    }

    return (
        <div>
            <div>
                <Card title="工作经历">
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                    >
                        <Row gutter={160}>
                            <Col span={11}>
                                <Form.Item
                                    label="公司名称"
                                    name="company"
                                    rules={[
                                        { required: true, message: "请输入公司名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    label="岗位名称"
                                    name="job"
                                    rules={[
                                        { required: true, message: "请输入岗位名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={160}>
                            <Col span={11}>
                                <Form.Item
                                    label="所在城市"
                                    name="city"
                                    rules={[
                                        { required: true, message: "请输入所在城市" }
                                    ]}>
                                    <Input>

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    label="开始时间"
                                    name="start"
                                    rules={[
                                        { required: true, message: "请输入开始时间" }
                                    ]}>
                                    <DatePicker></DatePicker>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={160}>
                            <Col span={11}>
                                <Form.Item
                                    label="结束时间"
                                    name="end"
                                    rules={[
                                        { required: true, message: "请输入结束时间" }
                                    ]}>
                                    <DatePicker></DatePicker>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
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