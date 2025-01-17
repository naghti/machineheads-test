import { Typography } from 'antd'
import LoginForm from "../components/LoginForm"
const { Title } = Typography

function LoginPage() {
  return (
    <div
      className='min-h-screen min-w-screen flex flex-col justify-center items-center'
    > 
      <Title>Вход</Title>
      <LoginForm/>
    </div>
  )
}

export default LoginPage