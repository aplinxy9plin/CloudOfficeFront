import React, { Component } from "react";
import { Menu, MenuItem } from "framework7-react";

import RegisterBackButtonAction from "../../services/RegisterBackButtonAction";

import WhoChange from './WhoChange'

export default class DocViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: null
    }
    this.save = this.save.bind(this)
    this.onFile = this.onFile.bind(this)
  }

  componentDidMount() {
    var self = this;
    setTimeout(() => {
      for (let i = 0; i < document.getElementsByClassName("empty").length; i++){
        document.getElementsByClassName("empty")[i].onclick = (e) => {
          self.setState({
            open: true
          })
        }
      }
      for(var i = 0; i < document.getElementsByTagName("img").length; i++){
        document.getElementsByTagName("img")[i].onclick = (e) => {
          self.setState({
            currentImg: e
          })
          self.inpImage.click();
        }
      }
    }, 1000);
    RegisterBackButtonAction(this.$f7router);
  }

  save(){
    if(localStorage.getItem("loaded")){
      this.$f7.dialog.preloader()
      fetch('http://localhost:1337/add_doc', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          html: this.text.innerHTML,
          key: localStorage.getItem("loaded")
        })
      })
      .then(response => response.json())
      .then(data => {
        this.$f7.dialog.close()
        console.log(data)
        this.props.close("save")
      })
    }
  }

  onFile(event){
    var reader = new FileReader();
    var self = this;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      var { currentImg } = self.state;
      currentImg.target.src = reader.result
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render() {
    return (
      <div style={{position: "absolute", top: 70, left: "33%", fontSize: "150%"}}>
        <Menu style={{position: "fixed", top: 63}}>
          <MenuItem href="#" text="Save" onClick={this.save} />
          <MenuItem href="#" text="Close" onClick={this.props.close} />
          <MenuItem href="#" text="Download" onClick={this.download} />
        </Menu>
        <div ref={text => this.text = text} style={{outline: "none"}} contentEditable dangerouslySetInnerHTML={{__html: this.props.data}} />
        <input 
            type="file" 
            style={{display: "none"}} 
            ref={inpImage => this.inpImage = inpImage} 
            onChange={this.onFile}
        />
        <WhoChange open={this.state.open} />
      </div>
    );
  }
}
