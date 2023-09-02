import { Button, Modal, Space, Table, Image } from "antd";
import styles from "./CvGen.module.css";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CvGenModel } from "@/model/cv/gen/CvGenModel";
import { checkGenStatus, delGen, getCvGenList } from "@/service/cv/CvGenService";
import { ColumnsType } from "antd/es/table";
import { v4 as uuid } from 'uuid';
import { readConfig } from "@/config/app/config-reader";
import dayjs from "dayjs";
import Header from "@/component/header/Header";
import { useLocation } from "react-router-dom";
import { AppState } from "@/redux/types/AppState";

const CvGen: React.FC = () => {

    const location = useLocation();
    const { cvGenList, genUpdateList } = useSelector((state: AppState) => state.gen);
    const [cvGen, setCvGen] = useState<CvGenModel[]>([]);
    const cvGenListRef = useRef<CvGenModel[]>(cvGen);

    React.useEffect(() => {
        getCvGenList();
        const intervalId = setInterval(() => {
            getRenderStatus(cvGenListRef.current);
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    React.useEffect(() => {
        if (!genUpdateList || genUpdateList.length === 0) {
            return;
        }
        setCvGen(prevState => {
            let newList: CvGenModel[] = [];
            if (prevState && prevState.length > 0) {
                prevState.forEach(item => {
                    if (item.gen_status !== 2) {
                        const fetched = genUpdateList.find(item1 => item1.id === item.id);
                        if (fetched && fetched.gen_status !== item.gen_status) {
                            item.gen_status = fetched.gen_status;
                            item.gen_time = fetched.gen_time;
                            item.path = fetched.path;
                        }
                    }
                    newList.push(item);
                });
            }
            return newList;
        });
    }, [genUpdateList]);

    React.useEffect(() => {
        cvGenListRef.current = cvGen;
    }, [cvGen]);

    React.useEffect(() => {
        setCvGen(cvGenList);
    }, [cvGenList]);

    const handlePreview = (record: CvGenModel) => {
        let pdfFileName = getFileNameFromPath(record.path);
        window.open(readConfig("cvBaseUrl") + pdfFileName);
    }

    const getFileNameFromPath = (filePath: string): string =>{
        const pathArray = filePath.split('/');
        const fileName = pathArray[pathArray.length - 1];
        return fileName;
    }

    const getRenderStatus = (currCvGenList: CvGenModel[]) => {
        if (!currCvGenList || currCvGenList.length === 0) return;
        const pendingTask = currCvGenList.filter(item => item.gen_status !== 2);
        if (!pendingTask || pendingTask.length === 0) return;
        const ids = pendingTask.map(item => item.id).join(",");
        if(ids){
            checkGenStatus(ids);
        }
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
            title: '模版名称',
            dataIndex: 'template_name',
            key: 'template_name',
        },
        {
            title: '模版',
            dataIndex: 'template_name',
            key: 'template_name',
            render: (_, record) => {
                return (
                    <div>
                        <Image width={40} height={40} src={record.preview_url}></Image>
                    </div>
                );
            }
        },
        {
            title: '任务创建时间',
            dataIndex: 'gen_time',
            key: 'gen_time',
            render: (_, record) => {
                return dayjs.unix(Number(record.created_time) / 1000).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            title: '生成时间',
            dataIndex: 'gen_time',
            key: 'gen_time',
            render: (_, record) => {
                const gen_time = Number(record.gen_time);
                if (gen_time > 0) {
                    return dayjs.unix(Number(record.gen_time) / 1000).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    return "--";
                }
            }
        },
        {
            title: '当前状态',
            dataIndex: 'gen_status',
            key: 'gen_status',
            render: (_, record) => {
                if (record.gen_status === 1) {
                    return "生成中"
                }
                if (record.gen_status === 0) {
                    return "排队中"
                }
                if (record.gen_status === 2) {
                    return "已生成";
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => {
                if (record.gen_status === 2) {
                    return (
                        <Space key={uuid()} size="middle">
                            <Button type="primary" onClick={() => { handlePreview(record) }}>预览</Button>
                            <Button type="primary" onClick={() => { handleDownload(record) }}>下载</Button>
                            <Button type="primary" onClick={() => { window.open('/gen/code?id=' + record.id) }}>源码</Button>
                            <Button type="primary" onClick={() => { handleGenDel(record) }}>删除</Button>
                        </Space>
                    );
                } else {
                    return (<div>
                        <Button type="primary" onClick={() => { handleGenDel(record) }}>删除</Button>
                    </div>);
                }
            },
        },
    ];

    return (
        <div>
            {location.state?.showHeader ? <Header></Header> : <div></div>}
            <div className={styles.container}>
                <Table dataSource={cvGen} columns={columns} />
            </div>
        </div>
    );
}

export default CvGen;