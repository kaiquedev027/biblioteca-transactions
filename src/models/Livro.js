const mongoose = require("mongoose");

const LivroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },

  autor: {
    type: String,
    required: true
  },

  isbn: {
    type: String,
    required: true,
    unique: true
  },

  exemplares_total: {
    type: Number,
    required: true
  },

  exemplares_disponiveis: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Livro", LivroSchema);