import React ,{useState,useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../../App.css"
import HeadCollapse from '../Heads/HeadCollapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ModalForm from './ModalForm';
import axios from 'axios';
import { Navigate } from "react-router-dom";
export default function Agenda() {
  // const [modalShow,setModalShow] = useState(false);
  const [artigos,setArtigos] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [reagentDetails, setReagentDetails] =useState([]);
  const token = localStorage.getItem('authToken');
  const [countAgendado, setCountAgendado] = useState('');
  // const title = 'DETAILS';https://htrecs.onrender.com/outdate
    useEffect(() => {
      axios.get('https://api-provida.onrender.com/lista_artigo_Agendados').then((res)=>{
            if(res.data.message.length>0){
              setArtigos(res.data.message);
              setCountAgendado(res.data.message.length);
            }else{
              setArtigos([]);
            }
      }).catch((err)=>{
        console.log('No data founded');
      });
    }, []);
      const classficacaoMensal = (dias) => {
      if(dias > 30){
        return <strong className='text-success'>VALIDO</strong>;
      }else if(dias>0 && dias <= 30){
        return <strong className='text-warning'>AVISO</strong>;
      }else{
        return <strong className='text-danger'>EXPIRADO</strong>;
      }
    }
//#F5f7f8
  if(token){
    return (
      <main className='mx-0 vh-100' style={{backgroundColor: '#e1e8f7', color: '#222'}}>
        <div className='row mx-0'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 px-0 py-0'>
              <HeadCollapse badgeAgenda={countAgendado} />
          </div>
        </div>
        <div className='row mx-0' >
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 py-1 mt-5 border-none shadow-sm'>
            <div className='container  mt-5 mb-0'>
              <h4 className='text-center bg-secondary text-white '>Lista de Artigos Agendados</h4>
            </div>
            <div className='container' style={{maxHeight: '100vh', overflowY:'auto'}}>
              <Table responsive="sm" className='table table-hover'>
                <Thead style={{position: 'sticky', top: 0, backgroundColor: '#f5f5f5',fontSize: 10}}>
                  <Tr >
                    <Th >ID</Th>
                    <Th>REFERENCIA</Th>
                    <th>LOTE</th>
                    <th>NOME</th>
                    <th>EXPA.DATE</th>
                    <th>DIAS</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </Tr>
                </Thead>
                <Tbody style={{fontSize: 10}}>
                {artigos.map((item,i)=>
                  <Tr className=" py-0 bg-white" style={{cursor: 'pointer'}} >
                    <Td >A02{i++}</Td>
                    <Td>{item.referencia}</Td>
                    <Td>{item.lote}</Td>
                    <Td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',}}>{item.descricao}</Td>
                    <Td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',}}>
                      {(new Date(item.expData).getDate())+'/'+(new Date(item.expData).getMonth()+1) +'/'+ (new Date(item.expData).getFullYear())}
                    </Td>
                    <Td> {item.dias}</Td>
                    <Td  style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',}}> {classficacaoMensal(item.dias)}</Td>
                    <Td style={{justifyContent: 'center', textAlign: 'center'}} onClick={()=>{setModalShow(true);setReagentDetails(item)}}>
                      <FontAwesomeIcon icon={faPenToSquare} fontSize={20} style={{color: 'blue'}} />
                    </Td>
                  </Tr>
                  )}
                </Tbody>
              </Table>
            </div>
            <ModalForm show={modalShow} reagentDetails={reagentDetails} showbtn={'none'} onHide={()=>setModalShow(false)} style={{opacity:0.9}} />
          </div>
        </div>
      </main>
    );
  }else{
    return <Navigate to={'/'} replace/>
  }
}

