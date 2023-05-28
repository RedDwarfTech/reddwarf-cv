import { Avatar, Card, Col, Row } from "antd";
import { IUserModel } from "rdjs-wheel";
import React, { useState } from "react";
import "./Profile.css";
import alipayPic from "@/assets/icon/alipay-circle.png";
import { useSelector } from "react-redux";
import { UserProfile, UserService, withConnect } from "rd-component";
import store from "@/redux/store/store";
import Header from "@/component/header/Header";
import CvGen from "@/page/cv/gen/CvGen";

export type ProfileProps = {
  panelUserInfo: IUserModel | undefined;
};

const Profile: React.FC = () => {

  const [currentPanel, setCurrentPanel] = useState('userinfo');
  const [userInfo, setUserInfo] = useState<IUserModel>();
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
      const uInfo: IUserModel = JSON.parse(userInfoJson);
      setUserInfo(uInfo);
    } else {
      UserService.getCurrentUser(store);
    }
  }

  const renderPanelContent = () => {
    if (currentPanel && currentPanel === 'cvgen') {
      return <CvGen></CvGen>
    }
    if (currentPanel && currentPanel === 'userinfo') {
      return (<div id="userinfo">
        <Card title="基本信息" style={{ marginBottom: '20px' }}>
          <Row style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Col span={8}><span className="user-info">用户昵称</span></Col>
            <Col span={8}><span className="user-info">{userInfo ? userInfo!.nickname : ""}</span></Col>
            <Col span={8}></Col>
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col span={8}><span className="user-info">会员到期日</span></Col>
            <Col span={8}><span className="user-info">{userInfo ? UserProfile.getVipExpiredTime(userInfo) : "--"}</span></Col>
            <Col span={8}></Col>
          </Row>
        </Card>
        <Card title="登录凭据">
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col span={8}>
              <Avatar src={alipayPic}></Avatar>
            </Col>
            <Col span={8}><span>已绑定</span></Col>
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
      <div className="panel-container">
        <div className="panel-menu">
          <div className="menu-item" data-target="userinfo" id="userinfo-menu" onClick={handlePanelSwitch}><span>我的信息</span></div>
          <div className="menu-item" data-target="cvgen" id="userinfo-menu" onClick={handlePanelSwitch}><span>渲染历史</span></div>
          <div className="menu-item" data-target="feedback" id="feedback-menu" onClick={handlePanelSwitch}><span>意见与建议</span></div>
        </div>
        <div className="panel-content">
          {renderPanelContent()}
        </div>
      </div>
    </div>
  );
}

export default withConnect(Profile);
