export const LIKERTPLOTOPTIONS = {
  aspectRatio: 4,
  responsive: true,
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "1 = Strongly Disagree, 5 = Strongly Agree",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: { min: 0 },
      },
    ],
  },
  legend: {
    display: false,
  },
};
