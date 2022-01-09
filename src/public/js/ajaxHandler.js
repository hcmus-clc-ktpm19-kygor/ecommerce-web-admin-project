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

  // Best seller
  $.ajax({
    url: "http://localhost:8000/order/best-seller",
    method: "get",
    dataType: "json",
    success: function (results) {
      results.forEach(data => {
        const { product_id, name, producer, quantity } = data;

        let { total_price } = data;

        let dataColor;
        if (total_price < 100000000) {
          dataColor = "#dc3545";
        } else if (total_price >= 100000000 && total_price < 500000000) {
          dataColor = "#ff851b";
        } else if (total_price >= 500000000 && total_price < 1000000000) {
          dataColor = "#ffc107";
        } else {
          dataColor = "#39cccc";
        }

          total_price = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(total_price);

        const str = `<tr>
                      <td>${producer}</td>
                      <td><a href="/products/${product_id}">${name}</a></td>
                      <td><span class="badge" style="background-color: ${dataColor}" >${total_price}</span></td>
                      <td>
                        <div class="sparkbar" data-height="20">${quantity}</div>
                      </td>
                    </tr>`;

        const html = $.parseHTML(str);

        const $bestSellerTable = $("#best-seller-table");
        $bestSellerTable.append(html);
      })
    },
  });

  // Draw sales chart
  $.ajax({
    url: "http://localhost:8000/api/order/sales-in-last-10-days",
    method: "get",
    dataType: "json",
    success: function (result) {
      const labels = [];
      const dataSet = [];
      result.forEach(e => {
        dataSet.push(e.sales);

        const formatDate = new Date(e.date).toLocaleString().split(",")[1];
        labels.push(formatDate);
      });

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Doanh số",
            backgroundColor: "#17a2b8",
            borderColor: "#17a2b8",
            data: dataSet,
          }
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

      const myChart = new Chart(
          document.getElementById('salesChart'),
          config
      );
    },
  });
});