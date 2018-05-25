function replacingToString() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }

        toString() {
            return `Person (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);

            this.course = course;
        }

        toString() {
            return `Student (name: ${this.name}, email: ${this.email}, course: ${this.course})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);

            this.subject = subject;
        }

        toString() {
            return `Teacher (name: ${this.name}, email: ${this.email}, subject: ${this.subject})`;
        }
    }

    return {
        Person,
        Student,
        Teacher
    };
}

const classes = replacingToString();

console.log(new classes.Person("Noah", "abc.com").toString());
console.log(new classes.Student("Noah", "abc.com", "JS").toString());
console.log(new classes.Teacher("Josh", "cba.com", "JS").toString());