import axios from 'axios';
import React,{useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';

export default function CategoriaForm() {
    const [validate, setvalidate] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
  
    const handleSubmit =(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setvalidate(true);
        if (descricao && tipo) {
            axios.post('https://api-provida.vercel.app/cadastrarCategoria', { descricao, tipo })
                .then((res) => {
                    if (res.data.message.affectedRows > 0) {
                        toast.success('Categoria criada com sucesso!');
                        setDescricao('');
                        setTipo('');
                    } else {
                        toast.error('Erro ao criar categoria: ' + res.data.message);
                    }
                })
                .catch((error) => {
                    toast.error('Error creating category: ',error.message);
                });
        }else{
            toast.error('Preencha todos os campos obrigatórios!');
        }
    }
  return (
    <div className='container border mt-1 p-4 shadow-sm rounded' style={{backgroundColor: '#f5f5f5', color: '#222'}}>
       
        <Form noValidate validate = {validate} onSubmit={handleSubmit} id='formComp'>
            <div className="bg-info  p-2 rounded-1 mb-3 mx-0" style={{fontSize: 15}}>
                Antes de proceder a criar um nova categoria, verifique se o mesmo já existe na base de dados.
            </div>
            <Form.Group className='small' controlId='formGroupSource'>
                <div className='row mx-0'>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xxs-12">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control className='shadow-sm rounded-1'  required value={descricao} onChange={(e)=>setDescricao(e.target.value)}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xxs-12">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select className='shadow-sm rounded-1' required value={tipo} onChange={(e)=>setTipo(e.target.value)} >
                            <option value={'REAGENT'}>REAGENT</option>
                            <option value={'TEST'}>TEST</option>
                        </Form.Select>
                    </div>
                </div>
            </Form.Group>
            <div className='container'>
                <Button type='submit' className='btn mt-3  border-0 bg-none px-5' style={{backgroundColor: '#127b82'}}>Criar</Button>
            </div>
        </Form>
        <ToastContainer/>
    </div>
  )
}
