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

  const columns = [
    {
        field: 'transition', 
        headerName: 'Переход', 
        width: 80,
        sortable:false 
    },
    {
        field: 'energy',
        headerName: 'Энергия',
        width: 150,
        sortable:false,
    },
    {
        field: 'matrix',
        headerName: 'Матричный элемент',
        width: 200,
        sortable:false,
    }
  ];

const rows = [
    { id: 1, transition: '0 => 0', energy: 0, matrix: 446.4995 },
    { id: 2, transition: '0 => 1', energy: 2309.036, matrix: -4.9995 },
    { id: 3, transition: '0 => 2', energy: 4618.1079, matrix: 2.1212 },
    { id: 4, transition: '0 => 3', energy: 6927.2158, matrix: -0.8167 },
    { id: 5, transition: '0 => 4', energy: 9236.3597, matrix: 0.0002 },
    { id: 6, transition: '0 => 5', energy: 11545.5395, matrix: 0 },    
];
  
  const {data} = props

  const newData = data.map(n => ({...n, intensity:(n.matrix*n.matrix)}))

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
          <XAxis dataKey="energy" type='number'/>
          <YAxis dataKey="intensity" type='number' domain={[0, dataMax => (dataMax * 1.1).toPrecision(1)]}/>
          <Bar dataKey="intensity" fill="#0E76BB" barSize={2}/>
        </BarChart>
      </ResponsiveContainer>
    );
}