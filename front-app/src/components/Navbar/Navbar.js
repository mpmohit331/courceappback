import { useHistory } from 'react-router'
import classes from './Navbar.module.css'
import logo from '../../images/book.png'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const history = useHistory();

    const changeHandler = (route) => {
        history.push(`/${route}`)
    }

    const logoutHandler = () => {
        console.log('adad')
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.reload(false)
    }

    const userState = useSelector((state) => {
        return state.user
    })

    return (
        <div className={classes.navbar}>
            {!userState.user && <p onClick={() => { changeHandler('Login') }}>Login</p>}
            {userState.user && <p>Hello {userState.user.name}!</p>}

            <img src={logo}></img>

            {!userState.user &&
                <p onClick={() => { changeHandler('SignUp') }}>Sign Up</p>

            }
            {userState.user &&
            <p onClick={logoutHandler}>LogOut</p>}
        </div>
    )
}

export default Navbar 