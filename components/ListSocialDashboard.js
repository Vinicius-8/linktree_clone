import { useEffect, useState } from "react"

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
      <div key={social._id}>
        <div className={DashboardStyles.socialCell}>
          <input className={DashboardStyles.socialInput}  type="text" id='social' name='social' value={social.social} placeholder='enter your social network' /> <br/>
          <input className={DashboardStyles.socialInput} type="text" id='link' name='link' value={social.link} placeholder='enter your social link' /> <br ></br>
          
          <button className={DashboardStyles.logoutButton}> Delete </button>
          <button className={DashboardStyles.logoutButton}> Update </button>
        </div>        
      </div>
    ))}
    </div>

    </>
  )
}

export default ListSocialDashboard