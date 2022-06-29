const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const dataContainer = document.querySelector('.data__container');

console.log(window.innerWidth);

const date = new Date();
const today = date.getDay();

const toggleData = (e) => {
    if (e.target.parentNode.childNodes[0].style.visibility === 'visible') {
        e.target.parentNode.childNodes[0].style.visibility = 'hidden';
    } else {
        e.target.parentNode.childNodes[0].style.visibility = 'visible';
    }
}

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        let highestValue = Math.max(...data.map(o => o.amount));

        const valueSum = data.map(o => o.amount).reduce((a,b) => a+b);

        data.forEach((value, index) => {
            const dataWrapper = document.createElement('div');
            dataWrapper.classList.add('data__wrapper');

            const dataNumberElement = document.createElement('span');
            dataNumberElement.classList.add('data__number', 'text--small');
            dataNumberElement.style.visibility = 'hidden';
            dataNumberElement.innerHTML = `$${value.amount}`;

            const dataElement = document.createElement('button');
            dataElement.style.display = 'block';
            dataElement.onmouseover = toggleData;
            dataElement.onmouseout = toggleData;
            if (window.innerWidth <= 400) {
                
            }
            dataElement.style.height = `${Math.round(100 * (value.amount / highestValue))}px`;
            dataElement.classList.add('data');

            if (value.day === weekDays[today]) {
                dataElement.classList.add('data--today');
            }

            const dataLabel = document.createElement('span');
            dataLabel.classList.add('data__label', 'text--small');
            dataLabel.innerHTML = value.day;

            dataWrapper.appendChild(dataNumberElement);
            dataWrapper.appendChild(dataElement);
            dataWrapper.appendChild(dataLabel);

            dataContainer.appendChild(dataWrapper);
        })
    })
    .catch(error => console.error(error));
