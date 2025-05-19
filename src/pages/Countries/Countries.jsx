import { useState, useCallback, useMemo } from 'react';
import { allCountries } from 'country-region-data';
import { Country } from '../../organism/country/Country';
import { MyButton } from '../../atoms/myButton/MyButton';
import styles from './countries.module.css';

const createObj = (allCountries) => {
    const res = allCountries.reduce((acc, country) => {
        const countryName = country[0];
        const countryCode = country[1];
        const regionsArr = country[2];
        const regionsObj = regionsArr.reduce((acc, region) => {
            const regionName = region[0];
            const regionCode = region[1];
            const newRegionCode = `${countryCode}_${regionCode}`;
            acc[newRegionCode] = regionName;
            return acc;
        }, {});
        acc[countryCode] = { countryName, regionsObj };
        return acc;
    }, {});

    return res;
};
export const Countries = () => {
    const reducedCountries = useMemo(() => createObj(allCountries), []);
    const [openCountries, setOpenCountries] = useState({});

    const toggleCountry = useCallback((code) => {
        setOpenCountries((prev) => ({
            ...prev,
            [code]: !prev[code],
        }));
    }, []);
    const closeAllCountries = useCallback(() => {
        setOpenCountries({});
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <MyButton onClick={closeAllCountries}>Collapse All</MyButton>
                {Object.keys(reducedCountries).map((countryCode) => {
                    const { countryName } = reducedCountries[countryCode];
                    const isOpen = openCountries[countryCode];
                    return (
                        <Country
                            key={countryCode}
                            countryCode={countryCode}
                            toggleCountry={toggleCountry}
                            countryName={countryName}
                            isOpen={isOpen}
                            reducedCountries={reducedCountries}
                        />
                    );
                })}
            </div>
        </div>
    );
};
