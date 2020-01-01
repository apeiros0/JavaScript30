// start with strings, numbers and booleans
// strings, numbers 和 booleans 都是一樣的
// 更改其中一個不會對另一個造成影響
let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let name = "apeiros0";
let name2 = name;
console.log(name, name2);
name = "apeiros1";
console.log(name, name2);

// Let's say we have an array
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// and we want to make a copy of it.
const team = players;

console.log(players, team);

// You might think we can just do something like this:
team[3] = "Leo";

console.log(players, team);

// however what happens when we update that array?
// team 不是新的 array，而是參照到原始的 array (players)
// 所以當編輯原始的 array，或是更新任一個 array 時，都會參照到同一個位址
// 與 strings, numbers 和 booleans 不一樣

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!

// one way
// copy array
// 1. slice 會回傳新的陣列，沒有傳入參數就複製陣列全部的東西
const team2 = players.slice();
team2[2] = "Alice";

// or create a new array and concat the old one in
// 2. concat 會合併陣列，並回傳新的陣列 (透過 [] 合併)
const team3 = [].concat(players);

// or use the new ES6 Spread
// 3. ES6 spread 會將每個東西取出，放入所包含的東西，會回傳新的陣列
const team4 = [...players];
team4[3] = "Go";
console.log(team4);

// Array.from() 轉成新的陣列
const team5 = Array.from(players);
team5[3] = "Cat";
console.log(team5);

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object
// 與 array 相同的事情也會發生在物件身上

// with Objects
const person = {
  name: "Wes Bos",
  age: 80
};

// 想要複製物件，不能這麼做 (會參照到同一個位址)
// const captain = person;
// captain.number = 99;

// and think we make a copy:

// how do we take a copy instead?
// copy object
// 1. Object.assign(target, ...sources) 會將 sources 的物件 (可以有多個，用 , 隔開) 複製到 target，有重複的屬性就會覆蓋上去
const captain2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(captain2);

// We will hopefully soon see the object ...spread
// 2. 使用 ES6 spread 展開物件
const captain3 = { ...person };
console.log(captain3);

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
// shallow copy 只會對第一層的物件做複製 (第二層以後都不會複製)
// Object.assign 是 shallow copy
const apeiros0 = {
  name: 'apeiros0',
  age: 100,
  social: {
    twitter: '@apeiros0',
    line: 'apeiros0'
  }
}

console.clear();
console.log(apeiros0);

const dev = Object.assign({}, apeiros0);
dev.name = 'Alice'
console.log(dev);

dev.social.twitter = '@Alice';
console.log(apeiros0, dev);

// 要完整複製就要透過搜尋 clone deep 找出 function，來將每個層級都複製

// 也有一些作弊的方法來完整複製物件所有層級 (不建議的做法)
// JSON.stringify(apeiros0) 會傳入全部的物件，並回傳字串
// 然後又透過 JSON.parse 將字串轉回物件，這樣就得到完整的複製
const dev2 = JSON.parse(JSON.stringify(apeiros0));