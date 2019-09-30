# SHOP UI React-Native Template with Native Base

## Introduction

> A creative and modern clothes shopping app design for react-native using the native-base UI components.
It works well with both IOS and Android.


## Availables pages

> This is the list of the availables pages with this source code:
* [Home](./src/page/Home.js)
* [Shop](./src/page/Category.js)
* [Single product](./src/page/Product.js)
* [Product gallery](./src/page/ImageGallery.js)
* [Cart](./src/page/Cart.js)
* [Search](./src/page/Search.js)
* [WishList](./src/page/WishList.js)
* [Newsletter](./src/page/Newsletter.js)
* [Contact](./src/page/Contact.js)
* [Find us (A map)](./src/page/Map.js)
* [Login](./src/page/Login.js)/[Sign up](./src/page/Signup.js)
* [Payment](./src/page/Checkout.js)

### Reference
* https://github.com/territoryfan/react-native-tabbar
* https://github.com/ptomasroos/react-native-tab-navigator


## Installation

> Follow these steps to install and test the app:

```
git clone git@github.com:ATF19/react-native-shop-ui.git
cd react-native-shop-ui
npm install
npm install react-native-woocommerce-api --save

```

> For iOS users:

```
react-native run-ios
```

> For Android users

```
react-native run-android
```
build release
```
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
cd android
gradlew clean
gradlew assembleRelease
```


## Reference

https://github.com/facebook/react-native-fbsdk

## Documentation

Updating the codebase will require changes to the `.js` files in the [src/](./src/) folder. Individual pages can be edited by editing the `.js` files in [src/page/](./src/page/). Re-usable components can be edited by editing the `.js` files in [src/component/](./src/component/).

To contribute your changes to the main repository, create a pull request from your fork [here](https://github.com/ATF19/react-native-shop-ui/compare?expand=1) (click the `compare across forks` link make your repository the source repository)
> crash app release 
- https://medium.com/@impaachu/react-native-android-release-build-crash-on-device-14f2c9eacf18
> build release error
- https://medium.com/beesightsoft/react-native-build-release-error-uncompiled-png-file-passed-as-argument-431f0f7baa72

> woocommerce-api 
- https://github.com/sabarnix/woocommerce-api 
- https://github.com/minhcasi/react-native-woocommerce/blob/master/example/Product.js
- http://woocommerce.github.io/woocommerce-rest-api-docs/#list-all-products
- https://stackoverflow.com/questions/48163307/woocommerce-rest-api-product-filters-how-it-works

> note
- gen unique key={new Date().valueOf()} to re-render menu

react-native bundle --platform android --dev true --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

### gen key login facebook
> debug
- C:\Program Files\Java\jdk1.8.0_201\bin>keytool -exportcert -alias androiddebugkey -keystore "C:\Users\ADMIN\.android\debug.keystore" | "E:\SetUp\openssl-0.9.8k_WIN32\bin\openssl" sha1 -binary | "E:\SetUp\openssl-0.9.8k_WIN32\bin\openssl" base64
Enter keystore password:  123456
ga0RGNYHvNM5d0SLGQfpQWAPGJ8=

> Release
- C:\Program Files\Java\jdk1.8.0_201\bin>keytool -exportcert -alias mykeyalias -keystore "E:\MyWorks\Project\5_JStore\source\github\jstore\android\app\mykeystore.keystore" | "E:\SetUp\openssl-0.9.8k_WIN32\bin\openssl" sha1 -binary | "E:\SetUp\openssl-0.9.8k_WIN32\bin\openssl" base64
Enter keystore password:  123456
IH9WoU4WiPX94ZzadSnt21MA2w8=

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore E:\MyWorks\Project\5_JStore\source\github\jstore\android\app\mykeystore.keystore -destkeystore E:\MyWorks\Project\5_JStore\source\github\jstore\android\app\mykeystore.keystore -deststoretype pkcs12".
