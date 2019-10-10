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

import {
    StyleSheet,
    Image,
    AsyncStorage,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager} from 'react-native-fbsdk';


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
        this.getFbSessionKey();
    }

    async getFbSessionKey() {
        try {
            const value = await AsyncStorage.getItem('_fbAccessToken');
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
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
                await AsyncStorage.removeItem('cookie');
                await AsyncStorage.removeItem('_fbAccessToken');
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
                            <Button onPress={() => this.facebookLogin()}
                                    style={styles.buttonLoginFb}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Icon style={{color: 'white'}} name='logo-facebook'/>
                                    <Text style={{color: '#fdfdfd', fontSize: 14, marginLeft: 5}}> Đăng nhập bằng
                                        Facebook </Text>
                                </View>
                            </Button>
                            {/*<LoginButton*/}

                            {/*readPermissions={['public_profile']}*/}
                            {/*onLoginFinished={(error, result) => {*/}
                            {/*alert('123');*/}
                            {/*if (error) {*/}
                            {/*console.log(error.message);*/}
                            {/*console.log('login has error: ' + result.error);*/}
                            {/*} else if (result.isCancelled) {*/}
                            {/*console.log('login is cancelled.');*/}
                            {/*} else {*/}
                            {/*alert("Login was successful with permissions: " + result.grantedPermissions);*/}
                            {/*AccessToken.getCurrentAccessToken().then(data => {*/}
                            {/*console.log(data.accessToken.toString());*/}
                            {/*this._fbSaveAccessToken(data.accessToken.toString());*/}
                            {/*const processRequest = new GraphRequest(*/}
                            {/*'/me?fields=name,picture.type(large)',*/}
                            {/*null,*/}
                            {/*this._fbGetResponseInfo.bind()*/}
                            {/*);*/}
                            {/*// Start the graph request.*/}
                            {/*new GraphRequestManager().addRequest(processRequest).start();*/}

                            {/*});*/}
                            {/*}*/}
                            {/*}}*/}
                            {/*onLogoutFinished={this._fbLogOut.bind()}*/}
                            {/*/>*/}
                        </View>

                        <TouchableOpacity
                            style={{flex: 1, justifyContent: 'center'}}
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

        if (user == null || user == '' || pass == '' || pass == '') {
            this.setState({hasError: true, errorText: 'Cần nhập tên đăng nhập và mật khẩu'});
            return;
        }
        this.callApiLogin(user, pass);
    }

    async callApiLogin(user, pass){
        let statusLogin;
        let sessionLoginKey;
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


    async _fbGetResponseInfo(error, result) {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log(result);
            this.setState({user_name: 'Welcome' + ' ' + result.name});
            this.setState({avatar_url: result.picture.data.url});
            this.setState({avatar_show: true});
            try {
                await AsyncStorage.setItem('_fbName', result.name);
                await AsyncStorage.setItem('_fbAvatar', result.picture.data.url);
            } catch (error) {
                // Handle errors here
                console.error(error);
            }
        }
    }

    async fetchProfile(token) {
        return new Promise((resolve, reject) => {
            const request = new GraphRequest(
                '/me',
                {
                    accessToken: token,
                    parameters: {
                        fields: {
                            string: 'email,name,first_name,middle_name,last_name, picture'
                        }
                    }
                },
                (error, result) => {
                    if (error) {
                        alert('Error fetching data: ' + error.toString());
                    } else {
                        console.log(result);
                        try {
                            this.setState({user_name: 'Welcome' + ' ' + result.name});
                            this.setState({avatar_url: result.picture.data.url});
                            this.setState({avatar_show: true});
                            AsyncStorage.setItem('_fbName', result.name);
                            AsyncStorage.setItem('_fbAvatar', result.picture.data.url);
                        } catch (error) {
                            // Handle errors here
                            console.error(error);
                        }
                    }
                }
            )

            new GraphRequestManager().addRequest(request).start()
        })
    }

    async facebookLogin() {
        const _this = this;
        try {
            // Attempt a login using the Facebook login dialog,
            // asking for default permissions.
            LoginManager.logInWithPermissions(['public_profile']).then(
                function (result) {
                    if (result.isCancelled) {
                        alert('Đăng nhập đã bị hủy bỏ');
                    } else {
                        // alert('Login was successful with permissions: '
                        //     + result.grantedPermissions.toString());
                        console.log('Login was successful with permissions: '
                            + result.grantedPermissions.toString());

                        AccessToken.getCurrentAccessToken().then(data => {
                            var token = data.accessToken.toString();
                            console.log(token);
                            AsyncStorage.setItem('_fbAccessToken', token);
                            // var infoRequest = new GraphRequest(
                            //     '/me',
                            //     {
                            //         accessToken: token,
                            //         parameters: {
                            //             fields: {
                            //                 string: 'email,name,first_name,middle_name,last_name, picture'
                            //             }
                            //         }
                            //     },
                            //     _this._fbGetResponseInfo
                            // );
                            //
                            // // Start the graph request.
                            // new GraphRequestManager().addRequest(infoRequest).start();

                            // _this.fetchProfile(token);
                            var key = new Date().getTime();
                            var username = '_fb_user_' + key;
                            var name = username;
                            var email = '_fb_user_' + key + '@facebook.com';
                            var password = username;
                            var fb_signup_info = {};
                            fb_signup_info['username'] = username;
                            fb_signup_info['name'] = name;
                            fb_signup_info['password'] = password;
                            fb_signup_info['email'] = email;
                            AsyncStorage.setItem('_fbSignUpInfo', JSON.stringify(fb_signup_info));
                            _this.signup(username, name, email, password);
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                },
                function (error) {
                    alert('Login failed with error: ' + error);
                }
            );

            // // get the access token
            // const data = await AccessToken.getCurrentAccessToken();
            //


        } catch (e) {
            console.error(e);
        }
    }


    _fbLogOut() {
        console.log("Log out");
        alert("Log out");
    }

    async _fbSaveAccessToken(token) {
        try {
            await AsyncStorage.setItem('_fbAccessToken', token);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }


    async signup(username, name, email, password) {
        let nonceKey;
        try {
            this.setState({isLoading: true});
            await fetch('http://103.94.18.249/jstore/api/core/get_nonce/?insecure=cool&controller=user&method=register')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    nonceKey = responseJson.nonce;
                    if (responseJson.status == 'ok') {
                        this.register(nonceKey, username, name, email, password);
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
    }

    async register(nonceKey, username, name, email, password) {
        try {
            console.log(username);
            console.log(name);
            console.log(email);
            console.log(password);
            await fetch(Config.url + '/api/user/register/?username=' + username + '&display_name='
                + name + '&email=' + email + '&user_pass='
                + password + '&nonce=' + nonceKey + '&insecure=cool&notify=both')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({isLoading: false});
                    if (responseJson.status == 'ok') {
                        this.callApiLogin(username, password);
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
