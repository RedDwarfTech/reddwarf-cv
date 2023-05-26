import { useState } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthHandler, IUserModel } from 'rdjs-wheel';
import { useSelector } from 'react-redux';
import React from 'react';
import { readConfig } from '@/config/app/config-reader';
import { UserService } from 'rd-component';
import store from '@/redux/store/store';
import { Avatar, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
    const [isGetUserLoading, setIsGetUserLoading] = useState(false);
    const [_, setUserInfo] = useState<IUserModel>();
    const { loginUser } = useSelector((state: any) => state.rdRootReducer.user)
  
    React.useEffect(() => {
      if (loginUser && Object.keys(loginUser).length > 0) {
        AuthHandler.storeLoginAuthInfo(loginUser,readConfig("baseAuthUrl"),readConfig("accessTokenUrlPath"));
        loadCurrentUser();
        setIsLoggedIn(true);
      }
    }, [loginUser]);
  
    const userLogin = () => {
      let param = {
        appId: readConfig("appId")
      };
      UserService.userLoginImpl(param,store).then((data: any) => {
        window.location.href = data.result;
      });
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
                <div onClick={()=>UserService.doLoginOut(readConfig("logoutUrl"))}><LogoutOutlined /><span>登出</span></div>
              </div>
            </a>);
        }
        const accessTokenOrigin = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
        if (accessTokenOrigin) {
          AuthHandler.storeCookieAuthInfo(accessTokenOrigin, readConfig("baseAuthUrl"), readConfig("accessTokenUrlPath"));
          loadCurrentUser();
          setIsLoggedIn(true);
        }
        return (<Button name='aiLoginBtn' onClick={userLogin}>登录</Button>);
      }
    
      const loadCurrentUser = () => {
        if (!localStorage.getItem("userInfo") && isGetUserLoading === false) {
          setIsGetUserLoading(true);
          UserService.getCurrentUser(store).then((data: any) => {
            setUserInfo(data.result);
            localStorage.setItem("userInfo", JSON.stringify(data.result));
            setIsGetUserLoading(false);
          });
        }
      }

    return (
        <div className={styles.container}>
            <ul className={styles.menu}>
                <li onClick={()=>navigate('/')}>首页</li>
                <li onClick={()=>navigate('/user/cv/list')}>我的简历</li>
                <li onClick={()=>navigate('/template')}>简历模板</li>
                <li>价格</li>
                <li>关于</li>
            </ul>
            {renderLogin()}
        </div>
    );
}

export default Header;