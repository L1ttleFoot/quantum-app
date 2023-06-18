import React, { useState, useEffect } from 'react'
import '../../style.css'
import { Typography, Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'

const ConstsField = () => {

    /* const [myArray, setMyArray] = useState(new Array(0));

    useEffect(() => {
        let intervalId;
        if (myArray.length < 35) { // проверяем длину массива
          intervalId = setInterval(() => {
            setMyArray(prevArray => [...prevArray, Math.random()]); // добавляем случайное число в массив
          }, 20); // интервал в миллисекундах (0,5 секунды = 500 миллисекунд)
        }
    
        return () => clearInterval(intervalId); // очищаем интервал при размонтировании компонента
      }, [myArray]); // зависимость от myArray, чтобы эффект выполнялся при изменении длины массива
    */

    const data = useSelector(state => state.data)

    const { freedomDegrees, order } = data

    function permutationsWithoutMirror(n, k) {
        let numerator = 1;
        let denominator = 1;
        for (let i = 0; i < k; i++) {
            numerator *= n + i;
            denominator *= i + 1;
        }
        return numerator / denominator;
    }

    const sum = Array.from({ length: parseInt(order) }, (_, i) => i).map(item => permutationsWithoutMirror(parseInt(freedomDegrees), item + 3)).reduce((acc, curr) => acc + curr, 0);

    const myArray = Array.from({ length: sum }, (_, index) => index + 1);

    return (
        <div className='block'>
            <Typography variant="subtitle">Силовые постоянные</Typography>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
            >
                {myArray.map((item, index) =>
                    <Skeleton
                        key={index}
                        variant="rounded"
                        width={'15%'}
                        height={'40px'}
                        style={{ margin: 10, width: '15%', minWidth: 80 }}
                    />)}

            </div>
        </div>
    )
}

export default ConstsField