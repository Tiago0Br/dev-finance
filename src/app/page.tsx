export default function Home() {
  return (
    <>
      <header>
        <img src="/logo.svg" alt="Logo Dev Finance" />
      </header>

      <main className="container">
        <section id="balance">
          <h2 className="sr-only">Balanço</h2>
          <div className="card">
            <h3>
              <span>Entradas</span>
              <img src="/income.svg" alt="Imagem de Entradas" />
            </h3>
            <p id="incomeDisplay">R$ 0,00</p>
          </div>
          <div className="card">
            <h3>
              <span>Saídas</span>
              <img src="/expense.svg" alt="Imagem de Entradas" />
            </h3>
            <p id="expenseDisplay">R$ 0,00</p>
          </div>
          <div className="card total">
            <h3>
              <span>Total</span>
              <img src="/total.svg" alt="Imagem de Entradas" />
            </h3>
            <p id="totalDisplay">R$ 0,00</p>
          </div>
        </section>

        <section id="transaction">
          <h2 className="sr-only">Transações</h2>
          <a href="#" className="button new">+ Nova transação!</a>
          <table id="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th data-sort-method='number'>Valor</th>
                <th>Data</th>
                <th data-sort-method='none' className="no-sort"></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </section>
      </main>

      <div className="modal-overlay">
        <div className="modal">
          <div id="form">
            <h2>Nova Transação</h2>
            <form action="">
              <div className="input-group">
                <label htmlFor="description" className="sr-only">Descrição</label>
                <input type="text" id="description" name="description" placeholder="Descrição" />
              </div>
              <div className="input-group">
                <label htmlFor="amount" className="sr-only">Valor</label>
                <input type="number" id="amount" name="amount" placeholder="0,00" step="0.01" />
                <small className="help">Use o sinal - (negativo) para despesas e ,
                  (vírgula) para casas decimais
                </small>
              </div>

              <div className="input-group">
                <label htmlFor="date" className="sr-only">Data</label>
                <input type="date" id="date" className="flatpickr" name="date" placeholder="Data" />
              </div>

              <div className="input-group">
                <div className="file-input">
                  <input type="file" id="file" className="file" accept="image/*, .pdf" />
                  <label htmlFor="file">
                    Selecionar Comprovante
                    <p className="file-name">Nenhum selecionado</p>
                  </label>
                </div>
              </div>


              <div className="input-group actions">
                <a href="#" className="button cancel">Cancelar</a>
                <button id="save">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer><p>dev.finance$</p></footer>
    </>
  );
}
