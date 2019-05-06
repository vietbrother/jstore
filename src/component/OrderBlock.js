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
                <Card>
                    <CardItem style={{paddingTop: 0}}>
                        <Button style={{flex: 1, width: '100%', minHeight: 80}}
                                transparent
                                onPress={() => this.pressed()}
                        >
                            <Body>
                            <Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mã đơn hàng
                                    : {this.props.order.number}</Text>
                            </Text>
                            <Text>
                                <Text style={{}}>Thời gian tạo : {new Date(this.props.order.date_created).toLocaleDateString()} {new Date(this.props.order.date_created).toLocaleTimeString()}</Text>
                            </Text>
                            <Text>
                                Trạng thái : {this.renderStatus(this.props.order.status)}
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

    renderStatus(status){
        if(status == 'processing'){
            return (<Text style={{color: '#ffa505'}}>Đang xử lý</Text>);
        } else if(status == 'completed'){
            return (<Text style={{color: '#44bc37'}}>Hoàn thành</Text>);
        } else {
            return (<Text style={{color: '#26619c'}}>status</Text>);
        }
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
