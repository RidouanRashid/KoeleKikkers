function calculateLove() {
    let name1 = document.getElementById("name1").value.trim();
    let name2 = document.getElementById("name2").value.trim();
    
    if (name1 === "" || name2 === "") {
        alert("Please enter both names!");
        return;
    }

    let lovePercentage = Math.floor(Math.random() * 101); // Generate random number 0-100
    document.getElementById("result").innerText = `${name1} ❤️ ${name2} = ${lovePercentage}% Love`;
}
