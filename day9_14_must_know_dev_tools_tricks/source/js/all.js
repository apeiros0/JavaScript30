const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

// 檢查斷點
function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('Hi');

// Interpolated
// 透過 % 和參數來插入值
console.log("Hi I'm a %s string!", '123');

// Styled
// 使用  %c  插入 CSS 樣式 (%c 可以插入在任何地方)
console.log(
  '%c I am some gerat text!',
  'color: red; background: orange; text-shadow: 1px 1px 0 yellow'
);

// warning!
// 會出現警告的提示框
console.warn('OH Noooo~');

// Error
// 會出現錯誤的提示框
console.error('Shit!');

// Info
// 出現通知訊息
console.info('Monster ear 3-4 people per year');

// Testing
// 只會在為 false 時觸發，參數是為 false 顯示的結果
console.assert(1 === 2, 'That is wrong!');

// 能透過抓取 DOM 元素的 class 來判斷是否有該 class
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), 'That is wrong!');

// clearing
// 會清除 console 顯示的內容
// 可以放在 JavaScript 檔的最尾端
// console.clear();

// Viewing DOM Elements
// 可以查看 DOM 元素的所有屬性和方法
console.dir(p);

// Grouping together
// 加入 console.group(String) 和 console.groupEnd() 將相同訊息圈成一個群組
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} years old`);
  console.groupEnd();
});

// counting
// 計算特定的字 (string, number, object, DOM node …) 的次數
console.count('1');
console.count('2');
console.count('1');
console.count('3');
console.count('2');
console.count('1');

// timing
// 計算程式執行多久
// 使用 console.time(要顯示的 String) + console.timeEnd(要顯示的 String)
console.time('fetching data');
fetch('https://api.github.com/users/apeiros0')
  .then((data) => data.json())
  .then((data) => {
    console.timeEnd('fetching data');
    console.log(data);
  });

// table
// 用表格的方式顯示資料 (e.g. 陣列 或 物件)
console.table(dogs);
