const list = [];
const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
async function windowActions() {
    await fetch(url).then(response => response.json()) 
        .then(data => {

            list.push(...data)
            showlist(data)
            console.log(list)
        }) 
        .catch(err => console.log("Oh, error", err)) 
}
window.onload = windowActions;
const searchInput = document.querySelector('input');
searchInput.addEventListener('keyup', function (evt) {
    displayMatches(evt)

})

function displayMatches(event) {
    console.log(event.target.value)
    
    let myselect = document.getElementById("type");
    let index = myselect.selectedIndex;
    let txt = myselect.options[index].value;
    if (txt == 'restaurant') {
        let result = list.filter((ele) => {
            let name = (ele.name).toLowerCase();
            return name.indexOf((event.target.value).toLowerCase()) != -1;
        })
        showlist(result)
    } else if (txt == 'Zipcode') {
        let result = list.filter((ele) => {
            return (ele.zip).indexOf(event.target.value) != -1;
        })
        showlist(result)
    }
}

function showlist(data) {
    let html = '';
    data.forEach(ele => {
        html += `
                <li>
                    <br>name:${ele.name}\n
                    <br>zip:${ele.zip}\n
                    <br>type:${ele.type}\n
                    <br>type:${ele.type}\n
                    <br>owner:${ele.owner}\n
                    <br>city:${ele.city}\n
                    <br>category:${ele.category}\n
                    <br>adequate hand washing:${ele.adequate_hand_washing}\n
                    <br>food protected from:${ele.food_protected_from}\n
                    <br>inspection date:${ele.inspection_date}\n
                </li>
                `
    });
    document.querySelector('ul').innerHTML = html;
}