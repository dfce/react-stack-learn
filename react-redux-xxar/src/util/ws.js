// import wss from 'ws';

const Service = '192.168.184.235:8088/game/';

let __WS = false;
let _webSocket;


if (typeof WebSocket !== 'undefined') {
  _webSocket = WebSocket;
} else if (typeof MozWebSocket !== 'undefined') {
  _webSocket = MozWebSocket;
} else {
  _webSocket = window.WebSocket || window.MozWebSocket;
}

export default {_webSocket};