import { Button, Modal, Space, Table } from "antd";
import styles from "./CvGen.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CvGenModel } from "@/model/cv/gen/CvGenModel";
import { delGen, getCvGenList } from "@/service/cv/CvGenService";
import { ColumnsType } from "antd/es/table";
import { v4 as uuid } from 'uuid';
import { readConfig } from "@/config/app/config-reader";

const CvGen: React.FC = () => {

    const { cvGenList } = useSelector((state: any) => state.gen);
    const [cvGen, setCvGen] = useState<CvGenModel[]>([]);

    React.useEffect(() => {
        getCvGenList();
    }, []);

    React.useEffect(() => {
        if (cvGenList && cvGenList.length > 0) {
            setCvGen(cvGenList);
        }
    }, [cvGenList]);

    const handlePreview = (record: CvGenModel) => {
        window.open(readConfig("cvBaseUrl") + record.path);
    }

    const handleDownload = (record: CvGenModel) => {
        fetch(readConfig("cvBaseUrl") + record.path)
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'filename.pdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }

    const handleGenDel = (record: CvGenModel) => {
        Modal.confirm({
            title: '删除确认',
            content: '确定要永久删除渲染记录吗？删除后无法恢复',
            onOk() {
                delGen(record.id);
            },
            onCancel() {

            },
        });
    }

    const columns: ColumnsType<CvGenModel> = [
        {
            title: '简历名称',
            dataIndex: 'cv_name',
            key: 'cv_name',
        },
        {
            title: '生成日期',
            dataIndex: 'gen_time',
            key: 'gen_time',
        },
        {
            title: '当前状态',
            dataIndex: 'gen_status',
            key: 'gen_status',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => {
                if (record.gen_status === 1) {
                    return (
                        <Space key={uuid()} size="middle">
                            <Button type="primary" onClick={() => { handlePreview(record) }}>预览</Button>
                            <Button type="primary" onClick={() => { handleDownload(record) }}>下载</Button>
                            <Button type="primary" onClick={() => { handleGenDel(record) }}>删除</Button>
                        </Space>
                    );
                } else {
                    return (<div>
                        <Button type="primary" onClick={() => { handleGenDel(record) }}>下载</Button>
                    </div>);
                }
            },
        },
    ];

    return (
        <div>
            <div className={styles.container}>
                <Table dataSource={cvGen} columns={columns} />
            </div>
        </div>
    );
}

export default CvGen;