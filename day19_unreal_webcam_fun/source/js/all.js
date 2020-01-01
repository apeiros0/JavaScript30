// 取得 video 的 DOM (會與 webcam 的影像綁定)
const video = document.querySelector('.player');

// webcam 的影像會以大約 16 毫秒 (不確定) 將影片快照，並儲存到 canvas 中
// 放入 canvas 中就能操作像素、改變顏色、加上濾鏡...
// 由於影片會從 video 元素消失，所以需要轉存到畫布中
const canvas = document.querySelector('.photo');
// 處理 canvas 的地方
const ctx = canvas.getContext('2d');

// 放置圖片 (拍下照片) 的地方
const strip = document.querySelector('.strip');
// 拍照的聲音
const snap = document.querySelector('.snap');


// 1. 將影像傳給 video 元素
// 執行時會要求取得相機的權限 (要選擇是)
// 會在右上角顯示 video 元素
function getVideo() {
  // 傳入的參數是請求 media 的類型
  // 會回傳 Promise
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    // 有取得 webcam 的權限
    .then(localMediaStream => {
      // localMediaStream 會得到 MediaStream 的物件
      // 包括 id, active... 的屬性
      console.log(localMediaStream);

      // 將 video element 的 src 設為 localMediaStream
      // 這樣不會運作，需要將物件轉為 URL，雖然與使用 .mp4 的檔案有差異，但這就是設為 live video 的方式
      // window.URL.createObjectURL() 會將 MideaStream 轉換為 video 可理解的內容
      // src 會是 blob:URL，這代表原始的資料是從 webcam 來的
      video.src = window.URL.createObjectURL(localMediaStream);

      // 播放影片 (沒有 play 的話只會顯示一幀)
      video.play();
    })
    // 透過 catch 顯示沒有取得 webcam 的權限的結果 (沒有裝 webcam 也會顯示)
    .catch(err => {
      console.error('Oh No!', err);
    });;
}


// 2. 從 video 中取得幀數，然後繪製到 canvas 上
// 需要取得 video 的寬和高 (右上角的 video)，確保 canvas 與其尺寸相同
// 如果不相同就必須要更改
function paintToCanvas() {
  // 取得 video 的寬和高
  const width = video.videoWidth;
  const height = video.videoHeight;

  // canvas 尺寸與呼叫後不同，是因為有透過 CSS 處理
  canvas.width = width;
  canvas.height = height;


  // 加上 return 是當要取消繪製時，呼叫 clearInterval(paintToCanvas()) 就能取消繪製
  // 從 video 取得每幀的圖片，並放進 canvas 中
  // 使用 setinterval 來每 16 毫秒取圖片
  return setInterval(() => {
    // drawImage 是在 canvas 上繪製圖片
    // 傳入 video 元素或圖片 drawImage 就會繪製圖片
    // 0, 0 是從 canvas 左上角，然後依寬高開始繪製
    ctx.drawImage(video, 0, 0, width, height);


    // 4. 加上濾鏡
    // 從 canvas 取出 pixels，將他們打亂、更改 RGB，再放回去
    // 會回傳每個 ImageData 的物件 (其中的 data 屬性是陣列，包含非常多的數字 (RGBA 的值，index 0->R; 1->G; 2->B; 3->A ...))
    // 參數是為了提取 ImageData 的位置和寬高
    // 取出 pixels
    let pixels = ctx.getImageData(0, 0, width, height);
    // 弄亂 pixels
    // pixels = redEffect(pixels);


    // RGBSplit
    // pixels = rgbSplit(pixels);
    // 設定透明度 (會有影像殘留的現象)
    // 由於設定透明度，圖片會一直堆疊，導致這現象產生
    // ctx.globalAlpha = 0.1;


    // GreenScreen
    pixels = greenScreen(pixels);

    // 放回 ImageData
    ctx.putImageData(pixels, 0, 0);
    // debugger; // 除錯模式
  }, 16);
}


// 3. 拍照
function takePhoto() {
  // 每次拍照都會從頭播放
  snap.currentTime = 0;
  snap.play();

  // 從 canvas 中取得 data (圖片)
  // 會回傳設定的格式的 base64 (包含 data-URL)
  // 會取得 Base64：圖片會基於文字的方式呈現 (會取得圖片的連結，圖片是儲存在文字當中)
  const data = canvas.toDataURL('image/jpeg'); // image/png 也可以

  // 建立 a 連結 (下載圖片) 和圖片 (顯示圖片) 放入到 strip (div) 中
  const link = document.createElement('a');
  link.href = data;
  // HTML5 的 download 屬性，第二個參數是 download 東西的名稱 (download 的值)
  link.setAttribute('download', 'handsome');

  link.innerHTML = `<img src="${data}" alt="Handsome Man">`;

  // insertBefore 是將新節點插入在子節點之間
  // 會將 link 差入到 strip.firstChild (第一個子節點)
  // 類似 jQuery 的 .prepend()，而這是原生的 JavaScript
  strip.insertBefore(link, strip.firstChild);
}


// 4. RedEffect 濾鏡
function redEffect(pixels) {
  // i += 4 是取得 pixels 的 data 屬性的 R 值
  // 這裡只是在搞亂 RGB 的值
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // R
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // G
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // B
    // pixels.data[i + 3]; // A 不用弄亂
  }
  return pixels;
}


// 4. RGBSplit 濾鏡
function rgbSplit(pixels) {
  // 將後面的 array 往前移 (會有重複的畫面)
  // 是將 RGB 分開，移到任一一側
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // R
    pixels.data[i + 500] = pixels.data[i + 1]; // G
    pixels.data[i - 150] = pixels.data[i + 2]; // B
  }
  return pixels;
}


// 4. GreenScreen 濾鏡
function greenScreen(pixels) {
  const levels = {};

  // 取得 Slider 的 input
  document.querySelectorAll('.rgb input').forEach(input => {
    // 將 input 的 name 和 value 存進物件
    levels[input.name] = input.value;
  });


  // 類似從 RGB 的顏色中取出某一個值
  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    // 在範圍內將值取出 (變為透明)
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // 將透明度設為 0 就能將那組顏色隱藏
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

// getVideo();

// 監聽
// 透過 video 的 canplay 事件觸發 paintToCanvas
// 當 video 播放，就會觸發事件 / emit (發送) 事件 (必須先透過 webcam 取得影像)
video.addEventListener('canplay', paintToCanvas);
