// 取得全部 input 的 DOM (有重複相同的標籤可用 querySelectorAll 來取得)
// querySelectorAll 會給你一個 array，但實際上是給你 NodeList (不是 array)
// NodeList 與 array 不同的是，array 有許多方法能處理 (e.g. map、reduce...)，
// NodeList 只有少數幾個方法能處理 (e.g. entries、forEach、keys、values ...)
// 所以有時會將 NodeList 轉換成 array 來處理
// 這個範例我們用 forEach 方法就行，所以不必轉換成 array (除非老舊瀏覽器的 NodeList 不支援 forEach)
const inputs = document.querySelectorAll('.controls input');

// 透過 input 更新 CSS
// 這裡我們要先知道 CSS 值的後綴詞是什麼，像是 px (透過 data-sizing 取得 (data-...))
function handleUpdate() {
  // dataset (Object) 可取得 data- 你所設的 attribute 和值
  // color 的 input 沒有 data attribute，所以加上 '' (nothing 的意思) 來填補 (沒有加的話，color 會取得 undefined)
  const suffix = this.dataset.sizing || '';

  // 取得 CSS 變數
  // 從 document 來取得 CSS 變數 (變數名稱透過 input 的 name 取得)，並設值
  // 使用 document.documentElement.style.setProperty('取得 property', 設定的 value + 有單位要加後綴詞) 來設值 (會在 <html> 加上 style='')
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

// 建立監聽事件
// handleUpdate 透過 closure 取得 addEventListener 的 this 變數 (input 物件)
// 使用 change 事件來觸發 function
inputs.forEach((input) => input.addEventListener('change', handleUpdate));
// 拖曳 range 是不會觸發 change，所以我們可以使用 mousemove 事件來監聽
inputs.forEach((input) => input.addEventListener('mousemove', handleUpdate));

// 也可透過在外層加上 style="--base: #000000"，這樣會改變內層變數的值 (即使外層有變數設定)
// 因為 CSS (Cascading 串接 Style Sheets) 內層的樣式會贏過外層的 CSS (越接近 HTML 的元素越有優先權)