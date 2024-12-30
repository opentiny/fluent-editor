export function insertPeterCatAssistant() {
  if (typeof document === 'undefined') return
  const peterCatScript = document.createElement('script')
  const peterCatScriptStr = `
    PetercatLUI.initAssistant({
      apiDomain: 'https://api.petercat.ai',
      token: '9c1a0119-88fe-48c5-8ca8-92ef839b542a',
      starters: ['介绍下这个项目', '查看贡献指南', '我该怎样快速上手'],
      clearMessage: true
    });
  `
  peterCatScript.textContent = peterCatScriptStr
  document.body.append(peterCatScript)
}
