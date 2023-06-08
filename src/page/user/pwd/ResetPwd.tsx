import Header from '@/component/header/Header';
import { Button, Col, Form, Input, Row, message } from 'antd';
import styles from './ResetPwd.module.css';
import { renderFormLabel } from '@/component/common/RenderUtil';
import { ResponseHandler } from 'rdjs-wheel';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { readConfig } from '@/config/app/config-reader';
import store from '@/redux/store/store';
import { doResetPwd, doSendVerifyCode } from '@/service/user/CvUserService';

const ResetPwd: React.FC = () => {
    const navigate = useNavigate();
    const fpPromise = FingerprintJS.load();
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
        ; (async () => {
            // Get the visitor identifier when you need it.
            const fp = await fpPromise
            const result = await fp.get()
            let params = {
                ...values,
                deviceId: result.visitorId
            };
            doResetPwd(params).then((user) => {
                if (ResponseHandler.responseSuccess(user)) {
                    navigate("/user/login");
                }
            });
        })();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const countDown = (seconds: number) => {
        const sendCodeButton = document.getElementById("send-code-button") as HTMLButtonElement;
        sendCodeButton.disabled = true;
        sendCodeButton.textContent = `${seconds} 秒后重试`;
        const intervalId = setInterval(() => {
            seconds--;
            if (seconds === 0) {
                sendCodeButton.disabled = false;
                sendCodeButton.textContent = "发送验证码";
                clearInterval(intervalId);
            } else {
                sendCodeButton.textContent = `${seconds} 秒后重试`;
            }
        }, 1000);
    }

    const sendVerifyCode = () => {
        const phone = form.getFieldValue("phone");
        if(!phone || phone.length === 0) {
            message.warning("请输入手机号码");
            return;
        }
        let params = {
            phone: phone
        };
        doSendVerifyCode(params);
        countDown(10);
    }

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <div className={styles.header}>找回密码</div>
                    <div className={styles.loginInfo}>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            size={"large"}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label={renderFormLabel("手机号")}
                                name="phone"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder='注册时的手机号' />
                            </Form.Item>

                            <Form.Item
                                label={renderFormLabel("验证码")}
                                name="code"
                                rules={[{ required: true, message: 'Please input your verify code!' }]}
                            >
                                <Row gutter={8}>
                                    <Col span={16}>

                                        <Form.Item
                                            name="captcha"
                                            noStyle
                                            rules={[
                                                { required: true, message: '请输入验证码' },
                                                { len: 6, message: '验证码必须是6位' },
                                            ]}
                                        >
                                            <Input placeholder="请输入验证码" />

                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Button id="send-code-button" type="primary" onClick={() => { sendVerifyCode() }} block>
                                            发送验证码
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item
                                label={renderFormLabel("新密码")}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder='新的密码' />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    确定
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ResetPwd;