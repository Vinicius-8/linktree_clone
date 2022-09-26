import { useEffect, useState } from "react"

import SocialDashboardCell from "./SocialDashboardCell"

import socialController from '../features/controller/socialController'
import DashboardStyles from '../styles/Dashboard.module.css'


const ListSocialDashboard = ({userNickname, setIsCreating}) => {
    
    const [socials, setSocials] = useState([]);


    useEffect( ()=>{
      
      fetchAllSocials();
      
    },[])

    function fetchAllSocials(){
      socialController.getSocials(userNickname)
      .then(res => {
        if(res.socials.length < 1){
          console.log('len', socials.length);
          setIsCreating(true)
        }
        setSocials(res.socials);
      })
      .catch(err => console.log('err: ', err))
    }

   


  return (
    <>
      <div className={DashboardStyles.createSocialContainerParent}>
        <span style={{textAlign:"center",fontSize: "14pt", fontWeight:'400', marginTop: '15px' }}>Your social networks:</span>
        {socials.map(social => (
          
          <SocialDashboardCell socialData={social} key={social._id}/>
        ))}
        
      </div>
    </>
  )
}

export default ListSocialDashboard