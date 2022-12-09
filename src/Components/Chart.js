
import React, { useEffect, useState } from "react";
import { Tooltip, BarChart, XAxis, YAxis, Legend,CartesianGrid, Bar} from "recharts";
import _ from 'underscore';

const Chart = () => {

  const [dataChart, setDataChart] = useState([])
  console.log(JSON.stringify(dataChart))
 
  useEffect( () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => {
        if (response.ok) 
           return response.json() 
        else 
        alert("Something goes wrong") 
    }
        )
        .then(data => setDataChart(data))
    .catch(err => console.log(err))
  }, [])
  
  var _ = require('lodash')
  let output = _(dataChart)
    .groupBy('activity')
    .map((exercise, id) => ({
      activity: id,
      duration: _.sumBy(exercise, 'duration'),
    }) )
      .value()

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Duration of Activity</h1>
      <div className="App">
        <p> This is Bar Chart page</p>
        <BarChart
          width= {1000}
          height={500}
          data={output}

          margin={{
            top: 25,
            right: 30,
            left: 100,
            bottom: 0,
          }}
          barSize={70}
        >
          <XAxis
            dataKey="activity"           
            padding={{ left: 10, right: 10 }}
            
          />
          <YAxis
            label={{ value: 'duration by minutes', angle: -90, position: 'insideLeft' }}  />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="duration" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;