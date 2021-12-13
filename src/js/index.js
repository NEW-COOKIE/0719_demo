/* 
引入模块
 */
// import '@babel/polyfill';
import { sum } from './module1';
import { aub } from './module2';
import module3 from './module3';

// 引入less文件
import '../css/index.less';
import '../css/iconfont.less';

console.log(sum(1, 2));
console.log(aub(2, 3));
console.log(module3.mul(1, 2));
console.log(module3.div(1, 2));

setTimeout(() => {
  console.log('1');
}, 1000);

const myPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('2');
  }, 1000);
})

myPromise.then(
  value => {
    console.log(value);
  }
)

