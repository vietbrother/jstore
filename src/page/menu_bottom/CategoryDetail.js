/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {Container, Content, View, Left, Right, Button, Icon, Grid, Col} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../../Colors';
import Text from '../../component/Text';
import Navbar from '../../component/Navbar';
import SideMenu from '../../component/SideMenu';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Product from '../../component/Product';

import Api from "../../WooCommerce/Api";
import BottomMenu from "../../component/menu/BottomMenu";

export default class CategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            isReload: false
        };
    }

    componentWillMount() {
        var products = [];
        global.WooCommerceAPI.get('products', {
            per_page: 30,
            //page: 1,
            category: this.props.id
        })
            .then(data => {
                console.log("==================================== this.props.id : " + this.props.id);
                console.log("componentWillMount Category API-----------------");
                // console.log(data);
                this.setState({items: data, loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

    fetchDataToList(id) {
        this.setState({items: [], loading: true});
        global.WooCommerceAPI.get('products', {
            //per_page: 20,
            //page: 1,
            category: id
        })
            .then(data => {
                console.log("Category Fetch API-----------------");
                console.log(data);
                this.setState({items: data, loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

    componentWillUpdate() {
        // setTimeout(() => {
        //     // this.setState({items: [], loading: true});
        //     this.fetchDataToList();
        // }, 1000);
        // if (this.props.data != null) {
        //     this.setState({items: this.props.data, loading: false});
        // }
    }

    componentWillReceiveProps(nextProps) {
        console.log("====componentWillReceiveProps========================== newProps.field: " + nextProps.id);
        this.fetchDataToList(nextProps.id);
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
                <Button onPress={() => Actions.search()} transparent>
                    <Icon name='ios-search-outline'/>
                </Button>
                <Button onPress={() => Actions.cart()} transparent>
                    <Icon name='ios-cart'/>
                </Button>
            </Right>
        );

        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} right={right} title={this.props.title}/>
                <Content padder>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        //display: this.state.loading == true ? 'flex' : 'none'
                    }}>
                        <ActivityIndicator
                            animating={this.state.loading}
                            color='#bc2b78'
                            size="large"
                        />
                    </View>
                    {this.renderProducts()}
                </Content>
                <BottomMenu selectTab='categories'></BottomMenu>
            </Container>
        );
    }

    // componentWillReceiveProps(){
    //     this.setState({items: [], loading: true});
    //     console.log("this.props.id " + this.props.id)
    //     this.fetchDataToList();
    // }
    renderProducts() {
        let items = [];
        if (this.props.isReload == '1' && this.state.isReload == false) {
            console.log("======================Reload");
            this.setState({isReload: true});
            this.fetchDataToList();
        }
        if (this.state.items != null && this.state.items.length > 0) {
            let stateItems = this.state.items;
            for (var i = 0; i < stateItems.length; i += 2) {
                if (stateItems[i + 1]) {
                    items.push(
                        <Grid key={i}>
                            <Product key={stateItems[i].id} product={stateItems[i]} categoryId={this.props.id}
                                     categoryName={this.props.title}/>
                            <Product key={stateItems[i + 1].id} product={stateItems[i + 1]} categoryId={this.props.id}
                                     categoryName={this.props.title}
                                     isRight/>
                        </Grid>
                    );
                } else {
                    items.push(
                        <Grid key={i}>
                            <Product key={stateItems[i].id} product={stateItems[i]} categoryId={this.props.id}/>
                            <Col key={i + 1}/>
                        </Grid>
                    );
                }
            }
        }

        return items;
    }
}
