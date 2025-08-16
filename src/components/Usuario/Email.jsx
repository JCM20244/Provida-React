import React, {useEffect, useState} from 'react'
import axios from 'axios'
//import emailjs from '@emailjs/browser';
import HeadCollapse from '../Heads/HeadCollapse';
import { Table,Tbody, Thead,Tr,Td,Th} from 'react-super-responsive-table';
import UtilizadorNovo from '../Forms/UtilizadorNovo';
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook ,faClipboardList} from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';

export default function Email() {
    const [prev, setPrev] = useState([]);
    const token = localStorage.getItem('authToken');
    // Check if the user is authenticated

    useEffect(()=>{
      axios.get('https://api-provida.vercel.app/utilizador_previlegio')
      .then((res) => {
          setPrev(res.data.message);
      }).catch((error) => {
          toast.error("Error fetching data:", error);
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
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 px-0 py-0  mt-2 mx-auto'>
            <div className='container  mt-5 mb-0'>
              <h4 className=' ' style={{backgroundColor: '#127b82'}}>
                  <FontAwesomeIcon icon={faAddressBook} color='#d2dcd7' className='ms-2 '/> 
                  <label className='text-center text-white'>Formulario de Email</label>
              </h4>
            </div>
            <div className='container'>
              <UtilizadorNovo/>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 px-0 py-0  mx-auto mt-2'>
              <div className='container  mt-5 mb-0'>
                <h4 className=' bg-secondary  '>
                  <FontAwesomeIcon icon={faClipboardList} color='#d2dcd7' className='mx-2'/> 
                  <label className='text-center text-white'>Lista de Emails</label></h4>
              </div>
            <div className='container '>
            <div className='border shadow-sm rounded' style={{maxHeight: '60vh', overflowY:'auto',backgroundColor: '#f5f5f5', color: '#222'}}>
              <Table responsive="sm" className='table table-hover mt-2' >
                <Thead style = {{position: 'sticky', top: 0, backgroundColor: '#f5f5f5', fontSize: 12}}>
                  <Tr>
                    <Th>CODIGO</Th>
                    <Th>USERNAME</Th>
                    <Th>DESCRIÇÃO</Th>
                  </Tr>
                </Thead>
                <Tbody style={{fontSize: 10}}>
                  {prev && prev.map((item,index)=>
                    <Tr key={index}>
                      <Td>User0{index++}1 </Td>
                      <Td>{item.username}</Td>
                      <Td>{item.descricao}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
          </div>
          </div>
          </div>
        </div>
        <ToastContainer/>
    </main>
    );
  }else{
    return <Navigate to={'/'} replace/>
  }
}
