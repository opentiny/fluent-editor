export function insertBaiduScript() {
  if (typeof document === 'undefined') return
  const baiduScript = document.createElement('script')
  const baiduScriptStr = `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?7ef6842ba985ef3ce65c596196d20a23";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  `
  baiduScript.textContent = baiduScriptStr
  document.body.append(baiduScript)
}
