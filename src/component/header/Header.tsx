import { useCallback, useState } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthHandler } from 'rdjs-wheel';
import { useSelector } from 'react-redux';
import React from 'react';
import { readConfig } from '@/config/app/config-reader';
import { UserService } from 'rd-component';
import { Avatar, Button } from 'antd';
import { ControlOutlined, LogoutOutlined, PayCircleOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';
import avatarImg from "@/assets/icon/avatar.png";
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
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
      loadCurrUser();
      setIsLoggedIn(true);
    }
  }, [loginUser]);


  const loadCurrUser = useCallback(throttle(() => {
    loadCurrentUser();
  }, 5000, {
    trailing: false,
  }), []);

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
        <div className={styles.languageSelector}>
          {languageSelector()}
          <a id="user-menu">
            {avatarUrl ? <Avatar size={40} src={avatarUrl} onClick={avatarClick} /> : <Avatar onClick={avatarClick} size={40} src={avatarImg} >Me</Avatar>}
            <div id="dropdown" className={styles.dropdownContent}>
              <div onClick={() => { navigate("/goods") }}><PayCircleOutlined /><span>订阅</span></div>
              <div onClick={() => { navigate("/user/profile") }}><ControlOutlined /><span>控制台</span></div>
              <div onClick={() => UserService.doLoginOut(readConfig("logoutUrl"))}><LogoutOutlined /><span>登出</span></div>
            </div>
          </a>
        </div>
      );
    }
    const accessTokenOrigin = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    if (accessTokenOrigin) {
      AuthHandler.storeCookieAuthInfo(accessTokenOrigin, readConfig("baseAuthUrl"), readConfig("accessTokenUrlPath"));
      loadCurrentUser();
      setIsLoggedIn(true);
    }
    return (
      <div className={styles.loginOperate}>
        {languageSelector()}
        <Button name='aiLoginBtn' size='large' type='primary' onClick={() => { navigate("/user/login") }}>{t("login")}</Button>
        <Button name='aiRegBtn' size='large' type='primary' onClick={() => { navigate("/user/reg") }}>{t("signup")}</Button>
      </div>
    );
  }

  const loadCurrentUser = () => {
    UserService.loadCurrUser(false, readConfig("refreshUserUrl"));
    navigate("/");
  }

  const languageSelector = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (e: any) => {
      i18n.changeLanguage(e.target.value);
      localStorage.setItem("userLanguage",e.target.value);
    };

    return (
      <select onChange={handleChangeLanguage} defaultValue={UserService.getCurrLang()}>
        <option value="zh">简体中文</option>
        <option value="en">English</option>
      </select>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <li onClick={() => navigate('/')}>{t('home')}</li>
        <li onClick={() => navigate('/user/cv/list')}>{t('resume')}</li>
        <li onClick={() => navigate('/template')}>{t('template')}</li>
        <li onClick={() => navigate('/about')}>{t('about')}</li>
      </ul>
      {renderLogin()}
    </div>
  );
}

export default Header;