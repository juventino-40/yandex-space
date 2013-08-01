/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.name = name;
    this.position = position;
    this.capacity = capacity;
    this.currentAmountOfCargo = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    var name = "Корабль "+"\""+this.name+"\"",
        position = "Местоположение: "+this.position;
        freeSpace = "Занято: "+this.currentAmountOfCargo+" из "+this.capacity+"т";

    console.log(name+". "+position+". "+freeSpace+".");
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    return this.capacity - this.currentAmountOfCargo;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    return this.currentAmountOfCargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
    if (newPosition.name) {
        this.position = newPosition.position;
    } else {
        this.position = newPosition;
    }
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    this.name = name;
    this.position = position;
    this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    var name = "Планета "+"\""+this.name+"\"",
        position = "Местоположение: "+this.position[0]+","+this.position[1],
        availableAmountOfCargo = this.availableAmountOfCargo == 0 ? "Грузов нет" : "Доступно груза: "+this.availableAmountOfCargo+"т";

    console.log(name+". "+position+". "+availableAmountOfCargo+".")
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    if (vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1]) {

        var availableCargo = this.getAvailableAmountOfCargo();
        if (cargoWeight > availableCargo) {
            console.log("На планете нет столько груза! Доступный груз: "+availableCargo+"т");
        } else if (vessel.getFreeSpace() < cargoWeight) {
            console.log("Недостаточно места на корабле! Доступно места: "+vessel.getFreeSpace()+"т");
        } else {
            this.availableAmountOfCargo -= cargoWeight;
            vessel.currentAmountOfCargo += cargoWeight;
        }
        
    } else {
        console.log("Корабль не на планете!");
    }
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    if (vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1]) {

        var occupiedSpace = vessel.getOccupiedSpace();
        if (occupiedSpace < cargoWeight) {
            console.log("На корабле нет столько груза! Доступно груза: "+occupiedSpace+"т");
        } else {
            vessel.currentAmountOfCargo -= cargoWeight;
            this.availableAmountOfCargo += cargoWeight;
        }
        
    } else {
        console.log("Корабль не на планете!");
    }
}

/* Пример использования */

var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

// Проверка текущего состояния
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
planetA.report(); // Планета "A". Местоположене: 0,0. Доступно груза: 500т.
planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 4000т.
