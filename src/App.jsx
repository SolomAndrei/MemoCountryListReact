import { useState, memo, useCallback, useMemo } from 'react';
import { allCountries } from 'country-region-data';

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

function App() {
    const reducedCountries = useMemo(() => createObj(allCountries), []);
    const [openCountries, setOpenCountries] = useState({});

    const toggleCountry = useCallback((code) => {
        setOpenCountries((prev) => ({
            ...prev,
            [code]: !prev[code],
        }));
    }, []);
    return (
        <div>
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
    );
}
export default App;

const Country = memo(({ countryCode, toggleCountry, countryName, isOpen, reducedCountries }) => {
    const { regionsObj } = reducedCountries[countryCode];
    console.log({ countryName, isOpen });
    return (
        <div key={countryCode}>
            <div
                style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => toggleCountry(countryCode)}
            >
                {countryName} {isOpen ? '▲' : '▼'}
            </div>
            {isOpen && (
                <div>
                    {Object.keys(regionsObj).map((regionCode) => {
                        return <Region key={regionCode} regionName={regionsObj[regionCode]} />;
                    })}
                </div>
            )}
        </div>
    );
});

const Region = memo(({ regionName }) => {
    return <div style={{ color: 'green' }}>{regionName}</div>;
});
