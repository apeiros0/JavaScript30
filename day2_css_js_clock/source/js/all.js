const secondHand = document.querySelector('.second-hand'); // 取得秒數的 DOM (也可以寫在 function 裡，取決於你怎麼設計你的 function)
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date(); // 取得現在時間

  const seconds = now.getSeconds();
  const secondsDegress = ((seconds / 60) * 360) + 90; // 計算時間跑多少角度 (+ 90 度是為了調整到正確位置)
  secondHand.style.transform = `rotate(${secondsDegress}deg)`; // 使用 style 設定 transform
  
  const mins = now.getMinutes();
  const minsDegress = ((mins / 60) * 360) + 90;
  minHand.style.transform = `rotate(${minsDegress}deg)`;
  
  const hours = now.getHours();
  const hoursDegress = ((hours / 12) * 360) + 90; // 12 小時制
  hourHand.style.transform = `rotate(${hoursDegress}deg)`;
}

// 使用 setInterval 每秒執行 function
setInterval(setDate, 1000);

// 看 transform 度數時會發現到 60 秒時，會出現兩種度數 (90度 (+ 90 的原因) 和450度)