import {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import {useCookies} from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';

import authService from '../features/auth/authService'

import LoginRegister from '../styles/LoginRegister.module.css'


const Login = () => {
    const [register, setRegister] = useState(false);
    const router = useRouter();
    
    const [formData, setFormData] = useState({
            name:'',
            nickname:'',
            email: '',
            password:'',
            password2:'',
        }
    )


    useEffect(()=>{
        const [cookies, setCookie] = useCookies(['user']);
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
            toast("Creating", {type: "success"})
            const res = authService.registerUser(userData);
            
            res.then(response => {                
                router.reload()                
            }).catch(error => {
                const resp = 'user cant be created: '+  error.response.data.message
                toast(resp, {type: "error"})
            })

        }else{
            // apenas login de usuario
            const userData = { email, password }
            const res = authService.login(userData);
            
            res.then(response => {
               router.reload()

            }).catch(error => {
                const resp = 'cant login: '+  error.response.data.message
                toast(resp, {type: "error"})
            })
        }      
    }

  return (
    <>
    <ToastContainer position="top-left" theme='colored' autoClose="1200" />
    {!register ? 

        // just login user
    <div className={LoginRegister.LRContainer}>
        <div className={LoginRegister.LRInnerContainer}>
            <div className={LoginRegister.LRTitle}>Login</div>
            <form onSubmit={onSubmit}>
                <div>

                    <input type="text" id='email' name='email' value={email} placeholder='Enter your email'
                        className={LoginRegister.LRInput}
                        onChange={onChange}
                    />
                </div>

                <div>
                    <input type="password"  id='password' name='password' value={password} placeholder='Enter your password'
                        className={LoginRegister.LRInput}
                        onChange={onChange}
                    />
                </div>
                
            <div className={LoginRegister.LRButtonContainer}>
                <div className={LoginRegister.LRButtonInnerContainer}>
                    <div>
                        <button type="submit"
                            className={LoginRegister.LRButton}
                        >Login</button>
                    </div>
                    <div>
                        <button
                        className={LoginRegister.LRButton}
                        onClick={()=> setRegister(true)}>Register</button>
                    </div>
                </div>
            </div>
            </form>
            
        </div>
    </div>:
    
    // register user
    <div className={LoginRegister.LRContainer}>
        <div className={LoginRegister.LRInnerContainer}>
            <form onSubmit={onSubmit}>
                <div className={LoginRegister.LRSpanLabel}>Name: </div>
                <div>
                    <input type="text" id='name' name='name' value={name} placeholder='Enter your name'
                        className={LoginRegister.LRInput}
                        onChange={onChange}
                    />
                </div>
                <div className={LoginRegister.LRSpanLabel}>Nickname: </div>
                <div>
                
                    <input type="text" id='nickname' name='nickname' value={nickname} placeholder='Enter your nickname'
                        className={LoginRegister.LRInput}
                        onChange={onChange}
                    />
                </div>

                <div className={LoginRegister.LRSpanLabel}>Email: </div>
                <div>

                    <input type="text" id='email' name='email' value={email} placeholder='Enter your email'
                        className={LoginRegister.LRInput}
                        onChange={onChange}
                    />
                </div>

                <div className={LoginRegister.LRSpanLabel}>Password: </div>
                <div>
                    <input type="password" id='password' name='password' value={password} placeholder='Enter your password'
                    className={LoginRegister.LRInput}
                    onChange={onChange}
                    />
                </div>

                <div className={LoginRegister.LRSpanLabel}>Repeat Password: </div>
                <div>
                    <input type="password" id='password2' name='password2' value={password2} placeholder='Enter your password again'
                    className={LoginRegister.LRInput}
                    onChange={onChange}
                    />
                </div>
                

                <div className={LoginRegister.LRButtonContainer}>
                    <div className={LoginRegister.LRButtonInnerContainer}>
                        <div>
                            <button className={LoginRegister.LRButton} type="submit">Register</button>
                        </div>

                        <div>
                            <button  className={LoginRegister.LRButton} onClick={()=> setRegister(false)}>I already have an account</button>
                        </div>
                    </div>
                </div>
        </form>
            
            
        </div>
    </div>
    }
    </>
  )
}

export default Login