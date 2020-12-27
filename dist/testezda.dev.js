"use strict";

function resolverDepoisDe2Segundos(x) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(x);
    }, 5000);
  });
}

function adicionar1(x) {
  var a, b;
  return regeneratorRuntime.async(function adicionar1$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          a = resolverDepoisDe2Segundos(20);
          b = resolverDepoisDe2Segundos(30);
          _context.t0 = x;
          _context.next = 5;
          return regeneratorRuntime.awrap(a);

        case 5:
          _context.t1 = _context.sent;
          _context.t2 = _context.t0 + _context.t1;
          _context.next = 9;
          return regeneratorRuntime.awrap(b);

        case 9:
          _context.t3 = _context.sent;
          return _context.abrupt("return", _context.t2 + _context.t3);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

adicionar1(10).then(function (v) {
  console.log(v); // exibe 60 depois de 2 segundos.
});