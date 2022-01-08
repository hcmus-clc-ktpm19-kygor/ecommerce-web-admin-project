$.noConflict();
jQuery(document).ready(function () {
  $.ajax({
    url: "http://localhost:8000/api/order/sales",
    method: "get",
    dataType: "json",
    success: function (data) {
      const { todaySales, thisMonthSales, thisQuarterSales, thisYearSales } =
        data;
      document.getElementById("today-sales").innerText = todaySales;
      document.getElementById("this-month-sales").innerText = thisMonthSales;
      document.getElementById("this-quarter-sales").innerText =
        thisQuarterSales;
      document.getElementById("this-year-sales").innerText = thisYearSales;
    },
  });

  $.ajax({
    url: "http://localhost:8000/order/api/sales",
    method: "get",
    dataType: "json",
    success: function (result) {
      const labels = [
        "Ngày 1",
        "Ngày 2",
        "Ngày 3",
        "Ngày 4",
        "Ngày 5",
        "Ngày 6",
        "Ngày 7",
      ];

      const data = {
        labels: labels,
        datasets: [
          {
            label: "MSI",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
          },
          {
            label: "Lenovo",
            backgroundColor: 'rgb(198,88,245)',
            borderColor: 'rgb(198,88,245)',
            data: [7, 20, 4, 2, 20, 50, 15],
          },
          {
            label: "Acer",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [2, 15, 2, 2, 30, 50, 3],
          },
          {
            label: "Asus",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [5, 50, 2, 4, 50, 30, 65],
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
  });
});