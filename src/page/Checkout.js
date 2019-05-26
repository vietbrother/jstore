/**
 * This is the Checkout Page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {TouchableHighlight, AsyncStorage, Alert} from 'react-native';
import {
    Container,
    Content,
    View,
    Grid,
    Col,
    Left,
    Right,
    Button,
    Icon,
    List,
    ListItem,
    Body,
    Radio,
    Input,
    Item,
    Card, CardItem,
    InputGroup,
} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

import WooCommerceAPI_ from 'react-native-woocommerce-api';
import Spinner from 'react-native-loading-spinner-overlay';
import Config from "../Config";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            total: 0,
            card: true,
            paypal: false,
            email: '',
            name: '',
            phone: '',
            address: '',
            district: '',
            city: 'Hà Nội',
            country: '',
            postcode: '',
            note: '',
            sessionKey: null,
            errorText: '',
            finishOrder: false,
            userId: this.props.userId,
            loading: false
        };

        global.WooCommerceAPI_ = new WooCommerceAPI_({
            // url: 'http://103.94.18.249/jstore', // Your store URL
            //ssl: false,
            // consumerKey: 'ck_155068b58dd6614b3ace920437df62399bb94503', // Your consumer secret
            // consumerSecret: 'cs_9fb0b186ea0024bd6d9d497715e88e43b1bf2b6e', // Your consumer secret
            url: Config.url, // Your store URL
            ssl: Config.ssl,
            consumerKey: Config.consumerKey, // Your consumer secret
            consumerSecret: Config.consumerSecret, // Your consumer secret
            //consumerKey: 'ck_29b281d2af61df58dadbeead327b06dd9a53f1be', // Your consumer secret
            //consumerSecret: 'cs_a6d53b6572240d483749ee0123d48c76332c0e0d', // Your consumer secret
            wpAPI: true, // Enable the WP REST API integration
            version: 'wc/v3', // WooCommerce WP REST API version
            queryStringAuth: true
        });
    }

    componentDidMount() {
        this.getSessionKey();
    }

    async getSessionKey() {
        try {
            const value = await AsyncStorage.getItem('cookieUserFromApi');
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
            this.setState({sessionKey: value});
            console.log("state : " + this.state.sessionKey);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    componentWillMount() {
        this.setState({cartItems: this.props.cartItems});
        var total = 0;
        this.props.cartItems.map((item) => {
            total += parseFloat(item.price) * parseInt(item.quantity);
            this.setState({total: total});
        });
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
                {/*<Button onPress={() => Actions.search()} transparent>*/}
                {/*<Icon name='ios-search-outline'/>*/}
                {/*</Button>*/}
            </Right>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.loading}
                    //Text with the Spinner
                    //textContent={'Đang xử lý...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
                <Navbar left={left} right={right} title="Thanh toán"/>
                {this.state.finishOrder == false ? this.renderMainContent() : this.renderFinishContent()}
            </Container>
        );
    }

    renderMainContent() {
        return (
            <Content padder>
                <View style={styles.boxWithShadow}>
                    <View style={{paddingLeft: 15, paddingTop: 15}}>
                        <Text style={styles.infoHeader}>Thông tin đơn hàng</Text>
                    </View>
                    <View style={styles.invoice}>

                        <Item>
                            <Text style={styles.label}>Tên </Text>
                            <Text style={styles.require}>* </Text>
                            <Input placeholder='Tên (*)' onChangeText={(text) => this.setState({name: text})}
                                   placeholderTextColor="#99b5bb"/>
                        </Item>
                        <Item>
                            <Text style={styles.label}>SĐT </Text>
                            <Text style={styles.require}>* </Text>
                            <Input placeholder='Số điện thoại (*)'
                                   onChangeText={(text) => this.setState({phone: text})}
                                   placeholderTextColor="#99b5bb"/>
                        </Item>
                        <Item>
                            <Text style={styles.label}>Địa chỉ </Text>
                            <Text style={styles.require}>* </Text>
                            <Input placeholder='Địa chỉ (*)' onChangeText={(text) => this.setState({address: text})}
                                   placeholderTextColor="#99b5bb"/>
                        </Item>
                        <Item>
                            <Text style={styles.label}>Quận </Text>
                            <Text style={styles.require}>* </Text>
                            <Input placeholder='Quận (*)' onChangeText={(text) => this.setState({district: text})}
                                   placeholderTextColor="#99b5bb"/>
                        </Item>
                        <Item>
                            <Text style={styles.label}>Thành phố </Text>
                            <Text style={styles.require}>* </Text>
                            <Input placeholder='Thành phố' value={this.state.city}
                                   onChangeText={(text) => this.setState({city: text})}
                                   placeholderTextColor="#99b5bb"/>
                        </Item>
                        {this.state.hasError ? <Text style={{
                            color: "#c0392b",
                            textAlign: 'center',
                            marginTop: 10
                        }}>{this.state.errorText}</Text> : null}
                    </View>
                </View>


                <View style={styles.boxWithShadow}>
                    <View style={{paddingLeft: 15, paddingTop: 15}}>
                        <Text style={styles.infoHeader}>Thông tin đơn hàng</Text>
                    </View>
                    <View style={styles.invoice}>
                        <List>
                            {this.renderItems()}
                        </List>
                        <View style={styles.line}/>
                        <Grid style={{paddingLeft: 10, paddingRight: 10, marginTop: 7}}>
                            <Col>
                                <Text style={{fontSize: 18, fontStyle: 'italic'}}>Tổng</Text>
                            </Col>
                            <Col>
                                <Text style={{
                                    textAlign: 'right',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: 'red'
                                }}>{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                            </Col>
                        </Grid>
                    </View>
                </View>


                <View style={styles.boxWithShadow}>
                    <View style={{paddingLeft: 15, paddingTop: 15, paddingBottom: 10}}>
                        <Text style={styles.infoHeader}>Thông tin đơn hàng</Text>
                    </View>
                    <View style={styles.invoice}>

                        <Item style={styles.item}>
                            <Text>Chuyển khoản ngân hàng</Text>
                            <FAIcon name="cc-mastercard" size={20} color="#c0392b" style={{marginLeft: 7}}/>
                            <FAIcon name="cc-visa" size={20} color="#2980b9" style={{marginLeft: 2}}/>
                            <Right>
                                <Radio selected={this.state.card}
                                       onPress={() => this.setState({card: true, paypal: false})}/>
                            </Right>
                        </Item>
                        {this.state.card == true ? this.renderCardInfo() : null}
                        <Item style={styles.item}>
                            <Text>Trả tiền mặt khi nhận hàng </Text>
                            <FAIcon name="money" size={20} color="#34495e" style={{marginLeft: 7}}/>
                            <Right>
                                <Radio selected={this.state.paypal}
                                       onPress={() => this.setState({card: false, paypal: true})}/>
                            </Right>
                        </Item>
                    </View>
                </View>

                <View style={{marginTop: 20, marginBottom: 10, paddingBottom: 7}}>
                    {this.renderCheckoutButton()}
                </View>
            </Content>
        );
    }

    renderCardInfo() {
        return (
            <View style={styles.invoice}>
                <Item>
                    <Text style={styles.label}>Tên : </Text>
                    <Text style={styles.require}> {Config.bankUserName} </Text>
                </Item>
                <Item>
                    <Text style={styles.label}>Số tài khoản : </Text>
                    <Text style={styles.require}> {Config.bankNumber} </Text>
                </Item>
                <Item>
                    <Text style={styles.label}>Ngân hàng : </Text>
                    <Text style={styles.require}> {Config.bankName} </Text>
                </Item>
                <Item>
                    <Text style={styles.label}>Chi nhánh : </Text>
                    <Text style={styles.require}> {Config.bankDepartment} </Text>
                </Item>
            </View>
        );
    }

    renderCheckoutButton() {
        let items = [];
        try {
            if (this.state.sessionKey !== null) {
                // We have data!!
                console.log(this.state.sessionKey);
                items.push(<View style={{width: '100%', marginTop: 20, marginBottom: 10, paddingBottom: 7}}>

                    <Grid style={{marginTop: 20, marginBottom: 10}}>
                        <Col style={{paddingLeft: 10, paddingRight: 5}}>
                            <Button onPress={() => this.checkout()}
                                    style={{backgroundColor: '#c40521'}} block iconLeft>
                                <Icon name='ios-card'/>
                                <Text style={{color: '#fdfdfd'}}> Thanh toán </Text>
                            </Button>
                        </Col>
                        <Col style={{paddingLeft: 5, paddingRight: 10}}>
                            <Button onPress={() => this.cancelCheckout()}
                                    style={{borderWidth: 1, borderColor: Colors.navbarBackgroundColor}} block
                                    iconRight transparent>
                                <Text style={{color: Colors.navbarBackgroundColor}}> Hủy thanh toán </Text>
                                <Icon style={{color: Colors.navbarBackgroundColor}} name='ios-close-circle-outline'/>
                            </Button>
                        </Col>
                    </Grid>

                </View>);
                return items;
            } else {
                <TouchableHighlight onPress={() => Actions.login()}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: '#6fafc4',
                            paddingTop: 20,
                            paddingBottom: 20
                        }}>
                        <Icon name="ios-warning" style={{
                            color: 'rgba(253, 253, 253, 0.9)',
                            marginRight: 20,
                            position: 'absolute',
                            left: 11,
                            top: 15,
                            borderRightWidth: 1,
                            borderColor: 'rgba(253, 253, 253, 0.2)',
                            paddingRight: 10
                        }}/>
                        <Text style={{color: '#fdfdfd'}}>Cần đăng nhập trước khi thanh toán</Text>
                    </View>
                </TouchableHighlight>
            }
        } catch (error) {
            // Error retrieving data
            console.error(error);
        }


        return items;
    }

    renderItems() {
        let items = [];
        this.state.cartItems.map((item, i) => {
            items.push(
                <ListItem
                    key={i}
                    style={{marginLeft: 0}}
                >
                    <Body style={{paddingLeft: 5}}>
                    <Text style={{fontSize: 14}}>
                        <Text style={{
                            fontSize: 14,
                            color: 'red'
                        }}>{item.quantity > 1 ? item.quantity + " x " : null}</Text>
                        {item.name}
                    </Text>
                    {/*<Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Color: {item.color}</Text>*/}
                    {/*<Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Size: {item.size}</Text>*/}
                    </Body>
                    <Right>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                    </Right>
                </ListItem>
            );
        });
        return items;
    }

    checkout() {
        console.log(this.state);
        var msgErr = '';
        if (this.state.name == null || this.state.name == '') {
            msgErr = 'Chưa nhập tên người nhận';
        }
        if (this.state.phone == null || this.state.phone == '') {
            msgErr = 'Chưa nhập số điện thoại';
        } else {
            var reg = /^((09|03|07|08|05)+([0-9]{8})\b)$/;
            if(reg.test(this.state.phone) == false){
                msgErr = 'Số điện thoại không chính xác';
            }
        }
        if (this.state.address == null || this.state.address == '') {
            msgErr = 'Chưa nhập địa chỉ';
        }
        if (this.state.district == null || this.state.district == '') {
            msgErr = 'Chưa nhập quận';
        }
        if (this.state.city == null || this.state.city == '') {
            msgErr = 'Chưa nhập thành phố';
        }


        if (msgErr != '') {
            this.setState({hasError: true, errorText: msgErr});
            // alert(msgErr);
            Alert.alert(
                'Thông tin chưa chính xác',
                msgErr,
                [
                    {text: 'Đóng', onPress: () => console.log('No Pressed'), style: 'cancel'},
                ]
            )
            return;
        }
        try {
            var billingObj = {};
            billingObj['first_name'] = this.state.name;
            billingObj['last_name'] = '';
            billingObj['phone'] = this.state.phone;
            billingObj['address_1'] = this.state.address;
            billingObj['address_2'] = this.state.district;
            billingObj['city'] = this.state.city;
            billingObj['state'] = '';
            billingObj['postcode'] = '100000';
            billingObj['country'] = 'VN';
            billingObj['email'] = '';
            console.log(billingObj);

            var shippingObj = {};
            shippingObj['first_name'] = this.state.name;
            shippingObj['last_name'] = '';
            shippingObj['address_1'] = this.state.address;
            shippingObj['address_2'] = this.state.district;
            shippingObj['city'] = 'Hà Nội';
            shippingObj['state'] = '';
            shippingObj['postcode'] = '100000';
            shippingObj['country'] = 'VN';
            console.log(shippingObj);

            var line_items = [];
            this.state.cartItems.map((item, i) => {
                var lineItemObject = {};
                lineItemObject['product_id'] = item.id;
                lineItemObject['quantity'] = item.quantity;
                line_items.push(lineItemObject);
            });
            console.log(line_items);

            Alert.alert(
                'Thanh toán',
                'Bạn có chắc chắn muốn thanh toán đơn hàng không ?',
                [
                    {text: 'Không', onPress: () => console.log('No Pressed'), style: 'cancel'},
                    {text: 'Có', onPress: () => this.createOrder(billingObj, shippingObj, line_items)},
                ]
            )

        } catch (e) {
            console.log("Error when create order");
            console.log(e);
        }
    }

    cancelCheckout() {
        Alert.alert(
            'Thanh toán',
            'Bạn có chắc chắn muốn hủy thanh toán đơn hàng không ?',
            [
                {text: 'Không', onPress: () => console.log('No Pressed'), style: 'cancel'},
                {text: 'Có', onPress: () => Actions.pop()},
            ]
        )
    }

    createOrder(billingObj, shippingObj, line_items) {
        this.setState({loading: true});
        global.WooCommerceAPI_.post('orders', {
            // category: this.props.id,
            payment_method: this.state.card == true ? 'bacs' : 'cod',
            payment_method_title: this.state.card == true ? 'Chuyển khoản ngân hàng' : 'Trả tiền mặt khi nhận hàng',
            set_paid: true,
            customer_id: this.state.userId,
            billing: billingObj,
            shipping: shippingObj,
            line_items: line_items,
        })
            .then(data => {
                console.log("API create order-----------------");
                console.log(data);
                AsyncStorage.setItem("CART", JSON.stringify([]));
                this.setState({finishOrder: true});
                this.setState({loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

    renderFinishContent() {
        return (
            <Content padder>
                <View style={{
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                    <Text style={{fontSize: 18}}>Cám ơn quý khách đã thanh toán. Nhân viên shop sẽ liên hệ lại với quý
                        khách để xác nhận đơn
                        hàng.</Text>
                    <Button onPress={() => this._finishOrder()}
                            style={styles.buttonFinish}>
                        <Text style={{color: '#fdfdfd'}}> Về trang chủ </Text>
                    </Button>
                </View>
            </Content>
        );
    }

    _finishOrder() {
        AsyncStorage.setItem("CART", JSON.stringify([]));
        Actions.home();
    }

}

const styles = {
    invoice: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#bdc3c7'
    },
    infoHeader: {
        // marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    boxWithShadow: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#ccc",
        flexWrap: "nowrap",
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    require: {
        fontWeight: 'bold',
        color: 'red'
    },
    item: {
        paddingBottom: 5,
        paddingTop: 10,
        fontSize: 16
    },
    buttonFinish: {
        backgroundColor: Colors.navbarBackgroundColor,
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 14,
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontWeight: 'bold'
    },
};
