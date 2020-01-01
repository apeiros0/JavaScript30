// 取得所有 checkbox，監聽 checked 事件
// 取得 .inbox 下的所有 input[type="checkbox"]
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

// 紀錄第一個 checkbox，使用 let 是因為它會不斷地被重新指派
let lastChecked;

// 處理 check 事件
// 當點擊第一個 checkbox 時，需要被記錄在變數中，因為當點擊第二個 checkbox 時，要按住 Shift，我們需要知道上一個 checkbox 是什麼
function handleCheck(e) {
  let inBetween = false; // flag, 判斷是否在兩個已經 checked 的 box 之間
  // 檢查 Shift 是否有按下
  // shiftKey 是當 Shift 被按下時回傳 true
  // 當 unchecked 時，仍然會觸發 handleCheck，也需要檢查是否已經 checked box
  if (e.shiftKey && this.checked) {
    // 當已經 checked 且 Shift 按下時執行
    // 透過 loop 檢查每個 checkbox，當遇到已經 checked 的 checkbox 就開始 checked，直到遇到下一個已經 checked 的 checkbox
    // 要找到第一個 checked 和下一個 checked (找出它們之間的所有元素) (其他人只要稍微更改 HTML 就很容易崩潰)

    // 第一次 checked 是紀錄 checkbox
    // 當第二次 checked + 按下 Shift，就會開始判斷是否在 checked 的 box 之間
    // 不管是從上往下 checked，還是相反，當第一次條件符合 inBetween 就為 true
    // 第二次條件符合就為 false，關閉連續 checked


    // loop 每個 checkbox
    checkboxes.forEach((checkbox) => {
      console.log(checkbox)
      // 遇到選取的 checkbox 或上一個 checkbox，inBetween 就為相反的 inBetween
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween; // 開始和關閉連續 checked
        console.log('Starting checked');
      }

      // 連續 checked
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this; // 紀錄上一個 checkbox
}

// 這裡與鍵盤搭配的事件，是透過 click 事件來觸發
checkboxes.forEach((checkbox) =>
  checkbox.addEventListener('click', handleCheck)
);