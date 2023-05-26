import Header from "@/component/header/Header";
import { Button, Form, Input, Tabs, TabsProps } from "antd";
import styles from './Login.module.css';
import { renderFormLabel } from "@/component/common/RenderUtil";
import { UserService } from "rd-component";
import { readConfig } from "@/config/app/config-reader";
import store from "@/redux/store/store";

const Login: React.FC = () => {

    const onChange = (key: string) => {
        if(key === '2'){
            userLogin();
        }
        console.log(key);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                autoComplete="off"
            >
                <Form.Item
                    label={renderFormLabel("手机号")}
                    name="username"
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
                        提交
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