const connectDB = require("./database/connection");

const {
  registrarEmprestimo,
  devolverLivro
} = require("./services/bibliotecaService");

async function main() {
  await connectDB();


  await registrarEmprestimo(
    "ID_DO_LIVRO",
    "Kaique"
  );


  await devolverLivro(
    "ID_DO_EMPRESTIMO"
  );
}

main();