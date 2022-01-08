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
            backgroundColor: '#64c5eb',
            borderColor: '#64c5eb',
            data: [0, 10, 5, 2, 20, 30, 45],
        },
        {
            label: "Lenovo",
            backgroundColor: '#e84d8a',
            borderColor: '#e84d8a',
            data: [7, 20, 4, 2, 20, 50, 15],
        },
        {
            label: "Acer",
            backgroundColor: "#8dbd61",
            borderColor: "#8dbd61",
            data: [2, 15, 2, 2, 30, 50, 3],
        },
        {
            label: "Asus",
            backgroundColor: '#feb326',
            borderColor: '#feb326',
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