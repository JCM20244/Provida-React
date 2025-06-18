import React from 'react'
import {Route, Routes } from 'react-router-dom';
import Dasbohard from './components/Dasboard/Dasbohard';
import Artigo from './components/Artigo/Artigo';
import LoginComp from './components/Usuario/LoginComp';
import Fornecedor from './components/Fornecedor/Fornecedor';
import Categoria from './components/Artigo/Categoria';
import Email from './components/Usuario/Email';
import ArtigoNovo from './components/Artigo/ArtigoNovo';
import Agenda from './components/Forms/Agenda';
import { AuthProvider} from './context/AuthContext';
import ArtigoReportado from './components/Artigo/ArtigoReportado';
function App() {
    return (
      <AuthProvider>
         <Routes>
          <Route path='/' element={<LoginComp/>}/>
          <Route path='/principal'  element={<Dasbohard/> }/>
          <Route path='/artigos'  element={<Artigo/>} />
          <Route path='/novoartigo'  element={<ArtigoNovo/>} />
          <Route path='/agenda' element={<Agenda/>}/>
          <Route path='/fornecedor' element={<Fornecedor/>}/>
          <Route path='/categoria' element={<Categoria/>}/>
          <Route path='/emails' element={<Email/>} />
          <Route path='/reportado' element={<ArtigoReportado/>} />
        </Routes>
      </AuthProvider>
  );
}
export default App;
