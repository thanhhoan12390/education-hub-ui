'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, use, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAward,
    faCode,
    faDownload,
    faInfinity,
    faMobileScreen,
    faPlay,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faHeart, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { Course } from '~/types';
import CourseDescription from '../CourseDescription';
import SkeletonNoAnimation from '~/components/ui/SkeletonNoAnimation/SkeletonNoAnimation';
import styles from './ViewCourseSidebar.module.scss';

const cx = classNames.bind(styles);

interface ViewCourseSidebar {
    course: Promise<Course>;
}

function ViewCourseSidebar({ course }: ViewCourseSidebar) {
    const courseData = use(course);

    const [isSidebarFixed, setIsSidebarFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 380 && window.innerWidth >= 1080) {
                setIsSidebarFixed(true);
            } else {
                setIsSidebarFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('sidebar-container', {
                    ['sidebar-container-fixed']: isSidebarFixed,
                })}
            >
                <div className={cx('link-title')}>
                    <Link href={''}>Development</Link>
                    <FontAwesomeIcon fontSize={'0.8rem'} style={{ marginInline: '1.2rem' }} icon={faChevronRight} />
                    <Link href={''}>Programming course</Link>
                </div>

                <div className={cx('sidebar-content')}>
                    <div
                        className={cx('intro-asset', {
                            ['intro-asset-hidden']: isSidebarFixed,
                        })}
                    >
                        <div className={cx('image-gallery')}>
                            <Image
                                src={courseData.imageUrl}
                                alt="introduction asset"
                                width={480}
                                height={270}
                                priority
                            />
                        </div>
                        <div className={cx('play-btn-overlay')}>
                            <div className={cx('play-btn')}>
                                <FontAwesomeIcon fontSize="2.4rem" icon={faPlay} />
                            </div>
                        </div>
                    </div>

                    <Suspense fallback={<SkeletonNoAnimation />}>
                        <CourseDescription lightTheme className={cx('course-des')} course={course} />
                    </Suspense>

                    <div className={cx('purchase-section')}>
                        <div className={cx('purchase-price')}>
                            <span>đ</span>
                            {`${courseData.price.toLocaleString('en-US')}`}
                            <span>82% off</span>
                        </div>

                        <div className={cx('left-day')}>
                            <FontAwesomeIcon icon={faClock} style={{ marginInlineEnd: '0.4rem' }} />2 days left at this
                            price!
                        </div>

                        <div className={cx('cart-wishlist-btn')}>
                            <FlexibleButton large primary>
                                Add to cart
                            </FlexibleButton>

                            <FlexibleButton style={{ inlineSize: '4.8rem', minInlineSize: 'unset' }} large outline>
                                <FontAwesomeIcon fontSize="2rem" icon={faHeart} />
                            </FlexibleButton>
                        </div>

                        <FlexibleButton style={{ fontSize: '1.6rem' }} outline large>
                            Buy now
                        </FlexibleButton>

                        <div className={cx('refund-text')}>30-Day Money-Back Guarantee</div>

                        <h2 className={cx('includes-heading')}>This course include:</h2>

                        <ul className={cx('course-includes')}>
                            <li>
                                <div className={cx('include-item')}>
                                    <FontAwesomeIcon className={cx('include-icon')} icon={faYoutubeSquare} />
                                    <div className={cx('include-text')}>61 hours on-demand video</div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('include-item')}>
                                    <FontAwesomeIcon className={cx('include-icon')} icon={faCode} />
                                    <div className={cx('include-text')}>22 practical examples</div>
                                </div>
                            </li>

                            <li>
                                <div className={cx('include-item')}>
                                    <FontAwesomeIcon className={cx('include-icon')} icon={faNewspaper} />
                                    <div className={cx('include-text')}>66 articles</div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('include-item')}>
                                    <FontAwesomeIcon className={cx('include-icon')} icon={faDownload} />
                                    <div className={cx('include-text')}>194 downloadable resources</div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('include-item')}>
                                    <FontAwesomeIcon className={cx('include-icon')} icon={faMobileScreen} />
                                    <div className={cx('include-text')}>Access on mobile and TV</div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('include-item')}>
                                    <FontAwesomeIcon className={cx('include-icon')} icon={faInfinity} />
                                    <div className={cx('include-text')}>Full lifetime access</div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('include-item')}>
                                    <FontAwesomeIcon className={cx('include-icon')} icon={faAward} />
                                    <div className={cx('include-text')}>Certificate of completion</div>
                                </div>
                            </li>
                        </ul>

                        <FlexibleButton className={cx('share-btn')}>Share this course</FlexibleButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCourseSidebar;
