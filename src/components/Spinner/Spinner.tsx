// Spinner.tsx

import React from 'react';
import './Spinner.scss'; // Import component styles

const Spinner: React.FC = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
