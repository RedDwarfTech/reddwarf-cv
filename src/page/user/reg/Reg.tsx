import Header from '@/component/header/Header';
import { Button, Form, Input } from 'antd';
import styles from './Reg.module.css';
import { renderFormLabel } from '@/component/common/RenderUtil';
import { ResponseHandler } from 'rdjs-wheel';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { UserService } from 'rd-component';
import { readConfig } from '@/config/app/config-reader';
import store from '@/redux/store/store';

const Reg: React.FC = () => {
    const navigate = useNavigate();
    const fpPromise = FingerprintJS.load();

    const onFinish = (values: any) => {
        ; (async () => {
            // Get the visitor identifier when you need it.
            const fp = await fpPromise
            const result = await fp.get()
            let params = {
                ...values,
                deviceId: result.visitorId
            };
            UserService.userReg(params,store,readConfig("regUrl")).then((user) => {
                if (ResponseHandler.responseSuccess(user)) {
                    navigate("/user/login");
                }
            });
        })();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <div className={styles.header}>注册</div>
                    <div className={styles.loginInfo}>
                        <Form
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
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label={renderFormLabel("密码")}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reg;