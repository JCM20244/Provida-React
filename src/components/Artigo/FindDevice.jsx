import axios from 'axios';
import React, { useState } from 'react'
import { Alert,InputGroup,Form, Button, ListGroup} from 'react-bootstrap'

export default function FindDevice() {
    const [show,setShow] = useState(true);
    const [content,setContent] = useState('');
    const [device, setDevice]= useState([]);
    const [openDetails,setOpenDetails] = useState(false);
    const findHandler = ()=>{
        axios.get('https://app-htrec.vercel.app/find/'+content).then((res)=>{
            setDevice(res.data.message[0]);
            setOpenDetails(true);
        });
    }
    if(!show){
        document.getElementById('alert').style.display = 'none';
        window.location.reload(false);
    }
  return (
    <Alert variant='white' onClose={()=>setShow(false)} dismissible id='alert'>
        <div className='TitleForm fw-bold'>FIND REAGENT</div>
        <InputGroup size='sm' className='my-4'>
            <Form.Control  placeholder='search here' className='border-0 shadow-sm rounded-1' value={content} onChange={(e)=>setContent(e.target.value)} style={{backgroundColor: '#F5F5F5'}} />
            <Button variant='warning' className='fw-bold' onClick={findHandler}>Find</Button>
        </InputGroup>
        { openDetails&&(
            device && 
            <ListGroup>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>REF:</div>
                    <div>{device.ref}</div>
                </ListGroup.Item>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>LOT:</div>
                    <div>{device.lot}</div>
                </ListGroup.Item>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>NAME:</div>
                    <div>{device.nome}</div>
                </ListGroup.Item>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>EXPA.DATE:</div>
                    <div> {device.expdate}</div>
                </ListGroup.Item>
            </ListGroup>
            )}
        {openDetails ===true && device===null &&<div>No data selected</div>}
    </Alert>
  );
}
