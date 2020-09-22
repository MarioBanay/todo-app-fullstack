import React, { Component } from 'react'
import {  } from '@fortawesome/free-solid-svg-icons'

class FooterComponent extends Component {
  render() {
    return (
      <footer id='footer' className='bg-dark py-3 fixed-bottom'>
        <div className='row'>
          <div className='col text-center'>
            <span className='text-muted'>
              All Rights Reserved 2020 @Mario Banay
            </span>
          </div>
        </div>
      </footer>
    )
  }
}

export default FooterComponent
