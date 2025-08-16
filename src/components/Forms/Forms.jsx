import  { useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import '../../App.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalSearch from '../Modals/ModalSearch';

export default function Forms () {
    const [showModal, setShowModal] = useState(false);
    //variaveis de dados
    const [referencia,setReferencia] = useState(''); 
    const [lote, setLote] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [fornecedorId, setFornecedorId] = useState('');
    const [prodData, setProdData] = useState((new Date()));
    const [expData, setExpData] = useState('');
    const [quatidade, setQuatidade] = useState('');
    //variaveis de estado
    const [validated, setValidated] = useState(false);
    const [fornecedor, setFornecedor] =useState([]);
    const [categoria, setCategoria] =useState([]);
    // const [tipoArtigo, setTipoArtigo] =useState();

    useEffect(()=>{
        //obter dados do fornecedor
        axios.get('https://api-provida.vercel.app/fornecedor_nome_view').then((res)=>{
            if(res.data.message.length > 0){
                setFornecedor(res.data.message);
            }else{
                setFornecedor([]);
            }
        });
        //obter dados da categoria
        axios.get('https://api-provida.vercel.app/categoria_descricao_view').then((res)=>{
            if (res.data.message.length > 0) {
                setCategoria(res.data.message);
            }else{
                setCategoria([]);
            }
        });
    },[]);

    //funcao de evento de submissao de formulario
    const handleSubmit = (event) => {
        event.preventDefault(); // https://htrecs.onrender.com/add
        if(referencia === '' || lote === '' || quatidade === '' || categoriaId === '' || fornecedorId === '' || prodData === '' || expData === ''){
            toast.error("Preencha os dados completos!");
        }else{
            axios.post('https://api-provida.vercel.app/cadastrarArtigo',{referencia: referencia,lote: lote,quatidade:quatidade,categoria: categoriaId,prodData: prodData,expData: expData, fornecedor: fornecedorId},)
            .then((data)=>{
                toast.success(data.data.message);
                // getRef(referencia);
                // getdataform(data.data.message);
                setReferencia('');
                setLote('');
                setQuatidade('');
                setCategoriaId(''); 
                setExpData('');
                setProdData('');
                setFornecedor('');
                setValidated(true);
            }).catch((err)=>{
                toast.error("Ocorreu um erro ao criar o artigo!");
            }); 
        }
      };
    const handleClose = () =>{
        setShowModal(false);
    }
    return (
        <div>
            <Form  noValidate validated={validated} onSubmit={handleSubmit} id='formComp'>
                <h4 className='justify-content-center  text-center' style={{color:'#fffff'}}>CRIAR NOVO ARTIGO</h4>
                <div className="bg-info  p-2 rounded-1 mb-3 mx-0" style={{fontSize: 15}}>
                    Antes de proceder a criar um novo artigo, verifique se o mesmo já existe na base de dados. Para isso, clique no botão "Pesquisar" e faça a pesquisa pelo código de referência do artigo.
                </div>
                <div className='row mx-0'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xxs-12'>
                        <Form.Group className='small' controlId='formGroupSerial'>
                            <Form.Label className='mt-2'>REFERÊNCIA: </Form.Label>
                            <Form.Control className='shadow-sm  rounded-1 ' required  type="text" placeholder='preenche a referencia' value={referencia} onChange={(e)=>setReferencia(e.target.value)} />
                            <Form.Label className='mt-2'>LOTE:</Form.Label>
                            <Form.Control className='shadow-sm  rounded-1 ' required type='text' placeholder='preenche o lote' value={lote} onChange={(e)=>setLote(e.target.value)}/> 
                            <Form.Label className='mt-2'>PROD.DATE: </Form.Label>
                            <Form.Control className=' rounded-1 shadow-sm ' required type="date" placeholder='preenche a data de producao' value={prodData} onChange={(e)=>setProdData(e.target.value)} />
                            <Form.Label className='mt-2'>EXPA.DATE</Form.Label>
                            <Form.Control className='rounded-1 shadow-sm  ' required type='date' placeholder='preenche a data de expiracao' value={expData} onChange={(e)=>setExpData(e.target.value)}/>
                        </Form.Group>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xxs-12'>
                    <Form.Group className='small' controlId='formGroupSource'>
                        <Form.Label className='mt-2'>FORNECEDOR: </Form.Label>
                        <Form.Select className=' rounded-1 shadow-sm ' required type='text'  value={fornecedorId} onChange={(e)=>setFornecedorId(e.target.value)}>
                            <option value=''>selecionar fornecedor</option>
                            { fornecedor&&fornecedor.map((item,index)=>
                                 <option value={item.codigo} key={index}>{item.nome}</option>
                                )
                            }
                        </Form.Select>
                        <Form.Label className='mt-2'>QUANTIDADE: </Form.Label>
                        <Form.Control className=' rounded-1 shadow-sm ' required  type="number" placeholder='preenche a quantidade' value={quatidade} onChange={(e)=>setQuatidade(e.target.value)} />
                        <Form.Label className='mt-2'>CATEGORIA:</Form.Label>
                        <Form.Select className=' rounded-1 shadow-sm ' required type='text' value={categoriaId} onChange={(e)=>setCategoriaId(e.target.value)}>
                            <option value=''>selecionar categoria</option>
                            {categoria && categoria.map((item,index)=>
                                 <option value={item.codigo} key={index}>{item.descricao}</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                    </div>
                    </div>
                
                <div className='row mx-0'>
                    <div className=' col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12'>
                        <Button type="submit" className='me-4 fw-bold py-2 px-3 mt-4 border-0  bg-none btn-form-add' >Registar</Button>
                        <Button  className='fw-bold mt-4 py-2 px-3 border-0 bg-none btn-form-search' onClick={()=>setShowModal(true)} >Pesquisar</Button>
                    </div>
                </div>
            </Form>
            {showModal&& <ModalSearch  title={"Pesquisar um Artigo"} handleClose = {handleClose} />}
          <ToastContainer/>
      </div>
    )
}
