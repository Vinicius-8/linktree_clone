import {useState, useEffect} from 'react'
import { verify } from 'jsonwebtoken'


import Login from '../components/Login'
import authService from '../features/auth/authService'

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
      // verificar se tem alguem logado se nao go to login page
      const userLocal = JSON.parse(localStorage.getItem('user')) // pega o user local

      try {
          verify(userLocal.token, process.env.SECRET_JWT); // verifica se o token do user local é valido
          setUser(userLocal) 

      } catch (error) {

        setUser(null)
      }
      
    },[])

  return (
    <div>
        {user? 
        <>
        usuario logado: {user.name}
        <button onClick={()=> {
          authService.logout()
          setUser(null);
          }}>Logout</button>
        </>
        
        :
        <Login setUser={setUser}/>
        }
    </div>
  )
}

export default Dashboard