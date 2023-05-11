export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(item, heading, pos) {
        const li = document.createElement('li');
        const h4 = document.createElement('h4');
        const div = document.createElement('div');
        h4.innerText = heading;
        div.append(h4);
        const btn = document.createElement('button');
        btn.innerText = '✅';
        btn.addEventListener('click', (e) => {
            p.style.textDecoration = "line-through";
        });
        const p = document.createElement('p');
        p.innerText = item.format();
        div.append(p);
        div.append(btn);
        li.appendChild(div);
        if (pos === 'start') {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    }
}
