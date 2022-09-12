import {useState} from 'react'
import Login from '../components/Login'
import authService from '../features/auth/authService'

const Dashboard = () => {
    const [user, setUser] = useState(null);
  return (
    <div>
        {user? 
        <>
        usuario logado: {user.name}
        <button onClick={()=> authService.logout()}>Logout</button>
        </>
        
        :
        <Login setUser={setUser}/>
        }
    </div>
  )
}

export default Dashboard