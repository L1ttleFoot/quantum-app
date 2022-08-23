/* import { useDispatch, useSelector } from 'react-redux'; */
import './App.css';
import Page from './common'

function App() {

  /* const dispatch = useDispatch()

  const cash = useSelector(state => state.cash) */

  /* const addCash = () => {
    dispatch({type:'ADD_CASH', payload:5})
  }

  const getCash = () => {
    dispatch({type:'GET_CASH', payload:5})
  } */

  return (
    <div className="App">
      <Page/>
      {/* <div>{cash}</div>
       <button onClick={()=> addCash()}>+ cach</button>
      <button onClick={()=> getCash()}>- cach</button> */}
    </div>
  );
}

export default App;
