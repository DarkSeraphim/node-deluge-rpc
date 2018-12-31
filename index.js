const tls = require('tls');
const zlib = require('zlib');
const bencode = require('bencode');

const socket = tls.connect(
  58846,
  {
    rejectUnauthorized: false,
  }
);

function nextPowerOf2(n) {
  return Math.pow(2, Math.floor(Math.log2(n)) + 1);
}

let readable = socket.pipe(zlib.createInflate());

let capacity = 256;
let buffer = Buffer.alloc(capacity);
readable.on('data', data => {
  if (buffer.length + data.length < capacity) {
    // TODO: copy data to buffer
  } else {
    capacity = nextPowerOf2(buffer.length, data.length);
    buffer = Buffer.concat([buffer, data], capacity);
  }
});

socket.on('end', () => {
  // TODO: handle close
});
