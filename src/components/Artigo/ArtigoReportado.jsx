import React ,{useState,useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../../App.css"
import HeadCollapse from '../Heads/HeadCollapse';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ReportedDetails from '../Modals/ReportedDetails';
export default function ArtigoRepostado() {
  const [artigos,setArtigos] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [itemDetails, setItemDetails] =useState([]);
  const token = localStorage.getItem('authToken');
 
  // const title = 'DETAILS';https://htrecs.onrender.com/outdate
    useEffect(() => {
      axios.get('https://app-htrec.vercel.app/lista_reported_artigo').then((data)=>{
        setArtigos(data.data.message);
      }).catch((err)=>{
        console.log('No data founded');
      });
    }, []);
//classficacaoMensal
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
 if (token) {
    return (
      <main className='mx-0 vh-100' style={{backgroundColor: '#e1e8f7', color: '#222'}}>
        <div className='row mx-0'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 px-0 py-0'>
              <HeadCollapse />
          </div>
        </div>
        <div className='row mx-0' >
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 py-1 mt-5 border-none shadow-sm'>
            <div className='container  mt-5 mb-0'>
              <h4 className='text-center bg-secondary text-white '>Lista de Artigos Reportados </h4>
            </div>
            <div className='container' style={{maxHeight: '100vh', overflowY:'auto'}}>
              <Table responsive="sm" className='table table-hover'>
                <Thead style={{position: 'sticky', top: 0, backgroundColor: '#f5f5f5',fontSize: 10}}>
                  <Tr >
                    <Th >CODIGO</Th>
                    <Th>LOTE</Th>
                    <Th>DATA REPORTADO</Th>
                    <Th>NRREPORTADO</Th>
                    <Th>STATUS</Th>
                    <Th>ACCAO</Th>
                  </Tr>
                </Thead>
                <Tbody style={{fontSize: 10}}>
                {Array.isArray(artigos)&&artigos.map((item,i)=>
                  <Tr className=" py-0 bg-white" style={{cursor: 'pointer'}} >
                    <Td >A02{i++}</Td>
                    <Td>{item.lote}</Td>
                    <Td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',}}>
                      {(new Date(item.dataRep).getDate())+'/'+(new Date(item.dataRep).getMonth()+1) +'/'+ (new Date(item.dataRep).getFullYear())}
                    </Td>
                    <Td> {item.numRep}</Td>
                    <Td> {classficacaoMensal(item.numRep)}</Td>
                    <Td style={{justifyContent: 'center', textAlign: 'center'}} onClick={()=>{setModalShow(true);setItemDetails(item)}}>
                          <FontAwesomeIcon icon={faPenToSquare} fontSize={20} style={{color: 'blue'}} />
                      </Td>
                  </Tr>
                  )}
                </Tbody>
              </Table>
            </div>
            <ReportedDetails show={modalShow} artigoDetails={itemDetails} showbtn={'none'} onHide={()=>setModalShow(false)} style={{opacity:0.9}} />
          </div>
        </div>
      </main>
    );
  }else{
    return <Navigate to={'/'} replace/>
  }
}

