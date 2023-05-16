import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.menu}>
                <li>首页</li>
                <li>简历信息</li>
                <li>简历模板</li>
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