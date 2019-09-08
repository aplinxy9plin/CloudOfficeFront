import React, { Component } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  Icon,
  NavLeft,
  NavRight,
  NavTitle,
  Link
} from "framework7-react";
import { Dialogs } from "@ionic-native/dialogs";

import moment from 'moment'

import Platform from "../../services/Platform";
import * as config from "../../config";

import Upload from './Upload'
import ChooseDoc from './ChooseDoc'
import DocViewer from './DocViewer'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: !localStorage.getItem("loaded")
    }
    
    this.platform = Platform;
    this.dialogs = Dialogs;

    this.uploaded = this.uploaded.bind(this);
    this.getMetadata = this.getMetadata.bind(this);
    this.openDoc = this.openDoc.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem("loaded")){
      this.getMetadata()
    }
    this.platform.registerBackButtonAction(event => {
      event.preventDefault();

      this.dialogs
        .confirm("Do you want to close the application ?", config.name, [
          "Close",
          "No"
        ])
        .then(index => {
          if (index === 1) {
            this.platform.exitApp();
          }
        });

      return false;
    }, 101);
  }

  uploaded(){
    this.setState({open: false})
    this.getMetadata()
  }

  getMetadata(cb){
    this.$f7.dialog.preloader()
    fetch(`http://localhost:1337/get_metadata?key=${localStorage.getItem("loaded")}`)
    .then(response => response.json())
    .then(data => {
      this.$f7.dialog.close()
      this.setState({
        metadata: data.reverse()
      })
      if(cb){
        cb(data.reverse()[0])
      }
    })
  }

  openDoc(e){
    console.log(e.displayName)
    fetch(`http://localhost:1337/?filename=${e.displayName}&key=${localStorage.getItem("loaded")}`)
    .then(response => response.text())
    .then(data => {
      console.log(data)
      this.setState({
        doc: data
      })
    })
  }

  openDoc1(e){
    fetch(`http://localhost:1337/qwe?num=${e.num}`)
    .then(response => response.text())
    .then(data => {
      console.log(data)
      this.setState({
        doc: data
      })
    })
  }

  close(event){
    window.location.reload()
    if(event === "save"){
      this.getMetadata(() => {
        fetch(`http://localhost:1337/?filename=${e.displayName}&key=${localStorage.getItem("loaded")}`)
        .then(response => response.text())
        .then(data => {
          console.log(data)
          this.setState({
            doc: data
          })
        })
      })
    }
  }
  
  render() {
    return (
      <Page>
        <Upload open={this.state.open} close={this.uploaded} />
        <Navbar>
          <NavTitle>{config.name}</NavTitle>
        </Navbar>
        <List 
          style={{
            width: "30%",
            position: "fixed",
            height: "90%",
            borderRight: "1px solid gainsboro",
            top: 33,
            overflowY: "none"
          }}
          mediaList
          >
          {
            this.state.metadata && this.state.metadata.map((item, i) => 
              <ListItem
                data-id={item.displayName}
                key={i}
                title={localStorage.getItem("loaded")+".html"}
                text={moment(item.fsContentChangeDate).format('MMMM Do YYYY, h:mm:ss a')}
                link
                onClick={() => this.openDoc(item)}
              />
            )
          }
        </List>
        {
          this.state.doc ? <DocViewer data={this.state.doc} close={this.close} /> : <ChooseDoc />
        }
      </Page>
    );
  }
}
