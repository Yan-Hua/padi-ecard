# padi-ecard
Ecard for multi-terminal

## Prerequisites

node.js（>=8.0.0）
npm

## Configuration instructions

1.npm install -g @tarojs/cli
2.npm install
3.Download alipay developer IDE
  Download wechat developer IDE
4.Login account in IDE
5.Add related applications

## Run scripts

alipay   
	$ npm run dev:alipay
	$ npm run build:alipay
	$ taro build --type alipay --watch
	$ taro build --type alipay
wechat
	$ npm run dev:weapp
	$ npm run build:weapp
	$ taro build --type weapp --watch
	$ taro build --type weapp
baidu
	$ npm run dev:swan
	$ npm run build:swan
	$ taro build --type swan --watch
	$ taro build --type swan
tt 
	$ npm run dev:tt
	$ npm run build:tt
	$ taro build --type tt --watch
	$ taro build --type tt
h5
	$ npm run dev:h5
	$ npm run build:h5
	$ taro build --type h5 --watch
react native
	$ npm run dev:rn
	$ taro build --type rn --watch
