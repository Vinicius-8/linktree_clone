import {useState} from 'react'

import authService from '../features/auth/authService'


const Login = ({ setUser }) => {
    const [register, setRegister] = useState(false);

    const [formData, setFormData] = useState({
            name:'',
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

    const {name, email, password, password2} = formData

    const onSubmit = (e)=>{ // para o form do submit
        e.preventDefault()

        if(register){
            // registro de usuario
            if(password !== password2 && register){
                alert('As senhas devem ser iguais!')
                return
            }

            const userData = {
                name,
                email,
                password,
                password2
            }

            const res = authService.registerUser(userData);
            
            res.then(response => {
                setUser({
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    token: response.token
                })
                
            }).catch(error => console.log(error))

        }else{
            
            // apenas login de usuario
            const userData = {
                email,
                password
            }

            const res = authService.login(userData);

            res.then(response => {
                setUser({
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    token: response.token
                })
                
            }).catch(error => console.log(error))
        }

       
       //const res = authService.login(userData)

    //    res.then(data => {
    //     router.reload(window.location.pathname)
    //    }).catch(()=>{
    //     alert('O user nao pode ser logado')
    //    })
      
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