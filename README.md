## 介绍
uni.request axios适配器

## 安装
```
yarn add uni-request-adapter
```
or
```
npm install uni-request-adapter --save
```

## 使用
```js
import axios from 'axios';
import adapter from 'uni-request-adapter';

axios.defaults.adapter = adapter;
```