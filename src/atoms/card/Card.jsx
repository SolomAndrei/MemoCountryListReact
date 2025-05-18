import React from 'react';
import styles from './card.module.css';
import { Img } from '../../atoms/img/Img';

export const Card = ({ id, title }) => {
    return (
        <div className={styles.card}>
            <Img
                id={id}
                src={`https://picsum.photos/id/${id}/150/150`}
                alt={title}
                className={styles.thumbnail}
            />
            <div className={styles.title}>{title}</div>
        </div>
    );
};
