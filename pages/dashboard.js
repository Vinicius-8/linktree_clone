import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import jwt from 'jsonwebtoken'

import Login from '../components/Login'
import authService from '../features/auth/authService'
import CreateSocial from '../components/CreateSocial'
import ListSocialDashboard from '../components/ListSocialDashboard'
import DashboardStyles from '../styles/Dashboard.module.css'


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(()=>{
      // verificar se tem alguem logado se nao go to login page      
      
      try {
          setUser(cookies.user) 
          jwt.verify(cookies.user.token, process.env.SECRET_JWT)    
          console.log("all: ", user)
      } catch (error) {
        //console.log(error);
        setUser(null)
      }
      
    },[])

  return (
    <div className={DashboardStyles.container}>
        {user? 
        <>
        <div className={DashboardStyles.header}>
          <div></div>
            <span className={DashboardStyles.userName}>{user.name}</span>
          
          <button 
            className={DashboardStyles.logoutButton}
          onClick={()=> {
            authService.logout()
            setUser(null);
            }}>Logout</button>
        </div>
        {/* <CreateSocial /> */}
        <ListSocialDashboard token={user.token} userNickname={user.nickname}/>
        </>
        
        :
        <Login setUser={setUser}/>
        }
    </div>
  )
}

export default Dashboard