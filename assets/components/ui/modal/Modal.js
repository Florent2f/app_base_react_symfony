import React, { Component } from 'react';
import './Modal.scss'

class Modal extends Component {

    render () {
        return (
            <React.Fragment>
                <div
                    className='Modal'
                    style={{
                        transform: this.props.show ? 'translateY(-75px)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                        width: this.props.width,
                        left: this.props.left,
                        display: this.props.show ? 'block' : 'none'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}


export default Modal