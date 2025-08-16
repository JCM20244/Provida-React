import React, { useState } from "react";
import { Button, CardBody, CardImg, Container, Form, Row } from "react-bootstrap";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../context/AuthContext";

export default function LoginComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();

    const submitHendler =async(e)=> {
        e.preventDefault();
        await login(username, password);
    }
 
  return (
    <main className="" style={{backgroundImage: `url(${`angle.jpg`})`, height: "100vh",backgroundSize: "cover",backgroundRepeat: "no-repeat"}} >
        <Row className="mx-0">{''}</Row>
        <Container className="px-0 " >
            <div className="container border-0  px-0 shadow-sm bg-white mt-lg-5 mt-md-5 mt-sm-2 mt-xs-3 mt-xxs-3" style={{maxWidth: 800, opacity: 0.9, justifyContent:'center', justifyItems:'center', alignItems: 'center'}} >
                <div className='row mt-0 mx-0' >
                    <div className='col-lg-6, col-md-6 col-sm-12 col-xs-12 col-xxs-12' >
                        <CardImg src='labt.jpg' alt="login form" className='rounded-start w-100 h-75 mt-lg-3 mt-md-3 mt-sm-1 mt-xs-1 mt-xxs-1'/>
                        <div className="mt-2 mx-0  ">HTREC Softwate is a validation control software for Tests and reagents in hospitals.</div>
                    </div>
                    <div className='col-lg-6, col-md-6 col-sm-12 col-xs-12 col-xxs-12'>
                        <CardBody className='d-flex flex-column'>
                        <div className='d-flex flex-row ' style={{textAlign: 'center', justifyContent: 'center'}}>
                            <div className=" mb-0" style={{textAlign: 'center', justifyContent: 'center'}}>
                                <CardImg src='htc.png' alt="login form" className='rounded-start w-26  mt-0 pt-0 ' />
                            </div>
                        </div>
                        <h5 className="fw-normal mt-2 " style={{letterSpacing: '1px'}}>Sign Here</h5>
                        <Form onSubmit={submitHendler}> 
                            <Form.Group className="my-3">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control  className="shadow-sm"  value={username} onChange={(e)=> setUsername(e.target.value)}  type='text' size="md" required/>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control className="shadow-sm"  value={password} onChange={(e)=> setPassword(e.target.value)}  type='password' size="md" required/>
                            </Form.Group>
                            <Form.Group>
                                <Button className="mb-3 px-5 border-0 w-100 " type="submit" size='md' style={{ backgroundColor: '#444791'}} >Login</Button>
                            </Form.Group>
                        </Form >
                        <div className='d-flex flex-row justify-content-start'>
                            <a href="#!" className="small text-muted me-1">Terms of use.</a>
                            <a href="#!" className="small text-muted">Privacy policy</a>
                        </div>
                        </CardBody>
                    </div>
                </div>
            </div>
        </Container>
        <ToastContainer/>
    </main>
);
};

