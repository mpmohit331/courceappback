import classes from './Login.module.css'
import Navbar from '../Navbar/Navbar'
import {Form, Button} from 'react-bootstrap'
import {useRef} from 'react'
import { useHistory } from 'react-router'
import {useDispatch} from 'react-redux';
import { userActions } from '../../store/user-slice'
import {useCookies} from 'react-cookie'


const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['jwt']);
    
    const SignUp = () => {
        history.push('/SignUp')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_FETCH_LINK}/loginUser`, {
            headers: {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            dispatch(userActions.changeUser(response));
            setCookie('jwt', response._id, {path: '/'})
            history.push("/")
        })
    }

    return (
        <>
        <Navbar></Navbar>
        <div className={classes.parentDiv}>
            <Form className={classes.formDiv}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
                <div className={classes.signDiv}>
                    <p onClick={SignUp}>Sign Up</p>
                    <p>Forgot Password</p>
                </div>
                <Button onClick={submitHandler} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </>
    )
}

export default Login