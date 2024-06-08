const host = "http://127.0.0.1:3000";

const nameContainer = document.querySelector(".name_container");

function getName() {
    axios
        .get(`${host}/name`)
        .then((response) => {
            console.log(response.data);
            renderName(response.data.names);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function addGuestbookEntry() {
    const nameInput = document.querySelector(".name_input");
    const textInput = document.querySelector(".text_input");
    
    if (nameInput.value && textInput.value) {
        const newEntry = {
            name: nameInput.value,  
            item: textInput.value
        };

        axios
            .post(`${host}/name`, newEntry)
            .then((response) => {
                console.log(response.data);
                getName();  
                nameInput.value = "";
                textInput.value = "";
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

function renderName(names) {
    nameContainer.innerHTML = "";
    names.forEach((name) => {
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("example");
        nameDiv.innerHTML = `
            <h1>${name.name}</h1>  
            <h2>${name.item}</h2>
            <button class="deletebtn" onclick="deleteName(${name.id})">x</button>
        `;
        nameContainer.appendChild(nameDiv);
    });
}

function deleteName(id) {
    axios
        .delete(`${host}/name/${id}`)
        .then((response) => {
            console.log(response.data);
            getName(); 
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

getName();
