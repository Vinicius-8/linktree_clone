import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import Error from "next/error"; //<Error statusCode={errorCode} title="page Not Found" />

import socialController from '../../features/controller/socialController'
import UserPageStyles from '../../styles/UserPage.module.css'


const UserPage = () => {
  const [socials, setSocials] = useState([]);
  const [is404, setIs404] = useState(false)
  const router = useRouter()

  const {nickname} = router.query
  
  
  useEffect(()=>{
    if(!nickname)
      return
      socialController.getSocials(nickname)
        .then(res => {setSocials(res.socials); setIs404(false);})
        .catch(() =>{ setSocials(null); setIs404(true)})    
  })


  return (
    <>
    <div className={UserPageStyles.container}>
    { socials ? 
    
    <div className={UserPageStyles.innerContainer}>
      <span className={UserPageStyles.titleUser}>@{nickname}</span>
      {socials.map(social => (

        <div key={social._id}>
          <a href={social.link} target="_blank" style={{textDecoration: "inherit", color:  "inherit",cursor: "auto"}}>
          <div  className={UserPageStyles.socialCell}>              
                <span>{social.social}</span>    
          </div></a>    
        </div>
      ))}  

      {socials.length < 1 ? <div className={UserPageStyles.emptyPageText}> Nothing yet</div> : <></>}
    
    </div> : 

    <>
    { is404 ? 
     <Error statusCode={404} title="page Not Found" /> : <></>
    }
    </>
    
    }
    </div>
    </>
  )
}

export default UserPage