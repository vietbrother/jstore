/**
 * This is the navbar component
 * example of usage:
 *   var left = (<Left><Button transparent><Icon name='menu' /></Button></Left>);
 *   var right = (<Right><Button transparent><Icon name='menu' /></Button></Right>);
 *   <Navbar left={left} right={right} title="My Navbar" />
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Header, Body, Title, Left, Right, Footer, FooterTab, Button, Icon, Text, ListItem} from 'native-base';

// Our custom files and classes import
import Colors from '../../Colors';
import Config from '../../Config';

import {
    AppRegistry,
    StyleSheet,
    View, Dimensions, UIManager, TouchableOpacity
} from 'react-native';
import {Actions} from "react-native-router-flux";

const deviceW = Dimensions.get('window').width;
const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx;
}

export default class BottomMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectTab: "",
        };

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentDidMount(): void {
        this.setState({selectTab: this.props.selectTab})
    }

    renderMenu() {
        let bottomMenus = [];

        menus.map((item, i) => {
            bottomMenus.push(
                <TouchableOpacity
                    style={styles.menu}
                    onPress={Actions[item.key]}>
                    <Icon style={this.state.selectTab == item.key ? styles.activeIcon : styles.inactiveIcon}
                          name={item.icon}/>
                    <Text style={this.state.selectTab == item.key ? styles.active : styles.inactive}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            );
        });
        return bottomMenus;
    }

    render() {
        return (
            <Footer style={{
                backgroundColor: 'white'
            }}>
                <FooterTab style={{backgroundColor: 'white', borderTop: 1, borderTopColor: 'grey', marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5}}>
                    {this.renderMenu()}
                    {/*<Button vertical {this.state.selectTab == 'home' ? '' : 'active'} >*/}
                    {/*<Icon name="home"/>*/}
                    {/*<Text>Trang chủ</Text>*/}
                    {/*</Button>*/}
                    {/*<Button vertical {this.state.selectTab == 'categories' ? '' : 'active'} >*/}
                    {/*<Icon name="apps"/>*/}
                    {/*<Text>Danh mục</Text>*/}
                    {/*</Button>*/}
                    {/*<Button vertical {this.state.selectTab == 'orders' ? '' : 'active'} >*/}
                    {/*<Icon name="camera"/>*/}
                    {/*<Text>Đơn hàng</Text>*/}
                    {/*</Button>*/}
                    {/*<Button vertical {this.state.selectTab == 'wishlist' ? '' : 'active'} >*/}
                    {/*<Icon active name="heart"/>*/}
                    {/*<Text>Yêu thích</Text>*/}
                    {/*</Button>*/}
                    {/*<Button vertical {this.state.selectTab == 'profile' ? '' : 'active'} >>*/}
                    {/*<Icon name="person"/>*/}
                    {/*<Text>Contact</Text>*/}
                    {/*</Button>*/}
                </FooterTab>
            </Footer>
        );
    }
}

const menus = [
    {
        id: 1,
        title: 'Trang chủ',
        icon: 'home',
        key: 'home'
    },
    {
        id: 2,
        title: 'Danh mục',
        icon: 'apps',
        key: 'categories'
    },
    {
        id: 3,
        title: 'Đơn hàng',
        icon: 'ios-basket',
        key: 'orders'
    },
    {
        id: 4,
        title: 'Yêu thích',
        icon: 'heart',
        key: 'wishlist'
    },
    {
        id: 5,
        title: 'Cá nhân',
        icon: 'ios-contact',
        key: 'profile'
    },

];

const styles = {
    body: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '100'
    },
    iconStyle: {
        fontSize: 18
    },
    menu: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        color: Config.mainColor,
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14
    },
    inactive: {
        color: 'grey',
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14
    },
    activeIcon: {
        color: Config.mainColor,
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // fontSize: 18
    },
    inactiveIcon: {
        color: 'grey',
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // fontSize: 14
    }
};
