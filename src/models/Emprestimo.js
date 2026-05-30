const mongoose = require("mongoose");

const EmprestimoSchema = new mongoose.Schema({
  livro_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livro",
    required: true
  },

  usuario_nome: {
    type: String,
    required: true
  },

  data_emprestimo: {
    type: Date,
    default: Date.now
  },

  data_devolucao_prevista: {
    type: Date,
    required: true
  },

  data_devolucao_real: {
    type: Date
  },

  status: {
    type: String,
    enum: ["ativo", "devolvido"],
    default: "ativo"
  }
});

module.exports = mongoose.model("Emprestimo", EmprestimoSchema);