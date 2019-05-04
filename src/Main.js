/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Home from './page/Home';
import Search from './page/Search';
import Cart from './page/Cart';
import WishList from './page/WishList';
import Map from './page/Map';
import Newsletter from './page/Newsletter';
import Contact from './page/Contact';
import Category from './page/Category';
import Product from './page/Product';
import ImageGallery from './page/ImageGallery';
import Login from './page/Login';
import Signup from './page/Signup';
import Checkout from './page/Checkout';

// import WooCommerceAPI from 'react-native-woocommerce-api';
import WooCommerceAPI from './WooCommerce/WooCommerceAPI';
import OrderItem from "./component/OrderItem";
import Orders from "./page/Orders";

export default class Main extends Component {

  constructor(){
    super();
    // global.WooCommerceAPI = new WooCommerceAPI({
    //   url: 'http://103.94.18.249/jstore', // Your store URL
    //   ssl: false,
    //   consumerKey: 'ck_155068b58dd6614b3ace920437df62399bb94503', // Your consumer secret
    //   consumerSecret: 'cs_9fb0b186ea0024bd6d9d497715e88e43b1bf2b6e', // Your consumer secret
    //   //consumerKey: 'ck_29b281d2af61df58dadbeead327b06dd9a53f1be', // Your consumer secret
    //   //consumerSecret: 'cs_a6d53b6572240d483749ee0123d48c76332c0e0d', // Your consumer secret
    //   wpAPI: true, // Enable the WP REST API integration
    //   version: 'wc/v3', // WooCommerce WP REST API version
    //   queryStringAuth: true
    // });
    global.WooCommerceAPI = new WooCommerceAPI({
      url: 'http://103.94.18.249/jstore', // Your store URL
      // ssl: false,
      consumerKey: 'ck_155068b58dd6614b3ace920437df62399bb94503', // Your consumer secret
      consumerSecret: 'cs_9fb0b186ea0024bd6d9d497715e88e43b1bf2b6e', // Your consumer secret
      //consumerKey: 'ck_29b281d2af61df58dadbeead327b06dd9a53f1be', // Your consumer secret
      //consumerSecret: 'cs_a6d53b6572240d483749ee0123d48c76332c0e0d', // Your consumer secret
      wpAPI: true, // Enable the WP REST API integration
      version: 'wc/v3', // WooCommerce WP REST API version
      queryStringAuth: true
    });
  }

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    console.disableYellowBox = true;
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="home" component={Home} hideNavBar />
            <Scene key="search" component={Search} modal hideNavBar />
            <Scene key="cart" component={Cart} modal hideNavBar />
            <Scene key="wishlist" component={WishList} modal hideNavBar />
            <Scene key="map" component={Map} modal hideNavBar />
            <Scene key="contact" component={Contact} modal hideNavBar />
            <Scene key="newsletter" component={Newsletter} modal hideNavBar />
            <Scene key="category" component={Category} hideNavBar />
            <Scene key="product" component={Product} hideNavBar />
            <Scene key="imageGallery" component={ImageGallery} modal hideNavBar />
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="signup" component={Signup} hideNavBar />
            <Scene key="checkout" component={Checkout} hideNavBar />
            <Scene key="orders" component={Orders} hideNavBar />
            <Scene key="orderItem" component={OrderItem} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }

}
