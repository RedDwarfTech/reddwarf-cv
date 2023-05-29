import { Button, Space, Table } from "antd";
import styles from "./CvGen.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CvGenModel } from "@/model/cv/gen/CvGenModel";
import { getCvGenList } from "@/service/cv/CvGenService";
import { ColumnsType } from "antd/es/table";

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

    const handlePreview = () => {
        window.open("https://cv.poemhub.top/cv/static/pdf/modern.pdf");
    }

    const handleDownload = () => {
        fetch("https://cv.poemhub.top/cv/static/pdf/modern.pdf")
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

    const columns: ColumnsType<CvGenModel> = [
        {
            title: '简历名称',
            dataIndex: 'cv_name',
            key: 'cv_name',
        },
        {
            title: '生成日期',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '当前状态',
            dataIndex: 'gen_status',
            key: 'genStatus',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => { handlePreview() }}>预览</Button>
                    <Button type="primary" onClick={() => { handleDownload() }}>下载</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className={styles.container}>
                <Table dataSource={cvGen} columns={columns} />;
            </div>
        </div>
    );
}

export default CvGen;