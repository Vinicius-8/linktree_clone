import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import jwt from 'jsonwebtoken'

import Login from '../components/Login'
import authService from '../features/auth/authService'
import CreateSocial from '../components/CreateSocial'
import ListSocialDashboard from '../components/ListSocialDashboard'

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(()=>{
      // verificar se tem alguem logado se nao go to login page      
      
      try {
          setUser(cookies.user) 
          jwt.verify(cookies.user.token, process.env.SECRET_JWT)    
      } catch (error) {
        //console.log(error);
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
        {/* <CreateSocial /> */}
        <ListSocialDashboard token={user.token} userId={user.id}/>
        </>
        
        :
        <Login setUser={setUser}/>
        }
    </div>
  )
}

export default Dashboard