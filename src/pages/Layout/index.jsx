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
    { key: '/search', label: <Link to='/search'>Search</Link> },
    { key: '/blast', label: <Link to='/blast'>Blast</Link> },
    { key: '/jbrowse', label: <Link to='/jbrowse'>JBrowse</Link> },
    { key: '/reference', label: <Link to='/reference'>Reference</Link> },
    { key: '/download', label: <Link to='/download'>Download</Link> },
    { key: '/aboutus', label: <Link to='/aboutus'>About us</Link> },
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