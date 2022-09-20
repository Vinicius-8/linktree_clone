import { useState } from "react"
import { useCookies } from "react-cookie";
import socialController from '../features/controller/socialController'

const CreateSocial = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const [formData, setFormData] = useState({
      name:'',
      nickname:'',
      email: '',
      password:'',
      password2:'',
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
            
      res.then(response => {                
          router.reload()                
      }).catch(error => {
          const resp = 'social cant be created: '+  error.response.data.message
          alert(resp);
      })
  }


  return (
    <div><div>
    <form onSubmit={onSubmit}>
        <div>
            <input type="text" id='social' name='social' value={social} placeholder='enter your social network'
                onChange={onChange}
            />
        </div>

        <div>
            <input type="text" id='link' name='link' value={link} placeholder='enter your link'
                onChange={onChange}
            />
        </div>

        <div>
          <button type="submit">Create Social</button>
        </div>
  </form>
</div></div>
  )
}

export default CreateSocial