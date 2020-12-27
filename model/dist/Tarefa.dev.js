"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tarefa = function Tarefa(id, nome, timestamp, concluida) {
  _classCallCheck(this, Tarefa);

  this.id = id;
  this.nome = nome;
  this.timestamp = timestamp;
  this.concluida = concluida;
};