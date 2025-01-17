import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

interface NavbarProps {
  children: React.ReactNode
}

const { Header } = Layout;

const links = [
  {
    key: '/posts',
    label: <Link to="/posts">/posts</Link>,
  },
  {
    key: '/authors',
    label: <Link to="/authors">/authors</Link>,
  },
  {
    key: '/tags',
    label: <Link to="/tags">/tags</Link>,
  },
]

function Navbar({children}: NavbarProps) {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-blue-600">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-bold mr-3">
            <span>MachineHeads</span>
          </div>
          <Menu 
            theme="dark" 
            mode="horizontal" 
            className="flex-grow"
            items={links}
          />
        </div>
      </Header>
      <div className="flex-grow p-4">
        {children}
      </div>
    </Layout>
  )
}

export default Navbar