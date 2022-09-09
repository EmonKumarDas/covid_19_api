let getapi = (isvalue) => {
  let loading = document.getElementById('loading');
  loading.classList.remove('d-none');
  if (isvalue == false) {

    fetch("https://disease.sh/v3/covid-19/countries").then(response => response.json())
    .then(
    data => getdata(data));  
  }
  else if (isvalue == true) {
    let country_base = document.getElementById("country-base");
    country_base.innerHTML = '';
  }

}

let getdata = (data) => {
  for (covid of data) {
    let { flag, countryName } = { flag: covid.countryInfo.flag, countryName: covid.country }

    let country_base = document.getElementById("country-base");
    let div = document.createElement("div");
    div.classList.add("col-4");
    div.innerHTML = `
        <div class="card m-5" style="width: 18rem; height:25rem">
            <img src="${flag}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title font-bold">${countryName}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button onclick="getInformation('${countryName}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">See Data</button>
              </div>
          </div>        `
    country_base.appendChild(div);
  }
  let loading = document.getElementById('loading');
  loading.classList.add('d-none');
}



let getInformation = (countryname) => {
  fetch(`https://disease.sh/v3/covid-19/countries/${countryname}`).then(res => res.json().then(data => getinfo(data)));

  let getinfo = (info) => {
    let { names, countryInfos, cases, death, recover } = {
      names: info.country,
      countryInfos: info.countryInfo.flag,
      cases: info.cases,
      death: info.deaths,
      recover: info.recovered
    };

    let mbody = document.getElementById("model-body");
    mbody.innerHTML = `
                      <div class="card mx-5" style="width: 18rem;">
                      <img src="${countryInfos}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Country :- ${names}</h5>
                        <h5 class="card-title">Cases:- ${cases}</h5>
                        <h5 class="card-title">Death:- ${death}</h5>
                        <h5 class="card-title">Recover:- ${recover}</h5>
                      </div>
                    </div>
                          `
  }
}

// search country
let patchs = (searchvalue) => {
  fetch(`https://disease.sh/v3/covid-19/countries/${searchvalue}`).then(res => res.json().then(data => getvalue(data)));
}


let getvalue = (inputvalue) => {
  if (inputvalue.country == undefined) {
    let loading = document.getElementById('loading');
    loading.classList.add('d-none');
    country_base = document.getElementById("country-base");
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="alert alert-primary font-bold" role="alert">
    No Data Found!
    </div>
    `
    country_base.appendChild(div);
    
  }
  else {
    let { flag, countryName } = { flag: inputvalue.countryInfo.flag, countryName: inputvalue.country }
    country_base = document.getElementById("country-base");
    let div = document.createElement("div");
    div.classList.add("col-4");
    div.innerHTML = `
      <div class="card m-5" style="width: 18rem; height:25rem">
          <img src="${flag}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title font-bold">${countryName}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button onclick="getInformation('${countryName}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">See Data</button>
            </div>
        </div>        `
    country_base.appendChild(div);
    let loading = document.getElementById('loading');
    loading.classList.add('d-none');
  }

}


document.getElementById('search-btn').addEventListener('click', () => {
  let loading = document.getElementById('loading');
  loading.classList.remove('d-none');
  let isvalue = true;
  getapi(isvalue);
  let getInputValue = document.getElementById('input-search');
  let getvalueString = getInputValue.value;
  if (getvalueString === '') {
    loading.classList.add('d-none');
    country_base = document.getElementById("country-base");
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="alert alert-primary font-bold" role="alert">
    Enter your country name
  </div>
      `
    country_base.appendChild(div);

  }
  else {
    patchs(getvalueString);
    getInputValue.value = "";

  }

});
getapi(false);

