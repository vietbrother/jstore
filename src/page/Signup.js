/**
 * This is the Signup Page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Container, View, Left, Right, Button, Icon, Item, Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            username: '',
            password: '',
            rePassword: '',
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
                {/*<Button onPress={() => Actions.search()} transparent>*/}
                {/*<Icon name='ios-search-outline'/>*/}
                {/*</Button>*/}
                {/*<Button onPress={() => Actions.cart()} transparent>*/}
                {/*<Icon name='ios-cart'/>*/}
                {/*</Button>*/}
            </Right>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} right={right} title="Đăng ký"/>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 50,
                        paddingRight: 50
                    }}>
                        <View style={{marginBottom: 35, width: '100%'}}>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                textAlign: 'left',
                                width: '100%',
                                color: Colors.navbarBackgroundColor
                            }}>Tạo mới tài khoản </Text>
                            <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#687373'}}> </Text>
                        </View>
                        <Item>
                            <Icon active name='ios-mail' style={{color: '#687373'}}/>
                            <Input placeholder='Email' onChangeText={(text) => this.setState({email: text})}
                                   keyboardType="email-address" placeholderTextColor="#687373"/>
                        </Item>
                        <Item>
                            <Icon active name='ios-man' style={{color: '#687373'}}/>
                            <Input placeholder='Tên hiển thị' onChangeText={(text) => this.setState({name: text})}
                                   placeholderTextColor="#687373"/>
                        </Item>
                        <Item>
                            <Icon active name='ios-person' style={{color: '#687373'}}/>
                            <Input placeholder='Tên đăng nhập' onChangeText={(text) => this.setState({username: text})}
                                   placeholderTextColor="#687373"/>
                        </Item>
                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}}/>
                            <Input placeholder='Mật khẩu' onChangeText={(text) => this.setState({password: text})}
                                   secureTextEntry={true} placeholderTextColor="#687373"/>
                        </Item>
                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}}/>
                            <Input placeholder='Nhập lại mật khẩu'
                                   onChangeText={(text) => this.setState({rePassword: text})} secureTextEntry={true}
                                   placeholderTextColor="#687373"/>
                        </Item>
                        {this.state.hasError ? <Text style={{
                            color: "#c0392b",
                            textAlign: 'center',
                            marginTop: 10
                        }}>{this.state.errorText}</Text> : null}
                        <View style={{alignItems: 'center'}}>
                            <Button onPress={() => this.signup()}
                                    style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20}}>
                                <Text style={{color: '#fdfdfd'}}> Đăng ký </Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    async signup() {
        if (this.state.email === "" || this.state.name === "" || this.state.username === "" || this.state.password === "" || this.state.rePassword === "") {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
            return;
        }
        if (!this.verifyEmail(this.state.email)) {
            this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
            return;
        }
        if (this.state.username.length < 3) {
            this.setState({hasError: true, errorText: 'Passwords must contains at least 3 characters !'});
            return;
        }
        if (this.state.password.length < 6) {
            this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
            return;
        }
        if (this.state.password !== this.state.rePassword) {
            this.setState({hasError: true, errorText: 'Passwords does not match !'});
            return;
        }
        this.setState({hasError: false});
        let nonceKey;
        try {
            await fetch('http://103.94.18.249/jstore/api/core/get_nonce/?insecure=cool&controller=user&method=register')
                .then((response) => response.json())
                .then((responseJson) => {
                    nonceKey = responseJson.nonce;
                    if (responseJson.status == 'ok') {
                        this.register(nonceKey);
                    } else {
                        this.setState({hasError: true, errorText: 'Không kết nối được máy chủ'});
                        return;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
        //Actions.home();
    }

    verifyEmail(email) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    async register(nonceKey) {
        try {
            await fetch('http://103.94.18.249/jstore/api/user/register/?username=' + this.state.username + '&display_name=' + this.state.name + '&email=' + this.state.email + '&user_pass=' + this.state.password + '&nonce=' + nonceKey + '&insecure=cool&notify=both')
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status == 'ok') {
                        Actions.home();
                    } else {
                        this.setState({hasError: true, errorText: 'Không kết nối được máy chủ'});
                        return;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }

}
