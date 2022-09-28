import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import authService from "../features/auth/authService"
import HomeStyles from '../styles/Home.module.css'

const RootPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    


    useEffect(()=>{
      if(!users)
      return

      function getAllUsers(){
        const res = authService.getAllUsers(); ////////////////////
  
        res.then(res => {setUsers(res.users)})
          .catch(err => {console.log(err)});
      }

      getAllUsers();
      
    }, [users])

    
  
  
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
                <div className={HomeStyles.userPageContainer} onClick={()=>router.push('/'+item.nickname)} key={item._id}>
                  <div className={HomeStyles.userPageGreenBar}></div>
                  <div className={HomeStyles.userPageTitle}>{item.name}</div>
                <div className={HomeStyles.userPageSubtitle}>@{item.nickname}</div>
              </div>
              ))} 

              {users.length < 1 ? <div className={HomeStyles.emptyPageText}> Nothing yet</div> : <></>}
  
            </div>
          </div>
      </div>
    )
}

export default RootPage