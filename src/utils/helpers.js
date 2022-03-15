export function throttle(callback, time) {
    /*  функция throttle, в которую передаем необходимую функцию и время, через которое можно выполнить ее снова 
        переменная isOpen - boolean (можно ли выполнять функцию) - по-умолчанию true
        возвращаем функцию,
        в которой если isOpen = true, запускаем функцию setTimeout,
        запрещаем очередное выполнение функции, пока не кончится таймер
        по окончании времени time разрешаем выполнение функции
        выпоняем функцию
    */
    let isOpen = true;
    return function () {
        if (isOpen) {
            setTimeout(function () {
                isOpen = true;
            }, time)
            isOpen = false;
            // callback();
            callback.apply(this, arguments)
        }
    }
}

export function debounce(callback, time) {
    /*  функция debounce, в которую передаем необходимую функцию и время, через которое она выполнится
        timer - время выполнения
        возвращаем функцию, которая сбраывает таймер при вызове
        очищаем таймер
        вызываем таймаут, через который можно выполнить передаваемую функцию
    */
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, arguments)
        }, time);

    }
}


// const logZaloopa = debounce(() => {
//     console.log ('123');
// }, 300)

// document.addEventListener('click', logZaloopa)



// class Malenkii {
//     constructor (){
//         this.asdfds = debounce(this.asdfds, 500)
//     }
//     asdfds() {
//         console.log (this)
//     }
// }
// const malenkii = new Malenkii;
// malenkii.asdfds();




















// function addEventListener(callback, args) {
//     callback(args)
// };
// addEventListener(function (e){
//     console.log(e);
// }, 'rarar')