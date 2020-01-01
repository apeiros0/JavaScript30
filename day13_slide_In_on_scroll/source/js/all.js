// debounce
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// 取得所有 img 的 DOM (class 有 slider-in 的 img)
const sliderImages = document.querySelectorAll('.slide-in');
// 檢查滾動
// e 觸發事件時回傳入的參數，會保留當前事件的消息 (事件會在 argument 中，有參數就傳給參數)
// e 是放在 window.event 中 (觸發時才會有值)
// scroll 會有效能問題，滾動時會一直執行，所以要透過執行 debounce 來減少次數
// 滾動時會執行 debounce，但只會每 20 毫秒執行一次 (這樣就不會有效能的問題)
function checkSlide(e) {
  // 取得所有圖片，弄清要在哪裡顯示 (大概滾動到圖片高度約 50 % 的位置顯示效果)
  sliderImages.forEach((sliderImage) => {
    // scrollY 取得頁已滾動的值 (從頂部計算)
    // 還需要知道當前視窗的底部 (innerHeight：window 內容區域的高度)
    // window.scrollY + window.innerHeight 是固定當前的高度

    // 取得當前到圖片一半高度前的距離
    const slideInAt =
      (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    // 取得圖片底部，往上滾時圖片能滑回去
    // offsetTop 是取得元素的頂部至 window 內容區域頂部之間的高度
    // + sliderImage.height 是取得圖片底部至 window 內容區域頂部之間的高度
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    // 用變數儲存，讓之後回來能看懂 if 條件式
    // slideInAt 超過 offsetTop 代表已經滾過圖片的頂部
    const isHalfShown = slideInAt > sliderImage.offsetTop;

    // 判斷是否還沒將圖片滾完
    const isNotScrolledPast = window.scrollY < imageBottom;

    // 圖片滾過圖片的頂部 + 還沒將整張圖片滾完就加入效果
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

// 當視窗滾動時觸發
// 傳入 function 給事件處理器，this 就會指向觸發事件的 DOM 元素
// debounce(func, wait) 可傳入時間決定等待多少時間
window.addEventListener('scroll', debounce(checkSlide));
