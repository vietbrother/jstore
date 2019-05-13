/**
 * This is the Checkout Page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {TouchableHighlight, AsyncStorage} from 'react-native';
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
            finishOrder: false
        };
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
        this.props.cartItems.map((item) => {
            var total = 0;
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
                <Button onPress={() => Actions.search()} transparent>
                    <Icon name='ios-search-outline'/>
                </Button>
            </Right>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
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
                                // onChangeText={(text) => this.setState({city: text})}
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
                                }}>{this.state.total + "VND"}</Text>
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
                            <Text>Thanh toán qua thẻ</Text>
                            <FAIcon name="cc-mastercard" size={20} color="#c0392b" style={{marginLeft: 7}}/>
                            <FAIcon name="cc-visa" size={20} color="#2980b9" style={{marginLeft: 2}}/>
                            <Right>
                                <Radio selected={this.state.card}
                                       onPress={() => this.setState({card: true, paypal: false})}/>
                            </Right>
                        </Item>
                        {this.state.card == true ? this.renderCardInfo() : null}
                        <Item style={styles.item}>
                            <Text>Thanh toán sau khi nhận hàng</Text>
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
                    <Text style={styles.require}> Nguyễn Văn A </Text>
                </Item>
                <Item>
                    <Text style={styles.label}>Số tài khoản : </Text>
                    <Text style={styles.require}> xxxxxxxxxxx </Text>
                </Item>
                <Item>
                    <Text style={styles.label}>Ngân hàng : </Text>
                    <Text style={styles.require}> Vietcombank </Text>
                </Item>
                <Item>
                    <Text style={styles.label}>Chi nhánh : </Text>
                    <Text style={styles.require}> Đống Đa </Text>
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
                items.push(<View style={{marginTop: 20, marginBottom: 10, paddingBottom: 7}}>
                    <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.navbarBackgroundColor}}
                            block iconLeft>
                        <Icon name='ios-card'/>
                        <Text style={{color: '#fdfdfd'}}> Thanh toán</Text>
                    </Button>
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
                    <Body style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 18}}>
                        <Text style={{
                            fontSize: 18,
                            color: 'red'
                        }}>{item.quantity > 1 ? item.quantity + " x " : null}</Text>
                        {item.name}
                    </Text>
                    {/*<Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Color: {item.color}</Text>*/}
                    {/*<Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Size: {item.size}</Text>*/}
                    </Body>
                    <Right>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>{item.price}</Text>
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
        }
        if (this.state.address == null || this.state.address == '') {
            msgErr = 'Chưa nhập địa chỉ';
        }
        if (this.state.district == null || this.state.district == '') {
            msgErr = 'Chưa nhập quận';
        }
        if (msgErr != '') {
            this.setState({hasError: true, errorText: msgErr});
            return;
        }
        try {
            var billingObj = {};
            billingObj['first_name'] = this.state.name;
            billingObj['last_name'] = '';
            billingObj['phone'] = this.state.phone;
            billingObj['address_1'] = this.state.address;
            billingObj['address_2'] = this.state.district;
            billingObj['city'] = 'Hà Nội';
            billingObj['state'] = '';
            billingObj['postcode'] = '100000';
            billingObj['country'] = 'VN';
            billingObj['email'] = '';

            var shippingObj = {};
            shippingObj['first_name'] = this.state.name;
            shippingObj['last_name'] = '';
            shippingObj['address_1'] = this.state.address;
            shippingObj['address_2'] = this.state.district;
            shippingObj['city'] = 'Hà Nội';
            shippingObj['state'] = '';
            shippingObj['postcode'] = '100000';
            shippingObj['country'] = 'VN';

            var line_items = [];
            this.state.cartItems.map((item, i) => {
                var lineItemObject = {};
                lineItemObject['product_id'] = item.id;
                lineItemObject['quantity'] = item.quantity;
                line_items.push(lineItemObject);
            });


            global.WooCommerceAPI.post('products', {
                category: this.props.id,
                payment_method_title: this.state.card == true ? 'Thanh toán bằng thẻ' : 'Thanh toán trực tiếp',
                set_paid: true,
                billing: billingObj,
                shipping: shippingObj,
                line_items: line_items
            })
                .then(data => {
                    console.log("API create order-----------------");
                    console.log(data);
                    this.setState({finishOrder: true});
                }).catch(error => {
                // error will return any errors that occur
                console.log(error);
            });
        } catch (e) {
            console.log("Error when create order");
            console.log(e);
        }
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
                    <Text style={{fontSize: 16}}>Cám ơn quý khách đã thanh toán. Nhân viên JStore sẽ liên hệ lại với quý
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
};
