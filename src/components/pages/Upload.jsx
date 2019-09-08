import React from 'react'
import { Popup, Page, Block} from 'framework7-react'

import upload_icon from '../../assets/img/file.png'
import '../../styles/bundle.scss';

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.chooseFile = this.chooseFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }
    chooseFile(){
        this.inp.click();
    }
    uploadFile(){  
        this.$f7.dialog.preloader()
        var formData = new FormData();
        formData.append("test", 123)
        for (const file of this.inp.files) {
            console.log(file, file.name)
            formData.append('docs[]', file, file.name);
        }
        const options = {
          method: 'POST',
          body: formData,
        //   headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
        };
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }         
        console.log(options)
        var id = makeid(5);
        fetch('http://localhost:1337/upload?key='+id, options)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("loaded", id)
            this.props.close()
            this.$f7.dialog.close()
            window.location.reload()
            console.log(data)
        })      
    }
    render(){
        return(
            <Popup className="demo-popup" opened={this.props.open}>
              <Page>
                <center>
                    <div className="uploadFile">
                        <a onClick={this.chooseFile}>
                            <img src={upload_icon} width="25%" />
                            <br />
                            Upload files
                        </a>
                    </div>
                    <div className="uploadInfo">
                        <p>We know about only html files...</p>
                    </div>
                </center>
                <input 
                    type="file" 
                    style={{display: "none"}} 
                    ref={input => this.inp = input} 
                    onChange={this.uploadFile}
                    multiple
                    name="docs"
                />
              </Page>
            </Popup>
        )
    }
}

export default Upload;