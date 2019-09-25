/**
 * This is the navbar component
 * example of usage:
 *   var left = (<Left><Button transparent><Icon name='menu' /></Button></Left>);
 *   var right = (<Right><Button transparent><Icon name='menu' /></Button></Right>);
 *   <Navbar left={left} right={right} title="My Navbar" />
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Header, Body, Title, Left, Right, Icon} from 'native-base';

// Our custom files and classes import
import Colors from '../../Colors';

export default class Navbar extends Component {
    render() {
        return (
            /*<Header
              style={{backgroundColor: Colors.navbarBackgroundColor}}
              backgroundColor={Colors.navbarBackgroundColor}
              androidStatusBarColor={Colors.statusBarColor}
              noShadow={true}
              >      */
            <Header
                style={{backgroundColor: '#c40521'}}
                backgroundColor={'#c40521'}
                androidStatusBarColor={'#c40521'}
                noShadow={true}
            >
                {this.props.left ? this.props.left : <Left style={{flex: 1}}/>}
                <Body style={styles.body}>
                {this.props.center ? this.props.center
                    : <Title style={styles.title}>{this.props.title}</Title>}

                </Body>
                {this.props.right ? this.props.right : <Right style={{flex: 1}}/>}
            </Header>
        );
    }
}

const styles = {
    body: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '100'
    }
};
