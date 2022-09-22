import { useEffect, useState } from "react"
import socialController from '../features/controller/socialController'

const ListSocialDashboard = ({token}) => {
    const [socials, setSocials] = useState([]);

    useEffect(()=>{
      console.log('entergins: ');
      const socials = socialController.getSocials(token).then(resp => {return resp}).catch(err => console.log(err))
      console.log(socials);
    },[])


  return (
    <div>ListSocialDashboard</div>
  )
}

export default ListSocialDashboard