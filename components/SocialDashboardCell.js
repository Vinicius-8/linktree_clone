import { useState } from 'react'
import {useCookies} from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';


import socialController from '../features/controller/socialController'

import DashboardStyles from '../styles/Dashboard.module.css'
import 'react-toastify/dist/ReactToastify.css';

const SocialDashboardCell = ({socialData}) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [isVisible, setIsVisible] = useState(true)

    const [formData, setFormData] = useState({ // loads data from parent
        _id: socialData._id,
        social: socialData.social,
        link: socialData.link,
        userIdOwner: socialData.userId
    })


    const onChange = (e) =>{
        setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const { social, link} = formData  // desconstruct the loaded


    function updateSocial(){        
        const res = socialController.updateSocial(formData, cookies.user.token);
        
        res.then(() => toast("Success!", {type: "success"}))
        .catch(err =>{
          const msg = "can't update: " + err.response.data.message;
          toast(msg, {type: "error"})          
        })
    }

    function deleteSocial(){
        if(confirm(`Tem certeza que deseja exluir '${socialData.social}'`)){
            
            const res = socialController.deleteSocial(formData, cookies.user.token);

            res.then(()=>{ 
                toast("Deleted!", {type: "success"})
                setIsVisible(false);
            })
            .catch(err =>{
                const msg = "Can't Delete: " + err.response.data.message;
                toast(msg, {type: "error"})          
              })
        }
        
    }

  return (
    <div>
        {isVisible ? 
        <div>
            <div className={DashboardStyles.createSocialTitle}></div>
            <div className={DashboardStyles.socialCell}>
            
                    <input className={DashboardStyles.socialInput} onChange={onChange} type="text" id='social' name='social' value={social} placeholder='enter your social network' /> <br/>
                    <input className={DashboardStyles.socialInput} onChange={onChange}  type="text" id='link' name='link' value={link} placeholder='enter your social link' /> <br ></br>                                    
                
            </div>     
            <div className={DashboardStyles.updateDeleteButtonContainer}>
                <button style={{marginLeft: '20px', marginRight: '0px'}}  className={DashboardStyles.createCancelButton} onClick={deleteSocial}> Delete </button>
                <button style={{marginLeft: '20px', marginRight: '0px'}} className={DashboardStyles.createCancelButton} onClick={updateSocial}> Update </button>
            </div>
            <ToastContainer position="top-left" theme='colored' autoClose="1200" />   
        </div>
        : <></> }
    </div>
  )
}

export default SocialDashboardCell