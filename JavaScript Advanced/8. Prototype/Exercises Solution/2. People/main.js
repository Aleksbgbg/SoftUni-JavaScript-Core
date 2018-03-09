function people() {
    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new TypeError("Abstract class 'Employee' cannot be instantiated.");
            }

            this.name = name;
            this.age = age;
            this._salary = 0;
            this.tasks = [];
        }

        work() {
            const currentTask = this.tasks.shift();

            console.log(`${this.name} is ${currentTask}.`);

            this.tasks.push(currentTask);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.salary} this month.`)
        }

        get salary() {
            return this._salary;
        }

        set salary(value) {
            this._salary = value;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);

            this.tasks.push("working on a simple task");
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);

            this.tasks.push("working on a complicated task");
            this.tasks.push("taking time off work");
            this.tasks.push("supervising junior workers");
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);

            this.dividend = 0;

            this.tasks.push("scheduled a meeting");
            this.tasks.push("preparing a quarterly report");
        }

        get salary() {
            return super.salary + this.dividend;
        }

        set salary(value) {
            super.salary = value;
        }
    }

    return {
        Employee,
        Junior,
        Senior,
        Manager
    };
}

const {
    Employee,
    Junior,
    Senior,
    Manager
} = people();

try {
    const employee = new Employee("Pesho", 193);
} catch (error) {
    console.log(error);
}

const junior = new Junior("Gosho", 50);
const senior = new Senior("Tosho", 40);
const manager = new Manager("Josh", 20);

junior.work();
junior.work();
junior.work();

junior.salary = 50;
junior.collectSalary();

senior.work();
senior.work();
senior.work();

senior.salary = 100;
senior.collectSalary();

manager.work();
manager.work();
manager.work();

manager.salary = 150;
manager.dividend = 200;

manager.collectSalary();