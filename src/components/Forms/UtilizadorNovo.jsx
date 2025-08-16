import React, {useState, useEffect} from 'react'
import { Button, Form} from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UtilizadorNovo() {
       const [validate, setvalidate] = useState(false);
       const [previlegio, setPrevilegio] = useState([]); 
       const [username,setUsername] = useState('');
       const [password,setPassword] = useState('');
       const [email, setEmail] = useState('');
       const [previlegioId, setPrevilegioId] = useState(2);

        useEffect(()=>{ 
            axios.get('https://api-provida.vercel.app/lista_previlegios').then((res) => {
                setPrevilegio(res.data.message);
            }).catch((error) => {       
                console.error("Error fetching data:", error);
            });
        },[]);
      
        const handleSubmit =(event)=>{
            event.preventDefault();
            if(username === '' || password === '' || email === ''){
                toast.error("Preencha os dados completos");
            }else{
                axios.post('https://api-provida.vercel.app/cadastroUtilizador',{username: username, password: password, email: email, previlegio: previlegioId},)
                .then((data)=>{
                    toast.success(data.data.message);
                    setUsername('');
                    setPassword('');
                    setEmail('');
                    setPrevilegioId('');
                }).catch((error) => {
                    toast.error("Ocorreu an error ao criar o utilizador");
                });
                setvalidate(true);
            }
        }
  return (
    <div className='container border mt-1 p-4 shadow-sm rounded' style={{backgroundColor: '#f5f5f5', color: '#222'}}>
        <Form noValidate validate = {validate} onSubmit={handleSubmit} id='formComp'>
            <h4 className='text-center'>Adicionar Novo Email</h4>
            <div className='small bg-info py-2 mb-2 text-center'>Preencha os dados para adicionar um novo email</div>
            <Form.Group className='small' controlId='formGroupSource' >
                <div className="row mx-0">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xxs-12" >
                        <Form.Label>Username:</Form.Label>
                        <Form.Control className='shadow-sm rounded-1' placeholder='escrever username'  value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='escrever password' className='shadow-sm rounded-1'   value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xxs-12">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='text' placeholder='escrever email' className='shadow-sm rounded-1'   value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <Form.Label>Previlegios:</Form.Label>
                        <Form.Select className='shadow-sm rounded-1' value={previlegioId} onChange={(e)=>setPrevilegioId(e.target.value)} >
                            <option value={2} >Tecnico de Laboratorio</option>
                            {previlegio.map((item,index)=>
                                <option key={index} value={item.previlegio} >{item.descricao}</option>
                            )}  
                        </Form.Select>
                    </div>
                </div>
            </Form.Group>
            <div className='container'>
                <Button type='submit' className='btn mt-3  border-0 bg-none px-5' style={{backgroundColor: '#127b82'}}>Criar</Button>
            </div>
        </Form>
        <ToastContainer />
    </div>
  );
}
