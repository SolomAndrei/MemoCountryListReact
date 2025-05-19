import React, { useState, useRef } from 'react';
import { CustomInput } from '../../atoms/input/CustomInput';
import { MyButton } from '../../atoms/myButton/MyButton';
import styles from './general.module.css';

export const General = () => {
    const [value, setValue] = useState('');

    const inputRef = useRef(null);

    const showValue = () => {
        const value = inputRef.current.getValue();
        alert(`your value is: ${value}`);
    };

    return (
        <div className={styles.box}>
            <CustomInput ref={inputRef} value={value} onChange={setValue} />
            <MyButton
                onClick={() => {
                    inputRef.current?.focus();
                }}
            >
                on focus
            </MyButton>
            <MyButton onClick={showValue}>show value</MyButton>
        </div>
    );
};
