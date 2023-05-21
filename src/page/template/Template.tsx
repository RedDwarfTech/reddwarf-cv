import Header from '@/component/header/Header';
import styles from './Template.module.css';
import templateDemo from '@/assets/template/template-demo.jpeg';

const Template: React.FC = () => {
    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.templateItem}>
                    <div>
                        <img src={templateDemo}></img>
                    </div>
                    <div>约翰的简历-英文简历</div>
                </div>
            </div>
        </div>
    );
}

export default Template;