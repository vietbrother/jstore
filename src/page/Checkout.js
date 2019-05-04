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
    Item
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
            name: '',
            email: '',
            phone: '',
            country: '',
            address: '',
            city: '',
            postcode: '',
            note: '',
            sessionKey: null,
        };
    }
    componentDidMount(){
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
                <Content padder>
                    {/*<TouchableHighlight onPress={() => Actions.login()}>*/}
                    {/*<View style={{flex: 1, alignItems: 'center', backgroundColor: '#6fafc4', paddingTop: 20, paddingBottom: 20}}>*/}
                    {/*<Icon name="ios-warning" style={{color: 'rgba(253, 253, 253, 0.9)', marginRight: 20, position: 'absolute', left: 11, top: 15, borderRightWidth: 1, borderColor: 'rgba(253, 253, 253, 0.2)', paddingRight: 10}}/>*/}
                    {/*<Text style={{color: '#fdfdfd'}}>Returning customer ? click here to login</Text>*/}
                    {/*</View>*/}
                    {/*</TouchableHighlight>*/}
                    <Card>
                        <CardItem header>
                            <Text style={{marginTop: 15, fontSize: 18, fontWeight: 'bold',}}>Thông tin giao hàng</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <View>
                                <Item regular style={{marginTop: 7}}>
                                    <Input placeholder='Tên' onChangeText={(text) => this.setState({name: text})}
                                           placeholderTextColor="#687373"/>
                                </Item>
                                <Item regular style={{marginTop: 7}}>
                                    <Input placeholder='Email' onChangeText={(text) => this.setState({email: text})}
                                           placeholderTextColor="#687373"/>
                                </Item>
                                <Item regular style={{marginTop: 7}}>
                                    <Input placeholder='Số điện thoại' onChangeText={(text) => this.setState({phone: text})}
                                           placeholderTextColor="#687373"/>
                                </Item>
                                {/*<Item regular style={{marginTop: 7}}>*/}
                                {/*<Input placeholder='Country' onChangeText={(text) => this.setState({country: text})} placeholderTextColor="#687373" />*/}
                                {/*</Item>*/}
                                <Item regular style={{marginTop: 7}}>
                                    <Input placeholder='Địa chỉ' onChangeText={(text) => this.setState({address: text})}
                                           placeholderTextColor="#687373"/>
                                </Item>
                                <Item regular style={{marginTop: 7}}>
                                    <Input placeholder='Thành phố' onChangeText={(text) => this.setState({city: text})}
                                           placeholderTextColor="#687373"/>
                                </Item>
                                {/*<Item regular style={{marginTop: 7}}>*/}
                                {/*<Input placeholder='Mã bưu chính' onChangeText={(text) => this.setState({postcode: text})} placeholderTextColor="#687373" />*/}
                                {/*</Item>*/}
                                <Item regular style={{marginTop: 7}}>
                                    <Input placeholder='Ghi chú' onChangeText={(text) => this.setState({note: text})}
                                           placeholderTextColor="#687373"/>
                                </Item>
                            </View>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Text style={{marginTop: 15, fontSize: 18, fontWeight: 'bold',}}>Thông tin đơn hàng</Text>
                        </CardItem>
                        <CardItem cardBody>
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
                                            fontWeight: 'bold'
                                        }}>{this.state.total + "VND"}</Text>
                                    </Col>
                                </Grid>
                            </View>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Text style={{marginTop: 25, marginBottom: 7, fontSize: 18, fontWeight: 'bold',}}>Thanh
                                toán</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <View>
                                <ListItem style={{
                                    borderWidth: 1,
                                    borderColor: 'rgba(149, 165, 166, 0.3)',
                                    paddingLeft: 10,
                                    marginLeft: 0
                                }}>
                                    <Text>Thanh toán qua thẻ</Text>
                                    <FAIcon name="cc-mastercard" size={20} color="#c0392b" style={{marginLeft: 7}}/>
                                    <FAIcon name="cc-visa" size={20} color="#2980b9" style={{marginLeft: 2}}/>
                                    <Right>
                                        <Radio selected={this.state.card}
                                               onPress={() => this.setState({card: true, paypal: false})}/>
                                    </Right>
                                </ListItem>
                                <ListItem style={{
                                    borderWidth: 1,
                                    borderColor: 'rgba(149, 165, 166, 0.3)',
                                    paddingLeft: 10,
                                    marginLeft: 0,
                                    borderTopWidth: 0
                                }}>
                                    <Text>Thanh toán qua Paypal</Text>
                                    <FAIcon name="cc-paypal" size={20} color="#34495e" style={{marginLeft: 7}}/>
                                    <Right>
                                        <Radio selected={this.state.paypal}
                                               onPress={() => this.setState({card: false, paypal: true})}/>
                                    </Right>
                                </ListItem>
                            </View>
                        </CardItem>
                    </Card>


                    <View style={{marginTop: 20, marginBottom: 10, paddingBottom: 7}}>
                        {/*<Button onPress={() => this.checkout()} style={{backgroundColor: Colors.navbarBackgroundColor}}*/}
                                {/*block iconLeft>*/}
                            {/*<Icon name='ios-card'/>*/}
                            {/*<Text style={{color: '#fdfdfd'}}> Thanh toán</Text>*/}
                        {/*</Button>*/}
                        {this.renderCheckoutButton()}
                    </View>
                </Content>
            </Container>
        );
    }

    c() {
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
            }
        } catch (error) {
            // Error retrieving data
            console.error(error);
        }

        <TouchableHighlight onPress={() => Actions.login()}>
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#6fafc4', paddingTop: 20, paddingBottom: 20}}>
                <Icon name="ios-warning" style={{color: 'rgba(253, 253, 253, 0.9)', marginRight: 20, position: 'absolute', left: 11, top: 15, borderRightWidth: 1, borderColor: 'rgba(253, 253, 253, 0.2)', paddingRight: 10}}/>
                <Text style={{color: '#fdfdfd'}}>Cần đăng nhập trước khi thanh toán</Text>
            </View>
        </TouchableHighlight>
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
                        {item.quantity > 1 ? item.quantity + "x " : null}
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
        alert("Check the log");
    }

}

const styles = {
    invoice: {
        paddingLeft: 20,
        paddingRight: 20
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#bdc3c7'
    }
};
