import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import Error from "next/error"; //<Error statusCode={errorCode} title="page Not Found" />
import socialController from '../../features/controller/socialController'

const UserPage = () => {
  const [socials, setSocials] = useState([]);
  const [userDefined, setUserDefined] = useState(true);
  const router = useRouter()
  const {nickname} = router.query
  
  socialController.getSocials(nickname)
  .then(res => {setSocials(res.socials);})
  .catch(() =>{ setSocials(null); })



  return (
    <>
    { userDefined ? 
    
    <div>
      Pagina do {nickname} 
      {socials.map(social => (
      <div key={social._id}>
        
        <fieldset>
          <legend>{social.social}</legend>
            {social.link}
          </fieldset>
      </div>
    ))}  
    
    </div> : 
     <Error statusCode={404} title="page Not Found" />
    }
    </>
  )
}

export default UserPage