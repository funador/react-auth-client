export const launchPopup = (url, w, h) => {
  const dualScreenLeft = window.screenLeft !== undefined 
    ? window.screenLeft 
    : window.screenX

  const dualScreenTop = window.screenTop !== undefined 
    ? window.screenTop 
    : window.screenY

  const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width

  const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height

  const systemZoom = width / window.screen.availWidth
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop

  return window.open(url, '',       
    `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${w / systemZoom}, 
    height=${h / systemZoom}, top=${top}, left=${left}`
  )

}