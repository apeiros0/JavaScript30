const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// 建立 empty array 放遠端資料
const cities = [];

// 遠端取資料
// 使用瀏覽器的 API - fetch
// fetch 是瀏覽器新的取得遠端資料的方法，不會回傳資料，會回傳 Promise
// fetch('URL').then() 因為是 Promise 所以要用 .then() 來接資料
// fetch('URL').then(blob => blob.json()) 會回傳取得資料成功的 JSON，
// 這裡要透過呼叫原型的 json() 方法 (json() 會回傳 Promise)，再透過 .then() 串接來取得 JSON 資料

// 將資料塞給 const 宣告的變數 (e.g. array)
// 1. 將 const 修改成 let
// 2. 透過 push + 展開 (...) 將每筆值加到 const 宣告的 array

// array.push() 的特性：
// 會將單一的值直接加到 array，像是 array.push(1, 2, 3) -> [1, 2, 3]
// 所以這裡透過 ... (展開) 將陣列每筆值取出，再塞入到 cities 中

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

// 傳入輸入的字，並做過濾
function findMatches(wordToMatch, cities) {
  return cities
    .filter((place) => {
      // 要弄清是要尋找 city 還是 state
      const regex = new RegExp(wordToMatch, 'gi'); // 設立條件
      // 比對 city 和 state，其中一方符合就回傳 true 做過濾
      return place.city.match(regex) || place.state.match(regex);
      // 使用正規式來做配對，match 會回傳 true

      // 該如何傳入變數與正規式搭配使用，
      // /wordToMatch/i 這個會直接與 wordToMatch 這個字做搜尋
      // 改用另一個正規式語法 new RegExp(variable, 'regex') 來傳入變數比對
      // g 是指全域的意思，會找到整段字符合的
      // i 是指不分大小寫比對
    })
    .sort((a, b) => (a.city > b.city ? 1 : -1));
}

// input 改變值後，顯示結果到 ul > li 中
// 透過這個 function 先取得值，再來找出配對的字
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      // 依據輸入的字，顯示字的 highlight
      const regex = new RegExp(this.value, 'gi'); // 設立條件
      // replace 只要符合正規式就取代成 class="hl" (replace match 適合與正規式一起使用)
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      // 直接輸入 HTML，這裡不會被 jade 編譯
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    })
    .join('');
  // 由於 map 會回傳陣列，直接顯示出來的話，畫面會有 ,
  // 所以透過 join('') 合併陣列成一個字串
  // join('') 是指不用任何符號隔開

  suggestions.innerHTML = html;
}

// 格式化數字，加入 ,
function numberWithCommas(x) {
  // replace(/正規式條件/, '要取代的東西')
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 取得 DOM 元素
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// 需要點擊輸入框外才會觸發
searchInput.addEventListener('change', displayMatches);
// 輸入值後就會觸發
searchInput.addEventListener('keyup', displayMatches);
