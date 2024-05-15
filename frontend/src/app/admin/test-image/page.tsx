import React from 'react';

import ImageDisplay from '@/components/ImageDisplay';

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen pt-16"> {/* Tailwind classes for centering and padding */}
            <ImageDisplay />
        </div>
    );
}