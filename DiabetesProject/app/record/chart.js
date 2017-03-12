
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Sugar blood');

      data.addRows([
        [vm.user.record.sugarblood, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48]
        
      ]);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Sugar blood'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }