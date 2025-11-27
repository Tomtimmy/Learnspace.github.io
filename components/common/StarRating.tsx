
import React from 'react';

interface StarRatingProps {
    rating: number;
    className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, className = '!text-base' }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex text-accent-orange">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className={`material-symbols-outlined ${className}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
            {halfStar && <span className={`material-symbols-outlined ${className}`} style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className={`material-symbols-outlined ${className}`} style={{ fontVariationSettings: "'FILL' 0" }}>star</span>)}
        </div>
    );
};