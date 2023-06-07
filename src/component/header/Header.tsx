import { useState } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthHandler, UserModel, ResponseHandler } from 'rdjs-wheel';
import { useSelector } from 'react-redux';
import React from 'react';
import { readConfig } from '@/config/app/config-reader';
import { UserService } from 'rd-component';
import { Avatar, Button } from 'antd';
import { ControlOutlined, LogoutOutlined, PayCircleOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [isGetUserLoading, setIsGetUserLoading] = useState(false);
  const [_, setUserInfo] = useState<UserModel>();
  const { loginUser } = useSelector((state: any) => state.rdRootReducer.user);

  React.useEffect(() => {
    document.addEventListener("click", handleMenuClose);
    return () => {
      document.removeEventListener("click", handleMenuClose);
    };
  }, []);

  React.useEffect(() => {
    if (loginUser && Object.keys(loginUser).length > 0) {
      AuthHandler.storeLoginAuthInfo(loginUser, readConfig("baseAuthUrl"), readConfig("accessTokenUrlPath"));
      loadCurrentUser();
      setIsLoggedIn(true);
    }
  }, [loginUser]);

  const handleMenuClose = (event: any) => {
    const menu = document.getElementById('user-menu');
    const dropdown = document.getElementById('dropdown');
    if (menu && dropdown) {
      const target = event.target;
      if (!menu.contains(target)) {
        dropdown.style.display = 'none';
      }
    }
  }

  const avatarClick = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
      if (dropdown.style.display == "none" || dropdown.style.display == "") {
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    }
  }

  const renderLogin = () => {
    if (isLoggedIn) {
      var avatarUrl = localStorage.getItem('avatarUrl');
      return (
        <a id="user-menu">
          {avatarUrl ? <Avatar size={40} src={avatarUrl} onClick={avatarClick} /> : <Avatar onClick={avatarClick} size={40} >Me</Avatar>}
          <div id="dropdown" className={styles.dropdownContent}>
            <div onClick={() => { navigate("/goods") }}><PayCircleOutlined /><span>订阅</span></div>
            <div onClick={()=>{navigate("/user/profile")}}><ControlOutlined /><span>控制台</span></div>
            <div onClick={() => UserService.doLoginOut(readConfig("logoutUrl"))}><LogoutOutlined /><span>登出</span></div>
          </div>
        </a>);
    }
    const accessTokenOrigin = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    if (accessTokenOrigin) {
      AuthHandler.storeCookieAuthInfo(accessTokenOrigin, readConfig("baseAuthUrl"), readConfig("accessTokenUrlPath"));
      loadCurrentUser();
      setIsLoggedIn(true);
    }
    return (
      <div className={styles.loginOperate}>
        <Button name='aiLoginBtn' size='large' type='primary' onClick={() => { navigate("/user/login") }}>登录</Button>
        <Button name='aiRegBtn' size='large' type='primary' onClick={() => { navigate("/user/reg") }}>注册</Button>
      </div>
    );
  }

  const loadCurrentUser = () => {
    if (!localStorage.getItem("userInfo") && isGetUserLoading === false) {
      setIsGetUserLoading(true);
      UserService.getCurrUser("/cvpub/user/current-user").then((data: any) => {
        if(ResponseHandler.responseSuccess(data)){
          setUserInfo(data.result);
          localStorage.setItem("userInfo", JSON.stringify(data.result));
          setIsGetUserLoading(false);
        }
      });
    }
  }

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <li onClick={() => navigate('/')}>首页</li>
        <li onClick={() => navigate('/user/cv/list')}>我的简历</li>
        <li onClick={() => navigate('/template')}>简历模板</li>
        <li onClick={() => navigate('/about')}>关于</li>
      </ul>
      {renderLogin()}
    </div>
  );
}

export default Header;