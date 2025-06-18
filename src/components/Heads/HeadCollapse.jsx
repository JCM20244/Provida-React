import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {Nav,Navbar,Dropdown} from 'react-bootstrap'
import React,{useState} from 'react'
import "../../App.css"
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faBell,faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {Image} from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

export default function HeadCollapse (props) {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const {previlege, userID,token} = useAuth();

    const toggleSubnav = () => {
        if(showSubmenu) {
            setShowSubmenu(false);
        }else {
            setShowSubmenu(true);
        }
    };

    const closeSubmenu = () => {
        setShowSubmenu(false);
    };

    const logoutd = ()=>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        window.location.reload(false);
    };
    
    return (
        <main>
            <Navbar collapseOnSelect expand="lg" className="pt-0 pb-0 shadow-sm heads-nav"   >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white'  className=' border-0 shadow-sm'/>
                    <Navbar.Collapse id="responsive-navbar-nav " className='justify-content-start '>
                        <Nav className='fw-bold Links  py-2 ps-5' >
                            <Nav.Link href="/principal" className='Links'>Home</Nav.Link>
                            <Nav.Link  className='Links' onClick={toggleSubnav}>Artigo</Nav.Link> 
                            <Nav.Link href="/fornecedor" className='Links'> Fornecedor</Nav.Link>
                            <Nav.Link href="/agenda" className='Links'> Agenda</Nav.Link>
                            <Nav.Link href="/reportado" className='Links'> Reportado</Nav.Link>
                            {((previlege ==='Admin'&& userID==='9') && token)?<Nav.Link href="/emails" className='Links'> Email</Nav.Link>: <Nav.Link href="/emails" className='Links d-none'> Email</Nav.Link>}
                            <Nav.Link href="#" className='Links'>
                                <FontAwesomeIcon icon={faBell} /> 
                                <sup className='text-warning'>{props.badgeAgenda}</sup> 
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Brand className='mx-4 text-white py-1 d-flex' >
                        <Dropdown >
                        <Dropdown.Toggle variant='none' id='dropdown-drop-start' className='text-light fw-bold'>
                            Mais
                        </Dropdown.Toggle>
                        <Dropdown.Menu align={'end'} >
                            <Dropdown.ItemText>Centro Medico Provida</Dropdown.ItemText>
                            <Dropdown.Item onClick={logoutd}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    {/* <label className='logotitle'>Hospital Testing And Reagent Expiration Control Software</label>  */}
                        <Image src='logo.jpg' alt="Logo" className='logo rounded-circle' style={{ width: '35px', height: '35px' }} />
                    </Navbar.Brand>
                </Navbar>
            { showSubmenu && 
            <Navbar collapseOnSelect expand="lg" className="pt-0 pb-0 shadow-sm" style={{ backgroundColor: '#f1f5f8'}} >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white'  className=' border-0 shadow-sm'/>
                    <Navbar.Collapse id="responsive-navbar-nav " className='justify-content-start '>
                        <Nav className='fw-bold Links  py-2 ps-5' >
                            <Nav.Link href="/novoartigo" className='LinksSubNuv'>Novo</Nav.Link>
                            <Nav.Link href="/artigos" className='LinksSubNuv' >Listar</Nav.Link> 
                            <Nav.Link href="/categoria" className='LinksSubNuv'> Categoria</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                <Nav.Link href="#" className='mx-4 py-1 d-flex' onClick={closeSubmenu}>X</Nav.Link>
            </Navbar>
            }
        </main>
    );
  }
