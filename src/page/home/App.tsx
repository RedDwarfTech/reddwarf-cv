import { withConnect } from 'rd-component';
import styles from './App.module.css'
import { Button, Steps } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '@/component/header/Header';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moderncv from "@/assets/cv/template/moderncv-legacy-template-zh.png";
import zheyuye from "@/assets/cv/template/zheyuye.jpeg";
import hijiangtao from "@/assets/cv/template/hijiangtao-resume.preview.png";
import translationEN from '@/locales/en.json';
import translationZH from '@/locales/zh.json';
import React from 'react';

const userLanguage = navigator.language;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN
    },
    zh: {
      translation: translationZH
    }
  },
  lng: userLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

const App: React.FC = () => {
  const navigate = useNavigate();
  const description = '';
  let currentIndex = 0;

  React.useEffect(() => {
    let slide = setInterval(nextImage, 10000);
    return () => {
      clearInterval(slide);
    }
  }, []);

  const showImage = (index: number, images: any) => {
    if (!images || images.length === 0) return;
    images.forEach((img: any) => {
      img.style.display = 'none';
    });
    const img = images[index] as HTMLImageElement;
    if (img) {
      img.style.display = 'block';
    }
  }

  const nextImage = () => {
    const images = document.querySelectorAll(`.${styles.slideshow} img`);
    if (!images || images.length === 0) return;
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    showImage(currentIndex,images);
  }

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.overview}>
          <div className={styles.overviewContent}>
            <h1>在线LaTeX简历制作工具</h1>
            <h3>以最简单的方式来写好简历，只需专注内容本身而<span className={styles.sloganBold}>无需关注排版</span></h3>
            <Button onClick={() => { navigate('/user/cv/list'); }}>立即体验</Button>
          </div>
        </div>
        <div className={styles.template}>
          <div className={styles.tplLeft}>
            <h1>专业的模版</h1>
            <h3>一份简历，可以使用多种模版，调整风格就在瞬间</h3>
          </div>
          <div className={styles.tplRight}>
            <div className={styles.slideshow}>
              <img src={moderncv} alt="Image 1" />
              <img src={zheyuye} alt="Image 2" />
              <img src={hijiangtao} alt="Image 3" />
            </div>
          </div>
        </div>
        <div className={styles.steps}>
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
    </div>
  )
}

export default withConnect(App);
