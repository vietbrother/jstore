/**
* This is the Side Menu Drawer Component
**/

// React native and others libraries imports
import React, { Component } from 'react';
import {AsyncStorage, Keyboard} from 'react-native';
import Drawer from 'react-native-drawer';


// Our custom files and classes import
import SideMenu from './SideMenu';


export default class SideMenuDrawer extends Component {
  render() {
    return(
      this._renderMainContent()
    );
  }
  _renderMainContent(){
    console.log("render SideMenuDrawer - " + this.props.sessionLoginKey);
    return(
        <Drawer
            ref={(ref) => this._drawer = ref}
            content={this._renderSideMenu()}
            tapToClose={true}
            type="overlay"
            openDrawerOffset={0.3}
            onCloseStart={() => Keyboard.dismiss()}
        >
          {this.props.children}
        </Drawer>
    );
  }
  _renderSideMenu(){
    console.log("render SideMenu in SideMenuDrawer");
    return (<SideMenu sessionLoginKey={this.props.sessionLoginKey} fetchData={this.props.fetchData} />);
  }

  close() {
    this._drawer.close();
  }

  open() {
    this._drawer.open();
  }

}
