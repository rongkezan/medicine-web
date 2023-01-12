import './index.scss'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { queryMarkerDegree } from '@/api/markerDegree'
import { Card } from 'antd'


const Statistic = () => {

    const [params, setParams] = useState({
        current: 1,
        size: 10
    })

    const [tableList, setTableList] = useState({
        list: [],
        count: 0
    })

    useEffect(() => {
        loadList()
    }, [params])

    const loadList = async () => {
        const res = await queryMarkerDegree(params)
        setTableList({
            list: res.data,
            count: res.pageInfo.totalCount
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Species',
            dataIndex: 'species'
        },
        {
            title: 'Tissue',
            dataIndex: 'tissue'
        },
        {
            title: 'Cell Type',
            dataIndex: 'cellType'
        },
        {
            title: 'Cell Marker',
            dataIndex: 'cellMarker'
        },
        {
            title: 'Marker Grade',
            dataIndex: 'markerGrade'
        },
    ]

    return (
        <div className='Statistic'>
            <Card title='Ath Marker Degree' className='card'>
                <Table
                    columns={columns}
                    dataSource={tableList.list}
                    rowKey='id'
                    pagination={
                        {
                            pageSize: params.size,
                            current: params.current,
                            total: tableList.count,
                            onChange: current => setParams({ ...params, current: current })
                        }
                    }></Table>
            </Card>
        </div>
    )
}

export default Statistic