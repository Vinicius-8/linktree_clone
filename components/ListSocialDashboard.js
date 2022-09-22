import { useEffect, useState } from "react"
import socialController from '../features/controller/socialController'

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
    <div>ListSocialDashboard</div>

    {socials.map(social => (
      <div key={social._id}>
        
        <fieldset>
          <legend>{social.social}</legend>
            {social.link}
          </fieldset>
      </div>
    ))}

    </>
  )
}

export default ListSocialDashboard