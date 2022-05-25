import Navbar from "../Navbar/Navbar"
import classes from './SignUp.module.css'
import { Form, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { useHistory } from "react-router"

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const numberRef = useRef();

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_FETCH_LINK}/signUpUser`, {

            headers: {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                name: nameRef.current.value,
                number: numberRef.current.value
            }

        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            history.push('/Login')
        })
    }

    const loginHandler = () => {
        history.push('/Login')
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

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Enter Name" />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Number</Form.Label>
                        <Form.Control ref={numberRef} type="number" placeholder="Enter Number" />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                    </Form.Group>
                    <div className={classes.signDiv}>
                        <p onClick={loginHandler}>Already A User</p>
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

export default SignUp