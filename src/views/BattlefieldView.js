export class BattlefieldViews {
    init(coordinates) {
        /* 
            графическое отображение в браузере
            записываем передаваемые координаты в this
            создаем див-контейнер
            добавляем класс container контейнеру
            запускаем цикл от 0 до количества вложенных массивов в родительском массиве координат ;y++
            присваиваем переменной текущий массив (строка - у)
            создаем новый див (строку y)
            запускаем цикл пока у = длинне строки координат (массива y)
            создаем ячейку с помощью метода createSection
            добавлям ячейку в строку
            добавляем строку в контейнер
            добавляем контейнер на страницу
        */
        if (document.querySelector('.container') !== null) return;
        this.coordinates = coordinates;
        let rootDiv = document.createElement('div');
        rootDiv.classList.add('container');
        for (let y = 0; y < coordinates.length; y++) {
            let row = coordinates[y];
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row')
            for (let x = 0; x < row.length; x++) {
                let section = this.createSection(row[y], y, x);
                rowDiv.appendChild(section);
            }
            rootDiv.appendChild(rowDiv);
        }
        document.body.appendChild(rootDiv);
    }
    update(coordinates) {
        /* 
            метод обновления координат
            записываем передаваемые координаты в this
            цикл перебора вложенных массивов в родительском массиве
            присваиваем переменной текущий массив (строка - у)
            перебираем каждый вложенный массив координат
            выбираем элемент документа по дата-атрибутам и присваеваем ему текст-контент соответствующего элемента
        */
        this.coordinates = coordinates;
        for (let y = 0; y < coordinates.length; y++) {
            let row = coordinates[y];
            for (let x = 0; x < row.length; x++) {
                document.querySelector(`[data-y="${x}"][data-x="${y}"]`).dataset.type = row[x];
            }
        }
    }
    createSection(content, x, y) {
        /* 
            метод создания элементов
            создаем div и записываем его в переменную,
            добавляем ему css класс cell,
            добавляем data-атрибут с символом в зависимости от символа в сетке,
            добавляем data-атрибуты с коорднатами,
            возвращаем готовый элемент
        */
        let section = document.createElement('div');
        section.classList.add('cell')
        section.dataset.type = content;
        section.dataset.x = x;
        section.dataset.y = y;
        return section;
    }
    updateTankPosition(coordinates, playerId, direction) {
        /* 
            метод поворота танка
            ищем элемент по id
            если находим, удаляем у него data-атрибут id
            удаляем css классы с направлением
            по переданным координатам выбираем танк
            присваеваем ему переданный id
            добавляем css свойство с направлением
        */
        const $id = document.getElementById(playerId)
        if ($id) {
            $id.removeAttribute('id');
            $id.classList.remove('left', 'right', 'top', 'down');
        }
        const $tank = document.querySelector(`[data-y="${coordinates.x}"][data-x="${coordinates.y}"]`);
        $tank.id = playerId;
        $tank.classList.add(direction);
    }
    updateBulletDirection(bullet) {
        /* 
            метод поворота пули
            ищем пулю по координатам
            добавляем пуле css свойство в зависимости от направления
        */
        const $bullet = document.querySelector(`[data-y="${bullet.coordinates.x}"][data-x="${bullet.coordinates.y}"]`);
        // $bullet.dataset.bulletId = bullet.id;
        $bullet.classList.add(bullet.coordinates.direction);
    }
}