
import React, { useEffect, useState } from "react";

import { useSubscription } from '@apollo/client';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { SUBSCRIBE_STATISTICS } from './Constants'

const Subscription = () => {
  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem('Banner'))
    ?
    JSON.parse(window.localStorage.getItem('Banner'))
    :
    {
      bannerChanged: {
        title: 'Base',
        impressions: 0,
        clicks: 0,
        costs: 0
      }
    }
  )

  const { data, error, loading } = useSubscription(SUBSCRIBE_STATISTICS, {
    variables: {
      title: "Statistic"
    },
  });

  useEffect(() => {
    if (data) {
      window.localStorage.setItem('Banner', JSON.stringify(data))
      const dataFromStorage = JSON.parse(window.localStorage.getItem('Banner'))
      setState(dataFromStorage)
    }
  }, [data])

  if (error) {
    return <div>Error! {error.message}</div>;
  };

  const info = [
    { name: "Impressions", banners: state.bannerChanged.impressions },
    { name: "Clicks", banners: state.bannerChanged.clicks },
    { name: "Costs", banners: state.bannerChanged.costs },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Banners statistics</h1>
      <div className="App">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="banners"
            isAnimationActive={false}
            data={info}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={info}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="banners" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default Subscription;
