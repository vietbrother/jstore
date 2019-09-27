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
    Text,
    View, Dimensions, UIManager
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
                <Button vertical
                        onPress={Actions[item.key]}
                        {this.state.selectTab == item.key ? '' : 'active'} >
                    <Icon name={item.icon}/>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                    }}>{item.title}</Text>
                </Button>
            );
        });
        return bottomMenus;
    }
    render() {
        return (
            <Footer>
                <FooterTab>
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
    }
};
