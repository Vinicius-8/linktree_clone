import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'

import Login from '../components/Login'
import authService from '../features/auth/authService'

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(()=>{
      // verificar se tem alguem logado se nao go to login page
      //const userLocal = JSON.parse(localStorage.getItem('user')) // pega o user local
      console.log('Adeees');

      try {
          setUser(cookies.user) 

      } catch (error) {

        setUser(null)
      }
      
    },[])

  return (
    <div>
        {user? 
        <>
        usuario logado: {user.name}
        <button onClick={()=> {
          authService.logout()
          setUser(null);
          }}>Logout</button>
        </>
        
        :
        <Login setUser={setUser}/>
        }
    </div>
  )
}

export default Dashboard