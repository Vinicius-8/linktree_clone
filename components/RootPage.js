import { useRouter } from "next/router";
import { useState } from "react";

import authService from "../features/auth/authService"
import HomeStyles from '../styles/Home.module.css'

const RootPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    
    const data = [
      {id: 1, name: "Fernando Almeida Silva santos", nickname : "fernando"},
      {id: 2, name: "Vinicius Vieira", nickname : "vinicius"},
      {id: 3, name: "Carlos Ferreira", nickname : "carlos"},
      {id: 4, name: "Jorge Moraes", nickname : "jorjim"},
    ]

    
    const res = authService.getAllUsers();
  
    res.then(res => {setUsers(res.users)})
      .catch(err => {console.log(err)})
  
  
    return (
      <div className={HomeStyles.homeContainer}>
          <div className={HomeStyles.homeHeader}>
  
            <div></div>
            <div className={HomeStyles.homePageTitle} >Avaliable Pages: </div>
            <div className={HomeStyles.homeLoginRegisterTextContainer}>
              <div  className={HomeStyles.homeLoginRegisterText} onClick={()=>router.push('/dashboard')}>Login/Register </div>
            </div>
          </div>
  
          <div className={HomeStyles.homeMiddleContainer}>
            <div className={HomeStyles.homeInnerContainer}>
  
              {users.map(item => (
                <div className={HomeStyles.userPageContainer} onClick={()=>router.push('/'+item.nickname)}>
                  <div className={HomeStyles.userPageGreenBar}></div>
                  <div className={HomeStyles.userPageTitle}>{item.name}</div>
                <div className={HomeStyles.userPageSubtitle}>@{item.nickname}</div>
              </div>
              ))}
  
            </div>
          </div>
      </div>
    )
}

export default RootPage