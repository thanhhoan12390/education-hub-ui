'use client';

import classNames from 'classnames/bind';
import { useRef, useEffect } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './StarRating.module.scss';

const cx = classNames.bind(styles);

interface StarRatingProps {
    rating: number;
    style?: React.CSSProperties;
    className?: string;
    isPreventDefault?: boolean;
}

function StarRating({ rating = 0, style, isPreventDefault = true, className }: StarRatingProps) {
    const ratingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!!rating && ratingRef.current) {
            const percentage = Math.round((rating / 5) * 100);

            ratingRef.current.style.width = `${100 - percentage}%`;
        }
    }, [rating]);

    return (
        <div className={cx('card-rating-wrapper', className)} style={style}>
            <span
                className={cx('card-rating')}
                onClick={(e) => {
                    if (isPreventDefault) e.preventDefault();
                }}
            >
                <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                <div ref={ratingRef} className={cx('rating-overlay')}></div>
            </span>
        </div>
    );
}

export default StarRating;
