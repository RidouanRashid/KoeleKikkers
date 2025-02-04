function calculateLove() {
    let resultData = localStorage.getItem("resultData") === null ? {} : JSON.parse(localStorage.getItem("resultData"));
    let historyData = localStorage.getItem("historyData") === null ? [] : JSON.parse(localStorage.getItem("historyData"));
    let name1 = document.getElementById("name1").value.replace(/-/g, '').trim();
    let name2 = document.getElementById("name2").value.replace(/-/g, '').trim();
    
    if (name1 === "" || name2 === "") {
        alert("Please enter both names!");
        return;
    }

    let percentage = 0;
    if (resultData[`${name1}-${name2}`] || resultData[`${name2}-${name1}`]) {
        percentage = resultData[`${name1}-${name2}`] != null ? resultData[`${name1}-${name2}`] : resultData[`${name2}-${name1}`];
        document.getElementById("result").innerText = `${name1} ❤️ ${name2} = ${resultData[`${name1}-${name2}`] != null ? resultData[`${name1}-${name2}`] : resultData[`${name2}-${name1}`]}% Love`;
    }else{
        let lovePercentage = Math.floor(Math.random() * 101);
        percentage = lovePercentage;
        resultData[`${name1}-${name2}`] = lovePercentage;
        document.getElementById("result").innerText = `${name1} ❤️ ${name2} = ${lovePercentage}% Love`;
        localStorage.setItem("resultData", JSON.stringify(resultData));
    }

    let historyUl = document.getElementById("history");
    let li = document.createElement("li");
    li.innerHTML = `<strong>${name1} ❤️ ${name2} = ${percentage}% Love</strong> <br> <small>${new Date().toLocaleString()}</small>`;
    historyUl.insertBefore(li, historyUl.firstChild);

    let addHistory = {
        name1: name1,
        name2: name2,
        percentage: percentage,
        timestamp: new Date().toLocaleString()
    };

    historyData.push(addHistory);
    localStorage.setItem("historyData", JSON.stringify(historyData));
}

document.addEventListener("DOMContentLoaded", function() {
    let historyData = localStorage.getItem("historyData") === null ? [] : JSON.parse(localStorage.getItem("historyData"));
    let historyUl = document.getElementById("history");

    historyData = historyData.reverse();

    historyData.forEach((data, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${data.name1} ❤️ ${data.name2} = ${data.percentage}% Love</strong> <br> <small>${data.timestamp}</small>`;
        historyUl.appendChild(li);
    });
});