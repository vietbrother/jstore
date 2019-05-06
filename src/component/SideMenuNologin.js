/**
 * This is the SideMenu component used in the navbar
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {ScrollView, LayoutAnimation, UIManager, Linking, Image, AsyncStorage} from 'react-native';
import {View, List, ListItem, Body, Left, Right, Icon, Item, Input, Button, Grid, Col} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import SideMenuSecondLevel from './SideMenuSecondLevel';
import Text from './Text';
import Colors from "../Colors";

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchError: false,
            subMenu: false,
            subMenuItems: [],
            clickedItem: '',
            sessionKey: null,
        };

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentWillMount(){
        this.getSessionKey();
    }


    async getSessionKey() {
        try {
            const value = await AsyncStorage.getItem('cookieUserFromApi');
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
            this.setState({sessionKey: value});
            console.log("state : " + this.state.sessionKey);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderMenu()}
            </ScrollView>
        );
    }

    renderMenu() {
        if (!this.state.subMenu) {
            return (
                <View>
                    <View style={{marginTop: 15, marginBottom: 15, width: '100%', alignItems: 'center'}}>
                        <Image source={require('../images/logo.png')}/>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%',
                            color: Colors.navbarBackgroundColor
                        }}>J-STORE </Text>
                    </View>
                    <View style={{paddingRight: 15}}>
                        <List>
                            <ListItem
                                icon
                                key={0}
                                button={true}
                                onPress={() => Actions.home()}
                            >
                                <Body>
                                <Text>Trang chủ</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </View>
                    <View style={{paddingRight: 15}}>
                        <List>
                            {this.renderSecondaryListNologin()}
                        </List>
                    </View>
                    <View style={styles.line}/>
                    <View style={{paddingRight: 15, paddingLeft: 15}}>
                        <Text style={{marginBottom: 7}}>Follow us</Text>
                        <Grid>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-facebook'
                                                                      onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-instagram'
                                                                      onPress={() => Linking.openURL('http://www.instagram.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-twitter'
                                                                      onPress={() => Linking.openURL('http://www.twitter.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-youtube'
                                                                      onPress={() => Linking.openURL('http://www.youtube.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-snapchat'
                                                                      onPress={() => Linking.openURL('http://www.snapchat.com/').catch(err => console.error('An error occurred', err))}/></Col>
                        </Grid>
                    </View>
                </View>
            );
        } else {
            return (
                <SideMenuSecondLevel back={this.back.bind(this)} title={this.state.clickedItem}
                                     menu={this.state.subMenuItems}/>
            );
        }
    }

    renderMenuItems() {
        let items = [];
        menuItems.map((item, i) => {
            items.push(
                <ListItem
                    last={menuItems.length === i + 1}
                    icon
                    key={item.id}
                    button={true}
                    onPress={() => this.itemClicked(item)}
                >
                    <Body>
                    <Text>{item.title}</Text>
                    </Body>
                    <Right>
                        <Icon name="ios-arrow-forward"/>
                    </Right>
                </ListItem>
            );
        });
        return items;
    }

    itemClicked(item) {
        if (!item.subMenu || item.subMenu.length <= 0) {
            Actions.category({id: item.id, title: item.title});
            return;
        }
        var animationConfig = {
            duration: 150,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        };
        LayoutAnimation.configureNext(animationConfig);
        this.setState({subMenu: true, subMenuItems: item.subMenu, clickedItem: item.title});
    }

    back() {
        var animationConfig = {
            duration: 150,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        };
        LayoutAnimation.configureNext(animationConfig);
        this.setState({subMenu: false, subMenuItems: [], clickedItem: ''})
    }

    search(text) {
        if (this.state.search.length <= 2)
            this.setState({searchError: true, search: ""});
        else
            Actions.search({searchText: this.state.search});
    }

    renderSecondaryList() {
        let secondaryItems = [];

        menusSecondaryItems.map((item, i) => {
            secondaryItems.push(
                <ListItem
                    last
                    icon
                    key={item.id}
                    button={true}
                    onPress={Actions[item.key]}
                >
                    <Left>
                        <Icon style={{fontSize: 18}} name={item.icon}/>
                    </Left>
                    <Body style={{marginLeft: -15}}>
                    <Text style={{fontSize: 16}}>{item.title}</Text>
                    </Body>
                </ListItem>
            );
        });
        return secondaryItems;
    }

    renderSecondaryListNologin() {
        let secondaryItems = [];
        secondaryItems.push(
            <ListItem
                last
                icon
                button={true}
                onPress={Actions['login']}
            >
                <Left>
                    <Icon style={{fontSize: 18}} name={'ios-log-in'}/>
                </Left>
                <Body style={{marginLeft: -15}}>
                <Text style={{fontSize: 16}}>Đăng nhập</Text>
                </Body>
            </ListItem>
        );
        return secondaryItems;
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(189, 195, 199, 0.6)',
        marginTop: 10,
        marginBottom: 10
    }
};

var menuItems = [

    {
        id: 3,
        title: 'Rau củ quả'
    },
    {
        id: 4,
        title: 'Hải sản'
    }
];


const menusSecondaryItems = [
    {
        id: 20,
        title: 'Quản lý đơn hàng',
        icon: 'ios-basket',
        key: 'orders'
    },
    {
        id: 19,
        title: 'Danh sách yêu thích',
        icon: 'heart',
        key: 'wishlist'
    },
    // {
    //   id: 20,
    //   title: 'Địa chỉ cửa hàng',
    //   icon: 'ios-pin',
    //   key: 'map'
    // },
    {
        id: 21,
        title: 'Liên hệ',
        icon: 'md-phone-portrait',
        key: 'contact'
    },
    {
        id: 24,
        title: 'Đăng xuất',
        icon: 'ios-log-out',
        key: 'login'
    },

];
