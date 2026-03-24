async function vote(candidate) {
    await fetch("/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate })
    });
}

async function getResults() {
    const res = await fetch("/results");
    const data = await res.json();

    document.getElementById("aVotes").innerText = data.A;
    document.getElementById("bVotes").innerText = data.B;
}

setInterval(getResults, 2000);
getResults();