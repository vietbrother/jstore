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
import CategoryBlock from '../component/CategoryBlock';


export default class Homepage extends Component {
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

    getUserId() {
        try {
            var value = AsyncStorage.getItem('userId');
            console.log("Orders ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
            this.setState({userId: value});
            console.log("userId : " + this.state.userId);
            this.fetchAllCategory();
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    fetchAllCategory() {
        // global.WooCommerceAPI.get('orders', {
        //     orderby: 'date',
        //     // customer: this.state.userId
        //     customer: parseInt(this.state.userId)
        // })
        //     .then(data => {
        //         // data will contain the body content from the request
        //         console.log("get data");
        //         console.log(data);
        //         this.setState({items: data, loading: false});
        //     })
        //     .catch(error => {
        //         // error will return any errors that occur
        //         console.log(error);
        //     });

        global.WooCommerceAPI.get('products/categories', {})
            .then(data => {
                // data will contain the body content from the request
                console.log("get category");
                // console.log(data);
                this.setState({items: data, loading: false});

            })
            .catch(error => {
                // error will return any errors that occur
                console.log(error);
                this.setState({
                    error: error.toString(),
                    isLoading: false
                });
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
                <Container style={{backgroundColor: '#f3f9ff'}}>
                    <Navbar left={left} right={right} title="Trang chủ 2"/>
                    <Content>
                        {this.renderCategories(this.state.items)}
                    </Content>
                </Container>
            </SideMenuDrawer>
        );
    }


    renderCategories(categories) {
        let items = [];
        if (categories != null) {
            for (var i = 0; i < categories.length; i++) {
                items.push(
                    <CategoryBlock key={categories[i].id} id={categories[i].id}
                                   image={categories[i].image == null ? '' : categories[i].image.src}
                                   title={categories[i].name}/>
                );
            }
        }
        return items;
    }
}
