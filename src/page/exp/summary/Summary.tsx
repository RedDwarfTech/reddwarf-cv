import { Button, Card, Col, Form, Input, Row, message } from 'antd';
import styles from './Summary.module.css';
import { ICvProps } from '@/model/params/ICvProps';
import { clearCvSummary, editCvSummary, getCvSummary } from '@/service/cv/CvService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';
import { Cv } from '@/model/cv/Cv';
import { ResponseHandler } from 'rdjs-wheel';
import { renderFormLabel } from '@/component/common/RenderUtil';

const Summary: React.FC<ICvProps> = (props: ICvProps) => {

    const { summary } = useSelector((state: any) => state.cv);
    const [currentCv, setCurrentCv] = useState<Cv | null>();
    const [form] = Form.useForm()

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

    const getCurrCvName = () => {
        if (currentCv && currentCv.cv_name) {
            return currentCv.cv_name;
        } else {
            return (currentCv?.employee_name ? currentCv?.employee_name : "") + "-" + (currentCv?.job ? currentCv?.job : "")
        }
    }

    const onFinish = (values: any) => {
        let params = {
            ...values,
            id: currentCv?.id
        };
        editCvSummary(params).then((resp: any) => {
            if (ResponseHandler.responseSuccess(resp)) {
                message.success("保存成功");
            } else {
                message.error("保存失败");
            }
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    React.useEffect(() => {
        // https://stackoverflow.com/questions/61422607/update-antd-form-if-initialvalue-is-changed
        form.setFieldsValue(currentCv)
       }, [form, currentCv])

    return (
        <Card title="基本信息" style={cardStyle}>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size="large"
            >
                <Row gutter={200} style={{ marginTop: '20px' }}>
                    <Col span={12}>
                        <Form.Item
                            label={renderFormLabel("职位名称")}
                            name="job"
                            initialValue={currentCv?.job}
                            rules={[
                                { required: true, message: "请输入职位名称" }
                            ]}>
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={renderFormLabel("姓名")}
                            name="employee_name"
                            initialValue={"dd"}
                            rules={[
                                { required: true, message: "请输入姓名" }
                            ]}>
                            <Input value ={currentCv?.employee_name}></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={200} style={{ marginTop: '20px' }}>
                    <Col span={12}>
                        <Form.Item
                            label={renderFormLabel("工作地点")}
                            name="workplace"
                            rules={[
                                { required: true, message: "请输入工作地点" }
                            ]}>
                            <Input value={"d"}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={renderFormLabel("手机号码")}
                            name="phone"
                            rules={[
                                { required: true, message: "请输入手机号码" }
                            ]}>
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={200} style={{ marginTop: '20px' }}>
                    <Col span={12}>
                        <Form.Item
                            label={renderFormLabel("邮箱")}
                            name="email"
                            rules={[
                                { required: true, message: "请输入邮箱" }
                            ]}>
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={renderFormLabel("出生日期")}
                            name="birthday"
                            rules={[
                                { required: true, message: "请输入出生日期" }
                            ]}>
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={200} style={{ marginTop: '20px' }}>
                    <Col span={12}>
                        <Form.Item
                            label={renderFormLabel("简历名称")}
                            name="cv_name"
                            rules={[
                                { required: true, message: "请输入简历名称" }
                            ]}>
                            <Input value={getCurrCvName()}></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <div className={styles.operate}>
                    <Button type="primary" size="large" htmlType="submit">保存</Button>
                </div>
            </Form>
        </Card>
    );
}

export default Summary;