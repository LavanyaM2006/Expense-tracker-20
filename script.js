const form =
  document.getElementById("transactionForm");

const description =
  document.getElementById("description");

const amount =
  document.getElementById("amount");

const category =
  document.getElementById("category");

const type =
  document.getElementById("type");

const transactionList =
  document.getElementById("transactionList");

const balance =
  document.getElementById("balance");

const income =
  document.getElementById("income");

const expense =
  document.getElementById("expense");

const themeToggle =
  document.getElementById("themeToggle");

/* LOCAL STORAGE */

let transactions =
  JSON.parse(localStorage.getItem("transactions"))
  || [];

/* ADD TRANSACTION */

form.addEventListener("submit", function(e){

  e.preventDefault();

  const transaction = {

    id: Date.now(),

    description: description.value,

    amount: Number(amount.value),

    category: category.value,

    type: type.value

  };

  transactions.push(transaction);

  saveTransactions();

  showTransactions();

  updateAmounts();

  form.reset();

});

/* SHOW */

function showTransactions(){

  transactionList.innerHTML = "";

  transactions.forEach((transaction)=>{

    const li = document.createElement("li");

    li.classList.add("transaction");

    li.innerHTML = `

      <div class="transaction-info">

        <strong>${transaction.description}</strong>

        <span>${transaction.category}</span>

      </div>

      <div>

        <span class="${
          transaction.type === "income"
          ? "income-text"
          : "expense-text"
        }">

          ${
            transaction.type === "income"
            ? "+"
            : "-"
          }$${transaction.amount}

        </span>

        <button
          class="delete-btn"
          onclick="deleteTransaction(${transaction.id})"
        >
          X
        </button>

      </div>

    `;

    transactionList.appendChild(li);

  });

}

/* UPDATE */

function updateAmounts(){

  let totalIncome = 0;

  let totalExpense = 0;

  transactions.forEach((transaction)=>{

    if(transaction.type === "income"){

      totalIncome += transaction.amount;

    }

    else{

      totalExpense += transaction.amount;

    }

  });

  const totalBalance =
    totalIncome - totalExpense;

  balance.innerText =
    `$${totalBalance}`;

  income.innerText =
    `$${totalIncome}`;

  expense.innerText =
    `$${totalExpense}`;

}

/* DELETE */

function deleteTransaction(id){

  transactions =
    transactions.filter(
      (transaction)=>
        transaction.id !== id
    );

  saveTransactions();

  showTransactions();

  updateAmounts();

}

/* SAVE */

function saveTransactions(){

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

}

/* THEME TOGGLE */

themeToggle.addEventListener("click", ()=>{

  document.body.classList.toggle("light-mode");

  if(
    document.body.classList.contains("light-mode")
  ){

    themeToggle.classList.remove("fa-moon");

    themeToggle.classList.add("fa-sun");

  }

  else{

    themeToggle.classList.remove("fa-sun");

    themeToggle.classList.add("fa-moon");

  }

});

/* INITIAL LOAD */

showTransactions();

updateAmounts();