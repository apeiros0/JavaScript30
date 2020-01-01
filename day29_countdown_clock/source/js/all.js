// 儲存 interval (clearInterval 用)
// 會儲存在 window 中，但可用 IIFE 解決
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
// 取得包含 data-time 屬性的 DOM
const buttons = document.querySelectorAll('[data-time]');

// 建立 timer function
function timer(seconds) {
  // 由於點擊新的 button 造成許多的 setInterval 在執行，使得畫面的時間跳來跳去
  // 所以每次點擊新的 button 都要清除 setInterval
  clearInterval(countdown);

  // 同樣會用 setInterval 製作，但會以不同的方式製作
  // 我們要先弄清 timer 何時啟動 (被呼叫)
  const now = Date.now();
  // 取得要倒數的 timestamp 
  const then = now + (seconds * 1000);
  // 顯示時間
  // 放在這裡是因為 setInterval 是 1 秒後才會執行，所以並不會顯示傳入的秒數，
  // 因此得呼叫 displayTimeLeft 顯示傳入秒數，之後執行 setInterval
  displayTimeLeft(seconds);

  // 顯示結束時間 (會傳入已計算好的時間)
  displayEndTime(then);

  // 顯示每秒鐘的剩餘時間
  countdown = setInterval(() => {
    // 弄清剩餘多少時間
    // 不使用 now 變數是因為它會取得執行時的時間 (不會變動)
    // 這裡透過 倒數的時間 - 每秒取得新時間 來計算剩餘多少時間 (毫秒)
    // 除 1000 是換算回 秒
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    
    // 檢查小於 0 就停止 interval (小於 0 使為了讓 0 能顯示)
    if (secondsLeft < 0) {
      // 只使用 return; 不會停止 setInterval，還是會不斷執行，只是不會顯示而已
      clearInterval(countdown);
      return;
    }

    // 顯示時間
    displayTimeLeft(secondsLeft);
  }, 1000);
}


function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  // 這裡將 `...` 拉出來是因為要使用多次
  const display = `
    ${ minutes < 10 ? '0' : '' }${ minutes }:${ remainderSeconds < 10 ? '0' : '' }${ remainderSeconds }
  `;
  timerDisplay.textContent = display;
  
  // 顯示在分頁的 tab 上
  // document.title 是 HTML 的 title tag
  document.title = display;
}


// 顯示結束的時間 (2 點 30 分，休息 5 分，結束時間是 2 點 35 分)
function displayEndTime(timestamp) {
  // 使用 new Date 將 timestamp 轉回時間
  // 也能透過這個 new Date 取得 year, month, day...
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minute = end.getMinutes();

  // `...` 沒有拉出來是因為只使用一次
  // 減 12 換算回 12 小時制
  endTime.textContent = `
    Be Back At ${ hour < 10 ? '0' : '' }${ adjustedHour }:${ minute < 10 ? '0' : '' }${ minute }
  `;
}


function startTimer() {
  // 取得 [data-time] 屬性的 dataset
  // 透過 parseInt 轉成 number
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => { button.addEventListener('click', startTimer) });


// 如果 <form> 有 name attribute，可透過 document.name (name attribute 的值) 取得表單的 node
// () => {...} 無法在 addEventListener 取得 this
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // 取得 <form> 的 name attribute 為 minutes 的 node，並取得它的值
  const mins = parseInt(this.minutes.value);
  // 因為 input 是輸入分鐘，但 timer 只接受秒，所以要乘上 60
  timer(mins * 60);
  // 清空表單內容
  this.reset();
});