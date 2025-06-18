import React, {useState ,useEffect} from 'react'
import { ListGroup ,Button,Form} from 'react-bootstrap'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

export default function EditDevice(props) {
    const [readyStatus,setReadStatus] = useState(true);
    const [aplyingBtn, setAplyingBtn]= useState(true);
    const details = props.details;
    const id = props.details.artigo;
    const btnvisible = props.btnvisible;
    const [fieldType, setFieldType] = useState('text');
    const [categoria, setCategoria] = useState([]);
    const [fornecedor, setFornecedor] = useState([]);
    const dataProd = new Date().toISOString().split('T')[0];
    const cardbtnClassName = 'd-flex border-0 border-top d-'+(btnvisible ? 'none' : 'block');

    const [values, setValues] = useState({
        ref: '',
        lot: '',
        categoria:  '',
        expdate:  new Date(details.expData),
        prodDate: new Date().toISOString().split('T')[0],
        quantity: -1,
        fornecedor:  '',
        status:  '',
        codCategoria: '',
        codFornecedor: ''
    });

    useEffect(()=>{
        setValues({
            ref: details.referencia,
            lot:details.lote,
            categoria: details.descricao,
            expdate:details.expData,
            fornecedor: details.nome, 
            quantity: details.quatidade, 
            status: details.dias, 
            codCategoria: details.categoria, 
            codFornecedor: details.fonecedor, 
            prodDate: dataProd });
    },[details, dataProd]);

    const handleEdit = ()=>{
        setReadStatus(false);
        setAplyingBtn(false);
        setFieldType('date');
        axios.get('https://app-htrec.vercel.app/fornecedor_nome_view').then((res)=>{
            if(res.data.message.length > 0){
                setFornecedor(res.data.message);
            }else{
                setFornecedor([]);
            }
        });
       //obter dados da categoria
        axios.get('https://app-htrec.vercel.app/categoria_descricao_view').then((res)=>{
            if (res.data.message.length > 0) {
                setCategoria(res.data.message);
            }else{
                setCategoria([]);
            }
        });
    }
    // Submit handler for the form
    function submitHendler(e) {
        e.preventDefault(); //'https://htrecs.onrender.com/update/'
        axios.put('https://app-htrec.vercel.app/update/' + id, 
            { referencia: values.ref,
              lote: values.lot,
              categoria: values.codCategoria,
              expdate: values.expdate, 
              prodDate: values.prodDate,
              fornecedor: values.codFornecedor,
              quantity: values.quantity
            })
            .then((res) => {
                if(res.data.message.affectedRows > 0){
                    toast.success('Artigo actualizado com sucesso!');
                    window.location.reload(false);
                }else{
                    toast.error('Ocorreu um erro ao actualizar o artigo!');
                }
            });
        setFieldType('date');
    }
// Delete handler for the delete button
    function deleteHendler(e){
        axios.delete('https://app-htrec.vercel.app/delete/'+id).then((res)=>{
            if(res.data.message.affectedRows > 0){
                toast.success('Artigo eliminado com sucesso!');
                window.location.reload(false);
            } else{
                toast.error('Ocorreu um erro ao eliminar o artigo!');
            }
        }).catch((err)=>{
            toast.error("Ocorreu um erro no servidor, contacte o administrador: ",err);
       });  
    }
    // Function to classify the status based on the number of days
    const classficacaoMensal = (dias) => {
        if(dias > 30){
          return <strong className='text-success'>VALIDO <label style={{marginLeft: 10}} > - {dias} Dias <FontAwesomeIcon icon={faCircleCheck} color='green' className='ms-5'/></label></strong>;
        }else if(dias >0 && dias <=30){
          return <strong className='text-warning'>AVISO <label style={{marginLeft: 10}} > - {dias} Dias <FontAwesomeIcon icon={faCircleCheck} color='orange' className='ms-5'/></label></strong>;
        }else{
          return <strong className='text-danger'>EXPIRADO <label style={{marginLeft: 10}} > - {dias} Dias <FontAwesomeIcon icon={faCircleCheck} color='danger' className='ms-5'/></label></strong>;
        }
    }
  return (
    <div className='' style={{fontSize: 12}}>
        <div className='row mx-0 border'>
            <div className='col-12 bg-white'>
                <Form onSubmit={submitHendler}>
                    <ListGroup id='LeftDetails'>
                        <ListGroup.Item  className=' border-0'>
                            <div className='row  '>
                                <div className='col-6'> 
                                    <h6 className='mt-2 fw-bold ms-2' style={{fontSize: 12}}>REFERÊNCIA:</h6>
                                    <div>
                                        <Form.Control type='text' size='sm' className='shadow-sm border-0 edit-fields' readOnly={readyStatus} value={values.ref}  onChange={(e)=>setValues({...values,ref: e.target.value})}/>
                                    </div>
                                    <h6 className='mt-2 fw-bold ms-2' style={{fontSize: 12}}>LOTE:</h6>
                                    <div className=''>
                                        <Form.Control type='text' size='sm'  className='shadow-sm border-0 edit-fields' readOnly={readyStatus}  value={values.lot} onChange={(e)=>setValues({...values,lot:e.target.value})}/>
                                    </div>
                                    <h6 className='mt-2 fw-bold ms-2' style={{fontSize: 12}}>QUANTIDADE:</h6>
                                    <div className=''>
                                        <Form.Control type='number' size='sm' className='shadow-sm border-0 edit-fields' readOnly={readyStatus} value={values.quantity} onChange={(e)=>setValues({...values,quantity:e.target.value})} />
                                        <Form.Control type='number' size='sm' className='shadow-sm ms-2 d-none'  value={id}/>
                                    </div>
                                    <h6 className='mt-2 fw-bold ms-2' style={{fontSize: 12}}>ESTADO:</h6>
                                    <div className='ms-2'>
                                        {classficacaoMensal(values.status)}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <h6 className='mt-2 fw-bold ms-2' style={{fontSize: 12}}>Categoria:</h6>
                                    <div className=''>
                                        <Form.Select className='shadow-sm border-0 edit-fields' size='sm' readOnly={readyStatus} value={values.codCategoria} onChange={(e)=>setValues({...values,codCategoria:e.target.value})}>
                                            <option value={values.codCategoria}>{values.categoria}</option>
                                            {Array.isArray(categoria) && categoria.map((item, index)=>
                                                <option value={item.codigo}>{item.descricao}</option>
                                            )}
                                        </Form.Select>
                                    </div>
                                    <h6 className='mt-2 fw-bold ms-2' style={{fontSize: 12}}>FORNECEDOR:</h6>
                                    <div className=''>
                                        <Form.Select className='shadow-sm border-0 edit-fields' size='sm' readOnly={readyStatus} value={values.codFornecedor} onChange={(e)=>setValues({...values,codFornecedor:e.target.value})}>
                                            <option value={values.codFornecedor}>{values.fornecedor}</option>
                                            {Array.isArray(fornecedor) && fornecedor.map((item, index)=>
                                                <option value={item.codigo}>{item.nome}</option>
                                            )}
                                        </Form.Select>
                                    </div>
                                    <h6 className='mt-2 fw-bold ms-2' style={{fontSize: 12}}>EXPA.DATA:</h6>
                                    <div className=''>
                                        <Form.Control type={fieldType} size='sm' className='shadow-sm border-0 edit-fields'  readOnly={readyStatus}  value={values.expdate}  onChange={(e)=>setValues({...values,expdate:e.target.value})} />
                                        <Form.Control type='date' size='sm' className='shadow-sm border-0 edit-fields d-none'  readOnly={readyStatus}  value={values.prodDate}  onChange={(e)=>setValues({...values,prodDate:e.target.value})} />
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className={cardbtnClassName} > 
                            <div className='row '>
                            <div className='col-4'><Button className='px-4' size='sm' onClick={handleEdit} >Editar</Button></div>
                            <div className='col-4'><Button type='submit' className=' px-4' size='sm' style={{backgroundColor: '#01902a', borderColor: '#01902a'}}  disabled={aplyingBtn}>Apply</Button></div>
                            <div className='col-4'><Button className='px-4' style={{backgroundColor: '#ee6913', borderColor: '#ee6913'}} size='sm' onClick={deleteHendler} >Deletar</Button></div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Form>
                <ToastContainer/>
            </div>
        </div>
    </div>
  )
}
