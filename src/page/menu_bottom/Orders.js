/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {Container, Content, View, Left, Right, Button, Icon, Grid, Col, CardItem} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../../Colors';
import Text from '../../component/Text';
// import Navbar from '../../component/Navbar';
import SideMenu from '../../component/SideMenu';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Product from '../../component/Product';
import OrderItem from '../../component/OrderItem';
import OrderBlock from '../../component/OrderBlock';
import {AsyncStorage} from "react-native";
import BottomMenu from '../../component/menu/BottomMenu';
import Navbar from '../../component/menu/Navbar';


export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: true,
            userId: ''
        };
    }

    componentWillMount() {
        this.getUserId();
    }

    async getUserId() {
        try {
            const value = await AsyncStorage.getItem('userId');
            console.log("Orders ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
            this.setState({userId: value});
            console.log("userId : " + this.state.userId);
            if (this.state.userId != null && this.state.userId != '') {
                this.fetchOrderByUserId();
            }
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    fetchOrderByUserId() {
        this.setState({items: [], loading: true});
        global.WooCommerceAPI.get('orders', {
            orderby: 'date',
            // customer: this.state.userId
            customer: parseInt(this.state.userId)
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
                {/*<Button onPress={() => this._sideMenuDrawer.open()} transparent>*/}
                {/*<Icon name='ios-menu-outline'/>*/}
                {/*</Button>*/}
            </Left>
        );
        var right = (
            <Right style={{flex: 1}}>
                {/*<Button onPress={() => Actions.search()} transparent>*/}
                {/*<Icon name='ios-search-outline'/>*/}
                {/*</Button>*/}
                <Button onPress={() => Actions.cart()} transparent>
                    <Icon name='ios-cart'/>
                </Button>
            </Right>
        );

        return (
            <Container style={{backgroundColor: '#f3f9ff'}}>
                <Navbar left={left} right={right} title="Quản lý đơn hàng"/>
                <Content padder contentContainerStyle={{
                    backgroundColor: '#f3f9ff'
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: this.state.loading == true ? 'flex' : 'none'
                    }}>
                        <ActivityIndicator
                            animating={this.state.loading}
                            color='#bc2b78'
                            size="large"
                        />
                    </View>
                    {this.renderOrders()}
                </Content>
                <BottomMenu selectTab='orders'></BottomMenu>
            </Container>
        );
    }


    renderOrders() {
        if (this.state.userId == null || this.state.userId == '') {
            return (
                <Button style={styles.buttonLogin} onPress={() => Actions.login()}>
                    <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>
                        <Icon style={{fontSize: 18, color: 'white'}} name='md-log-in'/>
                        Đăng nhập</Text>
                </Button>
            );

        } else {
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