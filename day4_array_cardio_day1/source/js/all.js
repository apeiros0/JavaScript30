// ## Array Cardio Day 1
// JavaScript Array Methods 介紹
// filter、map、sort、reduce ...等 array 方法

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = [
  'Beck, Glenn',
  'Becker, Carl',
  'Beckett, Samuel',
  'Beddoes, Mick',
  'Beecher, Henry',
  'Beethoven, Ludwig',
  'Begin, Menachem',
  'Belloc, Hilaire',
  'Bellow, Saul',
  'Benchley, Robert',
  'Benenson, Peter',
  'Ben-Gurion, David',
  'Benjamin, Walter',
  'Benn, Tony',
  'Bennington, Chester',
  'Benson, Leana',
  'Bent, Silas',
  'Bentsen, Lloyd',
  'Berger, Ric',
  'Bergman, Ingmar',
  'Berio, Luciano',
  'Berle, Milton',
  'Berlin, Irving',
  'Berne, Eric',
  'Bernhard, Sandra',
  'Berra, Yogi',
  'Berry, Halle',
  'Berry, Wendell',
  'Bethea, Erin',
  'Bevan, Aneurin',
  'Bevel, Ken',
  'Biden, Joseph',
  'Bierce, Ambrose',
  'Biko, Steve',
  'Billings, Josh',
  'Biondo, Frank',
  'Birrell, Augustine',
  'Black, Elk',
  'Blair, Robert',
  'Blair, Tony',
  'Blake, William'
];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
// 1. 過濾在 1500 年間出生的人
const fifteen = inventors.filter(
  (inventor) => inventor.year >= 1500 && inventor.year < 1600
);
console.table(fifteen);

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
const fullNames = inventors.map(
  (inventor) => `${inventor.first} ${inventor.last}`
);
console.log(fullNames);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const ordered = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));
console.table(ordered);

// Array.prototype.reduce()
// 4. How many years did all the inventors live? (全部的發明家總共活了多久 ?)
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);

console.log(totalYears);

// 5. Sort the inventors by years lived (依據年齡排序：老到年輕)
const oldest = inventors.sort((a, b) => {
  const lastGuy = a.passed - a.year; // 上一個人的年齡
  const nextGuy = b.passed - b.year; // 下一個人的年齡
  return lastGuy > nextGuy ? -1 : 1; // -1 排序下降；1 排序上升 (年紀大上升，年紀小下降)
});

console.table(oldest);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// // 取得連結中的 DOM 元素 mw-category (包含全部名稱的 div 區塊)
// const category = document.querySelector('.mw-category');

// // 取得 mw-category 中所有的連結 (如果區塊裡面有其他元素，可以直接透過區塊往下取得其他元素)
// const links = Array.from(category.querySelectorAll('a'));

// // 將連結 List 轉換成連結名稱的 List，並過濾出 'de'
// const de = links
//   .map((link) => link.textContent)
//   .filter((streetName) => streetName.includes('de'));

// 7. sort Exercise
// Sort the people alphabetically by last name (依照 last name 的字母排序)

const alpha = people.sort((lastOne, nextOne) => {
  // 將人名用 split 切割成陣列，再透過解構賦值將 array 的 lastName 和 firstName 存進 Last 和 First 的變數中
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1; // 比較 Last 做排序
});

console.log(alpha);

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck'
];

const transportation = data.reduce((obj, item) => {
  // 檢查 obj 是否有 key
  if (!obj[item]) {
    obj[item] = 0; // 設定初始值給 obj[item]
  }
  obj[item]++; // obj 有 item 就 +1
  return obj;
}, {});

console.log(transportation);
