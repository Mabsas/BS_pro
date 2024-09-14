import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';  // Import different chart types
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const PriceChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bs-pro-api.vercel.app/api/v1/get-book-prices');
        const books = response.data.data;

        // Prepare data for the charts
        const labels = books.map(book => book.title.length > 15 ? book.title.slice(0, 30) + '...' : book.title);
        const prices = books.map(book => book.price);

        const dataset = {
          labels,
          datasets: [{
            label: 'Book Prices',
            data: prices,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        };

        setChartData(dataset);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
     
      {chartData && (
        <>
          {/* Bar Chart */}
          <div>
            <h3 className="flex items-center justify-center text-4xl mt-10 text-yellow-100">Bar Chart</h3>
            <Bar 
              data={chartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Prices of Books (Bar Chart)' },
                },
              }} 
            />
          </div>

          {/* Line Chart */}
          <div>
            <h3 className="flex items-center justify-center text-4xl mt-40 text-yellow-100">Line Chart</h3>
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Prices of Books (Line Chart)' },
                },
              }} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PriceChart;
