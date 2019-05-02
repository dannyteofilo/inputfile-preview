import React, { Component } from 'react';

import './modal.css'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base64: null
        }
        this.selectTypeMedia = this.selectTypeMedia.bind(this);
    }

    convertfile(file) {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result)
            }
            reader.readAsDataURL(file)
        })
    }
    selectTypeMedia(file) {
        let data = null
        const { base64 } = this.state;
        switch (file.type) {
            case 'image/jpeg':
                data = URL.createObjectURL(file)
                return <img className="modal-preview-img" src={data} alt="" />;
            case 'image/png':
                data = URL.createObjectURL(file)
                return <img className="modal-preview-img" src={data} alt="" />;
            case 'application/pdf':
                this.convertfile(file).then(result => {
                    this.setState({ base64: result })
                });
                return <embed src={base64} type="application/pdf" width="100%" height="600px" />
            default:
                return <div>Not supported</div>

        }
    }
    render() {
        const { file } = this.props;
        return (
            <div>
                <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Preview
                </button>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Modal Preview File</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    file &&
                                    this.selectTypeMedia(file)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;