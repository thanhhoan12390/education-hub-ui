'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect, use } from 'react';

import CourseCard from '../CourseCard';
import type { Course } from '~/types';
import styles from './CardCarousel.module.scss';

const cx = classNames.bind(styles);

interface CardCarouselProps {
    carouselHeading: string;
    courses: Promise<Course[]>;
    className?: string;
}

function CardCarousel({ carouselHeading, courses, className }: CardCarouselProps) {
    const courseList = use(courses);

    const [visiblePrevBtn, setVisiblePrevBtn] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleNextSlide = () => {
        const track = trackRef.current;
        const card = cardRef.current;
        if (!track || !card) return;

        const cardWidth = card.clientWidth;
        const scrollByWidthCount = track.clientWidth / cardWidth - 1;

        track.scrollBy({ left: scrollByWidthCount * cardWidth, behavior: 'smooth' });
    };

    const handlePrevSlide = () => {
        const track = trackRef.current;
        const card = cardRef.current;
        if (!track || !card) return;

        const cardWidth = card.clientWidth;
        const scrollByWidthCount = track.clientWidth / cardWidth - 1;

        track.scrollBy({ left: -scrollByWidthCount * cardWidth, behavior: 'smooth' });
    };

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleScroll = () => {
            setVisiblePrevBtn(track.scrollLeft > 0);
        };

        handleScroll(); // chạy 1 lần ban đầu để thiết lập đúng trạng thái
        track.addEventListener('scroll', handleScroll);

        return () => track.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cx('carousel-wrapper', className)}>
            <h2 className={cx('carousel-heading')}>{carouselHeading}</h2>
            <section className={cx('carousel-container')}>
                <div ref={trackRef} className={cx('carousel-track')}>
                    {courseList.map((course) => (
                        <div ref={cardRef} key={course.courseId} className={cx('card-wrapper')}>
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>

                <button className={cx('next-btn', 'btn')} onClick={handleNextSlide}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>

                {visiblePrevBtn && (
                    <button className={cx('previous-btn', 'btn')} onClick={handlePrevSlide}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}
            </section>
        </div>
    );
}

export default CardCarousel;
