import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from 'recharts';

export default function Chart (props) {

  const {data} = props

  const newData = data.map(n => ({...n, intensity:(n.matrix*n.matrix)}))

  const maxValue = newData.map(item=>item.energy).reduce((a, b) => b > a ? b : a, 0)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={newData}
        margin={{
          top: 30,
          right: 40,
        }}
      >
        <Tooltip cursor={false}/>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="energy" type='number' domain={[0, Math.floor( maxValue * 110 ) / 100]}/>
        <YAxis dataKey="intensity" type='number' domain={[0, dataMax => (dataMax * 1.1).toPrecision(1)]}/>
        <Bar dataKey="intensity" fill="#0E76BB" barSize={2}/>
      </BarChart>
    </ResponsiveContainer>
  );
}