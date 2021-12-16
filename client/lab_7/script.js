const list = []; 
const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
let mymap = "";
let layer = [];

async function windowActions() {
    await fetch(url).then(response => response.json()) 
        .then(data => {
            list.push(...data)
            showlist(data)
            // console.log(list)
        }) 
        .catch(err => console.log("Oh, error", err)) 
}
window.onload = function () {
    windowActions();
    mapInit()
};
const searchInput = document.querySelector('input');
searchInput.addEventListener('keyup', function (evt) {
    dataHandler(evt)

})

function dataHandler(event) {
    console.log(list)
    let result = list.filter((ele, i) => {
        return (ele.zip).indexOf(event.target.value) != -1;
    })
    // throttle(, 3000)
    console.log(result)
    if (event.target.value == []) {
        showmap([])
        showlist([])
    } else {
        showmap(result)
        showlist(result)
    }

}


function showlist(data) {
    let html = '';
    data.forEach((ele, i) => {
        if (i < 5) {
            html += `
                <li>
                    <b>${ele.name}</b><br>
                    <em>${ele.address_line_1}</em>
                </li>
                `
        }

    });
    document.querySelector('ul').innerHTML = html;
    /* 渲染地图 */
    // showmap(data)
}
function mapInit() {
    mymap = L.map('mapid', {
        center: [0, 0],
        zoom: 10
    })
}
function showmap(data) {
    
    if (mymap != "") {
        layer.forEach((ele) => {
            mymap.removeLayer(ele)
        })
        layer = []
    }
    console.log(mymap)
    data.forEach((ele, i) => {

        if (i < 5) {
            console.log(ele.geocoded_column_1.coordinates)
            if (ele.geocoded_column_1.coordinates != undefined) {
                let [a, b] = ele.geocoded_column_1.coordinates;
                if (i == 0) {
                    mymap.setView([b, a], 10);
                }
                // L.marker([b, a]).addTo(mymap)
                layer.push(L.marker([b, a]).addTo(mymap))

            }
        }
    })
}

function throttle(fn, delay) {
    let valid = true
    return function () {
        if (!valid) {
            
            return false
        }
        
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}