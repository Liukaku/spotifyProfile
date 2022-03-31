import { useEffect, useState } from "react";
import Chart from "chart.js";

interface TrackShapeObj {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
}

export const TrackChart = (data: TrackShapeObj | any) => {
  const key = new Date().getTime();
  const props = data.data;

  const properties = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "speechiness",
    "valence",
  ];

  const [chartData, updateChartData] = useState({});

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  useEffect(() => {
    const createChart = (dataset) => {
      const ctx = document.getElementById(`chart${key}`);
      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "",
              data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.3)",
                "rgba(255, 159, 64, 0.3)",
                "rgba(255, 206, 86, 0.3)",
                "rgba(75, 192, 192, 0.3)",
                "rgba(54, 162, 235, 0.3)",
                "rgba(104, 132, 245, 0.3)",
                "rgba(153, 102, 255, 0.3)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(104, 132, 245, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          maxHeight: 300,
          maxWidth: 200,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          title: {
            display: true,
            text: `Audio Features`,
            fontSize: 18,
            fontColor: "#ffffff",
            padding: 30,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                ticks: {
                  fontSize: 12,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                ticks: {
                  beginAtZero: true,
                  fontSize: 12,
                },
              },
            ],
          },
        },
      });
    };

    const parseData = () => {
      let dataSet = {
        acousticness: props.acousticness,
        danceability: props.danceability,
        instrumentalness: props.instrumentalness,
        liveness: props.liveness,
        valence: props.valence,
      };

      createChart(dataSet);
    };

    parseData();
  }, [props]);
  return (
    <div className="md:w-3/5 w-full mx-auto">
      <canvas id={`chart${key}`} width="100" height="100"></canvas>
    </div>
  );
};

export default TrackChart;
