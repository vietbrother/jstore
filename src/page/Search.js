/**
 * This is the Search file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import { ActivityIndicator, Keyboard} from 'react-native';
import {
    Container,
    Content,
    View,
    Header,
    Body,
    Icon,
    Item,
    Input,
    Thumbnail,
    Button,
    Right,
    Grid,
    Col
} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Product from '../component/Product';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            items: []
        };
    }

    componentWillMount() {
        if (this.props.searchText) {
            this.setState({searchText: this.props.searchText});
            this.search(this.props.searchText);
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Header
                    searchBar
                    rounded
                    style={{backgroundColor: '#c40521'}}
                    backgroundColor={'#c40521'}
                    androidStatusBarColor={'#c40521'}
                    noShadow={true}
                >
                    <Item>
                        {/*<Button transparent onPress={() => Actions.pop()}>*/}
                            {/*<Icon name="ios-close" size={32} style={{fontSize: 32}}/>*/}
                        {/*</Button>*/}
                        <Icon name="ios-close" onPress={() => Actions.pop()}/>
                        <Input
                            placeholder="Tìm kiếm sản phẩm..."
                            value={this.state.searchText}
                            onChangeText={(text) => this.setState({searchText: text})}
                            onSubmitEditing={() => this.search(this.state.searchText)}
                            // style={{marginTop: 9}}
                        />
                        <Icon name="ios-search" onPress={() => this.search(this.state.searchText)}/>
                    </Item>
                </Header>
                {/*{this.state.items.length <= 0 ?*/}
                    {/*<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>*/}
                        {/*<Icon name="ios-search" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}}/>*/}
                        {/*<Text style={{color: '#95a5a6'}}>Đang tìm kiếm sản phẩm...</Text>*/}
                    {/*</View>*/}
                    {/*:*/}
                    <Content padder>
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
                        {this.renderResult()}
                    </Content>
                {/*}*/}
            </Container>
        );
    }

    renderResult() {
        let items = [];
        let stateItems = this.state.items
        for (var i = 0; i < stateItems.length; i += 2) {
            if (stateItems[i + 1]) {
                items.push(
                    <Grid key={i}>
                        <Product key={stateItems[i].id} product={stateItems[i]}/>
                        <Product key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight/>
                    </Grid>
                );
            } else {
                items.push(
                    <Grid key={i}>
                        <Product key={stateItems[i].id} product={stateItems[i]}/>
                        <Col key={i + 1}/>
                    </Grid>
                );



            }
        }
        return items;
    }

    search(text) {
        Keyboard.dismiss();
        this.setState({items: [], loading: true});
        global.WooCommerceAPI.get('products', {
            //per_page: 20,
            //page: 1,
            search: text
        })
            .then(data => {
                console.log("search API-----------------");
                console.log(data);
                // this.setState({items: data});
                this.setState({items: data, loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

}
