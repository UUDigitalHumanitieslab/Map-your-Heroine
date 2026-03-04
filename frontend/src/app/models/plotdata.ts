import { ChartOptions } from "chart.js";

export const LIKERTPLOTOPTIONS: ChartOptions = {
    aspectRatio: 4,
    responsive: true,
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: "1 = Strongly Disagree, 5 = Strongly Agree",
            },
        },
        y: {
            display: false,
            min: 0,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    }
};
