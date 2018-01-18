function calendar([providedDay, month, year]) {
    function getDay(day, relativeMonth, isToday) {
        switch (relativeMonth) {
            case -1:
                return `<td class="prev-month">${day}</td>`;

            case 0:
                if (isToday) {
                    return `<td class="today">${day}</td>`;
                }
                else {
                    return `<td>${day}</td>`;
                }

            case 1:
                return `<td class="next-month">${day}</td>`;
        }
    }

    let date = new Date(year, month - 1, 1);

    date.setDate(date.getDate() - date.getDay());

    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let html = "<table>\n" +
        "  <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n";

    html += "<tr>";

    for (let day = date.getDate(); day <= lastDay.getDate(); ++day) {
        html += getDay(day, -1, false);
    }

    date = new Date(year, month - 1, 1);

    lastDay = new Date(year, month, 0);

    for (let day = date.getDate(); day <= lastDay.getDate(); ++day) {

        html += getDay(day, 0, day === providedDay);

        if (date.getDay() === 6) {
            html += "</tr>\n<tr>"
        }

        date.setDate(date.getDate() + 1);
    }

    date.setDate(date.getDate() + (6 - date.getDay()));

    for (let day = 1; day <= date.getDate(); ++day) {
        html += getDay(day, 1, false);
    }
    html += "</tr>\n";

    return html;
}

console.log(calendar([24, 12, 2012]));
console.log(calendar([4, 9, 2016]));