import { useState } from 'react';

export const Img = (props) => {
    const { id, alt, src, onLoad = () => {}, className } = props;

    const [isError, setIsError] = useState(false);

    const onLoadAction = () => {
        onLoad(id);
    };

    const onErrorAction = () => {
        setIsError(true);
    };

    if (isError) {
        return <div className={className} style={{ background: 'grey' }}></div>;
    }

    return (
        <img
            className={className}
            id={id}
            src={src}
            alt={alt}
            onLoad={onLoadAction}
            onError={onErrorAction}
        />
    );
};
