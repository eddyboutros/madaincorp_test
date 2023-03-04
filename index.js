function onload()
{
    const resultsDiv = document.getElementById("results");
    const categorySelect = document.getElementById("category");
    var url = 'https://filltext.com/?rows=10&fname=firstname&lname=lastname&category=["category1","category2","category3","category4","category5"]';
    var urlParams = url.split("&");

    urlParams.forEach(param => 
    {
        if(param.startsWith("category"))
        {
            let categories = param.split("=")[1];
            let categoriesArray = JSON.parse(categories);

            categoriesArray.forEach(category =>
            {
                let option = document.createElement("option");
                option.innerHTML = category;
                categorySelect.appendChild(option);
            });
        }
    });

    fetch(url).then(response => response.json())
        .then(data =>
        {
            data.forEach(person => {
                const personDiv = document.createElement("div");
                personDiv.className = "person";
                const initials = person.fname.charAt(0).toUpperCase() + person.lname.charAt(0).toUpperCase();
                const circleBgColor = getBackgroundColor(person.category);
                personDiv.innerHTML = `
                  <div class="person_circle" style="background-color:${circleBgColor}">${initials}</div>
                  <div class="person_name">${person.fname} ${person.lname}</div>
                  <div class="person_category">${person.category}</div>
                `;
                resultsDiv.appendChild(personDiv);
              });
              
              categorySelect.onchange = function ()
              {
                const selectedCategory = categorySelect.value;
                const persons = resultsDiv.querySelectorAll(".person");
                persons.forEach(person =>
                {
                  if (!selectedCategory || person.querySelector(".person_category").textContent === selectedCategory) {
                    person.style.display = "grid";
                  }
                  else
                  {
                    person.style.display = "none";
                  }
                });
              };
        })
    .catch(error => console.error(error));

    function getBackgroundColor()
    {
        const colorOptions = ['#ff7f50', '#6495ed', '#ffa07a', '#b0e0e6', '#f08080'];
        const randomIndex = Math.floor(Math.random() * colorOptions.length);
        return colorOptions[randomIndex];
      }      
}