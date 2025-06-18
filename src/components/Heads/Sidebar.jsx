// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min'
import React from 'react'
import { Navbar,Container} from 'react-bootstrap'
import { faCalendarDays, faCalendarXmark, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar() {
  return (
    <div>
        <Navbar className="ml-0">
            <Navbar.Brand href="/home" style={{color: '#222',fontSize: 20}}>
            <Container>
                <div><FontAwesomeIcon icon={faFolderPlus} fontSize={30} style={{color: '#222',}}/></div>
            </Container>
            <div style={{justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>New</div> 
            </Navbar.Brand>
        </Navbar>
      <Navbar className="">
        <Navbar.Brand href="/devices" style={{color: '#222',fontSize: 20}}>
        <Container>
            <div><FontAwesomeIcon icon={faCalendarDays} fontSize={30} style={{color: '#222',}}/></div>
        </Container>
            <div style={{justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>List</div> 
        </Navbar.Brand>
      </Navbar>
      <Navbar className="">
        <Navbar.Brand href="/outdate" style={{color: '#222',fontSize: 20}}>
        <Container>
            <div><FontAwesomeIcon icon={faCalendarXmark} fontSize={30} style={{color: '#222',}}/></div>
        </Container>
            <div style={{justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>Check</div> 
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}
