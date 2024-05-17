class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    get countedSalary() {
        let salary = this.baseSalary;
        if (this.experience > 5) {
            salary = this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            salary = this.baseSalary + 200;
        }
        return salary;
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    get countedSalary() {
        return super.countedSalary * this.effCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    get countedSalary() {
        let salary = super.countedSalary;
        const teamSize = this.team.length;
        if (teamSize > 10) {
            salary += 300;
        } else if (teamSize > 5) {
            salary += 200;
        }

        const numDevelopers = this.team.filter(member => member instanceof Developer).length;
        if (numDevelopers > teamSize / 2) {
            salary *= 1.1;
        }

        return salary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        const allEmployees = this.managers.reduce((acc, manager) => {
            acc.push(manager);
            return acc.concat(manager.team);
        }, []);

        allEmployees.forEach(employee => {
            console.log(`${employee.firstName} ${employee.lastName} отримав ${employee.countedSalary} шекєлей`);
        });
    }
}

// Приклад використання:
const dev1 = new Developer("Іван", "Іванов", 1000, 3);
const dev2 = new Developer("Петро", "Петров", 1200, 6);
const des1 = new Designer("Ольга", "Ольгова", 1100, 4, 0.9);
const des2 = new Designer("Марія", "Марієва", 1300, 7, 0.95);

const manager1 = new Manager("Андрій", "Андрієв", 1500, 8, [dev1, des1]);
const manager2 = new Manager("Сергій", "Сергієв", 1600, 10, [dev2, des2, dev1, dev2, des1, des2, dev1, dev2, des1, des2]);

const department = new Department([manager1, manager2]);

department.giveSalary();
