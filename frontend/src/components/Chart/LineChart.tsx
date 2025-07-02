
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
import ChartDeaffed from 'chartjs-plugin-deferred'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDeaffed
);

export const options : ChartOptions<'line'> = {
  responsive: true,

    scales: {
        x: {

          title: {
            display: true,
            text: 'Force [N]',
            font: {
                size: 10
            }
          }
            
        },
        y: {

          title: {
            display: true,
            text: 'Stiffness [N/mm]',
            font: {
                size: 10
            }
          }
            
        },

    },
    plugins: {
    legend: {
        display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Stiffness map',
    },

    deferred: {
      xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
      yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
      delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
    }


  },
};


export default function LineChart({ x, y }: { x: number[]; y: number[] }){
  var stiffness_x = x
  var stiffness_y = y
  
  
  const data_db = {
    labels: stiffness_x,
    datasets: [
      {
      
        data: stiffness_y,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
    
  };
  return <Line options={options} data={data_db} />;

}


