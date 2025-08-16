import React, { useEffect, useState } from 'react'
import HeadCollapse from '../Heads/HeadCollapse'
import FornecedorNovo from '../Forms/FornecedorNovo'
import { Table,Tbody, Thead,Tr,Td,Th} from 'react-super-responsive-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faAddressBook,faClipboardList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Navigate} from "react-router-dom";

export default function Fornecedor() {
  const [fornecedor, setFornecedor] = useState([]);
  const token = localStorage.getItem('authToken');
  // Check if the user is authenticated 
 

  useEffect(()=>{
    axios.get('https://api-provida.vercel.app/fornecedor_provincia_view')
    .then((res) => {
      if(res.data.message.length > 0){  
        setFornecedor(res.data.message);
      }else{
        setFornecedor([]);
      }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[]);
  if(token){
    return (
      <main className='App mx-0 vh-100' style={{backgroundColor: '#e1e8f7', color: '#222'}}>
        <div className='row mx-0'>
          <div className='col-12 px-0 py-0'>
            <HeadCollapse/>
          </div>
        </div>    
        <div className='row mx-0'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 px-0 py-0 mt-2 '>
            <div className='container  mt-5 mb-0'>
              <h4 className=' ' style={{backgroundColor: '#127b82'}}>
                <FontAwesomeIcon icon={faAddressBook} color='#d2dcd7' className='ms-2 '/> <label className='text-center text-white'>Formulario para criar Fornecedor</label>
              </h4>
            </div>
            <div className='container'>
              <FornecedorNovo/>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 px-0 py-0 mt-2'>
            <div className='container  mt-5 mb-0'>
              <h4 className=' bg-secondary  '>
                <FontAwesomeIcon icon={faClipboardList} color='#d2dcd7' className='mx-2'/> 
                <label className='text-center text-white'>Lista de Fornecedores</label></h4>
            </div>
            <div className='container '>
            <div className='border shadow-sm rounded' style={{maxHeight: '60vh', overflowY:'auto',backgroundColor: '#f5f5f5', color: '#222'}}>
              <Table responsive="sm" className='table table-hover mt-2' >
                <Thead style = {{position: 'sticky', top: 0, backgroundColor: '#f5f5f5', fontSize: 12}}>
                  <Tr>
                    <Th>CODIGO</Th>
                    <Th>DESCRIÇÃO</Th>
                    <Th>TIPO</Th>
                    <Th>ACÇÃO</Th>
                  </Tr>
                </Thead>
                <Tbody style={{fontSize: 10}}>
                  {fornecedor && fornecedor.map((item,index)=>
                    <Tr key={index}>
                      <Td>P0{index++}1</Td>
                      <Td>{item.nome}</Td>
                      <Td>{item.contacto}</Td>
                      <Td><FontAwesomeIcon icon={faPenToSquare} fontSize={18} color='blue'/></Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
          </div>
          </div>
          </div>
        </div>
      </main>
    );
  }else{
    return <Navigate to={'/'} replace/>
  }
}
