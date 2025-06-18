import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';

export default function FornecedorNovo() {
    const [validate, setvalidate] = useState(false);
    const [provincia, setProvincia] = useState([]); 
    const [nome, setNome] = useState('');
    const [contacto, setContacto] = useState('');
    const [provinciaSelected, setProvinciaSelected] = useState('');

    useEffect(()=>{ 
        axios.get('https://app-htrec.vercel.app/provincia_view').then((res) => {
            if(res.data.message.length > 0){
                setProvincia(res.data.message);
            }
            else{
                setProvincia([]);
            }
        }).catch((error) => {       
            console.error("Error fetching data:", error);
        });
    },[]);
  
    const handleSubmit =(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setvalidate(true);
        if(nome && contacto){
            axios.post('https://app-htrec.vercel.app/cadastrarFornecedor', { nome: nome, contacto: contacto, provincia: provinciaSelected })
                .then((res) => {
                    if (res.data.message.affectedRows > 0) {
                        toast.success('Fornecedor criado com sucesso!');
                        setNome('');
                        setContacto('');
                        setProvinciaSelected('');
                    } else {
                        toast.error('Erro ao criar fornecedor: ' + res.data.message);
                    }
                })
                .catch((error) => {
                    toast.error('Error creating supplier: ', error.message);
                });
        }
    }
  return (
    <div className='container border mt-1 p-4 shadow-sm rounded' style={{backgroundColor: '#f5f5f5', color: '#222'}}>
        <Form noValidate validate = {validate} onSubmit={handleSubmit} id='formComp'>
            <div className="bg-info  p-2 rounded-1 mb-3 mx-0" style={{fontSize: 15}}>
                Antes de proceder a criar um nova fornecedor, verifique se o mesmo já existe na base de dados.
            </div>
            <Form.Group className='small' controlId='formGroupSource'>
                <Form.Label>Nome:</Form.Label>
                <Form.Control className='shadow-sm rounded-1' placeholder='escrever nome' required value={nome} onChange={(e)=>setNome(e.target.value)}/>
                <Form.Label>Contacto:</Form.Label>
                <Form.Control type='text' placeholder='escrever contacto' className='shadow-sm rounded-1' required value={contacto} onChange={(e)=>setContacto(e.target.value)} />
                <Form.Label>Provincia:</Form.Label>
                <Form.Select className='shadow-sm rounded-1' required value={provinciaSelected} onChange={(e)=>setProvinciaSelected(e.target.value)}>
                    <option values={''}>Selecionar o provincia</option>
                    {provincia.map((item,index)=>
                        <option key={index} value={item.codigo}>{item.descricao}</option>
                    )}  
                </Form.Select>
            </Form.Group>
            <div className='container justify-content-end align-items-end d-flex flex-column'>
                <Button type='submit' className='btn mt-3  border-0 bg-none px-5' style={{backgroundColor: '#127b82'}}>Criar</Button>
            </div>
        </Form>
        <ToastContainer/>
    </div>
  )
}
