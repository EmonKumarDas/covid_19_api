// https://disease.sh/v3/covid-19/countries

let creatdiv = (cases, status) => {
    let getactivecase = document.getElementById('activeCase');
    let div = document.createElement('div');
    div.classList.add('Case');
    div.innerHTML = `
            <div class="border rounded px-20 py-3 bg-sky-900">
                <h1 class="text-white text-center text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">${status}</h1>
                <p class="text-white text-center text-xl text-bold">${cases}</p>
            </div>
            `
    getactivecase.appendChild(div);
}

let CovidData = () => {
    fetch('https://disease.sh/v3/covid-19/countries').then(res => res.json()).then(data => fetchData(data));
}
let activeCase = 0;
let deathCase = 0;
let recoveryCase = 0;
let fetchData = (data) => {
    for (active of data) {
        activeCase += active.active;
        deathCase += active.deaths;
        recoveryCase+= active.recovered;
    }

    creatdiv(activeCase,'Active');
    creatdiv(deathCase,'Death');
    creatdiv(recoveryCase,'Recovered');
}

CovidData()

