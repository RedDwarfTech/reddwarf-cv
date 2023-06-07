import Header from '@/component/header/Header';
import styles from './CvSetting.module.css';
import { Button, Card, Modal } from 'antd';
import { useState } from 'react';
import { ICvProps } from '@/model/params/ICvProps';
import { submitRenderTask } from '@/service/cv/work/WorkService';
import { ResponseHandler } from 'rdjs-wheel';
import { useNavigate } from 'react-router-dom';
import { Goods } from 'rd-component';
import { readConfig } from '@/config/app/config-reader';
import store from '@/redux/store/store';

const CvSetting: React.FC<ICvProps> = (props: ICvProps) => {

    const [showGoodsPopup, setShowGoodsPopup] = useState(false);
    const navigate = useNavigate();

    const handleCvRender = () => {
        if (!props || !props.cv) {
            return;
        }
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
            } else {
                debugger
                if (resp?.msg === 'vip-expired') {
                    setShowGoodsPopup(true);
                }
            }
        });
    }

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.templateItem}>
                    <Card title="简历模版">
                        <div>我的简历-默认模版</div>
                    </Card>
                    <Card title="简历排序设置"></Card>
                    <div className={styles.operate}>
                        <Button type="primary" size='large' onClick={() => { handleCvRender() }}>渲染简历</Button>
                    </div>
                </div>
            </div>
            <Modal title="订阅"
                open={showGoodsPopup}
                width={1000}
                onCancel={() => setShowGoodsPopup(false)}
                footer={null}>
                <Goods refreshUser={true} appId={readConfig("appId")} store={store}></Goods>
            </Modal>
        </div>
    );
}

export default CvSetting;