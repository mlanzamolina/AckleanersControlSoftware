import React, { Component } from 'react';
import "../../App.css";


export default class SingleImageUploadComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            flag: false
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            flag: true
        })
    }

    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }
    handleMandarReporte(){

    }

    render() {
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt='' />;
        }
        return (
            <form>
                <div className="img1">
                    {imgPreview}
                </div>

                <div className="form-group">
                    <input type="file" className="file-input" onChange={this.uploadSingleFile} hidden={this.state.flag}/>
                </div>
            </form >
        )
    }
}