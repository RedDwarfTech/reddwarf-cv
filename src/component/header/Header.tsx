import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <ul className={styles.menu}>
                <li onClick={()=>navigate('/')}>首页</li>
                <li onClick={()=>navigate('/user/cv/list')}>我的简历</li>
                <li onClick={()=>navigate('/template')}>简历模板</li>
                <li>价格</li>
                <li>关于</li>
            </ul>
            <div className={styles.active}>
                <img src="https://via.placeholder.com/40x40" alt="User Avatar" />
                <span>username</span>
            </div>
        </div>
    );
}

export default Header;