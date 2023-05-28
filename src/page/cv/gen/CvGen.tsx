import { Table } from "antd";
import styles from "./CvGen.module.css";

const CvGen: React.FC = () => {

    const dataSource = [
        {
            key: '1',
            name: '我的简历1',
            age: 32,
            cvStatus: '生成中',
            address: '下载',
        },
        {
            key: '2',
            name: '我的简历2',
            age: 42,
            cvStatus: '已生成',
            address: '下载',
        },
    ];

    const columns = [
        {
            title: '简历名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '生成日期',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '当前状态',
            dataIndex: 'cvStatus',
            key: 'cvStatus',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            <div className={styles.container}>
                <Table dataSource={dataSource} columns={columns} />;
            </div>
        </div>
    );
}

export default CvGen;