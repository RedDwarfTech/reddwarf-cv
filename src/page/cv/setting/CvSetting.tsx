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
import { updateCvMainOrder } from '@/service/cv/CvService';

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

    const handleCvRender = () => {
        let params = {
            template_id: 1,
            cv_id: location.state.id,
            cv_name: location.state.cv_name
        };
        submitRenderTask(params).then((resp) => {
            if (ResponseHandler.responseSuccess(resp)) {
                navigate("/user/cv/gen/list", {
                    state: {
                        showHeader: true
                    }
                });
            } else {
                debugger
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
    const orderList = location.state.item_order.split(',').map(Number);

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setDataSource((previous) => {
                const activeIndex = previous.findIndex((i) => i.key === active.id);
                const overIndex = previous.findIndex((i) => i.key === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
        let cvOrders = dataSource.map(data =>data.key).join(",");
        let params = {
            id: location.state.id,
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
                                    dataSource={dataSource.sort((a, b) => {
                                        const aIndex = orderList.indexOf(parseInt(a.key));
                                        const bIndex = orderList.indexOf(parseInt(b.key));
                                        return aIndex - bIndex;
                                      })}
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