import { Invoice } from "./classes/Invoice.js"
import { ListTemplate } from "./classes/ListTemplate.js"
import { Payment } from "./classes/Payment.js"
import { HasFormatter } from "./interfaces/HasFormatter.js"

let invoices: any[] = []

const form = document.querySelector(".new-item-form") as HTMLFormElement

// inputs
const type = document.querySelector("#type") as HTMLSelectElement
const tofrom = document.querySelector("#tofrom") as HTMLInputElement
const details = document.querySelector("#details") as HTMLInputElement
const amount = document.querySelector("#amount") as HTMLInputElement

const clearBtn = document.getElementById("clear") as HTMLButtonElement

// list template instance

const ul = document.querySelector("ul")!
const list = new ListTemplate(ul)

// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("invoices")) {
    let temp = JSON.parse(localStorage.getItem("invoices") || "")
    //  console.log(temp)
    for (let ele of temp) {
      let doc: HasFormatter
      if (ele.type == "invoice") {
        doc = new Invoice(ele.doc.client, ele.doc.details, ele.doc.amount)
        invoices.push({ doc, type: ele.type })
      } else {
        doc = new Payment(ele.client, ele.details, ele.amount)
        invoices.push({ doc, type: ele.type })
      }
    }
  }
  renderExpenses()
})

form.addEventListener("submit", (e: Event) => {
  e.preventDefault()
  let values: [string, string, number]
  values = [tofrom.value, details.value, amount.valueAsNumber]
  let doc: HasFormatter
  if ((type.value = "invoice")) {
    doc = new Invoice(...values)
  } else {
    doc = new Payment(...values)
  }
  invoices.push({ doc, type: type.value })
  save()
  list.render(doc, type.value, "end")
})

const addUID = <T extends object>(obj: T) => {
  let uid = Math.floor(Math.random() * 100)
  return { ...obj, uid }
}
function renderExpenses() {
  invoices.forEach((i) => {
    list.render(i.doc, i.type, "end")
  })
}
function save() {
  localStorage.setItem("invoices", JSON.stringify(invoices))
}

clearBtn.addEventListener("click", (e: Event) => {
  invoices = []
  save()
  renderExpenses()
  window.location.reload()
})
