// 取得全部包含 data-time 的 li (可能會有其他 li，所以透過 data-time 來取得)
// nodeList 不是 array，所以要轉型成 array
// 1. 使用 Spread [...]
// 2. Array.from();
const timeNodes = [...document.querySelectorAll('[data-time]')];

// 取得每個 data-time 的秒數，並將全部加總
const seconds = timeNodes
  // 將將 nodeList 每個項目的 data-time 取出，轉換為的字串 Array
  .map(node => node.dataset.time)

  // 轉換成秒數 (數值)，透過 split(':') 將分和秒用 : 切為陣列
  .map(timeCode => {
    // 使用解構賦值
    // 再透過 map 將字串都轉為 Float
    const [mins, secs] = timeCode.split(':').map(parseFloat);

    // 如果直接輸出(強制轉型)，結果會變成 數值 + 字串 的轉型
    return (mins * 60) + secs;
  })

  // 透過 reduce 來做秒數的加總 (numbers)
  // 如果說 map 是輸入 array 導出 array 的話；reduce 是輸入 array 導出任何你相要的東西 (string, number, object ...)
  // vidseconds 是每個秒數 (每個 video 的秒數)
  .reduce((total, vidseconds) => total + vidseconds, 0);


const seconds2 = timeNodes.reduce((total, time) => {
  // 先取出 data-time 的時間，再透過 split(':') 轉換成陣列，然後透過 map 將每個時間轉換為數值 (float)
  const [mins, secs] = time.dataset.time.split(':').map(parseFloat);
  return total + (mins * 60) + secs;
}, 0);


// 將 seconds 轉換為時、分、秒
let secondsLeft = seconds;
// floor 是取最大整數
const hours = Math.floor(seconds / 3600);

// 取得剩下的秒數 (餘數)
// % (mod) 是取得平分後剩下的東西
// 取得被小時分走後，剩餘的秒數
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);

// 被分鐘分走後，剩餘的秒數
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft, seconds);