import { useEffect, useState } from "react"

import SocialDashboardCell from "./SocialDashboardCell"

import socialController from '../features/controller/socialController'
import DashboardStyles from '../styles/Dashboard.module.css'


const ListSocialDashboard = ({userNickname}) => {
    
    const [socials, setSocials] = useState([]);


    useEffect( ()=>{
      
      fetchAllSocials();
      
    },[])

    function fetchAllSocials(){
      socialController.getSocials(userNickname)
      .then(res => setSocials(res.socials))
      .catch(err => console.log('err: ', err))
    }

   


  return (
    <>
   
      <div className={DashboardStyles.socialListContainer}>
      {socials.map(social => (
        <SocialDashboardCell socialData={social} key={social._id}/>
      ))}
      </div>

    </>
  )
}

export default ListSocialDashboard