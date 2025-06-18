import React from 'react'
import { Modal } from 'react-bootstrap'
// import Forms from './Forms'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from '@fortawesome/free-solid-svg-icons'
import EditDevice from './EditDevice'

export default function ModalForm(props) {
  return (
    <Modal {...props} size='md' aria-labelledby ="contained-modal-title-vcenter" centered style={{fontSize: 12}} >
      <Modal.Header id='contained-modal-title-vcenter' className='bg-secondary py-0 rounded-0 text-white'  closeButton>
        <h5 className='pt-1 '>Detalhes do Artigo</h5>
      </Modal.Header>
        <Modal.Body style={{backgroundColor: '#f7fafc'}}>
           <EditDevice details = {props.reagentDetails} btnvisible={props.showbtn}/>
        </Modal.Body>
    </Modal>
  )
}
