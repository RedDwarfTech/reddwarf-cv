import Header from "@/component/header/Header";
import { Button, Form, Input, Tabs, TabsProps } from "antd";
import styles from './Login.module.css';
import { renderFormLabel } from "@/component/common/RenderUtil";
import { UserService } from "rd-component";
import { readConfig } from "@/config/app/config-reader";
import store from "@/redux/store/store";
import { AuthHandler, ResponseHandler } from "rdjs-wheel";
import { ILoginUserModel } from "rdjs-wheel/dist/src/model/user/ILoginUserModel";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const fpPromise = FingerprintJS.load();
    const navigate = useNavigate();
    
    const onChange = (key: string) => {
        if (key === '2') {
            userLogin();
        }
    };

    const onFinish = (values: any) => {
        ; (async () => {
            // Get the visitor identifier when you need it.
            const fp = await fpPromise
            const result = await fp.get()
            let params = {
                ...values,
                deviceId: result.visitorId,
                deviceName: result.visitorId,
                deviceType: 4,
                appId: readConfig("appId"),
                loginType: 1
            };
            UserService.userLoginByPhoneImpl(params, store,readConfig("loginUrl")).then((resp:any) => {
                if (ResponseHandler.responseSuccess(resp)) {
                    const loginResp:ILoginUserModel = resp.result;
                    AuthHandler.storeLoginAuthInfo(loginResp,readConfig("baseAuthUrl"),readConfig("accessTokenUrlPath"));
                    navigate("/");
                }
            });
        })();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const userLogin = () => {
        let param = {
            appId: readConfig("appId")
        };
        UserService.userLoginImpl(param, store).then((data: any) => {
            window.location.href = data.result;
        });
    }

    const loginBody = () => {
        return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                size={"large"}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
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
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `手机号登录`,
            children: loginBody(),
        },
        {
            key: '2',
            label: `支付宝扫码登录`,
            children: <div></div>,
        },

    ];

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.loginsContainer}>
                    <div className={styles.loginBody}>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;