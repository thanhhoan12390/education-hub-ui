'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Popover = dynamic(() => import('~/components/ui/Popover'), {
    ssr: false, // tránh SSR
});
import { Course } from '~/types';
import Badge from '~/components/ui/Badge';
import AddToCartButton from '~/components/features/cart/AddToCartButton';
import { LEVEL_NAME } from '~/components/features/search/SearchFiltersBar/SearchFiltersBar';
import styles from './SearchCard.module.css';

interface SearchCardProps {
    course: Course;
}

function SearchCard({ course }: SearchCardProps) {
    const [open, setOpen] = useState(false);

    const gotoViewCourse = () => {
        window.open(`/view-course/${course.courseId}`, '_blank');
    };

    const searchCardRef = useRef<HTMLSelectElement>(null);

    return (
        <div className={styles.wrapper} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <section ref={searchCardRef} className={styles.searchCard} onClick={gotoViewCourse}>
                <div className={styles.cardPrimaryContent}>
                    <div className={styles.primaryTop}>
                        <div className={styles.imgWrapper}>
                            <Image width={480} height={270} src={course.imageUrl} alt="search img" />
                        </div>
                        <div className={styles.primaryHeader}>
                            <h2 className={styles.primaryHeading}>{course.title}</h2>
                            <div className={styles.instructor}>{course.instructor}</div>
                        </div>
                    </div>
                    <div className={styles.primaryBottom}>
                        <ul className={styles.tagList}>
                            {course.bestSeller && (
                                <li>
                                    <Badge className={styles.bestsellerBadge} />
                                </li>
                            )}
                            <li>
                                <div className={styles.tagItem}>
                                    <FontAwesomeIcon style={{ color: '#c4710d', fontSize: '1rem' }} icon={faStar} />
                                    <div className={styles.rating}>{course.rating.toFixed(1)}</div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.tagItem}>{`${course.ratingCount.toLocaleString(
                                    'en-US',
                                )} ratings`}</div>
                            </li>
                            <li>
                                <div className={styles.tagItem}>{`${Number(71.45666).toFixed(1)} total hours`}</div>
                            </li>
                            <li>
                                <div className={styles.tagItem}>728 lectures</div>
                            </li>
                            <li>
                                <div className={`${styles.tagItem} ${styles.courseLevel}`}>
                                    {course.level ? LEVEL_NAME[course.level] : ''}
                                </div>
                            </li>
                        </ul>

                        <div className={styles.checkoutGroup}>
                            <div className={styles.coursePrice}>
                                <span>đ</span>
                                {`${course.price.toLocaleString('en-US')}`}
                            </div>
                            <AddToCartButton isInline small noPrimary medium courseId={course.courseId} />
                        </div>
                    </div>
                </div>

                <div className={styles.cardSecondaryContent}>
                    <div className={styles.secondaryWrapper}>
                        <table className={styles.lessonTable}>
                            <thead>
                                <tr>
                                    <th>
                                        <span>
                                            Explore 3 matches about <q>typescript</q>
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={styles.lessonItem}>
                                            <FontAwesomeIcon icon={faPlayCircle} fontSize="1.6rem" />
                                            <span>Installing & Using TypeScript</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.lessonItem}>
                                            <FontAwesomeIcon icon={faPlayCircle} fontSize="1.6rem" />
                                            <span>Working with Components & TypeScript</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.lessonItem}>
                                            <FontAwesomeIcon icon={faPlayCircle} fontSize="1.6rem" />
                                            <span>Working with Props & TypeScript</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.lessonItem}>
                                            <FontAwesomeIcon icon={faPlayCircle} fontSize="1.6rem" />
                                            <span>TypeScript & Type Models: Repetition</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.lessonItem}>
                                            <FontAwesomeIcon icon={faPlayCircle} fontSize="1.6rem" />
                                            <span>TypeScript: Type Aliases & Interfaces</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.lessonItem}>
                                            <FontAwesomeIcon icon={faPlayCircle} fontSize="1.6rem" />
                                            <span>
                                                TypeScript: Working With Potentially Undefined Values & Union Types
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {open && (
                <Popover targetRef={searchCardRef} className={styles.popoverWrapper}>
                    <div className={styles.popoverContent}>
                        <h2 className={styles.popoverHeading}>What you&apos;ll learn</h2>

                        <ul className={styles.whatLearn}>
                            <li className={styles.whatLearnItem}>
                                <FontAwesomeIcon className={styles.whatLearnIcon} icon={faCheck} />
                                <div className={styles.whatLearnText}>
                                    You will master the programming language by building 100 unique projects over 100
                                    days.
                                </div>
                            </li>
                            <li className={styles.whatLearnItem}>
                                <FontAwesomeIcon className={styles.whatLearnIcon} icon={faCheck} />
                                <div className={styles.whatLearnText}>
                                    You will learn automation, game, app and web development, data science and machine
                                    learning all.
                                </div>
                            </li>
                            <li className={styles.whatLearnItem}>
                                <FontAwesomeIcon className={styles.whatLearnIcon} icon={faCheck} />
                                <div className={styles.whatLearnText}>
                                    You will be able to program in JS professionally
                                </div>
                            </li>
                        </ul>
                    </div>
                </Popover>
            )}
        </div>
    );
}

export default SearchCard;
