import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'


import jwt from 'jsonwebtoken'

import Login from '../components/Login'
import authService from '../features/auth/authService'
import CreateSocial from '../components/CreateSocial'
import ListSocialDashboard from '../components/ListSocialDashboard'

import DashboardStyles from '../styles/Dashboard.module.css'

const Dashboard = () => {
    const [isCreating, setIsCreating] = useState(false)
    const [user, setUser] = useState(null);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(()=>{
      
      // verificar se tem alguem logado se nao go to login page      
      
      try {
          setUser(cookies.user) 
          jwt.verify(cookies.user.token, process.env.SECRET_JWT)    
      } catch (error) {
        //console.log(error);
        setUser(null)
      }
      
    },[cookies])

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
            }}> Logout</button>
        </div>
        
        { !isCreating ? <ListSocialDashboard token={user.token} userNickname={user.nickname} setIsCreating={setIsCreating}/> :
        <CreateSocial setIsCreating={setIsCreating} />}
        
        
        {!isCreating ?
          <>
          <div className={DashboardStyles.createButtonContainer}>
            <div className={DashboardStyles.createButtonInnerContainer}>
              <button 
                onClick={()=>setIsCreating(true)}
                className={DashboardStyles.createCancelButton} 
                style={{marginRight: '0px'}}>Create Social</button>  
            </div>
          </div>
          </>   : <> </>

        }
        </>
        
        :
        <Login setUser={setUser}/>
        }
    </div>
  )
}

export default Dashboard