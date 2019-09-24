/**
 * This is the Login Page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Container, View, Left, Right, Button, Icon, Item, Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Config from '../Config';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

import {StyleSheet, Image, AsyncStorage, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasError: false,
            errorText: '',
            isLoading: false
        };
    }

    componentWillMount() {
        this.removeSessionKey();
    }

    async removeSessionKey() {
        try {
            let userSessionKeyLogin = await AsyncStorage.getItem('cookieUserFromApi');
            if (userSessionKeyLogin !== null) {
                // We have data!!
                console.log(userSessionKeyLogin);
                await AsyncStorage.removeItem('cookieUserFromApi');
                await AsyncStorage.removeItem('userId');
                await AsyncStorage.removeItem('userInfo');
                console.log("remove session key");
            }
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    async setSessionKey() {
        try {
            await AsyncStorage.setItem('cookieUserFromApi', responseJson.cookie);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button onPress={() => Actions.home({sessionLoginKey: null})} transparent>
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
                <Navbar left={left} right={right} title="Đăng nhập"/>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.isLoading}
                    //Text with the Spinner
                    //textContent={'Đang đăng nhập ...'}
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
                        <View style={{marginBottom: 15, width: '100%', alignItems: 'center'}}>
                            <Image style={{height: 128, width: 128}} source={require('../images/logo_jstore.png')}/>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                textAlign: 'left',
                                width: '100%',
                                color: Colors.navbarBackgroundColor
                            }}>ONNI </Text>
                            <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#687373'}}>Thực
                                phẩm
                                sạch
                                Nhật Bản </Text>
                        </View>
                        <Item>
                            <Icon active name='ios-person' style={{color: "#687373"}}/>
                            <Input placeholder='Tên đăng nhập'
                                   onChangeText={(text) => this.setState({username: text})}
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
                                <Text style={{color: '#fdfdfd', fontSize: 14,}}> Đăng nhập </Text>
                            </Button>
                        </View>
                        {/*<View style={{alignItems: 'center', width: '100%'}}>*/}
                            {/*<Button onPress={() => Actions.signup()}*/}
                                    {/*style={styles.buttonLogin}>*/}
                                {/*<Text style={{color: '#fdfdfd', fontSize: 14}}> Đăng ký </Text>*/}
                            {/*</Button>*/}
                        {/*</View>*/}
                        <View style={{alignItems: 'center', width: '100%'}}>
                            <Button onPress={() => Actions.signup()}
                                    style={styles.buttonLogin}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Icon style={{color: 'white'}} name='ios-logo-facebook'/>
                                    <Text style={{color: '#fdfdfd', fontSize: 14}}> Đăng nhập bằng Facebook </Text>
                                </View>
                            </Button>
                        </View>

                        <TouchableOpacity
                            style={Styles.Common.ColumnCenter}
                            onPress={() => Actions.signup()}>
                            <Text style={styles.signUp}>
                                Chưa có tài khoản? <Text style={styles.highlight}>Đăng ký</Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

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
        let sessionLoginKey;
        if (user == null || user == '' || pass == '' || pass == '') {
            this.setState({hasError: true, errorText: 'Cần nhập tên đăng nhập và mật khẩu'});
            return;
        }
        try {
            this.setState({isLoading: true});
            await fetch(Config.url + '/api/user/generate_auth_cookie/?username=' + user + '&password=' + pass + '&insecure=cool')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    try {
                        this.setState({isLoading: false});
                        statusLogin = responseJson.status;
                        if (statusLogin == 'ok') {
                            sessionLoginKey = responseJson.cookie;
                            AsyncStorage.setItem('cookieUserFromApi', responseJson.cookie);
                            AsyncStorage.setItem('userId', responseJson.user.id.toString());
                            responseJson.user['pass'] = pass;
                            AsyncStorage.setItem('userInfo', JSON.stringify(responseJson.user));
                        }
                    } catch (error) {
                        // Error saving data
                        console.error(error);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            console.log(statusLogin);
        } catch (error) {
            console.error(error);
        }

        if (statusLogin == 'ok') {
            Actions.home({sessionLoginKey: sessionLoginKey});
        } else {
            this.setState({hasError: true, errorText: 'Tên đăng nhập hoặc mật khẩu không đúng'});
        }

    }


}

const styles = StyleSheet.create({
    buttonLogin: {
        backgroundColor: '#c40521',
        color: 'white',
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 14,
    },
    buttonLoginFb: {
        backgroundColor: '#2f55a4',
        color: 'white',
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 14,
    },
    buttonSignup: {
        backgroundColor: "transparent",
        color: "#bcbec1",
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        borderBottomColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white'
    },
    highlight: {
        fontWeight: 'bold',
        color: Colors.navbarBackgroundColor
    }
});
