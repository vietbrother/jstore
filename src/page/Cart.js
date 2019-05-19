/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import {
    Container,
    Content,
    View,
    Header,
    Icon,
    Button,
    Left,
    Right,
    Body,
    Title,
    List,
    ListItem,
    Thumbnail,
    Grid,
    Col, CardItem, Card
} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Config from '../Config';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            total: 0,
            userId: ''
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('userId', (err, res) => {
            if (res) {
                //if user is existed
                let userId = res;
                this.setState({userId: userId});
                AsyncStorage.getItem("CART", (err, res) => {
                    console.log("res " + res);
                    if (!res) this.setState({cartItems: []});
                    else {
                        var itemArr = JSON.parse(res);
                        var temp = itemArr.filter(function (cartItem) {
                            return cartItem.userId == userId;
                        });
                        this.setState({cartItems: temp});
                    }
                    this.getTotal();
                });
            }
        });

    }

    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button transparent onPress={() => Actions.pop()}>
                    <Icon name="ios-close" size={38} style={{fontSize: 38}}/>
                </Button>
            </Left>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} title="Giỏ hàng"/>
                {this.state.cartItems.length <= 0 ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="ios-cart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}}/>
                        <Text style={{color: '#95a5a6'}}>Giỏ hàng trống</Text>
                    </View>
                    :
                    <Content style={{paddingRight: 10}}>
                        <List>
                            {this.renderItems()}
                        </List>
                        <Grid style={{marginTop: 20, marginBottom: 10}}>
                            <Col style={{paddingLeft: 10, paddingRight: 5}}>
                                <Button onPress={() => this.checkout()}
                                        style={{backgroundColor: '#c40521'}} block iconLeft>
                                    <Icon name='ios-card'/>
                                    <Text style={{color: '#fdfdfd'}}> Thanh toán </Text>
                                </Button>
                            </Col>
                            <Col style={{paddingLeft: 5, paddingRight: 10}}>
                                <Button onPress={() => this.removeAllPressed()}
                                        style={{borderWidth: 1, borderColor: Colors.navbarBackgroundColor}} block
                                        iconRight transparent>
                                    <Text style={{color: Colors.navbarBackgroundColor}}> Xóa hết </Text>
                                    <Icon style={{color: Colors.navbarBackgroundColor}} name='ios-trash-outline'/>
                                </Button>
                            </Col>
                        </Grid>
                    </Content>
                }
            </Container>
        );
    }

    getTotal() {
        let totalTemp = 0;
        this.state.cartItems.map((item, i) => {
            totalTemp += item.quantity * item.price;
        });
        this.setState({total: totalTemp});
    }

    changeQuatity(item, quantityUpdate) {
        var tempCartItem = this.state.cartItems;
        var objIndex = tempCartItem.findIndex((obj => obj.name == item.name));
        if (objIndex != -1) {
            tempCartItem[objIndex].quantity = quantityUpdate;
            this.setState({cartItems: tempCartItem});
            this.getTotal();
        }
        this.upfateStorageData(tempCartItem)
    }

    upfateStorageData(tempCartItem) {
        AsyncStorage.getItem("CART", (err, res) => {
            if (res) {
                var itemArr = JSON.parse(res);
                for (var index = 0; index < tempCartItem.length; ++index) {
                    var item = tempCartItem[index];
                    var objIndex = itemArr.findIndex((obj => obj.name == item.name && obj.userId == this.state.userId));
                    if (objIndex != -1) {
                        itemArr[objIndex].quantity = item.quantity;
                    } else {
                        itemArr.push(item);
                    }
                }
                AsyncStorage.setItem("CART", JSON.stringify(itemArr));

            }
        });
    }

    renderItems() {
        let items = [];
        this.state.cartItems.map((item, i) => {
            items.push(
                <ListItem
                    key={i}
                    last={this.state.cartItems.length === i + 1}
                    onPress={() => this.itemClicked(item)}
                >
                    <Thumbnail square style={{width: 110, height: 90}} source={{uri: item.images[0].src}}/>
                    <Body style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 16}}>
                        <Text style={{
                            fontSize: 18,
                            color: '#BE0026'
                        }}>{item.quantity > 1 ? item.quantity + " x " : null}</Text>
                        {item.name}
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 10
                    }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                    {/*<Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Tên: {item.name}</Text>*/}
                    {/*<Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Size: {item.size}</Text>*/}

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button style={{flex: 1}} icon transparent
                                style={{backgroundColor: '#fdfdfd'}}
                                onPress={() => this.changeQuatity(item, (item.quantity > 1 ? item.quantity - 1 : 1))}>
                            <Icon style={{color: Colors.navbarBackgroundColor}}
                                  name='ios-remove-circle-outline'/>
                        </Button>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{fontSize: 18}}>{item.quantity}</Text>
                        </View>
                        <Button style={{flex: 1}} icon transparent
                                style={{backgroundColor: '#fdfdfd'}}
                                onPress={() => this.changeQuatity(item, item.quantity + 1)}>
                            <Icon style={{color: Colors.navbarBackgroundColor}}
                                  name='ios-add-circle-outline'/>
                        </Button>
                    </View>
                    </Body>
                    <Right>
                        <Button style={{marginLeft: -25}} transparent onPress={() => this.removeItemPressed(item)}>
                            <Icon size={30} style={{fontSize: 30, color: 'red'}}
                                  name='ios-remove-circle-outline'/>
                        </Button>
                    </Right>

                </ListItem>
            );
        });
        items.push(
            <Card transparent>
                <CardItem>
                    <Grid style={{fontSize: 16,}}>
                        <Col size={2}>
                            <Text>Thành tiền : </Text>
                        </Col>
                        <Col size={2}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#BE0026',
                                textAlign: 'right'
                            }}>{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                        </Col>
                    </Grid>

                </CardItem>

            </Card>);
        return items;
    }

    removeItemPressed(item) {
        Alert.alert(
            'Xóa ' + item.name,
            'Bạn có muốn xóa đồ này trong giỏ hàng ?',
            [
                {text: 'Không', onPress: () => console.log('No Pressed'), style: 'cancel'},
                {text: 'Có', onPress: () => this.removeItem(item)},
            ]
        )
    }

    removeItem(itemToRemove) {
        let items = [];
        this.state.cartItems.map((item) => {
            if (JSON.stringify(item) !== JSON.stringify(itemToRemove))
                items.push(item);
        });
        this.setState({cartItems: items});
        AsyncStorage.setItem("CART", JSON.stringify(items));
    }

    removeAllPressed() {
        Alert.alert(
            'Xóa giỏ hàng',
            'Bạn có muốn làm trống giỏ hàng ?',
            [
                {text: 'Không', onPress: () => console.log('No Pressed'), style: 'cancel'},
                {text: 'Có', onPress: () => this.removeAll()}
            ]
        )
    }

    removeAll() {
        this.setState({cartItems: []})
        AsyncStorage.setItem("CART", JSON.stringify([]));
    }

    checkout() {
        Actions.checkout({cartItems: this.state.cartItems, userId: this.state.userId});
    }

    itemClicked(item) {
        Actions.product({product: item});
    }

}

const styles = {
    title: {
        fontFamily: 'Roboto',
        fontWeight: '100'
    }
};

// const items = [
//     {
//         id: 1,
//         quantity: 1,
//         title: 'Black Hat',
//         categoryId: 5,
//         categoryTitle: 'MEN',
//         price: '22$',
//         image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
//         description: "Hello there, i'm a cool product with a heart of gold."
//     },
//     {
//         id: 2,
//         quantity: 3,
//         title: 'V Neck T-Shirt',
//         categoryId: 2,
//         categoryTitle: 'WOMEN',
//         price: '12$',
//         image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
//         description: "Hello there, i'm a cool product with a heart of gold."
//     },
//     {
//         id: 10,
//         quantity: 1,
//         title: 'Black Leather Hat',
//         categoryId: 1,
//         categoryTitle: 'KIDS',
//         price: '2$',
//         image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
//         description: "Hello there, i'm a cool product with a heart of gold."
//     },
// ];
