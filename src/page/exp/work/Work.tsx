import { ICvProps } from "@/model/params/ICvProps";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import styles from './Work.module.css';

const Work: React.FC<ICvProps> = (props: ICvProps) => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div>
                <Card title="工作经历">
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Row gutter={160}>
                            <Col span={8}>
                                <Form.Item
                                    label="公司名称"
                                    name="company_name"
                                    rules={[
                                        { required: true, message: "请输入公司名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="岗位名称"
                                    name="job_name"
                                    rules={[
                                        { required: true, message: "请输入公司名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={160}>
                            <Col span={8}>
                                <Form.Item
                                    label="所在城市"
                                    name="job_name"
                                    rules={[
                                        { required: true, message: "请输入公司名称" }
                                    ]}>
                                    <Input>

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="开始时间"
                                    name="job_name"
                                    rules={[
                                        { required: true, message: "请输入公司名称" }
                                    ]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={160}>
                            <Col span={8}>
                                <Form.Item
                                    label="结束时间"
                                    name="job_name"
                                    rules={[
                                        { required: true, message: "请输入公司名称" }
                                    ]}>
                                    <Input></Input>
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
                <div>我的历史工作经历</div>
                <div>我的历史工作经历</div>
                <div>我的历史工作经历</div>
            </div>
        </div>
    );
}

export default Work;