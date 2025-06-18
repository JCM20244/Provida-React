
import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ReportedDetails(props) {
  const artigos = props.artigoDetails;
    return (
        <Modal {...props} size='sm' aria-labelledby ="contained-modal-title-vcenter" centered style={{fontSize: 12}} >
        <Modal.Header id='contained-modal-title-vcenter' className='bg-secondary py-0 rounded-0 text-white'  closeButton>
            <h5 className='pt-1 '>Detalhes do Artigo</h5>
        </Modal.Header>
            <Modal.Body style={{backgroundColor: '#f7fafc'}}>
              <div className='row'>
                <div className='col-12 justify-content-center '>
                    <div className='fw-bold'>Codigo</div>
                    <div>{artigos.artigo}</div>
                    <div className='fw-bold'>Descricao</div>
                    <div>{artigos.descricao}</div>
                    <div className='fw-bold'>Data Reportado</div>
                    <div >{artigos.dataRep}</div>
                    <div className='fw-bold'>NrReportado</div>
                    <div>{artigos.numRep}</div>
                </div>

              </div>
            </Modal.Body>
        </Modal>
  )
}