import { withConnect } from 'rd-component';
import './App.module.css'
import { Steps } from 'antd';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();
  const description = 'This is a description.';

  return (
    <Steps
    current={1}
    items={[
      {
        title: '填写资料',
        description,
        onClick: () =>{
          navigate('/exp');
        } 
      },
      {
        title: '选择简历模版',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: '完成',
        description,
      },
    ]}
  />
  )
}

export default withConnect(App);
