import React from 'react';
import {XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip} from 'recharts';

const Chart = (props) => {
    const {data} = props;

    const newData = data.map((n) => ({
        ...n,
        intensity: (n.matrix ** 2).toFixed(2),
        energy: parseFloat(n.energy).toFixed(2),
    }));

    const maxValueX = newData
        .map((item) => parseFloat(item.energy))
        .reduce((a, b) => (b > a ? b : a), 0);
    const minValueX = newData
        .map((item) => parseFloat(item.energy))
        .reduce((a, b) => (b < a ? b : a), Infinity);

    const maxValueY = newData
        .map((item) => parseFloat(item.intensity))
        .reduce((a, b) => (b > a ? b : a), 0);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={newData}
                margin={{
                    top: 30,
                    right: 40,
                }}
            >
                <Tooltip cursor={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="energy"
                    type="number"
                    domain={[
                        +(minValueX - 0.1 * (maxValueX - minValueX)).toFixed(0),
                        +(maxValueX + 0.1 * (maxValueX - minValueX)).toFixed(0),
                    ]}
                />
                <YAxis
                    dataKey="intensity"
                    type="number"
                    domain={[0, +(maxValueY * 1.1).toFixed(2)]}
                />
                <Bar dataKey="intensity" fill="#0E76BB" barSize={2} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
