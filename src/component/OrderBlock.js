/**
 * This is the Product component
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image} from 'react-native';
import {View, Col, Card, CardItem, Body, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from './Text';

export default class OrderBlock extends Component {
    render() {
        return (
            <Col style={this.props.isRight ? style.leftMargin : style.rightMargin}>
                <Card transparent>
                    <CardItem style={{paddingTop: 0}}>
                        <Button style={{flex: 1, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0}}
                                transparent
                                onPress={() => this.pressed()}
                        >
                            <Body>
                            <Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mã đơn hàng
                                    : {this.props.order.number}</Text>
                            </Text>
                            <Text>
                                <Text style={{}}>Thời gian tạo : {this.props.order.date_created}</Text>
                            </Text>
                            <Text>
                                <Text style={{}}>Trạng thái : {this.props.order.date_created}</Text>
                            </Text>
                            </Body>
                        </Button>
                    </CardItem>
                </Card>
            </Col>
        );
    }

    pressed() {
        Actions.orderItem({order: this.props.order});
    }
}

const style = {
    button: {flex: 1, height: 250, paddingLeft: 4, paddingRight: 4},
    image: {height: 220, width: null, flex: 1, borderRadius: 10,},
    leftMargin: {
        marginLeft: 7,
        marginRight: 0,
        marginBottom: 7
    },
    rightMargin: {
        marginLeft: 0,
        marginRight: 7,
        marginBottom: 7
    },
    border: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(253, 253, 253, 0.2)'
    },
    price: {
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 5,
        zIndex: 1000,
        backgroundColor: '#fdfdfd'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#7f8c8d',
        position: 'absolute',
        top: '52%'
    }
}
