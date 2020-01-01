// SpeechRecognition 是瀏覽器的 API
// SpeechRecognition 只在 Firefox 使用
// webkitSpeechRecognition 是 Chrome 的語音識別 API (function)
// 取得 window.SpeechRecognition 或 window.webkitSpeechRecognition API，然後設置給 window.SpeechRecognition (SpeechRecognition 是新增的屬性)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 建立 SpeechRecognition 的實體 (建立 SpeechRecognition 的物件)
const recognition = new SpeechRecognition();

// 控制臨時結果是否回傳
// 為 true 會即時回傳講話結果
// 為 false 需要講完話才會回傳
recognition.interimResults = true;

// 建立 p 段落
// 當說話時會新增 p 段落，並填上文字，
// 連續說話會更新 p 段落，
// 停止說話就會建立一個 p 段落 (因為這樣才用 let)
let p = document.createElement('p'); // 新增 p 元素
const words = document.querySelector('.words'); // 取得 .words 的 DOM
words.appendChild(p); // 在 words 插入子元素 p


// 監聽語音識別的事件
// 當有 result 時，就會觸發事件
// 當停止說話，再說一次就無法運作 (因為是透過 result 監聽，一旦 result 完成，就不會再監聽)
recognition.addEventListener('result', e => {
  // 會得到 SpeechRecognitionEvent 物件
  // SpeechRecognitionEvent 物件會有 results 屬性 (是物件，不是陣列)
  // SpeechRecognitionEvent 原型沒有 .map 或 .forEach
  // SpeechRecognitionEvent results 包括誰說了什麼、confidence (可信度，會多次分析語句)、isFinal 是決定話說完了沒
  console.log([...e.results]);

  // 處理 SpeechRecognitionEvent results 的多層物件 (巢狀)，最終轉換為字串顯示
  // { 0: { 0: { confidence, transcript } } }
  // 先將物件轉成陣列
  // [{ 0: { confidence, transcript }, ... }]
  const transcript = Array.from(e.results)

    // 取出第一層
    // [{ confidence, transcript }]
    .map(result => result[0])

    // 取出 transcript
    .map(result => result.transcript)

    // 將陣列組成字串
    .join('');

  // 顯示在 p 段落上 (會被新的語音覆蓋)
  p.textContent = transcript;

  // 當語音結束就建立新的 p 段落 (下次新的語音會加進來)
  if(e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }

  // 可透過特定關鍵字來觸發一些事
  if(transcript.includes('unicorn')) {
    console.log('🦄');
  }
});

// 當語音識別結束 (result 結束)，就觸發 start 重新啟動語音識別
recognition.addEventListener('end', recognition.start);


// 語音識別要透過 start() 開啟 (開啟後會觸發 result 的事件)
recognition.start();