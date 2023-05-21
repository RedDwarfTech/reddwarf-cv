import { Button, Card, Col, Input, Row } from "antd";
import styles from './Edu.module.css';

const Edu: React.FC = () => {

    const cardStyle = {
        marginTop: '16px',
    }

    return (
        <Card title="教育经历" style={cardStyle}>
            <Row gutter={400} style={{ marginTop: '20px' }}>
                <Col span={12}><div className={styles.itemcomposite}><span>职位名称：</span><Input></Input></div></Col>
                <Col span={12}><div className={styles.itemcomposite}><span>姓名：</span><Input></Input></div></Col>
            </Row>
            <Row gutter={400} style={{ marginTop: '20px' }}>
                <Col span={12}><div className={styles.itemcomposite}><span>工作地点：</span><Input></Input></div></Col>
                <Col span={12}><div className={styles.itemcomposite}><span>手机号码：</span><Input ></Input></div></Col>
            </Row>
            <Row gutter={400} style={{ marginTop: '20px' }}>
                <Col span={12}><div className={styles.itemcomposite}><span>邮箱：</span><Input></Input></div></Col>
                <Col span={12}><div className={styles.itemcomposite}><span>出生日期：</span><Input ></Input></div></Col>
            </Row>
            <div className={styles.operate}>
                <Button type="primary" size="large">保存</Button>
            </div>
        </Card>
    );
}

export default Edu;