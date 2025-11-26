'use client';

import classNames from 'classnames/bind';
import { useEffect, useRef, memo, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './ImageSlider.module.scss';

const cx = classNames.bind(styles);

interface ImageSliderProps {
    carouselData: {
        img: string | StaticImageData;
        floatContent?: React.ReactNode;
    }[];
}

function ImageSlider({ carouselData }: ImageSliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const goToSlide = (slideIndex: number) => {
        const track = trackRef.current;
        if (!track) return;

        const slideWidth = track.clientWidth;
        track.scrollTo({ left: slideWidth * slideIndex, behavior: 'smooth' });
    };

    const handleNextSlide = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        const slideWidth = track.clientWidth;
        const newSlideIndex = Math.round(track.scrollLeft / slideWidth) + 1;

        goToSlide(newSlideIndex);
    }, []);

    const handlePrevSlide = () => {
        const track = trackRef.current;
        if (!track) return;

        const slideWidth = track.clientWidth;

        const newSlideIndex = Math.round(track.scrollLeft / slideWidth) - 1;

        goToSlide(newSlideIndex);
    };

    // SET VỊ TRÍ BAN ĐẦU: nhảy thẳng tới index = 1 (slide đầu thật)
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // nếu browser hỗ trợ ResizeObserver thì dùng nó để chờ track có chiều rộng
        const ro = new ResizeObserver(() => {
            const w = track.clientWidth;
            if (!w) return;

            const prevSnap = track.style.scrollSnapType;
            track.style.scrollSnapType = 'none';

            // nhảy tới slide index 1 (vì index 0 là clone ảnh cuối)
            track.scrollLeft = w * 1;

            requestAnimationFrame(() => {
                track.style.scrollSnapType = prevSnap || 'x mandatory';
            });

            // chỉ cần set 1 lần lúc khởi tạo
            ro.disconnect();
        });

        ro.observe(track);

        // fallback: nếu ResizeObserver không hoạt động, thử delay nhỏ (an toàn)
        const fallback = setTimeout(() => {
            const w = track.clientWidth;
            if (w && track.scrollLeft === 0) {
                track.style.scrollSnapType = 'none';
                track.scrollLeft = w * 1;
                requestAnimationFrame(() => {
                    track.style.scrollSnapType = 'x mandatory';
                });
            }
        }, 100);

        return () => {
            ro.disconnect();
            clearTimeout(fallback);
        };
    }, [carouselData.length]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleScrollEnd = () => {
            const slideWidth = track.clientWidth;
            const slideIndex = Math.round(track.scrollLeft / slideWidth);

            if (slideIndex === 0) {
                // Clone cuối → reset về slide cuối thật
                track.style.scrollSnapType = 'none';
                track.scrollLeft = carouselData.length * slideWidth;
                requestAnimationFrame(() => {
                    track.style.scrollSnapType = 'x mandatory';
                });
            } else if (slideIndex === carouselData.length + 1) {
                // Clone đầu → reset về slide 1 thật
                track.style.scrollSnapType = 'none';
                track.scrollLeft = slideWidth;
                requestAnimationFrame(() => {
                    track.style.scrollSnapType = 'x mandatory';
                });
            }
        };

        track.addEventListener('scrollend', handleScrollEnd);
        return () => track.removeEventListener('scrollend', handleScrollEnd);
    }, [carouselData.length]);

    useEffect(() => {
        const wrapper = trackRef.current?.parentElement;
        if (!wrapper) return;

        let inactivityTimer: NodeJS.Timeout | null = null;
        let autoSlideInterval: NodeJS.Timeout | null = null;

        // reset đếm lại thời gian mỗi khi có tương tác
        const resetInactivityTimer = () => {
            // nếu người dùng vừa tương tác, reset thời gian chờ
            if (inactivityTimer) clearTimeout(inactivityTimer);

            // nếu đang auto chạy thì tạm dừng
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }

            // sau 5s không tương tác thì bắt đầu auto slide mỗi 5s
            inactivityTimer = setTimeout(() => {
                autoSlideInterval = setInterval(() => {
                    handleNextSlide();
                }, 5000);
            }, 5000);
        };

        // Các loại tương tác cần theo dõi
        const events = ['mousemove', 'click', 'touchstart'];

        events.forEach((event) => wrapper.addEventListener(event, resetInactivityTimer));

        // Gọi ngay để bắt đầu đếm 5s từ đầu
        resetInactivityTimer();

        return () => {
            events.forEach((event) => wrapper.removeEventListener(event, resetInactivityTimer));
            if (inactivityTimer) clearTimeout(inactivityTimer);
            if (autoSlideInterval) clearInterval(autoSlideInterval);
        };
    }, [handleNextSlide]);

    return (
        <div className={cx('slider-wrapper')}>
            <div ref={trackRef} className={cx('slider-track')}>
                <div className={cx('slide-container')}>
                    <Image
                        width={1340}
                        height={400}
                        src={carouselData[carouselData.length - 1].img}
                        alt="slider img"
                        loading="lazy"
                    />
                    {carouselData[carouselData.length - 1].floatContent && (
                        <div className={cx('float-content')}>{carouselData[carouselData.length - 1].floatContent}</div>
                    )}
                </div>

                {carouselData.map((data, index) => (
                    <div className={cx('slide-container')} key={index}>
                        <Image width={1340} height={400} loading="lazy" src={data.img} alt="slider img" />
                        {data.floatContent && <div className={cx('float-content')}>{data.floatContent}</div>}
                    </div>
                ))}

                <div className={cx('slide-container')}>
                    <Image width={1340} height={400} loading="lazy" src={carouselData[0].img} alt="slider img" />
                    {carouselData[0].floatContent && (
                        <div className={cx('float-content')}>{carouselData[0].floatContent}</div>
                    )}
                </div>
            </div>

            <button className={cx('next-btn', 'btn')} onClick={handleNextSlide}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <button className={cx('previous-btn', 'btn')} onClick={handlePrevSlide}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        </div>
    );
}

export default memo(ImageSlider);
