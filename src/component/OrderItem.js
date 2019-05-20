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
    List, ListItem,
    Card, CardItem,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Carousel, {Pagination} from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Config from '../Config';
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
                <Content contentContainerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#f3f9ff'
                }}>
                    <Card>
                        <CardItem>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mã đơn hàng
                                : {this.state.order.number}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{}}>Thời gian tạo :
                                {new Date(this.state.order.date_created).toLocaleDateString() + ' ' + new Date(this.state.order.date_created).toLocaleTimeString()}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{}}>Trạng thái : {this.renderStatus(this.state.order.status)}</Text>
                        </CardItem>
                    </Card>


                    <Card>
                        <CardItem header>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Địa chỉ nhận hàng</Text>
                        </CardItem>
                        <CardItem>
                            <Text
                                style={{}}>{this.state.order.shipping.first_name} {this.state.order.shipping.last_name} </Text>
                            <Text style={{}}>{this.state.order.shipping.address_1} </Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Thông tin đơn hàng</Text>
                            </Text>
                        </CardItem>
                        <CardItem cardBody>
                            <List dataArray={this.state.order.line_items}
                                  renderRow={(item) =>
                                      <ListItem>
                                          <Grid>
                                              <Col size={3}>
                                                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                                              </Col>
                                              <Col size={1}>
                                                  <Text
                                                      style={{textAlign: 'center'}}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                      x <Text style={{color: '#BE0026',}}>{item.quantity}</Text>
                                                  </Text>
                                              </Col>
                                          </Grid>
                                      </ListItem>}>
                            </List>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Col size={2}>
                                <Text>Thuế : </Text>
                            </Col>
                            <Col size={2}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    textAlign: 'right'
                                }}>{parseInt(this.state.order.total_tax).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                            </Col>
                        </CardItem>
                        <CardItem>
                            <Col size={2}>
                                <Text>Phí vận chuyển : </Text>
                            </Col>
                            <Col size={2}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    textAlign: 'right'
                                }}>{parseInt(this.state.order.shipping_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                            </Col>
                        </CardItem>
                        <CardItem>
                            {/*<Text style={{fontSize: 18, fontWeight: 'bold'}}>Tổng tiền*/}
                            {/*: <Text style={{fontSize: 18, fontWeight: 'bold', color: '#BE0026'}}>{this.state.order.total}</Text>*/}
                            {/*</Text>*/}
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
                                    }}>{parseInt(this.state.order.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                                </Col>
                            </Grid>
                        </CardItem>

                    </Card>

                </Content>

            </Container>
        );
    }

    renderStatus(status) {
        if (status == 'processing') {
            return (<Text style={{color: '#ffa505'}}>Đang xử lý</Text>);
        } else if (status == 'completed') {
            return (<Text style={{color: '#44bc37'}}>Hoàn thành</Text>);
        } else {
            return (<Text style={{color: '#26619c'}}>status</Text>);
        }
    }

    search(array, object) {
        for (var i = 0; i < array.length; i++)
            if (JSON.stringify(array[i]) === JSON.stringify(object))
                return true;
        return false;
    }

}

