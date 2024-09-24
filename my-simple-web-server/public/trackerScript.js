
    var goalData = {

        0 : {English: 5},
        0 : {interviewPrac: 2}
    };





$(document).ready(function () {




    // var labels = Object.keys(goalData);
    // var data = Object.values(goalData);

    var labels = Object.keys(goalData).map(id => Object.keys(goalData[id])[0]);
    var data = Object.keys(goalData).map(id => Object.values(goalData[id])[0]);



    var chartArea = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(chartArea, {
        // ①차트의 종류(String)
        type: 'bar',
        // ②차트의 데이터(Object)
        data: {
            // ③x축에 들어갈 이름들(Array)
            labels: Object.keys(goalData).map(id => Object.keys(goalData[id])[0]),
            // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
            datasets: [{
                // ⑤dataset의 이름(String)
                label: '% progress',
                // ⑥dataset값(Array)
                data: Object.keys(goalData).map(id => Object.values(goalData[id])[0]),
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



            // 1. API에서 유저 리스트 가져오기 (GET 요청)
            $.ajax({
                url: 'http://localhost:8080/users',
                type: 'GET',
                success: function (users) {
            
                    users.forEach(function (user) {
                        console.log('시발 오브젝트에 추가 됬어')
                        // user.goal을 키로 사용하려면 대괄호가 필요합니다.
                        goalData[user.id] = { [user.goal]: user.progress }; 
                        console.log('ajax working');
                        console.log(goalData);
            
                        // goalData 업데이트
                        myChart.data.labels = Object.keys(goalData).map(id => Object.keys(goalData[id])[0]);
                        myChart.data.datasets[0].data = Object.keys(goalData).map(id => Object.values(goalData[id])[0]);
                        myChart.update();
                    });

                    for (let key in goalData) {
                        if (goalData.hasOwnProperty(key)) {  // goalData가 가진 속성인지 확인
                            
                            var firstElement = Object.keys(goalData[key])[0];
                    
                            // 새로운 <option> 요소 생성
                            var newOption = $('<option></option>').text(firstElement).attr('id', `${key}`);
                    
                            // <select> 태그에 새로운 option 추가
                            $('#goalSelect').append(newOption);
                        }
                    }


                },
                error: function (err) {
                    console.log("Error: ", err);
                }
            });



    // for (let key in goalData) {
    //     var newOption = $('<option></option>').text(key).attr('id', `${key}`);
    //     $('#goalSelect').append(newOption);
    // }
    




    // labels.forEach(element => {
    //     var newOption = $('<option></option>').text(element);
    //     $('#goalSelect').append(newOption);
    // });













    window.openBox = function(className) {
        if ($(`.${className}`).css('display') !== 'block' ){
            $(`.${className}`).css('display', 'block');
        }
        else {
            $(`.${className}`).css('display', 'none');
        }
    }




    window.submitValue = async function(goalNameFromTextBox) {


        // goalData object에 넣을 정보들 initializing
        var goal = $(`#${goalNameFromTextBox}`).val();
        var id = await postGoal(goal);
        var progress = 0;

        // reset textBox & creating option to progress selector
        $('#monthlyGoalAdd').css('display', 'none');
        $('#' + goalNameFromTextBox).val('');
        var newOption = $('<option></option>').text(goal).attr('id', `${id}`);
        $('#goalSelect').append(newOption);

        // goal data에 append
        goalData[id] = { [goal] : progress};


        //update chart
        myChart.data.labels = Object.keys(goalData).map(id => Object.keys(goalData[id])[0]);
        myChart.data.datasets[0].data = Object.keys(goalData).map(id => Object.values(goalData[id])[0]);
        myChart.update();
    }

    

    window.submitprogress = function(idName) {
        //task
        //일단 submitvalue 함수에서 newoption id에 object id를 부여해 고를수 있게 만들어
        //




        // var selectedGoal = document.getElementById(idName).value;

        var selectedGoal = $(`#${idName}`).val();
        var selectedGoalId = $(`#${idName} option:selected`).attr('id');
        var doPatch = true;
        


        if (selectedGoal in goalData[selectedGoalId]) {
            goalData[selectedGoalId][selectedGoal] +=10;
            
            if (goalData[selectedGoalId][selectedGoal] >= 100) {
                doPatch = false;
                //add to accomplished list
                addAccomItem(selectedGoal);
                //remove from graph, and object
                delete goalData[selectedGoalId];
                //remove from option
                $(`#${selectedGoalId}`).remove();
                //update graph data with removed version
                myChart.data.labels = Object.keys(goalData).map(id => Object.keys(goalData[id])[0]);
                deleteGoalById(selectedGoalId);
                
            }
            console.log(goalData);

            myChart.data.datasets[0].data = Object.keys(goalData).map(id => Object.values(goalData[id])[0]);
            myChart.update();
            $('#monthlyProgress').css('display', 'none');
            if(doPatch){ patchGoal(selectedGoalId , goalData[selectedGoalId][selectedGoal]); };

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




    // // 1. API에서 유저 리스트 가져오기 (GET 요청)
    // $.ajax({
    //     url: 'http://localhost:8080/users',
    //     type: 'GET',
    //     success: function (users) {


    //         users.forEach(function (user) {
    //             goalData[user.goal] = user.progress;
    //             console.log('ajax working')
    //             console.log(goalData);
                


    //             // 차트에 반영될 레이블과 데이터 업데이트
    //             myChart.data.labels = Object.keys(goalData);
    //             myChart.data.datasets[0].data = Object.values(goalData);
    //             myChart.update();
    //         });
    //     },
    //     error: function (err) {
    //         console.log("Error: ", err);
    //     }
    // });







        function postGoal(goalName) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'http://localhost:8080/users', // 서버의 요청을 받을 URL
                    type: 'POST',          // 요청 메서드
                    contentType: 'application/json', // 요청의 콘텐츠 유형
                    data: JSON.stringify({   // JSON 형식으로 데이터를 보냅니다.
                        goal: goalName,    // User 객체의 필드와 맞추어야 함.
                        progress: 0
                    }),
                    success: function(response) {
                        console.log('Success:', response);  // 요청 성공 시 실행할 코드
                        const generatedId = response.id;
                        resolve(generatedId);  // 성공 시 Promise를 해결하고 ID 반환
                    },
                    error: function(xhr, status, error) {
                        console.log('Error:', error);       // 요청 실패 시 실행할 코드
                        reject(error);  // 오류 발생 시 Promise를 거부
                    }
                });
            });
        }
        


        function patchGoal(userId, updatedProgress,  updatedGoalName = null) {
            // data 객체 생성
            let dataToSend = {
                progress: updatedProgress   // progress는 항상 업데이트
            };
        
            // updatedGoalName이 null이 아니면 goal 필드를 추가
            if (updatedGoalName !== null) {
                dataToSend.goal = updatedGoalName;
            }
            console.log(dataToSend);
        
            $.ajax({
                url: `http://localhost:8080/users/${userId}`, // 특정 사용자 ID를 가진 URL
                type: 'PATCH',          // PATCH 메서드 사용
                contentType: 'application/json', // 요청의 콘텐츠 유형
                data: JSON.stringify(dataToSend),   // 동적으로 생성된 data 객체 전송
                success: function(response) {
                    console.log('Success:', response);  // 요청 성공 시 실행할 코드
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);       // 요청 실패 시 실행할 코드
                    console.log(dataToSend);
                }
            });
        }


        function deleteGoalById( userId ){
            $.ajax({
                url:  `http://localhost:8080/users/${userId}`,
                type: 'DELETE',
                success: function(response) {
                    console.log('Success: ', response);
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);       // 요청 실패 시 실행할 코드
                }
            });
        }



});




