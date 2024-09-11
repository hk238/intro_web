
var goalData = {

    English: 5,
    interviewPrac: 2
};





$(document).ready(function () {




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
            indexAxis: 'y',
            plugins: {

                tooltip: {
                    enabled: true,
                    backgroundColor: '#ff4081', // 툴팁 배경색
                },
                title: {
                    display: true,
                    text: 'monthly goal',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
            ,
            responsive: false,

            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false, // 테두리 그리드 라인 없앰
                    }
                }
            },
            animation: {
                duration: 1000, // 애니메이션 지속 시간
                easing: 'easeInOutQuart' // 애니메이션 효과
            }
        }
    });







    for (let key in goalData) {
        var newOption = $('<option></option>').text(key).attr('id', `${key}`);
        $('#goalSelect').append(newOption);
    }



    // labels.forEach(element => {
    //     var newOption = $('<option></option>').text(element);
    //     $('#goalSelect').append(newOption);
    // });













    window.openBox = function(className) {
        console.log('.' + className);
        // document.getElementById(className).style.display = 'block';
        $('.' + className).css('display', 'block');
    }

    window.submitValue = function(textBox) {
        var newValue = $(`#${textBox}`).val();
        // goalList.push(newValue);
        console.log(newValue);
        goalData[newValue] = 0;
        // goalProgress.push(0);
        console.log(goalData);

        $('#monthlyGoalAdd').css('display', 'none');
        $('#' + textBox).val('');
        var newOption = $('<option></option>').text(newValue).attr('id', `${newValue}`);
        $('#goalSelect').append(newOption);

        console.log(myChart);

        myChart.data.labels = Object.keys(goalData);
        myChart.data.datasets[0].data = Object.values(goalData);
        myChart.update();
    }


    window.submitprogress = function(idName) {
        var selectedGoal = document.getElementById(idName).value;
        if (selectedGoal in goalData) {
            goalData[selectedGoal] += 10;
            if (goalData[selectedGoal] >= 100) {
                addAccomItem(selectedGoal);
                delete goalData[selectedGoal];
                console.log(selectedGoal)
                console.log($(`#${selectedGoal}`));
                $(`#${selectedGoal}`).remove();
                myChart.data.labels = Object.keys(goalData);
            }
            console.log(goalData);

            myChart.data.datasets[0].data = Object.values(goalData);
            myChart.update();
            $('#monthlyProgress').css('display', 'none');

        }
        else {
            console.log('couldn\'t find goal');
        }
    }



    function addAccomItem(goalData) {
        console.log("working");
        var newAccomLi = $('<li></li>').text(goalData).css(
            {
                'list-style': 'none',
                'font-weight': 'bolder'
            }
        );
        $('#goalsCompleted').append(newAccomLi);

    }




    // 1. API에서 유저 리스트 가져오기 (GET 요청)
    $.ajax({
        url: 'http://localhost:8080/users',
        type: 'GET',
        success: function (users) {


            users.forEach(function (user) {
                goalData[user.goal] = user.progress;
                console.log('ajax working')
                console.log(goalData);



                // 차트에 반영될 레이블과 데이터 업데이트
                myChart.data.labels = Object.keys(goalData);
                myChart.data.datasets[0].data = Object.values(goalData);
                myChart.update();
            });
        },
        error: function (err) {
            console.log("Error: ", err);
        }
    });



});


// 2. 새로운 유저 추가 (POST 요청)
// $('#userForm').submit(function(event) {
//     event.preventDefault();
//     var name = $('#name').val();
//     var email = $('#email').val();

//     $.ajax({
//         url: 'http://localhost:8080/api/users',
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify({ name: name, email: email }),
//         success: function(newUser) {
//             $('#usersTable tbody').append(
//                 '<tr><td>' + newUser.id + '</td><td>' + newUser.name + '</td><td>' + newUser.email + '</td></tr>'
//             );
//             // 폼을 초기화
//             $('#name').val('');
//             $('#email').val('');
//         },
//         error: function(err) {
//             console.log("Error: ", err);
//         }
//     });
// });


