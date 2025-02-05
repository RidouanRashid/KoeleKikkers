function showNotification(message, type = "success") {
    let notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

async function setPercentage(percentage) {
    const clipRect = document.getElementById('clipRect');
    const percentDisplay = document.querySelector(".percentageText");

    if (!clipRect || !percentDisplay) {
        console.error("SVG clipRect or percentDisplay not found!");
        return;
    }

    const p = percentage / 100;
    const fillHeight = 80 * Math.sqrt(p);
    const newY = 90 - fillHeight;
    clipRect.setAttribute('y', newY);
    clipRect.setAttribute('height', fillHeight);

    let timeBetweenUpdates = 1000 / percentage;

    for (let i = 0; i <= percentage; i++) {
        setTimeout(() => {
            percentDisplay.textContent = `${i}%`;
        }, timeBetweenUpdates * i);
    }
}

async function calculateLove() {
    let resultData = localStorage.getItem("resultData") === null ? {} : JSON.parse(localStorage.getItem("resultData"));
    let historyData = localStorage.getItem("historyData") === null ? [] : JSON.parse(localStorage.getItem("historyData"));
    let name1 = document.getElementById("name1").value.replace(/-/g, '').trim();
    let name2 = document.getElementById("name2").value.replace(/-/g, '').trim();
    
    if (name1 === "" || name2 === "") {
        showNotification("Zorg dat beide namen zijn ingevuld!", "error");
        return;
    }

    await setPercentage(0);

    let percentage = 0;
    if (resultData[`${name1}-${name2}`] || resultData[`${name2}-${name1}`]) {
        percentage = resultData[`${name1}-${name2}`] != null ? resultData[`${name1}-${name2}`] : resultData[`${name2}-${name1}`];
    } else {
        percentage = Math.floor(Math.random() * 101);
        resultData[`${name1}-${name2}`] = percentage;
        localStorage.setItem("resultData", JSON.stringify(resultData));
    }

    await setPercentage(percentage);

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

   const response = await fetch("./register_calculation.php", {method: "POST", body: JSON.stringify(addHistory), headers: {"Content-Type": "application/json"}})
    if (response.ok) {
        console.log("Calculation data sent to server");
       // const data = await response.json();
        console.log(await response.text());
    } else {
        console.log("Failed to send calculation data to server");
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    //let historyData = localStorage.getItem("historyData") === null ? [] : JSON.parse(localStorage.getItem("historyData"));
    let historyUl = document.getElementById("history");

    //historyData = historyData.reverse();

    const result = await fetch("./calculations.php");
    const historyData = await result.json();

    historyData.forEach((data, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${data.name_1} ❤️ ${data.name_2} = ${data.percentage}% Love</strong> <br> <small>${data.created_at}</small>`;
        historyUl.appendChild(li);
    });
});

async function resetHistory() {
    //localStorage.removeItem("historyData");
   // document.getElementById("history").innerHTML = "";
    const response = await fetch("./resetHistory.php");
    if (response.ok) {
        console.log("History reset successfully");
        document.getElementById("history").innerHTML = "";
        alert(await response.text());
    } else {
        console.log("Failed to reset history");
    }
}

function switchColor(button) {
    button.classList.toggle('pink');
    let img = button.querySelector('img');
    if (button.classList.contains('pink')) {
        img.src = 'https://static.thenounproject.com/png/386182-200.png'; // Path to the pink image
    } else {
        img.src = 'https://cdn-icons-png.flaticon.com/512/2088/2088838.png'; // Path to the blue image
    }
}