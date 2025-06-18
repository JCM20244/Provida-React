import React from 'react'
import HeadCollapse from '../Heads/HeadCollapse'
import Forms from '../Forms/Forms';
import { Navigate } from 'react-router-dom';

export default function ArtigoNovo() {
    const token  = localStorage.getItem('authToken');
    if(token){
    return (
     <main className='App mx-0 vh-100' style={{backgroundColor: '#e1e8f7', color: '#222'}}>
        <div className='row mx-0'>
            <div className='col-12 px-0 py-0'>
                <HeadCollapse/>
            </div>
        </div> 
        <div className='row mx-0'>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12">
                <div className="container mt-5 p-4 shadow-sm rounded" style={{backgroundColor: '#f5f5f5', color: '#222'}}>
                    <Forms/>
                </div>
            </div>
        </div>  
    </main>
  );
}else{
    return <Navigate to={'/'} replace/>
}
}
