import { withConnect } from 'rd-component';
import styles from './Exp.module.css';
import { Tabs, TabsProps } from 'antd';
import Header from '@/component/header/Header';
import Summary from './summary/Summary';
import Edu from './edu/Edu';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {

  const location = useLocation();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `基本信息`,
      children: <Summary cv={location.state}></Summary>,
    },
    {
      key: '2',
      label: `教育信息`,
      children: <Edu></Edu>,
    }
  ];

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  )
}

export default withConnect(App);
