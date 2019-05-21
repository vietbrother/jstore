/**
 * This is the contact page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Container, View, Icon, Left, Button, Item, Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import Colors from '../Colors';
import Config from '../Config';
import {Linking} from "react-native";

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            subject: '',
            message: ''
        }
    }

    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button transparent onPress={() => Actions.pop()}>
                    <Icon name="ios-close" size={38} style={{fontSize: 38}}/>
                </Button>
            </Left>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} title="Liên hệ"/>
                <View style={{
                    flex: 1,
                    // justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 20,
                    // paddingLeft: 50,
                    // paddingRight: 50
                }}>
                    <Item>
                        <Icon active name='ios-call'/>
                        {/*<Text>Hotline : {Config.hotline}</Text>*/}
                        <Text>Hotline : <Text style={{
                            color: "#c0392b",
                            fontSize: 20,
                        }}>{Config.hotline}</Text></Text>
                    </Item>
                    <Item>
                        <Icon style={{fontSize: 18}} name='logo-facebook'
                              onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))}/>
                        <Text
                            onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))}>
                            Fanpage : http://www.facebook.com/onni</Text>
                    </Item>
                    {/*<Item>*/}
                    {/*<Icon active name='ios-person-outline'/>*/}
                    {/*<Input placeholder='Tên' onChangeText={(text) => this.setState({name: text})}/>*/}
                    {/*</Item>*/}
                    {/*<Item>*/}
                    {/*<Icon active name='ios-mail-outline'/>*/}
                    {/*<Input placeholder='Email' onChangeText={(text) => this.setState({email: text})}/>*/}
                    {/*</Item>*/}
                    {/*<Item>*/}
                    {/*<Icon active name='ios-filing-outline'/>*/}
                    {/*<Input placeholder='Tiêu đề' onChangeText={(text) => this.setState({subject: text})}/>*/}
                    {/*</Item>*/}
                    {/*<Item>*/}
                    {/*<Icon active name='ios-paper-outline' style={{marginTop: -20}}/>*/}
                    {/*<Input*/}
                    {/*placeholder='Nội dung'*/}
                    {/*multiline={true}*/}
                    {/*style={{height: 100, marginTop: -20}}*/}
                    {/*onChangeText={(text) => this.setState({message: text})}/>*/}
                    {/*</Item>*/}
                    {/*<View style={{alignItems: 'center'}}>*/}
                    {/*<Button onPress={() => this.send()}*/}
                    {/*style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20}}>*/}
                    {/*<Text style={{color: '#fdfdfd'}}> Gửi </Text>*/}
                    {/*</Button>*/}
                    {/*</View>*/}
                </View>
            </Container>
        );
    }

    send() {
        alert('Send email');
    }
}
