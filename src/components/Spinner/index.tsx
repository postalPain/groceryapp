import React from 'react';

type SpinnerProps = {
    size?: 'normal' | 'small';
}
const Spinner: React.FC<SpinnerProps> = ({
    size = 'normal',
}) => {
    const styleSize = size === 'small'
        ? 'h-4 w-4'
        : 'h-8 w-8';
    return(
        <div className={`animate-spin rounded-full ${styleSize} border-2 border-t-transparent border-green-300`} />
    );
}

export default Spinner;
