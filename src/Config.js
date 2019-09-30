import {StyleSheet, Dimensions, Platform} from 'react-native';

const Config = {
    navbarBackgroundColor: '#2c3e50',
    statusBarColor: '#233240',
    vnd: '\u20AB',
    mainColor: '#c40521',
    imageDefaul: '/wp-content/uploads/woocommerce-placeholder.png',

    // url: 'http://103.94.18.249/jstore',
    url: 'http://103.94.16.129/jstore',
    ssl: false,
    // consumerKey: 'ck_155068b58dd6614b3ace920437df62399bb94503',
    // consumerSecret: 'cs_9fb0b186ea0024bd6d9d497715e88e43b1bf2b6e',
    //consumerKey: 'ck_29b281d2af61df58dadbeead327b06dd9a53f1be',//key_admin
    consumerKey: 'ck_331fc296c2172e2d34c719b717b9e422bf92e1e6',//key_admin
    //consumerSecret: 'cs_a6d53b6572240d483749ee0123d48c76332c0e0d',
    consumerSecret: 'cs_6a071d64b541e9e7e9fd4e37964f96e4a031998b',

    hotline: '1900 0091',

    bankUserName: 'Lê Thị Quyên',
    bankNumber: 'xxxxxxxxxxx',
    bankName: 'Vietcombank',
    bankDepartment: 'Đống Đa',

    messageContent: 'Nội dung chuyển khoản: &lt;Mã đơn hàng&gt; &lt;Điện thoại khách hàng&gt;'
};


const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const bannerHeight = viewportHeight * 0.26;
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const categoriesIconWidth = viewportWidth * 0.9/4;
const categoriesIconHeight = viewportWidth * 0.9/4;
const productItemHeight = wp(45);

const entryBorderRadius = 8;
export default Config;
