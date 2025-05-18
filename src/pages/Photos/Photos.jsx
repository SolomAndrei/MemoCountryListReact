import { useEffect, useState, useRef, useCallback } from 'react';
import { Card } from '../../atoms/card/Card';
import styles from './photos.module.css';

const ITEM_HEIGHT = 173;
const VISIBLE_COUNT = 20;

export const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const containerRef = useRef(null);

    useEffect(() => {
        const getPhotos = async () => {
            setIsLoading(true);
            try {
                //await new Promise((res) => setTimeout(res, 1000));
                const res = await fetch('https://jsonplaceholder.typicode.com/photos');
                if (!res.ok) {
                    setIsError(true);
                }
                const json = await res.json();
                setPhotos(json);
            } catch (e) {
                console.log(e);
                setIsError(true);
            } finally {
                setIsLoading(false);
                setIsSuccess(true);
            }
        };

        getPhotos();
    }, []);

    const onScroll = useCallback(() => {
        const scrollTop = containerRef.current.scrollTop;
        const newStartIndex = Math.floor(scrollTop / ITEM_HEIGHT);
        setStartIndex(newStartIndex);
    }, []);

    if (isLoading || !isSuccess) {
        return (
            <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className={styles.errorWrapper}>
                <div className={styles.errorIcon}>⚠️</div>
                <div className={styles.errorText}>
                    Oops! Something went wrong while loading photos.
                </div>
            </div>
        );
    }
    if (!photos.length && isSuccess) {
        return <h2>No photos found</h2>;
    }

    const endIndex = Math.min(startIndex + VISIBLE_COUNT, photos.length);
    const visibleItems = photos.slice(startIndex, endIndex);
    const offsetY = startIndex * ITEM_HEIGHT;
    const totalHeight = photos.length * ITEM_HEIGHT;

    return (
        <div className={styles.container1} onScroll={onScroll} ref={containerRef}>
            <div className={styles.spacer} style={{ '--total-height': `${totalHeight}px` }}>
                <div className={styles.cardWrapper} style={{ top: `${offsetY}px` }}>
                    {visibleItems.map((photo) => (
                        <Card key={photo.id} {...photo} />
                    ))}
                </div>
            </div>
        </div>
    );
};
