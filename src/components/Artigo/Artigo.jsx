import React ,{useState,useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../../App.css"
import HeadCollapse from '../Heads/HeadCollapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ModalForm from '../Forms/ModalForm';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import axios from 'axios';
import { Form, InputGroup } from 'react-bootstrap';
import { Navigate} from "react-router-dom";
import { toast, ToastContainer  } from 'react-toastify';
export default function Artigo() {
  const [artigos,setArtigo] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [reagentDetails, setReagentDetails] =useState([]);
  const token = localStorage.getItem('authToken');
  const [search, setSearch] = useState('');
 
  useEffect(() => {
    if(search){
        axios.put('https://api-provida.onrender.com/artigos_search_table/', {search: search})
          .then((res) => {
            if(res.data.message.length > 0){
              setArtigo(res.data.message);
            }else{
              setArtigo([]);
            }
          })
          .catch((error) => {
            toast.error('Error fetching data from server:', error);
          });
    }else{
      axios.get('https://api-provida.onrender.com/lista_artigos')
        .then((res) => {
          if (res.data.message.length > 0) {
            setArtigo(res.data.message);
          } else {
            setArtigo([]);  
          }
          const leftDetais = document.getElementById('LeftDetails');
          if(leftDetais){
             leftDetais.style.display = 'block';
          }
        })
        .catch((error) => {
          toast.error('Error fetching data from server:', error);
        }); 
      }
    }, [search]);
    const classficacaoMensal = (mesdif) => {
      if(mesdif > 30){
        return <strong className='text-success'>VALIDO</strong>;
      }else if(mesdif>0 && mesdif <= 30){
        return <strong className='text-warning'>AVISO</strong>;
      }else{
        return <strong className='text-danger'>EXPIRADO</strong>;
      }
    }
if(token){
  return (
    <main className='mx-0' style={{backgroundColor: '#e1e8f7', color: '#222'}}>
        <div className='row mx-0'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 px-0 py-0'>
            <HeadCollapse />
          </div>
        </div>
      <div className='row mx-0 mt-lg-5 mt-md-5 mt-sm-5 mt-xs-5 mt-xxs-5'>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 px-0 py-0'>
          <div className='container  mt-5 mb-0'>
            <h4 className='text-center bg-secondary text-white '>Lista de Artigos</h4>
          </div>
          <div className='container ' style={{maxHeight: '65vh', overflowY:'auto'}}>
            <div className='mb-2'> 
              <InputGroup size='sm' className='py-0'>
                <span className='input-group-text border-0 bg-primary text-white px-3 rounded-0 fw-bold ' id='inputGroup-sizing-sm' style={{fontSize: 6}} >ABC</span>
                <Form.Control
                  className='border-0 shadow-none rounded-0 '
                  placeholder='pesquisar por referencia ou lote' value={search} onChange={(e)=>setSearch(e.target.value)} />
              </InputGroup>
            </div>
            <Table responsive="sm" className='table table-hover'  >
              <Thead  style = {{position: 'sticky', top: 0, backgroundColor: '#f5f5f5', fontSize: 12}}>
                <Tr >
                  <Th>REF.</Th>
                  <Th>LOT.</Th>
                  <Th>REAGENT</Th>
                  <Th>EXPA.DATE</Th>
                  <Th>QUANTIDADE</Th>
                  <Th>DIAS</Th>
                  <Th>STATUS</Th>
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody style={{fontSize: 10}}>
              {Array.isArray(artigos) && artigos.map((item,i)=>
                <Tr className=" py-0" style={{cursor: 'pointer'}}>
                  <Td>{item.referencia}</Td>
                  <Td>{item.lote}</Td>
                  <Td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{item.descricao}</Td>
                  <Td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
                    {(new Date(item.expData).getDate())+'-'+(new Date(item.expData).getMonth()+1) +'-'+ (new Date(item.expData).getFullYear())}
                  </Td>
                  <Td> {item.quatidade}</Td>
                  <Td> {item.dias}</Td>
                  <Td> {classficacaoMensal(item.dias)}</Td>
                  <Td style={{justifyContent: 'center', textAlign: 'center'}} onClick={()=>{setModalShow(true);setReagentDetails(item)}}>
                    <FontAwesomeIcon icon={faPenToSquare} fontSize={20} style={{color: 'blue'}} />
                  </Td>
                </Tr>
                )}
              </Tbody>
            </Table>
            <ModalForm show={modalShow} reagentDetails={reagentDetails} onHide={()=>setModalShow(false)} style={{opacity:0.9}} />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </main>
  );
}else{
     return <Navigate to={'/'} replace/>;
}
}
