

var goalData = {
    js: 99,
    webpage: 19,
    machineLearning: 3,
    English: 5,
    interviewPrac: 2
};

    var labels = Object.keys(goalData);
    var data = Object.values(goalData);


    // var goalList = new Array('Red', 'Blue', 'Yellow', 'Green', 'Purple');
    // var goalProgress = new Array(12, 19, 3, 5, 2);



    // var chartArea = $('#mychart').context('2d');
    
    var chartArea = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(chartArea, {
    // ①차트의 종류(String)
    type: 'bar',
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: Object.keys(goalData),
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '% progress',
            // ⑥dataset값(Array)
            data: Object.values(goalData),
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgba(255, 99, 132, 1)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: '#ff4081', // 툴팁 배경색
            },
            title: {
                display: true,
                text: 'monthly goal'
            }
        }
        ,
        responsive: false,
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
            y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }
    }
});



for( let key in goalData) {
    var newOption = $('<option></option>').text(key).attr('id', `${key}`);
    $('#goalSelect').append(newOption);
}




// labels.forEach(element => {
//     var newOption = $('<option></option>').text(element);
//     $('#goalSelect').append(newOption);
// });











function openBox(className) {
    console.log('.' + className);
    // document.getElementById(className).style.display = 'block';
    $('.' + className).css('display', 'block');
}

function submitValue(textBox){
    var newValue =  $(`#${textBox}`).val();
    // goalList.push(newValue);
    console.log(newValue);
    goalData[newValue] = 0;
    // goalProgress.push(0);
    console.log(goalData);
    
    $('#monthlyGoalAdd').css('display', 'none');
    $('#'+textBox).val('');
    var newOption = $('<option></option>').text(newValue).attr('id', `${newValue}`);
    $('#goalSelect').append(newOption);

    console.log(myChart);

    myChart.data.labels = Object.keys(goalData);
    myChart.data.datasets[0].data= Object.values(goalData);
    myChart.update();
}


function submitprogress(idName) {
    var selectedGoal = document.getElementById(idName).value;
    if (selectedGoal in goalData) {
        goalData[selectedGoal] += 10;
        if (goalData[selectedGoal] >= 100){
            addAccomItem(selectedGoal);
            delete goalData[selectedGoal];
            console.log(selectedGoal)
            console.log($(`#${selectedGoal}`));
            $(`#${selectedGoal}`).remove();
            myChart.data.labels = Object.keys(goalData);
        }
        console.log(goalData);

        myChart.data.datasets[0].data= Object.values(goalData);
        myChart.update();
        $('#monthlyProgress').css('display','none');

    }
    else{
        console.log('couldn\'t find goal');
    }
}



function addAccomItem (goalData){
    console.log("working");
    var newAccomLi = $('<li></li>').text(goalData).css(
        {
            'list-style': 'none',
            'font-weight': 'bolder'
        }
    );
    $('#goalsCompleted').append(newAccomLi);

}

