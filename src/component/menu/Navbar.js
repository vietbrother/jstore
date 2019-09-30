/**
 * This is the navbar component
 * example of usage:
 *   var left = (<Left><Button transparent><Icon name='menu' /></Button></Left>);
 *   var right = (<Right><Button transparent><Icon name='menu' /></Button></Right>);
 *   <Navbar left={left} right={right} title="My Navbar" />
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Header, Body, Title, Left, Right, Icon, Item, Input, Button} from 'native-base';

// Our custom files and classes import
import Colors from '../../Colors';
import {Actions} from "react-native-router-flux";

export default class Navbar extends Component {
    render() {
        if (this.props.center == null || this.props.center == undefined) {
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
                    <Title style={styles.title}>{this.props.title}</Title>
                    </Body>
                    {this.props.right ? this.props.right : <Right style={{flex: 1}}/>}
                </Header>
            );
        } else {
            return (
                <Header
                    rounded
                    style={{backgroundColor: '#c40521'}}
                    backgroundColor={'#c40521'}
                    androidStatusBarColor={'#c40521'}
                    noShadow={true}
                >
                    <Item style={styles.textBox}>
                        <Input
                            style={{}}
                            underlineColorAndroid="transparent"
                            placeholder="Tìm kiếm sản phẩm..."
                            onKeyPress={keyPress => console.log(keyPress)}
                            onFocus={() => Actions.search()}
                        />
                        {/*<Icon name="ios-search" onPress={() => this.search(this.state.searchText)}/>*/}
                    </Item>
                    <Right style={{flex: 1}}>
                        <Button onPress={() => Actions.search()} transparent>
                            <Icon name='ios-search-outline'/>
                        </Button>
                        <Button onPress={() => Actions.cart()} transparent>
                            <Icon name='ios-cart'/>
                        </Button>
                    </Right>
                </Header>
            );
        }

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
        fontWeight: '100',
    },
    textBox: {
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
        width: '75%',
        backgroundColor: 'white'
    }
};
