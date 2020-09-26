export function checkNavigator () {
  return ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)
}
