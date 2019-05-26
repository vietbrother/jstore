/**
 * This is the Signup Page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {AsyncStorage, ScrollView} from 'react-native';
import {Container, View, Left, Right, Button, Icon, Item, Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Config from '../Config';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Profile extends Component {
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
            hasSuccess: false,
            successText: '',
            isLoading: false,
            cookie: ''
        };
    }

    componentWillMount() {
        //get the product with id of this.props.product.id from your server
        this.setState({product: this.props.product});
        AsyncStorage.getItem('userInfo', (err, res) => {
            console.log("userInfo " + JSON.parse(res));
            if (res) {

                var userInfo = JSON.parse(res);
                this.setState({name: userInfo.displayname});
                this.setState({username: userInfo.username});
                this.setState({email: userInfo.email});
                this.setState({password: userInfo.pass});
                this.setState({rePassword: userInfo.pass});
                //

            }
        });
        AsyncStorage.getItem('cookieUserFromApi', (err, res) => {
            if (res) {
                this.setState({cookie: res});
                //
            }
        });

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
                <Navbar left={left} right={right} title="Thông tin tài khoản"/>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.isLoading}
                    //Text with the Spinner
                    //textContent={'Đang cập nhật thông tin ...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{
                        flex: 1,
                        // justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 40,
                        paddingRight: 40
                    }}>
                        <View style={{marginTop: 10, marginBottom: 10, width: '100%'}}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                textAlign: 'left',
                                width: '100%',
                                color: Colors.navbarBackgroundColor
                            }}>Cập nhật thông tin tài khoản </Text>
                            <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#687373'}}> </Text>
                        </View>
                        <Item>
                            <Icon active name='ios-person' style={{color: '#00a0e5',}}/>
                            <Text style={{color: '#00a0e5',}}>{this.state.username}</Text>
                            {/*<Input placeholder='Tên đăng nhập' onChangeText={(text) => this.setState({username: text})}*/}
                            {/*placeholderTextColor="#687373"/>*/}
                        </Item>
                        <Item>
                            <Icon active name='ios-mail' style={{color: '#687373'}}/>
                            <Input placeholder='Email' onChangeText={(text) => this.setState({email: text})}
                                   value={this.state.email}
                                   keyboardType="email-address" placeholderTextColor="#687373"/>
                        </Item>
                        <Item>
                            <Icon active name='ios-contact' style={{color: '#687373'}}/>
                            <Input placeholder='Tên hiển thị' onChangeText={(text) => this.setState({name: text})}
                                   value={this.state.name}
                                   placeholderTextColor="#687373"/>
                        </Item>

                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}}/>
                            <Input placeholder='Mật khẩu' onChangeText={(text) => this.setState({password: text})}
                                   value={this.state.password}
                                   secureTextEntry={true} placeholderTextColor="#687373"/>
                        </Item>
                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}}/>
                            <Input placeholder='Nhập lại mật khẩu'
                                   value={this.state.rePassword}
                                   onChangeText={(text) => this.setState({rePassword: text})} secureTextEntry={true}
                                   placeholderTextColor="#687373"/>
                        </Item>
                        {this.state.hasError ? <Text style={{
                            color: "#c0392b",
                            textAlign: 'center',
                            marginTop: 10
                        }}>{this.state.errorText}</Text> : null}
                        {this.state.hasSuccess ? <Text style={{
                            color: "green",
                            textAlign: 'center',
                            marginTop: 10
                        }}>{this.state.successText}</Text> : null}
                        <View style={{alignItems: 'center', width: '100%',}}>
                            <Button onPress={() => this.updateProfile()}
                                    style={styles.buttonLogin}>
                                <Text style={{color: '#fdfdfd'}}> Cập nhật </Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    async updateProfile() {
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
            console.log(this.state.cookie);
            await fetch(Config.url + '/api/user/xprofile_update/?cookie=' + this.state.cookie
                + '&display_name=' + this.state.name
                + '&email=' + this.state.email
                + '&user_pass=' + this.state.password
                + '&insecure=cool&notify=both'
            )
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({isLoading: false});
                    if (responseJson.status == 'ok') {
                        this.setState({hasSuccess: true, successText: 'Cập nhật thành công'});
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

