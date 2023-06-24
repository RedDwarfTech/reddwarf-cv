import Header from '@/component/header/Header';
import styles from './CvSetting.module.css';
import { Button, Card, Divider, Modal, Radio, RadioChangeEvent } from 'antd';
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
import { getCvSummary, setCurrCvMainColor, setCurrCvTpl, setThemeColor, updateCvMainOrder } from '@/service/cv/CvService';
import { Cv } from '@/model/cv/Cv';
import { AppState } from '@/redux/types/AppState';
import { useSelector } from 'react-redux';
import { getTemplate, getTemplateList } from '@/service/tpl/TemplateService';
import { CvTpl } from '@/model/tpl/CvTpl';
import { Image } from 'antd';
import { v4 as uuid } from 'uuid';

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
    const [showTplPopup, setShowTplPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [currentCv, setCurrentCv] = useState<Cv>();
    const { tplList, tpl } = useSelector((state: AppState) => state.tpl);
    const { currTpl, currMainColor,currTheme } = useSelector((state: AppState) => state.cv);
    const [cvTpl, setCvTpl] = useState<CvTpl[]>([]);
    const [cvCurrTpl, setCvCurrTpl] = useState<CvTpl>();
    const [mainColorValue, setMainColorValue] = useState("");
    const [themeValue, setThemeValue] = useState("");
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
        getTemplate(location.state.template_id);
    }, []);

    React.useEffect(() => {
        setCvTpl(tplList);
    }, [tplList]);

    React.useEffect(() => {
        setCvCurrTpl(currTpl);
    }, [currTpl]);

    React.useEffect(() => {
        setCvCurrTpl(tpl);
    }, [tpl]);

    React.useEffect(() => {
        setMainColorValue(currMainColor.main_color);
    },[currMainColor]);

    React.useEffect(() => {
        setThemeValue(currTheme.theme);
    },[currTheme]);

    React.useEffect(() => {
        if (summary && Object.keys(summary).length > 0) {
            setCurrentCv(summary);
            const orderList = summary.item_order.split(',').map(Number);
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
            template_id: cvCurrTpl?.template_id,
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

    if (!currentCv || Object.keys(currentCv).length === 0) {
        return (<div></div>);
    }

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (!currentCv || Object.keys(currentCv).length == 0) return;
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

    const handleChooseTpl = () => {
        getTemplateList().then((resp) => {
            if (ResponseHandler.responseSuccess(resp)) {
                setShowTplPopup(true);
            }
        });
    }

    const handleChooseConfirm = (item: Cv, tpl_id: number) => {
        let params = {
            cv_id: item.id,
            tpl_id: tpl_id
        };
        setCurrCvTpl(params);
    }

    const renderTplList = () => {
        const cvList: JSX.Element[] = [];
        if (!cvTpl || cvTpl.length === 0) {
            return <div></div>
        }
        cvTpl.forEach((item: CvTpl) => {
            cvList.push(
                <div className={styles.templateChooseItem}>
                    <div>
                        <Image width={200} height={300} src={item.preview_url}></Image>
                    </div>
                    <div>{item.name}</div>
                    <Button type="primary"
                        disabled={cvCurrTpl ? cvCurrTpl.template_id == item.template_id : false}
                        onClick={() => { handleChooseConfirm(currentCv, item.template_id) }}>选我</Button>
                </div>
            );
        });
        return cvList;
    }

    const onMainColorChange = (e: RadioChangeEvent) => {
        let params = {
            cv_id: currentCv.id,
            main_color: e.target.value
        };
        setCurrCvMainColor(params);
    };

    const onThemeChange = (e: RadioChangeEvent) => {
        let params = {
            cv_id: currentCv.id,
            theme: e.target.value
        };
        setThemeColor(params);
    };

    const renderMainColorItems = (mainColorOptions: string[]) => {
        const colorChoices: JSX.Element[] = [];
        mainColorOptions.forEach((item: string) => {
            colorChoices.push(
                <Radio key={uuid()} value={item}>{item}</Radio>
            );
        });
        return colorChoices;
    }

    const renderCvMainColorSetting = () => {
        if (cvCurrTpl === undefined || !cvCurrTpl.main_color || cvCurrTpl.main_color.length == 0) {
            return (<div></div>);
        }
        const mainColorOptions = cvCurrTpl.main_color.split(",");
        return (
            <div>
                <div>主色调：</div>
                <Radio.Group
                    value={mainColorValue}
                    onChange={onMainColorChange} >
                    {renderMainColorItems(mainColorOptions)}
                </Radio.Group>
            </div>
        );
    }

    const renderCvThemeSetting = () => {
        if (cvCurrTpl === undefined || !cvCurrTpl.theme || cvCurrTpl.theme.length == 0) {
            return (<div></div>);
        }
        const mainColorOptions = cvCurrTpl.theme.split(",");
        return (
            <div>
                <div>主题：</div>
                <Radio.Group
                    value={themeValue}
                    onChange={onThemeChange} >
                    {renderMainColorItems(mainColorOptions)}
                </Radio.Group>
            </div>
        );
    }

    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.templateItem}>
                    <Card title="简历信息">
                        <div>简历名称：{currentCv.cv_name}</div>
                        <div>简历备注：{currentCv.remark}</div>
                    </Card>
                    <Card title="简历模版">
                        <div>{cvCurrTpl ? cvCurrTpl.name : ""}</div>
                        <Button type='primary'
                            onClick={() => { handleChooseTpl() }}>选择模板</Button>
                    </Card>
                    <Card title="简历设置">
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
                        {renderCvMainColorSetting()}
                        <Divider></Divider>
                        {renderCvThemeSetting()}
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
                <Goods refreshUrl={readConfig("refreshUserUrl")} appId={readConfig("appId")} store={store}></Goods>
            </Modal>
            <Modal title="选择简历模板"
                open={showTplPopup}
                width={1000}
                onCancel={() => setShowTplPopup(false)}
                footer={null}
            >
                <div className={styles.tplChooseContainer}>{renderTplList()}</div>
            </Modal>
        </div>
    );
}

export default CvSetting;