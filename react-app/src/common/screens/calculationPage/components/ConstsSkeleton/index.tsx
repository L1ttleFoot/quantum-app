import styles from '../../style.module.css';
import {Typography, Skeleton} from '@mui/material';
import {useTypedSelector} from '../../../../../helpers/hooks/useTypedSelector';

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

    const data = useTypedSelector((state) => state.data);

    const {freedomDegrees, order} = data;

    function permutationsWithoutMirror(n: number, k: number): number {
        let numerator = 1;
        let denominator = 1;
        for (let i = 0; i < k; i++) {
            numerator *= n + i;
            denominator *= i + 1;
        }
        return numerator / denominator;
    }

    const sum = Array.from({length: order}, (_, i) => i)
        .map((item) => permutationsWithoutMirror(freedomDegrees, item + 3))
        .reduce((acc, curr) => acc + curr, 0);

    const myArray = Array.from({length: sum}, (_, index) => index + 1);

    return (
        <div className={styles.block}>
            <Typography variant="body1" component="span">
                Силовые постоянные
            </Typography>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {myArray.map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rounded"
                        width={'15%'}
                        height={'40px'}
                        style={{margin: 10, width: '15%', minWidth: 80}}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConstsField;
