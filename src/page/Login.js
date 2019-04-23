/**
 * This is the Login Page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Container, View, Left, Right, Button, Icon, Item, Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

import {StyleSheet, Image} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasError: false,
            errorText: ''
        };
    }


    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button onPress={() => Actions.pop()} transparent>
                    <Icon name='ios-arrow-back'/>
                </Button>
            </Left>
        );
        var right = (
            <Right style={{flex: 1}}>
                <Button onPress={() => Actions.search()} transparent>
                    <Icon name='ios-search-outline'/>
                </Button>
                <Button onPress={() => Actions.cart()} transparent>
                    <Icon name='ios-cart'/>
                </Button>
            </Right>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                {/*<Navbar left={left} right={right} title="Đăng nhập" />*/}
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 50,
                    paddingRight: 50
                }}>
                    <View style={{marginBottom: 15, width: '100%'}}>
                        <Image source={require('../images/logo.png')}/>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            textAlign: 'left',
                            width: '100%',
                            color: Colors.navbarBackgroundColor
                        }}>J-STORE </Text>
                        <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#687373'}}>Thực phẩm sạch Nhật Bản </Text>
                    </View>
                    <Item>
                        <Icon active name='ios-person' style={{color: "#687373"}}/>
                        <Input placeholder='Tên đăng nhập' onChangeText={(text) => this.setState({username: text})}
                               placeholderTextColor="#687373"/>
                    </Item>
                    <Item>
                        <Icon active name='ios-lock' style={{color: "#687373"}}/>
                        <Input placeholder='Mật khẩu' onChangeText={(text) => this.setState({password: text})}
                               secureTextEntry={true} placeholderTextColor="#687373"/>
                    </Item>
                    {this.state.hasError ? <Text style={{
                        color: "#c0392b",
                        textAlign: 'center',
                        marginTop: 10
                    }}>{this.state.errorText}</Text> : null}
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Button onPress={() => this.login()}
                                style={styles.buttonLogin}>
                            <Text style={{color: '#fdfdfd'}}> Đăng nhập </Text>
                        </Button>
                    </View>
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Button onPress={() => Actions.signup()}
                                style={styles.buttonLogin}>
                            <Text style={{color: '#fdfdfd'}}> Đăng ký </Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }

    async login() {
        /*
          Remove this code and replace it with your service
          Username: this.state.username
          Password: this.state.password
        */
        var user = this.state.username;
        var pass = this.state.password;
        let statusLogin;
        try {
            await fetch('http://103.94.18.249/jstore/api/user/generate_auth_cookie/?username=' + user + '&password=' + pass + '&insecure=cool')
                .then((response) => response.json())
                .then((responseJson) => {
                    statusLogin = responseJson.status;
                })
                .catch((error) => {
                    console.error(error);
                });
            console.log(statusLogin);
        } catch (error) {
            console.error(error);
        }

        if (statusLogin == 'ok') {
            Actions.home();
        } else {
            this.setState({hasError: true, errorText: 'Tên đăng nhập hoặc mật khẩu không đúng'});
        }

    }


}

const styles = StyleSheet.create({
    buttonLogin: {
        backgroundColor: Colors.navbarBackgroundColor,
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10
    }
});
