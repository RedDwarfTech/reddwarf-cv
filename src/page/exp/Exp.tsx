import { withConnect } from 'rd-component';
import styles from './Exp.module.css';
import { Button, Card, Col, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {

  const navigate = useNavigate();

  const cardStyle = {
    marginTop: '16px', 
  }

  const openTemplates = () => {
    navigate('/template');
  }

  return (
    <div className={styles.container}>
      <Card title="基本信息" style={cardStyle}>
        <Row gutter={400} style={{marginTop: '20px'}}>
          <Col span={12}><div className={styles.itemcomposite}><span>职位名称：</span><Input></Input></div></Col>
          <Col span={12}><div className={styles.itemcomposite}><span>姓名：</span><Input></Input></div></Col>
        </Row>
        <Row gutter={400} style={{marginTop: '20px'}}>
          <Col span={12}><div className={styles.itemcomposite}><span>工作地点：</span><Input></Input></div></Col>
          <Col span={12}><div className={styles.itemcomposite}><span>手机号码：</span><Input></Input></div></Col>
        </Row>
        <Row gutter={400} style={{marginTop: '20px'}}>
          <Col span={12}><div className={styles.itemcomposite}><span>邮箱：</span><Input></Input></div></Col>
          <Col span={12}><div className={styles.itemcomposite}><span>出生日期：</span><Input></Input></div></Col>
        </Row>
      </Card>
      <Card title="工作经历" style={cardStyle}></Card>
      <Card title="专业技能" style={cardStyle}></Card>
      <Card title="教育经历" style={cardStyle}></Card>
      <div className={styles.operate}>
        <Button type="primary" size="large">保存</Button>
        <Button type="primary" size="large" onClick={openTemplates}>选择模版</Button>
      </div>
    </div>
  )
}

export default withConnect(App);
