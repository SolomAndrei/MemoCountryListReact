import { memo } from 'react';
import styles from './region.module.css';

export const Region = memo(({ regionName }) => {
    return (
        <div className={styles.regionBox}>
            <div className={styles.region}>
                <label>
                    <input type="checkbox" />
                    {regionName}
                </label>
            </div>
        </div>
    );
});
