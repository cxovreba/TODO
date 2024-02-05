const add = document.querySelector('.add-info');
const task = document.getElementById('text');

const data = localStorage.getItem('data');
let list = data ? JSON.parse(data) : [];

function generateTaskList() {
    const ul = document.getElementById('ul');
    if (list.length) {
        ul.innerHTML = '';
        list.forEach((el, i) => {
            const items_left = document.getElementById('item-left');
            items_left.innerHTML = `${list.length} items left`;
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="check">
            <input id="check${i}" class="checkbox" type="checkbox" ${ el.isChecked ? 'checked' : null} onchange="check(${i})"/>
            <div class="task-item">${el.value}</div>
            </div>
            <button id="delete-btn" onclick="DeleteItem(${i})">X</button>
            `;
            ul.appendChild(li);
        });
        return;
    }
    ul.innerHTML = '';
}

generateTaskList();

add.addEventListener('click', () => {
    let { value } = document.getElementById('text');
    document.getElementById('text').value = '';
    list.push({ value, isChecked: false });
    updateStorage(list);
    generateTaskList();

    console.log(list);
})

task.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (task.value === '') {
            const error = document.getElementById('error');
            error.textContent = 'Please enter the task title!';
        } else {
            let { value } = document.getElementById('text');
            document.getElementById('text').value = '';
            list.push({ value, isChecked: false });
            updateStorage(list);
            generateTaskList();
        }
    }
    console.log(list);
})

function updateStorage(list) {
    localStorage.setItem('data', JSON.stringify(list));
};

const change_mode_btn = document.getElementById('switch');

change_mode_btn.addEventListener('click', () => {
    const input = document.querySelector('.input');
    const input_text = document.getElementById('text');
    const option = document.querySelector('.option');
    const input_list = document.querySelector('.info');

    if (change_mode_btn.innerHTML === `<img src="./pic/dark-mode.png" alt="">`) {
        change_mode_btn.innerHTML = `<img src="./pic/light-mode.png" alt="">`;
        input.style.background = 'var(--black)';
        input_text.style.background = 'var(--black)';
        input_text.style.color = 'var(--light-white)';
        option.style.background = 'var(--black)';
        input_list.style.background = 'var(--black)';
        input_list.style.color = 'var(--light-white)';
    } else {
        change_mode_btn.innerHTML = `<img src="./pic/dark-mode.png" alt="">`;
        input.style.background = 'var(--light-white)';
        input_text.style.background = 'var(--light-white)';
        input_text.style.color = 'var(--black)';
        option.style.background = 'var(--light-white)';
        input_list.style.background = 'var(--light-white)';
        input_list.style.color = 'var(--black)';
    };

    document.body.classList.toggle('dark-mode');
})

function check(i) {
    const task_item = document.querySelector(`#check${i} + .task-item`);
    list[i].isChecked = !list[i].isChecked;
    if (list[i].isChecked) {
        task_item.style.textDecoration = 'line-through';
        task_item.style.color = '#D1D2DA';
    } else {
        task_item.style.textDecoration = 'none';
        task_item.style.color = 'var(--dark-grey)';
    }      
};

function DeleteItem(i) {
    list.splice(i, 1);
    updateStorage(list);
    generateTaskList();
};