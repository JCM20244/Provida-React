import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../../App.css';
import '../../home.css';
import HeadCollapse from '../Heads/HeadCollapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';
import { Navigate, useNavigate} from "react-router-dom";
export default function Dasbohard() {
  const token = localStorage.getItem('authToken');
  const navigator = useNavigate();
  
  const handdleToArtigo =()=>{
    navigator('/novoartigo');
  }

  const handdleToFornecedor =()=>{
    navigator('/fornecedor');
  }

 const handdleToAgenda =()=>{
   navigator('/agenda');
 }
  // Check if the user is authenticated
  if(!token){
    return (
      <main className="App d-flex flex-column min-vh-100" style={{height:'100vh', backgroundColor: '#e1e8f7'}} > 
        <div className='row mx-0'>
          <div className='col px-0 py-0'>
              <HeadCollapse />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xxs-12 py-0 px-0">
            <div className='container d-flex justify-content-center align-items-center flex-column min-vh-100'  >
              <div className='row mx-0 '>
                <div className='col px-0 '>
                  <div className="p-4 mt-2 text-dark text-center">
                    <h1>Software de Controle de Validade</h1>
                    <p>Reagentes e Teste Laboratorio Pro Vida </p> 
                  </div>
                </div>
              </div>
              <div className='row mx-0 '>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <div class="card text-light" style={{backgroundColor: '#002060'}} onClick={handdleToArtigo}>
                    <h2>Artigo</h2>
                    <p>Aceder menu Artigo para registar novo Artigo</p>
                    <div className='container justify-content-center align-items-end d-flex flex-column'>
                      <div className='bg-success  rounded-circle d-flex justify-content-center align-items-center' style={{width: 40, height: 40}}>
                        <FontAwesomeIcon icon={faCompressAlt} color='white'/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <div className="card" style={{backgroundColor: '#17a604', borderColor: '#17a604'}} onClick={handdleToFornecedor}>
                    <h2>Fornecedor</h2>
                    <p>Aceder menu Fornecedor para registar novo Forecedor.</p>
                    <div className='container justify-content-center align-items-end d-flex flex-column'>
                      <div className='bg-success  rounded-circle d-flex justify-content-center align-items-center' style={{width: 40, height: 40}}>
                        <FontAwesomeIcon icon={faCompressAlt} color='white'/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12' > 
                <div class="card text-light" style={{backgroundColor: '#002060'}} onClick={handdleToAgenda}>
                  <h2>Agenda</h2>
                  <p>Aceder menu Agenda para visualizar artigos vencidos ou agendados</p>
                  <div className='container justify-content-center align-items-end d-flex flex-column'>
                    <div className='bg-success  rounded-circle d-flex justify-content-center align-items-center' style={{width: 40, height: 40}}>
                      <FontAwesomeIcon icon={faCompressAlt} color='white'/>
                    </div>
                  </div>
                </div>
                </div>
              </div>   
            </div>
          </div>
        </div>
        <div className='row mx-0' style={{height: '100vh'}}>
          <div className='col px-0 py-0'>
            <Footer/>
          </div>
        </div>
      </main>
    );
  }else{
    return <Navigate to={'/'} replace/>;
  }
}
