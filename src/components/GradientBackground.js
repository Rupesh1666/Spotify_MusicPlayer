import React, { useEffect } from 'react';
import '../styles/GradientBackground.css';

const GradientBackground = ({ coverImage }) => {
    useEffect(() => {
        const gradientElement = document.querySelector('.gradient-background');
        if (coverImage) {
            gradientElement.style.backgroundImage = `url(https://cms.samespace.com/assets/${coverImage})`;
        }
    }, [coverImage]);

    return <div className="gradient-background"></div>;
};

export default GradientBackground;
