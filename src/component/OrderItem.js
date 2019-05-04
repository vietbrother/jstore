/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, Dimensions, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import {
    View,
    Container,
    Content,
    Button,
    Left,
    Right,
    Icon,
    Picker,
    Item,
    Grid,
    Col,
    Toast,
    Text as NBText,
    List, ListItem
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Carousel, {Pagination} from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import {default as OrderComponent} from '../component/OrderItem';

export default class OrderItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            activeSlide: 0,
            quantity: 1,
            selectedColor: '',
            selectedSize: ''
        };
    }

    componentWillMount() {
        //get the order with id of this.props.order.id from your server
        this.setState({order: this.props.order});
    }

    componentDidMount() {
        /* Select the default color and size (first ones) */
        // let defColor = this.state.order.colors[0];
        // let defSize = this.state.order.sizes[0];
        // this.setState({
        //     selectedColor: defColor,
        //     selectedSize: defSize
        // });
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
                {/*<Button onPress={() => Actions.cart()} transparent>*/}
                {/*<Icon name='ios-cart'/>*/}
                {/*</Button>*/}
            </Right>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} right={right} title="Đơn hàng"/>
                <Content>
                    <Content contentContainerStyle={{
                        paddingHorizontal: 10
                    }}>
                        <Card>
                            <CardItem>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mã đơn hàng
                                    : {this.state.order.number}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{}}>Thời gian tạo : {this.state.order.date_created}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{}}>Trạng thái : {this.state.order.date_created}</Text>
                            </CardItem>
                        </Card>
                    </Content>

                    <Card>
                        <CardItem header>
                            <Text style={{}}>Địa chỉ nhận hàng</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Text
                                style={{}}>{this.state.shipping.first_name} {this.state.order.shipping.last_name} </Text>
                            <Text style={{}}>{this.state.shipping.address_1} </Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Text>
                                <Text style={{}}>Thông tin đơn hàng</Text>
                            </Text>
                        </CardItem>
                        <CardItem cardBody>
                            <List dataArray={this.state.order.line_items}
                                  renderRow={(item) =>
                                      <ListItem>
                                          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                                          <Text>{item.price} x {item.quantity}</Text>
                                      </ListItem>}>
                            </List>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Text style={{}}>Thuế : {this.state.order.total_tax}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{}}>Phí vận chuyển : {this.state.order.shipping_total}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tổng tiền
                                : {this.state.order.total}</Text>
                        </CardItem>

                    </Card>


                </Content>
            </Container>
        );
    }


    search(array, object) {
        for (var i = 0; i < array.length; i++)
            if (JSON.stringify(array[i]) === JSON.stringify(object))
                return true;
        return false;
    }

}

