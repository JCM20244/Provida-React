
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form,Modal} from 'react-bootstrap'
import { Tbody, Table, Tr,Th, Thead,Td  } from 'react-super-responsive-table';

export default function ModalSearch({title,content, handleClose}) {
  const [search,setSearch] = useState('');
  const [results, setResults] = useState([]); 

 useEffect(() => {
    
  if (search){
    axios.put('https://api-provida.onrender.com/artigos_search/', {search: search}).then((response) => {
      if(response.data.message.length >0){
        setResults(response.data.message);
      }else{
        setResults([]);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }else{
    setResults([]); 
  }
},[search]);

  return (
    <Modal show={true} centered onHide={handleClose} >    
        <Modal.Header closeButton className='bg-light'>
            <Modal.Title >{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-light'>
            <Form.Control type="text" placeholder="escrever aqui" value = {search} onChange={(e)=>setSearch(e.target.value)}/>
          <div style={{maxHeight: '30vh', overflow:'auto'}}>
            <Table responsive ='sm' className='table table-hover'>
              <Thead style = {{position: 'sticky', top: 0, backgroundColor: '#f5f5f5', fontSize: 12}}>
                <Tr>
                  <Th>REF.</Th>
                  <Th>LOTE</Th>
                  <Th>DATA EXP.</Th>
                </Tr>
              </Thead>
              <Tbody style={{fontSize: 10}}>
                {Array.isArray(results) && results.map((item,index) => (
                  <Tr key={index} style={{cursor: 'pointer'}}>
                    <Td>{item.referencia}</Td>
                    <Td>{item.lote}</Td>
                    <Td>{item.expData}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </Modal.Body>
    </Modal>  
  );
}
