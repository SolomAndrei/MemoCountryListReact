import { memo } from 'react';
import { Region } from '../../atoms/regions/Region';
import styles from './country.module.css';

export const Country = memo(
    ({ countryCode, toggleCountry, countryName, isOpen, reducedCountries }) => {
        const { regionsObj } = reducedCountries[countryCode];

        return (
            <div className={styles.country}>
                <div className={styles.countryBox}>
                    <input type="checkbox" />
                    <div
                        className={styles.countryHeader}
                        onClick={() => toggleCountry(countryCode)}
                    >
                        <span>{countryName}</span>
                        <span>{isOpen ? '▲' : '▼'}</span>
                    </div>
                </div>
                {isOpen && (
                    <div className={styles.regionList}>
                        {Object.keys(regionsObj).map((regionCode) => {
                            return <Region key={regionCode} regionName={regionsObj[regionCode]} />;
                        })}
                    </div>
                )}
            </div>
        );
    }
);
