import React from 'react';
import styles from './myButton.module.css';

export const MyButton = ({ children, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
};
