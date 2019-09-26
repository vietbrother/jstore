/**
 * This is the Home page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Container,
    Content,
    View,
    Button,
    Left,
    Right,
    Icon,
    Card,
    CardItem,
    cardBody,
    Row,
    Grid,
    Col
} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../../component/Text';
import Navbar from '../../component/new/Navbar';
import SideMenu from '../../component/SideMenu';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import CategoryBlock from '../../component/CategoryBlock';
import CategoryRootBlock from '../../component/CategoryRootBlock';
import Colors from "../../Colors";
import Config from "../../Config";
import Product from '../../component/Product';

import Banner from '../../component/home/Banner';
import AppLink from '../../component/home/AppLink';
import CategoriesList from '../../component/home/CategoriesList';
import ProductsSpecial from '../../component/home/ProductsSpecial';
import ProductsNew from '../../component/home/ProductsNew';
import ProductsList from '../../component/home/ProductsList';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            isLoading: true,
            error: null,
            sessionKey: null
        };
    }

    componentWillMount() {
        this.getSessionKey();
    }


    async getSessionKey() {
        try {
            const value = await AsyncStorage.getItem('cookieUserFromApi');
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
            this.setState({sessionKey: value});
            console.log("state : " + this.state.sessionKey);
            this._fetchCategorieData();
            this._fetchProductsData();
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    _fetchCategorieData() {
        //Have a try and catch block for catching errors.
        try {
            //this.getSessionKey();
            this.setState({isLoading: true});
            global.WooCommerceAPI.get('products/categories', {
                per_page: 100, status: 'processing', page: 1
            })
                .then(data => {
                    // data will contain the body content from the request
                    console.log("get category");
                    this.setState({categories: data, loading: false});
                })
                .catch(error => {
                    // error will return any errors that occur
                    console.log(error);
                    this.setState({
                        error: error.toString(),
                        isLoading: false
                    });
                });
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _fetchProductsData() {
        this.setState({loading: true});
        global.WooCommerceAPI.get('products', {
            featured: true
        })
            .then(data => {
                console.log("=============================Home Fetch API-----------------");
                // console.log(data);
                this.setState({products: data, loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

    render() {

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
        var center = (
            <TextInput
                style={{
                    // height: 40,
                    borderColor: "gray",
                    borderWidth: 0.5,
                    // marginTop: 8
                }}
                underlineColorAndroid="transparent"
                placeholder="Tìm kiếm sản phẩm..."
                onKeyPress={keyPress => console.log(keyPress)}
                onFocus={() => Actions.search()}
            />
        );
        const {categories, loading} = this.state;
        if (this.state.loading == false) {
            return (
                <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref} key={new Date().valueOf()}
                                fetchData={'1'}
                                sessionLoginKey={this.props.sessionLoginKey}>
                    <Container>
                        <Navbar center={center} right={right} title="ONNI"/>
                        <Content>
                            <Banner></Banner>
                            <AppLink></AppLink>
                            <CategoriesList></CategoriesList>
                            <ProductsSpecial></ProductsSpecial>
                            <ProductsNew></ProductsNew>
                            <ProductsList></ProductsList>
                        </Content>
                        <BottomMenu selectTab='home'></BottomMenu>
                    </Container>
                </SideMenuDrawer>);
        } else {
            return <ActivityIndicator/>
        }

    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    scrollContainer: {
        // height: 150,
        marginTop: 5,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 20
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginRight: 5,
        borderColor: '#dfe3ee',
        borderWidth: 0.5
    },

    line: {
        width: '47%',
        height: 3,
        backgroundColor: '#7f8c8d',
        position: 'absolute',
        bottom: '0%',
        marginLeft: 5
    },
    titleView: {
        flex: 1, width: '97%',
        backgroundColor: Config.mainColor,
        borderRadius: 5,
        borderWidth: 0.5,
        margin: 5,
    },
    title: {
        fontSize: 16, fontFamily: 'Roboto',
        fontWeight: '200',
        color: 'white',
        margin: 10,
    }
});

