const mongoose = require("mongoose");

const Livro = require("../models/Livro");
const Emprestimo = require("../models/Emprestimo");


async function registrarEmprestimo(livroId, usuarioNome) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const livro = await Livro.findById(livroId).session(session);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    if (livro.exemplares_disponiveis <= 0) {
      throw new Error("Não há exemplares disponíveis.");
    }

    livro.exemplares_disponiveis -= 1;

    await livro.save({ session });

    const dataPrevista = new Date();
    dataPrevista.setDate(dataPrevista.getDate() + 7);

    await Emprestimo.create(
      [
        {
          livro_id: livro._id,
          usuario_nome: usuarioNome,
          data_emprestimo: new Date(),
          data_devolucao_prevista: dataPrevista,
          status: "ativo",
        },
      ],
      { session }
    );

    await session.commitTransaction();

    console.log("Empréstimo registrado com sucesso.");
  } catch (error) {
    await session.abortTransaction();
    console.error("Erro ao registrar empréstimo:", error.message);
  } finally {
    await session.endSession();
  }
}

async function devolverLivro(emprestimoId) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const emprestimo = await Emprestimo.findById(emprestimoId).session(session);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (emprestimo.status !== "ativo") {
      throw new Error("Este empréstimo já foi finalizado.");
    }

    emprestimo.status = "devolvido";
    emprestimo.data_devolucao_real = new Date();

    await emprestimo.save({ session });

    await Livro.findByIdAndUpdate(
      emprestimo.livro_id,
      {
        $inc: {
          exemplares_disponiveis: 1,
        },
      },
      { session }
    );

    await session.commitTransaction();

    console.log("Livro devolvido com sucesso.");
  } catch (error) {
    await session.abortTransaction();
    console.error("Erro ao devolver livro:", error.message);
  } finally {
    await session.endSession();
  }
}

module.exports = {
  registrarEmprestimo,
  devolverLivro,
};