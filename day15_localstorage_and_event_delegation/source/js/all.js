// 取得 form 表單的 DOM (某個人按下 submit 就會新增項目)
const addItems = document.querySelector('.add-items');
// 取得 ul 的 DOM (顯示資料的地方)
const itemsList = document.querySelector('.plates');
// 先取得 localStorage 的陣列，localStorage 沒有東西就換成 [] (沒有東西會回傳 null)
// 儲存資料的地方，會透過物件存入 (物件會有 name 和 done 屬性)
const items = JSON.parse(localStorage.getItem('items')) || [];
const clearButton = document.querySelector('.clear');
const checkButton = document.querySelector('.check');
const uncheckButton = document.querySelector('.uncheck');


function addItem(e) {
  // 會阻止頁面重新載入
  // 預設的情形下，表單會重新載入頁面或將資料向外部來源 (通常是伺服器端) 發送
  // 在這個範例中，是在客戶端操作，所以會避免預設情況發生
  e.preventDefault();

  // 取得 input:text 的值，然後放入物件中
  // 先透過 this 取得 addItems 的 DOM，再透過 [name="item"] 取得 input:text
  // 使用 () 包覆會優先執行，會先給我們 input:text，再透過 value 取值
  const text = (this.querySelector('[name="item"]')).value;
  const item = {
    // 物件 Name/Value 同名可省略
    text,
    done: false
  };

  items.push(item);

  // 每次增加新項目就會呼叫 populateList，而 List 會重新渲染
  populateList(items, itemsList);


  // 儲存資料到 LocalStorage
  // 包含 setItem(), getItem(), removeItem(), deleteItem() 的方法
  // 需要使用 JSON.stringify() 來轉換，會將物件和陣列轉成 JSON 字串
  // 透過 JSON.parse() 可以將 JSON 字串轉回原本的型態 (物件或陣列)
  // 可到 Chrome Dev tools 清除 localStorage
  localStorage.setItem('items', JSON.stringify(items));


  // reset() 是表單的方法，會將表單清空
  this.reset();
}


// 切換 done 的狀態 (event delegation)
function toggleDone(e) {
  // 把非 input 都擋掉
  // e.target 可以看到觸發事件的 DOM
  if (!e.target.matches('input')) return;

  // 使用 data-index 參照在陣列中的位置
  const el = e.target;
  const index = el.dataset.index; // 透過 dataset 取得元素的 data
  // array/object[index] 寫法適合用來切換單一元素
  items[index].done = !items[index].done; // 取得相反的 done (在 true 和 false 之間轉換)
  localStorage.setItem('items', JSON.stringify(items)); // 重新加入到 localStorage 中
  populateList(items, itemsList); // 更新 HTML
}


// 顯示到 HTML
function populateList(plates = [], platesList) {
  // map 會遍歷陣列的每個項目 (plate 是物件)，並回傳新的陣列
  platesList.innerHTML = plates.map((plate, index) => {
    return `
      <li>
        <input type="checkbox" data-index=${ index} id="item${index}" ${plate.done ? 'checked' : ''} />
        <label for="item${index}">${plate.text}</label>
      </li>
    `;
  }).join('');
  // innerHTML 需要字串，所以透過 join('') 將陣列轉成字串
}


function clearItems() {
  // splice(0) 能清空陣列
  items.splice(0);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
}


function toggleAllItems(isDone = false) {
  // 將全部 check/uncheck
  items.forEach(item => {
    item.done = isDone;
  });

  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
}


// 監聽 form 表單的 submit 事件
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearButton.addEventListener('click', clearItems);
checkButton.addEventListener('click', () => toggleAllItems(true));
uncheckButton.addEventListener('click', () => toggleAllItems());

// 頁面載入時呼叫，localStorage 有東西就會載入
populateList(items, itemsList);