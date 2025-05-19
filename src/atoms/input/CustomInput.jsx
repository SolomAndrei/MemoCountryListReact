import { forwardRef, useRef, useImperativeHandle } from 'react';
import styles from './customInput.module.css';

export const CustomInput = forwardRef(({ value, onChange }, ref) => {
    const innerRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => {
            innerRef.current.focus();
        },
        getValue: () => {
            return innerRef.current.value;
        },
    }));

    return (
        <input
            className={styles.inputStyle}
            ref={innerRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
});
