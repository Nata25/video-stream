export function checkGetUserMedia () {
  return ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)
}
