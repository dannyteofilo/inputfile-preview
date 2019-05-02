import React, { Component } from 'react';

import './modal.css'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file:null,
            base64: null
        }
        this.selectTypeMedia = this.selectTypeMedia.bind(this);
        this.verifyProps=this.verifyProps.bind(this);
    }

    // componentDidMount(){
    //     console.log('Recive props from didMount');
    //     const {data}=this.props
    //     if(data){
    //         this.setState({file:data})
    //     }
    // }

    // componentWillReceiveProps(){
    //     const {data}=this.props
    //     console.log('Recive props',data);
    //     if(data){
    //         this.setState({file:data})
    //     }
    // }

    convertFile(file) {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.onloadend = (event) => {
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
                return <object type="application/pdf" data={base64}  width="100%" height="600px" />
            default:
                return <div>Not supported</div>

        }
    }

    verifyProps(){
        console.log('Crificando props: ',this.props);
        const {data}=this.props;
        this.setState({file:data})
        if(data.type==='application/pdf'){

            this.convertFile(data).then(result => {
                console.log('Terminé la conversión');
                console.log('file: ',result)
                this.setState({ base64: result})
            });
        }
    }
    render() {
       const {file}=this.state
        return (
            <div>
                <button type="button" className="btn btn-outline-primary" onClick={this.verifyProps} data-toggle="modal" data-target="#exampleModalCenter">
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