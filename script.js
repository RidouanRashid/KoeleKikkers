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
        //er is wel een combinatie gevonden van deze namen, dus lees deze uit de resultData variabele
        percentage = resultData[`${name1}-${name2}`] != null ? resultData[`${name1}-${name2}`] : resultData[`${name2}-${name1}`]; //als de combi name1 - name2 opgeslagen is, gebruik die...anders gebruik de combi name2 - name1
        document.getElementById("result").innerText = `${percentage}%`; //schrijf het percentage in het resultaat veld
    } else {
        //er is nog geen percentage berekend voor een combinatie van deze namen
        percentage = Math.floor(Math.random() * 101); //bereken een nieuw percentage
        resultData[`${name1}-${name2}`] = percentage; //sla het percentage op in de resultData
        document.getElementById("result").innerText = `${percentage}%`; //schrijf het percentage in het resultaat veld
        localStorage.setItem("resultData", JSON.stringify(resultData)); //save de resultData in de localStorage
    }

    let historyUl = document.getElementById("history");
    let li = document.createElement("li");
    li.innerHTML = `<strong>${percentage}% Love</strong> <br> <small>${new Date().toLocaleString()}</small>`;
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

document.addEventListener("DOMContentLoaded", function () {
    let historyData = localStorage.getItem("historyData") === null ? [] : JSON.parse(localStorage.getItem("historyData"));
    let historyUl = document.getElementById("history");

    historyData = historyData.reverse();

    historyData.forEach((data, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${data.name1} ❤️ ${data.name2} = ${data.percentage}% Love</strong> <br> <small>${data.timestamp}</small>`;
        historyUl.appendChild(li);
    });
});