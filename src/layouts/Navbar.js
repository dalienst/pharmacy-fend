import React, { Component } from 'react';
import {FaAlignRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import logo from '../images/logo.jpeg'

export default class Navbar extends Component {

    state={
        isOpen:false
    };
    handleToggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    }

  render() {
    return (
      <nav className='navbar'>
        <div className='nav-center'>
            <div className='nav-header'>
                <Link to="/">
                    <h4>Med Center</h4>
                    {/* <img src={logo} alt="Orange Resort"/> */}
                </Link>

                <button type='button' className='nav-btn'
                    onClick={this.handleToggle}
                >
                    <FaAlignRight className='nav-icon'/>
                </button>
            </div>

            <ul className={this.state.isOpen?"nav-links show-nav": "nav-links"}>
                <li>
                    <Link to="/login">login</Link>
                </li>
                <li>
                    <Link to="/register">Sign up</Link>
                </li>
            </ul>


        </div>
      </nav>
    )
  }
}
