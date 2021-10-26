const form = document.querySelector("form");
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const array = [];

const createItem = () => {
    const startDate = document.querySelector('#startDate').value;
    const startTime = document.querySelector('#startTime').value;
    const endDate = document.querySelector('#endDate').value;
    const endTime = document.querySelector('#endTime').value;
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;

    const formData = {
        startDate,
        startTime,
        endDate,
        endTime,
        title,
        description
    };

    array.push(formData);
    console.log(array);
}