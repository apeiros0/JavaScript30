// 當輸入 key 時，要 push 到 array
const pressed = [];
// 觸發事件的指令，要尋找的 code
const secretCode = 'apeiros';

// 監聽 window 的 keyup 事件
window.addEventListener('keyup', (e) => {
  // e.key 可以顯示 keyboard 輸入的 key 名稱
  pressed.push(e.key);
  console.log(pressed.length);
  // 依據 secretCode 的長度來限制 push 進去的數量
  // 從尾到前計數，也可取得新輸入的字

  // String.length 可計算字元長度 (包含空白)

  // splice 當 index 為負數，會從陣列的最後一個往前改動，deleteCount  為 0 或是負數，則不會有元素被刪除
  // 當輸入新元素，pressed 的長度會變成 8，所以透過 -secretCode.length - 1 能計算到倒數第 8 的位置 (開頭位置)
  // 刪除時，會將倒數第 8 的位置刪去 (push out)，新元素就能顯示 (保持相同長度)
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  console.log(pressed);

  // 檢查 pressed 有沒有包含 secretCode
  // 透過 join 將 array 轉成字串
  // String.includes() 會檢查有沒有包含輸入的字串；Node.contains() 是檢查有沒有子節點
  if (pressed.join('').includes(secretCode)) {
    // cornify.js
    // 增加獨角獸
    cornify_add();
  }
});
