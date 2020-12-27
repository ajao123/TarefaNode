"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

var bodyParser = require('body-parser');

var firebase = require('firebase');

var Auth = require('./firebase.js');

var ejs = require('ejs');

var _require = require('console'),
    time = _require.time;

var util = require('util');

var app = express();

var publicDir = require('path').join(__dirname, '/public');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"](publicDir));
app.set('view engine', 'ejs');
app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var Tarefa = function Tarefa(id, nome, timestamp, concluida) {
  _classCallCheck(this, Tarefa);

  this.id = id;
  this.nome = nome;
  this.timestamp = timestamp;
  this.concluida = concluida;
};

app.get('/', function (req, res) {
  res.send("dole");
});
app.post('/fb', function (req, res) {
  try {
    list = [];
    var time_min = req.body.data_min;
    var time_max = req.body.data_max;
    var time_min_partes = time_min.split(" ");
    var time_max_partes = time_max.split(" ");
    var hora_min_partes = time_min_partes[0].split(":");
    var data_min_partes = time_min_partes[1].split("/");
    var hora_max_partes = time_max_partes[0].split(":");
    var data_max_partes = time_max_partes[1].split("/");
    console.log(hora_min_partes);
    console.log(data_min_partes);
    data_min_partes[1] = String(parseInt(data_min_partes[1]) - 1);
    data_max_partes[1] = String(parseInt(data_max_partes[1]) - 1);
    var datum_min = new Date(Date.UTC(data_min_partes[2], data_min_partes[1], data_min_partes[0], hora_min_partes[0], hora_min_partes[1], hora_min_partes[2]));
    var datum_max = new Date(Date.UTC(data_max_partes[2], data_max_partes[1], data_max_partes[0], hora_max_partes[0], hora_max_partes[1], hora_max_partes[2]));

    if (datum_min > datum_max) {
      res.status(500).send("Erro: Data Máxima inferior à data Mínima");
    }

    datum_min = parseFloat(datum_min.getTime()) + 10800000;
    datum_max = parseFloat(datum_max.getTime()) + 10800000;
    console.log(datum_min);
    console.log(datum_max);
    var ref = firebase.database().ref('tarefas');
    var testar = false;
    ref.orderByChild("timestamp").startAt(datum_min).endAt(datum_max).on("child_added", function (snapshot) {
      var tarefa = new Tarefa(snapshot.val().id, snapshot.val().nomeTarefa, snapshot.val().timestamp, snapshot.val().concluida);
      list.push(tarefa);
      testar = true;
    });
    aguardar(testar).then(function (v) {
      if (list.length > 0) {
        res.send(list);
      } else {
        res.status(204).send(list);
      }
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

function sleep(x) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(x);
    }, x);
  });
}

function aguardar(testar) {
  return regeneratorRuntime.async(function aguardar$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sleep(1000));

        case 2:
          if (!testar) {
            aguardar(testar);
          }

          return _context.abrupt("return", testar);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}