import React, { Component } from 'react';
import './Preview.css';
import Modal from './modal';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }

        this.chooseFile = this.chooseFile.bind(this);
    }
    chooseFile(e) {
        this.setState({
            ...this.state,
            file: e.target.files[0] 
        })
    }
    render() {
        const { file } = this.state
        console.log('State main: ',this.state);
        return (
            <div className="container">
                <label className="fileContainer">
                    Click here to uploader!
                <input type="file" onChange={this.chooseFile} />
                </label>
                {
                    file &&
                    <Modal data={this.state.file} />
                }
            </div>
        )
    }
}

export default Preview;