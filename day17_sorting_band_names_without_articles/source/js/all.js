const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// 過濾 (取代) The / A / An
function strip(bandName) {
  // 使用正規式來取代 The / A / An
  // ^ 是代表字串的開頭有什麼
  // | 是 or 的意思
  // i 是不分大小寫，會配對不同大小寫
  // 有空格是因為開頭有包含空格 (也可以用單字來配對，加上空格是確保 An / A 不會配對到像 Anywhere 的單字)
  // trim 是確保字串前後不會有空格 (包含取代字串後)
  // 會回傳不包含 The / A / An 開頭的字串
  return bandName.replace(/^(a |the |an )/i, '').trim();
}

// sort 會以第一個遇到的字母排序 (number 和 string 都能用 sort 排序)
// 會取得依字母排序的 array
const sortedBands = bands.sort((a, b) => {
  // strip 是用在 if 陳述式，並沒有實際修改 bands array
  return strip(a) > strip(b) ? 1 : -1;
});

// 顯示到 ul 上，透過 map 加入 <li>，再使用 join 合併成字串
// 拿掉 join，當一些非字串要塞給 innerHTML 時，會透過 toString 強制轉成字串 (array 會連 , 一起轉換)
// 所以才要透過 join 連接字串 (array 不會有 ,)
document.querySelector('#bands').innerHTML =
  sortedBands
    .map(sortedBand => `<li>${sortedBand}</li>`)
    .join('');

