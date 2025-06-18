import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Image } from 'react-bootstrap'

export default class Header extends Component {
  render() {
    return (
      <div>
          <div className='row  shadow-sm bg-white'>
            <div className='col-12'>
              <header className="App-header mx-0 ">
                <div>
                    <Image src='../logo.jpg' rounded width={80} height={80}/>
                </div>
                <ul className='nav d-flex float-end'>
                  <li>Dasbohard</li>
                  <li>Devices</li>
                  <li>Controle</li>
                  <li>Diagnose</li>
                </ul>
              </header>
            </div>
          </div>
        </div>
    )
  }
}
