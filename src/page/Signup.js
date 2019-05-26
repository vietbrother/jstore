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
import Config from '../Config';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

import Spinner from 'react-native-loading-spinner-overlay';

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
            errorText: '',
            isLoading: false
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
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.isLoading}
                    //Text with the Spinner
                    //textContent={'Đang đăng ký ...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 50,
                        paddingRight: 50
                    }}>
                        <View style={{marginTop: 10, marginBottom: 10, width: '100%'}}>
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
                            <Icon active name='ios-contact' style={{color: '#687373'}}/>
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
                        <View style={{alignItems: 'center', width: '100%',}}>
                            <Button onPress={() => this.signup()}
                                    style={styles.buttonLogin}>
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
            this.setState({hasError: true, errorText: 'Cần nhập đủ các trường thông tin !'});
            return;
        }
        if (!this.verifyEmail(this.state.email)) {
            this.setState({hasError: true, errorText: 'Chưa đúng địa chỉ email !'});
            return;
        }
        if (this.state.username.length < 3) {
            this.setState({hasError: true, errorText: 'Tên đăng nhập cần ít nhất 3 ký tự !'});
            return;
        }
        if (this.state.password.length < 6) {
            this.setState({hasError: true, errorText: 'Mật khẩu cần ít nhất 6 ký tự !'});
            return;
        }
        if (this.state.password !== this.state.rePassword) {
            this.setState({hasError: true, errorText: 'Mật khẩu nhập không khớp !'});
            return;
        }
        this.setState({hasError: false});
        let nonceKey;
        try {
            this.setState({isLoading: true});
            await fetch('http://103.94.18.249/jstore/api/core/get_nonce/?insecure=cool&controller=user&method=register')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    nonceKey = responseJson.nonce;
                    if (responseJson.status == 'ok') {
                        this.register(nonceKey);
                    } else {
                        this.setState({hasError: true, errorText: 'Có lỗi xảy ra xin thử lại sau'});
                        return;
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({hasError: true, errorText: 'Có lỗi xảy ra xin thử lại sau'});
                    return;
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
            await fetch(Config.url + '/api/user/register/?username=' + this.state.username + '&display_name='
                + this.state.name + '&email=' + this.state.email + '&user_pass='
                + this.state.password + '&nonce=' + nonceKey + '&insecure=cool&notify=both')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({isLoading: false});
                    if (responseJson.status == 'ok') {
                        Actions.home();
                    } else {
                        this.setState({hasError: true, errorText: 'Có lỗi xảy ra : ' + responseJson.error});
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
const styles = {
    spinnerTextStyle: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonLogin: {
        backgroundColor: '#c40521',
        color: 'white',
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 14,
    },
};

