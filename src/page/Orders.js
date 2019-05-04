/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Container, Content, View, Left, Right, Button, Icon, Grid, Col} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Product from '../component/Product';
import OrderItem from '../component/OrderItem';
import OrderBlock from '../component/OrderBlock';
import {AsyncStorage} from "react-native";


export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: true,
            userId: ''
        };
    }

    componentDidMount() {
        this.getUserId();
    }

    async getUserId() {
        try {
            const value = await AsyncStorage.getItem('userId');
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
            this.setState({userId: value});
            console.log("userId : " + this.state.userId);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    componentWillMount() {
        global.WooCommerceAPI.get('orders', {
            orderby: 'date',
            customer: this.state.userId
        })
            .then(data => {
                // data will contain the body content from the request
                console.log("get data");
                console.log(data);
                this.setState({items: data, loading: false});
            })
            .catch(error => {
                // error will return any errors that occur
                console.log(error);
            });

        //this.setState({items: products});
    }

    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button onPress={() => this._sideMenuDrawer.open()} transparent>
                    <Icon name='ios-menu-outline'/>
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
            <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
                <Container style={{backgroundColor: '#fdfdfd'}}>
                    <Navbar left={left} right={right} title="Quản lý đơn hàng"/>
                    <Content padder>
                        {this.renderOrders()}
                    </Content>
                </Container>
            </SideMenuDrawer>
        );
    }


    renderOrders() {
        let items = [];
        let stateItems = this.state.items;
        for (var i = 0; i < stateItems.length; i++) {
            items.push(
                <Grid key={i}>
                    <OrderBlock key={stateItems[i].id} order={stateItems[i]}/>
                </Grid>
            );
        }
        return items;
    }
}
