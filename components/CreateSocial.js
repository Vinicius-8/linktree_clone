import { useState } from "react"
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';

import socialController from '../features/controller/socialController'

import DashboardStyles from '../styles/Dashboard.module.css'
import 'react-toastify/dist/ReactToastify.css';

const CreateSocial = ({setIsCreating}) => {
  const [cookies, setCookie] = useCookies(['user']);
  const router = useRouter();
  const [formData, setFormData] = useState({
      social,
      link
    }
  )

  const onChange = (e) =>{
    setFormData((prevState)=>({
    ...prevState,
    [e.target.name]: e.target.value,
    }))
  }

  const {social, link} = formData

  const onSubmit = (e)=>{ // para o form do submit
    e.preventDefault()
  
    const res = socialController.createSocial(formData, cookies.user.token);
            
      res.then(() => {                
          router.reload() 

      }).catch(error => {
          const msg = 'Fail: '+  error.response.data.message
          toast(msg, {type: "error"})  
      })
  }


  return (
    <div>
      <div className={DashboardStyles.createSocialContainer}>
      <div className={DashboardStyles.createSocialTitle}>Create a new social network</div>
        <form onSubmit={onSubmit}>              
            <div>
                <input type="text" id='social' name='social' value={social} placeholder='Enter your social network'
                    onChange={onChange}
                    className={DashboardStyles.socialInputCreate}
                />
            </div>

            <div>
                <input type="text" id='link' name='link' value={link} placeholder='Enter your link'
                    onChange={onChange}
                    className={DashboardStyles.socialInputCreate}
                />
            </div>

            <div className={DashboardStyles.buttonsContainer}>

            <div></div>          
            <div>
                <button type="submit" className={DashboardStyles.createCancelButton}>Create Social</button>
              </div>

              <div>
                <button className={DashboardStyles.createCancelButton} onClick={()=>setIsCreating(false)}>Cancel</button>
              </div>

             
             
            </div>
        </form>
        <ToastContainer position="top-left" theme='colored' autoClose="1200" /> 
      </div>
    </div>
  )
}

export default CreateSocial