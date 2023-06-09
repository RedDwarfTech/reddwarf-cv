import { withConnect } from 'rd-component';
import styles from './Exp.module.css';
import { Tabs, TabsProps } from 'antd';
import Header from '@/component/header/Header';
import Summary from './summary/Summary';
import Edu from './edu/Edu';
import { useLocation } from 'react-router-dom';
import Work from './work/Work';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Cv } from '@/model/cv/Cv';
import { AppState } from '@/redux/types/AppState';
import Skills from './skills/Skills';
import ProjectExp from './project/ProjectExp';
import { readConfig } from '@/config/app/config-reader';
import Lang from './lang/Lang';

const App: React.FC = () => {

  const location = useLocation();
  const { summary } = useSelector((state: AppState) => state.cv);
  const [currentCv, setCurrentCv] = useState<Cv | null>();

  React.useEffect(() => {
    if (summary && Object.keys(summary).length > 0) {
      setCurrentCv(summary as Cv);
    }
  }, [summary]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `基本信息`,
      children: <Summary cv={currentCv ? currentCv : location.state}></Summary>,
    },
    {
      key: '2',
      label: `教育信息`,
      children: <Edu cv={currentCv ? currentCv : location.state}></Edu>,
    },
    {
      key: '3',
      label: `工作经历`,
      children: <Work cv={currentCv ? currentCv : location.state}></Work>,
    },
    {
      key: '4',
      label: `专业技能`,
      children: <Skills cv={currentCv ? currentCv : location.state}></Skills>,
    },
    {
      key: '5',
      label: `项目经历`,
      children: <ProjectExp cv={currentCv ? currentCv : location.state}></ProjectExp>,
    },
    {
      key: '6',
      label: `语言技能`,
      children: <Lang cv={currentCv ? currentCv : location.state}></Lang>,
    }
  ];

  const currCv: Cv = currentCv ? currentCv : location.state;
  const orderList = (currCv && Object.keys(currCv).length > 0) ? currCv.item_order.split(',').map(Number):readConfig("defaultCvOrder").split(",").map(Number);

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        <Tabs size="large" defaultActiveKey="1" items={items.sort((a, b) => {
          const aIndex = orderList.indexOf(parseInt(a.key));
          const bIndex = orderList.indexOf(parseInt(b.key));
          return aIndex - bIndex;
        })} onChange={onChange} />
      </div>
    </div>
  )
}

export default withConnect(App);
