import { withConnect } from 'rd-component';
import styles from './App.module.css'
import { Steps } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '@/component/header/Header';

const App: React.FC = () => {
  const navigate = useNavigate();
  const description = 'This is a description.';

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        <Steps
          current={1}
          items={[
            {
              title: '填写资料',
              description,
              onClick: () => {
                navigate('/exp');
              }
            },
            {
              title: '选择简历模版',
              description,
              subTitle: 'Left 00:00:08',
            },
            {
              title: '查看简历',
              description,
              onClick: () => {
                navigate('/cvlist');
              }
            },
          ]}
        />
      </div>
    </div>
  )
}

export default withConnect(App);
