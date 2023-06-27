import { withConnect } from 'rd-component';
import styles from './App.module.css'
import { Steps } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '@/component/header/Header';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '@/locales/en.json'; // 导入您的语言文件
import translationZH from '@/locales/zh.json'; // 导入您的语言文件

const userLanguage = navigator.language;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN // 设置英文翻译
    },
    zh: {
      translation: translationZH
    }
  },
  lng: userLanguage, 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // 使得 React 中的变量替换不会进行转义
  }
});

const App: React.FC = () => {
  const navigate = useNavigate();
  const description = '';

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        <Steps
          current={-1}
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
              subTitle: '',
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
