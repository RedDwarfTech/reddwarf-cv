import { Avatar, Button, Card, Col, Row } from "antd";
import { UserModel } from "rdjs-wheel";
import React, { useState } from "react";
import styles from "./Profile.module.css";
import alipayPic from "@/assets/icon/alipay-circle.png";
import wechatPic from "@/assets/icon/wechat.png";
import { useSelector } from "react-redux";
import { UserProfile, UserService, withConnect } from "rd-component";
import store from "@/redux/store/store";
import Header from "@/component/header/Header";
import CvGen from "@/page/cv/gen/CvGen";
import { readConfig } from "@/config/app/config-reader";

export type ProfileProps = {
  panelUserInfo: UserModel | undefined;
};

const Profile: React.FC = () => {

  const [currentPanel, setCurrentPanel] = useState('userinfo');
  const [userInfo, setUserInfo] = useState<UserModel>();
  const { user } = useSelector((state: any) => state.rdRootReducer.user);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  React.useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUserInfo(user);
    }
  }, [user]);

  const getUserInfo = () => {
    const userInfoJson = localStorage.getItem("userInfo");
    if (userInfoJson) {
      const uInfo: UserModel = JSON.parse(userInfoJson);
      setUserInfo(uInfo);
    } else {
      UserService.getCurrentUser(store);
    }
  }

  const userLogin = (url: string) => {
    let param = {
      appId: readConfig("appId"),
      userAction: "bind"
    };
    UserService.userLoginImpl(param, store, url).then((data: any) => {
      window.location.href = data.result;
    });
  }


  const handleBind = (channelType: number) => {
    if (channelType === 5) {
      userLogin("/post/alipay/login/getQRCodeUrl");
    }
    if (channelType === 1) {
      userLogin("/post/wechat/login/getQRCodeUrl");
    }
  }

  const renderBindStatus = (channelType: number) => {
    if (!userInfo || !userInfo.thirdBind || userInfo.thirdBind.length === 0) {
      return (<Button onClick={() => handleBind(channelType)}>绑定</Button>);
    }
    const bind = userInfo.thirdBind.find(item => item.channelType === channelType);
    if (bind && bind.bindStatus == 1) {
      return (<Button>解绑</Button>);
    }
    return (<Button onClick={() => handleBind(channelType)}>绑定</Button>);
  }

  const renderPanelContent = () => {
    if (currentPanel && currentPanel === 'cvgen') {
      return <CvGen></CvGen>
    }
    if (currentPanel && currentPanel === 'userinfo') {
      return (<div id="userinfo">
        <Card title="基本信息" style={{ marginBottom: '20px' }}>
          <Row style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Col span={8}><span className={styles.userInfo}>用户昵称</span></Col>
            <Col span={8}><span className={styles.userInfo}>{userInfo ? userInfo!.nickname : ""}</span></Col>
            <Col span={8}></Col>
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col span={8}>
              <span className={styles.userInfo}>会员到期日</span>
            </Col>
            <Col span={8}>
              <span className={styles.userInfo}>{userInfo ? UserProfile.getVipExpiredTime(userInfo) : "--"}</span>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Card>
        <Card title="登录凭据">
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col span={8}>
              <Avatar src={alipayPic}></Avatar>
            </Col>
            <Col span={8}><span>{renderBindStatus(5)}</span></Col>
            <Col span={8}><span></span></Col>
          </Row>
          <Row style={{ marginTop: '30px', marginBottom: '10px' }}>
            <Col span={8}>
              <Avatar src={wechatPic}></Avatar>
            </Col>
            <Col span={8}><span>{renderBindStatus(1)}</span></Col>
            <Col span={8}><span></span></Col>
          </Row>
        </Card>
      </div>);
    }
    return (<div></div>);
  }

  const handlePanelSwitch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const targetData = e.target.getAttribute('data-target') || e.target.parentNode.getAttribute('data-target');;
    if (targetData) {
      setCurrentPanel(targetData);
    }
  }

  return (
    <div>
      <Header></Header>
      <div className={styles.panelContainer}>
        <div className={styles.panelMenu}>
          <div className={styles.menuItem} data-target="userinfo" id="userinfo-menu" onClick={handlePanelSwitch}>
            <span>我的信息</span>
          </div>
          <div className={styles.menuItem} data-target="cvgen" id="userinfo-menu" onClick={handlePanelSwitch}>
            <span>渲染历史</span>
          </div>
          <div className={styles.menuItem} data-target="feedback" id="feedback-menu" onClick={handlePanelSwitch}>
            <span>意见与建议</span>
          </div>
        </div>
        <div className={styles.panelContent}>
          {renderPanelContent()}
        </div>
      </div>
    </div>
  );
}

export default withConnect(Profile);
