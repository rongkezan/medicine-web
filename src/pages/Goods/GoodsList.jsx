import './index.scss'
import { Link } from 'react-router-dom'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Input, Tooltip, message } from 'antd'
import { DownCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { Popconfirm, Select, Row, Col } from 'antd'
import { offSaleGoods, queryGoodsPage, querySaleStatus } from '@/api/goods'
import { queryPlatformList } from '@/api/platform'

const GoodsList = () => {

    const [tableList, setTableList] = useState({
        list: [],
        count: 0
    })

    const [platforms, setPlatforms] = useState([])

    const [saleStatuses, setSaleStatuses] = useState([])

    const [params, setParams] = useState({
        pageNo: 1,
        pageSize: 10
    })

    useEffect(() => {
        loadList()
    }, [params])

    useEffect(() => {
        loadPlatforms()
        loadSaleStatus()
    }, [])

    const loadList = async () => {
        const res = await queryGoodsPage(params)
        if (res) {
            const { data, pageInfo } = res
            setTableList({
                list: data,
                count: pageInfo.totalCount
            })
        }
    }

    const loadPlatforms = async () => {
        const res = await queryPlatformList({ openSwitch: true })
        setPlatforms(res)
    }

    const loadSaleStatus = async () => {
        const res = await querySaleStatus()
        setSaleStatuses(res)
    }

    const onFinish = (values) => {
        const { platformId, platformItemId, platformName, saleStatus, userId, minSalePrice, maxSalePrice } = values
        setParams({
            ...params,
            platformId,
            platformItemId,
            platformName,
            saleStatus,
            userId,
            minSalePrice,
            maxSalePrice
        })
    }

    const offSale = async (values) => {
        const id = values.id
        await offSaleGoods({ id }, loadList)
    }

    const tableOnChange = (page, filters, sorter) => {
        if (!sorter.order) {
            if (sorter.field === "salePrice") {
                setParams({
                    ...params,
                    sortSalePrice: null
                })
            } else if (sorter.field === "onSaleTime") {
                setParams({
                    ...params,
                    sortOnSaleTime: null
                })
            } else if (sorter.field === "collectVolume") {
                setParams({
                    ...params,
                    sortCollectVolume: null
                })
            } else if (sorter.field === "shareVolume") {
                setParams({
                    ...params,
                    sortShareVolume: null
                })
            } else if (sorter.field === "viewVolume") {
                setParams({
                    ...params,
                    sortViewVolume: null
                })
            } else if (sorter.field === "publishPrice") {
                setParams({
                    ...params,
                    sortPublishPrice: null
                })
            }
        }
        if (sorter.order === "ascend") {
            if (sorter.field === "salePrice") {
                setParams({
                    ...params,
                    sortSalePrice: "ASC"
                })
            } else if (sorter.field === "onSaleTime") {
                setParams({
                    ...params,
                    sortOnSaleTime: "ASC"
                })
            } else if (sorter.field === "collectVolume") {
                setParams({
                    ...params,
                    sortCollectVolume: "ASC"
                })
            } else if (sorter.field === "shareVolume") {
                setParams({
                    ...params,
                    sortShareVolume: "ASC"
                })
            } else if (sorter.field === "viewVolume") {
                setParams({
                    ...params,
                    sortViewVolume: "ASC"
                })
            } else if (sorter.field === "publishPrice") {
                setParams({
                    ...params,
                    sortPublishPrice: "ASC"
                })
            }
        } else if (sorter.order === "descend") {
            if (sorter.field === "salePrice") {
                setParams({
                    ...params,
                    sortSalePrice: "DESC"
                })
            } else if (sorter.field === "onSaleTime") {
                setParams({
                    ...params,
                    sortOnSaleTime: "DESC"
                })
            } else if (sorter.field === "collectVolume") {
                setParams({
                    ...params,
                    sortCollectVolume: "DESC"
                })
            } else if (sorter.field === "shareVolume") {
                setParams({
                    ...params,
                    sortShareVolume: "DESC"
                })
            } else if (sorter.field === "viewVolume") {
                setParams({
                    ...params,
                    sortViewVolume: "DESC"
                })
            } else if (sorter.field === "publishPrice") {
                setParams({
                    ...params,
                    sortPublishPrice: "DESC"
                })
            }
        }
    }

    const moneyFormat = (num) => {
        return (Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    }

    const columns = [
        {
            title: '图片',
            dataIndex: 'itemImg',
            width: 80,
            render: imgUrl => {
                return <img src={imgUrl} width={40} height={40} alt="" />
            }
        },
        {
            title: '平台藏品ID',
            dataIndex: 'platformItemId',
            width: 120
        },
        {
            title: '藏品名称',
            dataIndex: 'itemName',
            width: 200
        },
        {
            title: '所属平台',
            dataIndex: 'platformName',
            width: 120
        },
        {
            title: '所属用户',
            dataIndex: 'userId',
            width: 120
        },
        {
            title: '寄售价',
            dataIndex: 'salePrice',
            sorter: true,
            width: 120,
            render: (item) => (
                <div>{moneyFormat(item)}</div>
            )
        },
        {
            title: '发行价',
            dataIndex: 'publishPrice',
            sorter: true,
            width: 120,
            render: (item) => (
                <div>{moneyFormat(item)}</div>
            )
        },
        {
            title: '收藏量',
            dataIndex: 'collectVolume',
            sorter: true,
            width: 120
        },
        {
            title: '浏览量',
            dataIndex: 'viewVolume',
            sorter: true,
            width: 120
        },
        {
            title: '上架时间',
            dataIndex: 'onSaleTime',
            sorter: true,
            render: (timestamp) => {
                return moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        {
            title: '出售状态',
            dataIndex: 'saleStatus',
            render: (status) => {
                const STATUS = {
                    1: <Tag color="red">未上架</Tag>,
                    2: <Tag color="green">出售中</Tag>,
                    3: <Tag color="blue">被下单</Tag>,
                    4: <Tag color="blue">已售出</Tag>,
                    5: <Tag color="red">已失效</Tag>,
                    6: <Tag color="yellow">流转中</Tag>
                }
                return STATUS[status]
            }
        },
        {
            title: '操作',
            fixed: 'right',
            render: values => {
                return (
                    <Space size="middle">
                        <Popconfirm title="确认要下架吗" onConfirm={() => offSale(values)} okText="确认" cancelText="取消">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<Tooltip title="下架"><DownCircleOutlined /></Tooltip>} />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    return (
        <div className='GoodsList'>
            {/* 筛选区域 */}
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    </Breadcrumb>}
                style={{ marginBottom: 20 }}>
                <Form onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="平台藏品ID" name="platformItemId">
                                <Input placeholder="请输入平台藏品ID" style={{ width: 200 }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="藏品名称" name="platformName">
                                <Input placeholder="请输入藏品名称" style={{ width: 200 }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="所属平台" name="platformId">
                                <Select
                                    style={{ width: 200 }}
                                    options={platforms.map((platform) => ({ label: platform.name, value: platform.id }))}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="出售状态" name="saleStatus">
                                <Select
                                    style={{ width: 200 }}
                                    options={saleStatuses}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="所属用户" name="userId">
                                <Input placeholder="请输入所属用户" style={{ width: 200 }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="寄售价">
                                <Form.Item name="minSalePrice" style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}>
                                    <Input placeholder="请输入最低寄售价" />
                                </Form.Item>
                                ~
                                <Form.Item name="maxSalePrice" style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}>
                                    <Input placeholder="请输入最高寄售价" />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item>
                                <Tooltip title="搜索">
                                    <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} />
                                </Tooltip>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Card>
            {/* 文章列表区域 */}
            <Card title={`根据筛选条件共查询到 ${tableList.count} 条结果：`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={tableList.list}
                    bordered
                    onChange={tableOnChange}
                    pagination={
                        {
                            pageSize: params.pageSize,
                            current: params.pageNo,
                            total: tableList.count,
                            onChange: pageNo => setParams({...params,pageNo})
                        }
                    }
                />
            </Card>
        </div>
    )
}

export default GoodsList