import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './counterView.module.css';

import BasicInput from 'APPSRC/components/basicInput'

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('12');

  return (
    <>
      <div className={styles.row} style={{height:'50%'}}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())} >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())} >
          -
        </button>
      </div>
      <div className={styles.row} style={{height:'50%'}}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)} />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount)))
          } >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount)))
          } >
          Add Async
        </button>
      </div>
    </>
  );
}
