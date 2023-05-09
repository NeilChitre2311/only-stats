import { Radar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { RadialLinearScale } from 'chart.js'

Chart.register(RadialLinearScale);

Object.keys(registerables).forEach((name:any) => {
  Chart.register(registerables[name]);
});

const data = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 90, 81, 56],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
    },
    {
      label: 'Dataset 2',
      data: [28, 48, 40, 19, 96],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
    }
  ]
};

const options = {
  scales: {
    r: {
      angleLines: {
        display: false
      },
      suggestedMin: 0,
      suggestedMax: 100
    }
  }
};

const RadarChart = () => {
  return (
    <div>
      <p>Hey World</p>
      <Radar data={data} options={options} />
    </div>
  );
};


export default RadarChart