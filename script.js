flatpickr(".flatpickr", {"locale": "pt", dateFormat: "d-m-Y"});

const modal = {
    open() {
        document.querySelector(".modal-overlay").classList.add("active")
    },
    close() {
        document.querySelector(".modal-overlay.active").classList.remove("active")
    }
}

const storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const transaction = {
    all: storage.get(),
    add(newTransaction) {
        transaction.all.push(newTransaction)
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Transação salva com sucesso!',
            showConfirmButton: false,
            timer: 1500
        })
        app.reload()
    },
    remove(index) {
        
        Swal.fire({
            title: 'Excluir transação',
            text: "Tem certeza disso?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                transaction.all.splice(index, 1)
                Swal.fire(
                    'Deletado',
                    'Sua transação foi excluída com sucesso!',
                    'success'
                )
                app.reload()
            }
          })

    },
    register() {
        modal.open()
        form.btnSave.onclick = form.submit
    },
    alter(newTransaction, index) {
        transaction.all[index] = newTransaction
        app.reload()
    },
    edit(index) {
        modal.open()
        const current_transaction = transaction.all[index]
        form.setValues(current_transaction)
        form.btnSave.onclick = event => {
            event.preventDefault()
            try {
                form.validateFields()
                const newTransaction = form.formatValues()
                transaction.alter(newTransaction, index)
                form.clearFields()
                modal.close()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Edição realizada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: error.message
                  })
            }
        }
    },
    incomes() {
        return transaction.all.reduce((acc, {amount}) => {
            return amount > 0 ? acc + amount : acc
        }, 0)
    },
    expenses() {
        return transaction.all.reduce((acc, {amount}) => {
            return amount < 0 ? acc + amount : acc
        }, 0)
    },
    total() {
        return this.incomes() + this.expenses()
    }
}

const DOM = {
    transactionContainer: document.querySelector("#data-table tbody"),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        DOM.transactionContainer.appendChild(tr)
    },
    innerHTMLTransaction({description, amount, date}, index) {
        const cssClass = amount < 0 ? "expense" : "income" 
        const html = `
            <td class="description">${description}</td>
            <td class="${cssClass}">${Util.formatCurrency(amount)}</td>
            <td class="date">${date}</td>
            <td>
                <img onclick="transaction.edit(${index})" class="btnAction" src="assets/edit-solid.svg"
                 alt="Editar transação">
                <img onclick="transaction.remove(${index})" class="btnAction" src="assets/minus.svg"
                 alt="Remover transação">
            </td>
        `

        return html
    },
    updateBalance() {

        document.getElementById("incomeDisplay").innerHTML = Util.formatCurrency(transaction.incomes())
        document.getElementById("expenseDisplay").innerHTML = Util.formatCurrency(transaction.expenses())
            .replace("-", "")
        document.getElementById("totalDisplay").innerHTML = Util.formatCurrency(transaction.total())
    },
    clearTransactions() {
        DOM.transactionContainer.innerHTML = ""
    }
}

const Util = {
    formatAmount(value) {
        value = value * 100
        return Math.round(value)
    },
    formatDate(date) {
        return date.split("-").join("/")
    },
    formatCurrency(value) {
        const signal = value < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return `${signal}${value}`
    }
}

const form = {
    description: document.getElementById("description"),
    amount: document.getElementById("amount"),
    date: document.getElementById("date"),

    btnSave: document.getElementById("save"),

    getValues() {
        return {
            description: form.description.value,
            amount: form.amount.value,
            date: form.date.value
        }
    },
    setValues({description, amount, date}) {
        form.description.value = description
        form.amount.value = amount / 100
        form.date.value = date.split("/").join("-")
        
    },
    formatValues() {
        let {description, amount, date} = form.getValues()

        amount = Util.formatAmount(amount)
        date = Util.formatDate(date)

        return {
            description, amount, date
        }
        
    },
    validateFields() {
        const {description, amount, date} = form.getValues()
        const emptyFields = []
        let isInvalid = false
        if (description.trim() === "") {
            emptyFields.push("Descrição")
            isInvalid = true
        }
        if (amount.trim() === "") {
            emptyFields.push("Valor")
            isInvalid = true
        }
        if (date.trim() === "") {
            emptyFields.push("Data")
            isInvalid = true
        }
        if (isInvalid) {
            throw new Error(`Por favor, preencha o(s) campo(s): ${emptyFields.join(", ")}.`)
        }
    },
    clearFields() {
        form.description.value = ""
        form.amount.value = ""
        form.date.value = ""
    },
    submit(event) {
        event.preventDefault()
        try {
            form.validateFields()
            const newTransaction = form.formatValues()
            transaction.add(newTransaction)
            form.clearFields()
            modal.close()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: error.message
            })
        }
    },
    cancel() {
        modal.close()
        form.clearFields()
    }
}

const app = {
    init() {
        transaction.all.forEach(DOM.addTransaction)
        DOM.updateBalance()
        storage.set(transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        this.init()
    }
}

document.querySelector(".button.new").addEventListener("click", transaction.register)
document.querySelector(".button.cancel").addEventListener("click", form.cancel)

app.init()