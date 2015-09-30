'use strict';

function prompt (msg) {
  function stop () {
    console.error();
    process.stdin.setRawMode(false);
    process.stdin.pause();
  }

  process.stdin.setEncoding('utf8');
  process.stderr.write(msg);
  process.stdin.resume();
  process.stdin.setRawMode(true);
  let input = '';
  let fn = function (c) {
    switch(c) {
    case "\u0004": // Ctrl-d
    case "\r":
    case "\n":
      if (input.length === 0) return;
      stop();
      process.stdin.removeListener('data', fn);
      console.log(input);
      return;
    case "\u0003":
      // Ctrl-c
      reject('');
      stop();
      process.stdin.removeListener('data', fn);
      return;
    default:
      // backspace
      if (c.charCodeAt(0) === 127) input = input.substr(0, input.length-1);
      else input += c;
      return;
    }
  };
  process.stdin.on('data', fn);
}

prompt('password (typing will be hidden): ');
