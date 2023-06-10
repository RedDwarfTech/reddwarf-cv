import Header from '@/component/header/Header';
import styles from './CvSetting.module.css';
import { Button, Card, Modal } from 'antd';
import { useState } from 'react';
import { submitRenderTask } from '@/service/cv/work/WorkService';
import { ResponseHandler } from 'rdjs-wheel';
import { useLocation, useNavigate } from 'react-router-dom';
import { Goods } from 'rd-component';
import { readConfig } from '@/config/app/config-reader';
import store from '@/redux/store/store';
import Table, { ColumnsType } from 'antd/es/table';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { getCvSummary, updateCvMainOrder } from '@/service/cv/CvService';
import { Cv } from '@/model/cv/Cv';
import { AppState } from '@/redux/types/AppState';
import { useSelector } from 'react-redux';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if ((child as React.ReactElement).key === 'sort') {
                    return React.cloneElement(child as React.ReactElement, {
                        children: (
                            <MenuOutlined
                                ref={setActivatorNodeRef}
                                style={{ touchAction: 'none', cursor: 'move' }}
                                {...listeners}
                            />
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
};


const CvSetting: React.FC = () => {

    const [showGoodsPopup, setShowGoodsPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [currentCv, setCurrentCv] = useState<Cv>();
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: '1',
            age: "基本信息",
        },
        {
            key: '2',
            name: '2',
            age: "教育信息",
        },
        {
            key: '3',
            name: '3',
            age: "工作经历",
        },
        {
            key: '4',
            name: '4',
            age: "专业技能",
        },
        {
            key: '5',
            name: '5',
            age: "项目经历",
        },
    ]);
    const { summary } = useSelector((state: AppState) => state.cv);

    React.useEffect(() => {
        if (location && location.state && Object.keys(location.state).length > 0) {
            getCvSummary(location.state.id);
        }
    }, []);

    React.useEffect(() => {
        if (summary && Object.keys(summary).length > 0) {
            setCurrentCv(summary);
            const orderList =summary.item_order.split(',').map(Number);
            const sortedDatasource = dataSource.sort((a, b) => {
                const aIndex = orderList.indexOf(parseInt(a.key));
                const bIndex = orderList.indexOf(parseInt(b.key));
                return aIndex - bIndex;
            });
            // https://stackoverflow.com/questions/69236705/antd-table-is-not-updating-on-datasource-updates-changes
            setDataSource([...sortedDatasource]);
        }
    }, [summary]);

    const handleCvRender = () => {
        if (!currentCv) return;
        let params = {
            template_id: 1,
            cv_id: currentCv.id,
            cv_name: currentCv.cv_name
        };
        submitRenderTask(params).then((resp) => {
            if (ResponseHandler.responseSuccess(resp)) {
                navigate("/user/cv/gen/list", {
                    state: {
                        showHeader: true
                    }
                });
            } else {
                if (resp?.msg === 'vip-expired') {
                    setShowGoodsPopup(true);
                }
            }
        });
    }

    interface DataType {
        key: string;
        name: string;
        age: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            key: 'sort',
        },
        {
            title: '序号',
            dataIndex: 'name',
        },
        {
            title: '项',
            dataIndex: 'age',
        }
    ];

    if(!currentCv || Object.keys(currentCv).length === 0){
        return (<div></div>);
    }
    
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (!currentCv||Object.keys(currentCv).length==0) return;
        let previous = dataSource;
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        const newSource = arrayMove(previous, activeIndex, overIndex);
        let cvOrders = newSource.map(data => data.key).join(",");
        let params = {
            id: currentCv.id,
            item_order: cvOrders
        };
        updateCvMainOrder(params);
    };

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.templateItem}>
                    <Card title="简历模版">
                        <div>我的简历-默认模版</div>
                    </Card>
                    <Card title="简历排序设置">
                        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                            <SortableContext
                                // rowKey array
                                items={dataSource.map((i) => i.key)}
                                strategy={verticalListSortingStrategy}
                            >
                                <Table
                                    components={{
                                        body: {
                                            row: Row,
                                        },
                                    }}
                                    rowKey="key"
                                    columns={columns}
                                    dataSource={dataSource}
                                />
                            </SortableContext>
                        </DndContext>
                    </Card>
                    <div className={styles.operate}>
                        <Button type="primary" size='large' onClick={() => { handleCvRender() }}>渲染简历</Button>
                    </div>
                </div>
            </div>
            <Modal title="订阅"
                open={showGoodsPopup}
                width={1000}
                onCancel={() => setShowGoodsPopup(false)}
                footer={null}>
                <Goods refreshUser={true} appId={readConfig("appId")} store={store}></Goods>
            </Modal>
        </div>
    );
}

export default CvSetting;