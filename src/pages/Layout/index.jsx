import './index.scss'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { Content, Footer } from 'antd/es/layout/layout'
import { Outlet, useLocation } from 'react-router-dom'

const { Header } = Layout

const MyLayout = () => {

  const { pathname } = useLocation()

  const items = [
    { key: '/', label: <Link to='/'>Home</Link> },
    { key: '/statistic', label: <Link to='/statistic'>Statistic</Link> },
    { key: '/config', label: <Link to='/config'>Config</Link> }
  ]
  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0)',
          }}
        >
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={pathname}
          selectedKeys={pathname}
          items={items}
        />
      </Header>
      <Content className="site-layout" style={{ height: '100%', width: '100%' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Keith Rong</Footer>
    </Layout>
  )
}

export default MyLayout