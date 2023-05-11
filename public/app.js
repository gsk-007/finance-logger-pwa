import { Invoice } from './classes/Invoice.js';
import { ListTemplate } from './classes/ListTemplate.js';
import { Payment } from './classes/Payment.js';
let invoices = [];
const form = document.querySelector('.new-item-form');
// inputs
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const clearBtn = document.getElementById('clear');
// list template instance
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem("invoices")) {
        let temp = JSON.parse(localStorage.getItem("invoices") || "");
        console.log(temp);
        for (let ele of temp) {
            let doc;
            if (ele.type == "invoice") {
                doc = new Invoice(ele.doc.client, ele.doc.details, ele.doc.amount);
                invoices.push({ doc, type: ele.type });
            }
            else {
                doc = new Payment(ele.client, ele.details, ele.amount);
                invoices.push({ doc, type: ele.type });
            }
        }
    }
    renderExpenses();
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let values;
    values = [tofrom.value, details.value, amount.valueAsNumber];
    let doc;
    if (type.value = 'invoice') {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    invoices.push({ doc, type: type.value });
    save();
    list.render(doc, type.value, 'end');
});
const addUID = (obj) => {
    let uid = Math.floor(Math.random() * 100);
    return Object.assign(Object.assign({}, obj), { uid });
};
function renderExpenses() {
    invoices.forEach(i => {
        list.render(i.doc, i.type, 'end');
    });
}
function save() {
    localStorage.setItem("invoices", JSON.stringify(invoices));
}
clearBtn.addEventListener('click', (e) => {
    invoices = [];
    save();
    renderExpenses();
    window.location.reload();
});
