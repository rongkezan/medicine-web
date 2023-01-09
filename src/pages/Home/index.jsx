import './index.scss'
import { Col, Row, Statistic, Breadcrumb, Card } from 'antd';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { queryOrderHistories, queryStatistic, queryUserHistories } from '@/api/home';
import { Column } from '@ant-design/plots';
import { Menu } from 'antd';

const Home = () => {
    return (
        <div className='Home'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default Home