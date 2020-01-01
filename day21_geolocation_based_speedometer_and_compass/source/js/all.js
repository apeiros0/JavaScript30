// 取得 arrows (svg) 的 DOM
const arrow = document.querySelector('.arrow');
// 取得 speed (span) 的 DOM
const speed = document.querySelector('.speed-value');


// 監聽使用者的位置
// 有 watchPosition 和 getCurrentPosition 方法能使用
// watchPosition: 當使用者的設備位置更新，會自動呼叫來取得位置 (移動幅度不大，更新頻率會降低，反之，更新幅度會提升)
// getCurrentPosition: 取得使用者的設備的當前位置 (只會取得一次)
// watchPosition 第一個參數是有成功取得權限執行的 function；第二個是沒有取得權限執行的 function
navigator.geolocation.watchPosition((data) => {
  // 會取得座標和時間戳記
  // 座標物件有 accuracy (m, 準確度)、heading (deg)、latitude (緯度)、longitude (經度)、speed (km/h) 屬性
  console.log(data);

  // 更新前進速度
  // 也能使用 Math.round() 做四捨五入 (更新會不太明顯)
  speed.textContent = data.coords.speed;

  // 旋轉指北針 (依據我們所在的方位 (deg))
  // heading 以北方為基準旋轉，東邊是 90 以此類推 (360 度)
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
  console.err(err);
  alert('尚未取得定位的權限!');
});