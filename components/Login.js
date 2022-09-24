import {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import {useCookies} from 'react-cookie'

import authService from '../features/auth/authService'


const Login = () => {
    const [register, setRegister] = useState(false);
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['user']);
    const [formData, setFormData] = useState({
            name:'',
            nickname:'',
            email: '',
            password:'',
            password2:'',
        }
    )


    useEffect(()=>{
        // redirec. pra dashboard se ja logado e tentar logar
        if(cookies.user){
            router.push('/dashboard')
        }

    },[])

    const onChange = (e) =>{
        setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const {name,nickname, email, password, password2} = formData

    const onSubmit = (e)=>{ // para o form do submit
        e.preventDefault()

        if(register){
            // registro de usuario
            if(password !== password2 && register){
                alert('As senhas devem ser iguais!')
                return
            }

            if(nickname === 'dashboard'){
                alert('Nickname já utilizado')
                return
            }

            const userData = { name, email, nickname, password, password2 }
            
            const res = authService.registerUser(userData);
            
            res.then(response => {                
                router.reload()                
            }).catch(error => {
                const resp = 'user cant be created: '+  error.response.data.message
                alert(resp);
            })

        }else{
            // apenas login de usuario
            const userData = { email, password }

            const res = authService.login(userData);

            res.then(response => {
               router.reload()

            }).catch(error => {
                const resp = 'cant login: '+  error.response.data.message
                alert(resp);
            })
        }      
    }

  return (
    <>
   
    {!register ? 

        // just login user
    <div>
        <form onSubmit={onSubmit}>
            <div>

                <input type="text" id='email' name='email' value={email} placeholder='enter your email'
                    onChange={onChange}
                />
            </div>

            <div>
                <input type="password" className="form" id='password' name='password' value={password} placeholder='enter your password'
                onChange={onChange}
                />
            </div>
            
            <div>
              <button type="submit">Login</button>
            </div>
      </form>
        <div>
            <button onClick={()=> setRegister(true)}>Register</button>
        </div>
    </div>:
    
    // register user
    <div>
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" id='name' name='name' value={name} placeholder='enter your name'
                    onChange={onChange}
                />
            </div>

            <div>
                <input type="text" id='nickname' name='nickname' value={nickname} placeholder='enter your nickname'
                    onChange={onChange}
                />
            </div>

            <div>

                <input type="text" id='email' name='email' value={email} placeholder='enter your email'
                    onChange={onChange}
                />
            </div>

            <div>
                <input type="password" className="form" id='password' name='password' value={password} placeholder='enter your password'
                onChange={onChange}
                />
            </div>

            <div>
                <input type="password" className="form" id='password2' name='password2' value={password2} placeholder='enter your password again'
                onChange={onChange}
                />
            </div>
            
            <div>
              <button type="submit">Register</button>
            </div>
      </form>
        
        <div>
            <button onClick={()=> setRegister(false)}>I already have an account</button>
        </div>
    </div>
    
    }
    </>
  )
}

export default Login