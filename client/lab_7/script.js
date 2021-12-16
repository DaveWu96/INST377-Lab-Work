const list = []; /*存储数据列表 */
const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
let mymap = "";
let layer = [];

async function windowActions() {
    await fetch(url).then(response => response.json()) //解析为可读数据
        .then(data => {
            list.push(...data)
            showlist(data)
            // console.log(list)
        }) //执行结果是 resolve就调用then方法
        .catch(err => console.log("Oh, error", err)) //执行结果是 reject就调用catch方法
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
    /* 移除所有标记点后重新绘制 */
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
            //休息时间 暂不接客
            return false
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}