import './index.scss'
import '@/globalConfig'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, DownloadOutlined, EditOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Tag, Tooltip, Card, FloatButton, Table, Button, Drawer, Divider, Space, Popconfirm, Upload, message } from 'antd'
import { deleteHeaders, queryHeaders, saveHeaders } from '@/api/config'

const { Dragger } = Upload

const Config = () => {
    const [headers, setHeaders] = useState([])
    const [data, setData] = useState({
        id: null,
        tableName: null,
        headers: []
    })
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [editInputIndex, setEditInputIndex] = useState(-1)
    const [editInputValue, setEditInputValue] = useState('')
    const [openEditDrawer, setOpenEditDrawer] = useState(false)
    const [openUploadDrawer, setOpenUploadDrawer] = useState(false)
    const [tableList, setTableList] = useState({
        list: [],
        count: 0
    })
    const [params, setParams] = useState({
        current: 1,
        size: 10
    })

    useEffect(() => {
        loadList()
    }, [params])

    const loadList = async () => {
        const res = await queryHeaders(params)
        setTableList({
            list: res.data,
            count: res.pageInfo.totalCount
        })
    }

    const handleClose = (removedTag) => {
        const newTags = headers.filter((tag) => tag !== removedTag)
        setHeaders(newTags)
    }

    const handleInputConfirm = () => {
        if (inputValue && headers.indexOf(inputValue) === -1) {
            setHeaders([...headers, inputValue])
        }
        setInputVisible(false)
        setInputValue('')
    }

    const handleEditInputConfirm = () => {
        const newTags = [...headers]
        newTags[editInputIndex] = editInputValue
        setHeaders(newTags)
        setEditInputIndex(-1)
        setInputValue('')
    }

    const save = () => {
        const headerStr = headers.join(',')
        saveHeaders({ id: data.id, tableName: data.tableName, headers: headerStr }, () => {
            loadList()
            setHeaders([])
            setOpenEditDrawer(false)
        })
    }

    const edit = (values) => {
        setHeaders(values.headers.split(','))
        setData({
            id: values.id,
            tableName: values.tableName,
            headers: values.headers
        })
        setOpenEditDrawer(true)
    }

    const del = async (values) => {
        await deleteHeaders({ id: values.id }, loadList)
    }

    const openUpload = (values) => {
        setOpenUploadDrawer(true)
        setData({ id: values.id })
    }

    const props = {
        name: 'file',
        multiple: true,
        action: `${global.config.baseUrl}/file/upload`,
        data: { id: data.id },
        onChange(info) {
            const { status } = info.file
            if (status === 'done') {
                const response = info.file.response
                if(response.success) {
                    message.success(response.msg)
                } else {
                    message.error(response.msg)
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'TableName',
            dataIndex: 'tableName'
        },
        {
            title: 'Headers',
            dataIndex: 'headers'
        },
        {
            title: 'Create Time',
            dataIndex: 'createTime',
            render: (timestamp) => {
                return moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        {
            title: 'Update Time',
            dataIndex: 'updateTime',
            render: (timestamp) => {
                return moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        {
            title: 'Operation',
            render: values => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<DownloadOutlined />} onClick={() => openUpload(values)} />
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => edit(values)} />
                        <Popconfirm title="Are you sure to delete?" onConfirm={() => del(values)}>
                            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    return (
        <div className='Config'>
            {/* Float Button */}
            <FloatButton type='primary' icon={<PlusOutlined />} onClick={() => {
                setHeaders([])
                setOpenEditDrawer(true)
                setData({})
            }} />

            {/* Edit Drawer Area */}
            <Drawer title='Upload Config' placement='right' open={openEditDrawer} onClose={() => setOpenEditDrawer(false)}>
                <Input
                    value={data.tableName}
                    placeholder="Please input table name"
                    style={{ marginBottom: '20px' }}
                    allowClear
                    onChange={(e) => {
                        setData({
                            ...data,
                            tableName: e.target.value
                        })
                    }} />
                <Space size={[8, 16]} wrap>
                    {headers.map((tag, index) => {
                        if (editInputIndex === index) {
                            return (
                                <Input
                                    key={tag}
                                    size="small"
                                    className="tag-input"
                                    value={editInputValue}
                                    onChange={e => setEditInputValue(e.target.value)}
                                    onBlur={handleEditInputConfirm}
                                    onPressEnter={handleEditInputConfirm}
                                />
                            )
                        }
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag
                                className="edit-tag"
                                key={tag}
                                closable={true}
                                onClose={() => handleClose(tag)}>
                                <span onDoubleClick={(e) => {
                                    setEditInputIndex(index)
                                    setEditInputValue(tag)
                                    e.preventDefault()
                                }}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </span>
                            </Tag>
                        );
                        return isLongTag ? (<Tooltip title={tag} key={tag}>{tagElem}</Tooltip>) : (tagElem)
                    })}
                    {inputVisible && (
                        <Input
                            type="text"
                            size="small"
                            className="tag-input"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag className="site-tag-plus" onClick={() => { setInputVisible(true) }}>
                            <PlusOutlined /> New Tag
                        </Tag>
                    )}
                </Space>
                <Divider />
                <Space>
                    <Button type='primary' onClick={save}>Save</Button>
                    <Button onClick={() => {
                        setData({})
                        setHeaders([])
                    }}>Reset</Button>
                </Space>
            </Drawer>

            {/* Upload Drawer Area */}
            <Drawer title='Upload File' placement='bottom' open={openUploadDrawer} onClose={() => setOpenUploadDrawer(false)}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </Drawer>

            {/* Card Area */}
            <Card title='Upload Config List' className='card'>
                <Table
                    columns={columns}
                    dataSource={tableList.list}
                    rowKey='id'
                    pagination={
                        {
                            pageSize: params.size,
                            current: params.current,
                            total: tableList.count,
                            onChange: pageNo => setParams({ ...params, current: pageNo })
                        }
                    }></Table>
            </Card>
        </div>
    );
};
export default Config