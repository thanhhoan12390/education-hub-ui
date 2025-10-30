import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAward,
    faCheck,
    faChevronRight,
    faCircleExclamation,
    faCode,
    faDownload,
    faEarth,
    faInfinity,
    faMobileScreen,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faHeart, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';

import { getCourses } from '~/lib/getCourses';
import StarRating from '~/components/ui/StarRating';
import FlexibleButton from '~/components/ui/FlexibleButton';
import ViewCourseContent from '~/components/ui/ViewCourseContent';
import Badge from '~/components/ui/Badge';
import styles from './ViewCourse.module.scss';

const cx = classNames.bind(styles);

export async function generateStaticParams() {
    const courses = await getCourses();

    return courses.map((courses) => ({ id: `${courses.courseId}` }));
}

interface ViewCourseProps {
    params: Promise<{ id: string }>;
}

async function ViewCourse({ params }: ViewCourseProps) {
    const { id } = await params;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-container')}>
                <div className={cx('top-content')}>
                    <div className={cx('link-title')}>
                        <Link href={''}>Development</Link>
                        <FontAwesomeIcon fontSize={'0.8rem'} style={{ marginInline: '1.2rem' }} icon={faChevronRight} />
                        <Link href={''}>Programming course</Link>
                    </div>

                    <div className={cx('introduction-content')}>
                        <h1 className={cx('intro-heading')}>100 Days of Code: The Complete Python Pro Bootcamp</h1>
                        <div className={cx('intro-detail')}>
                            Master Python by building 100 projects in 100 days. Learn data science, automation, build
                            websites, games and apps!
                        </div>
                        <div className={cx('tag-groups')}>
                            <Badge />
                            <div className={cx('intro-rate')}>4.6</div>
                            <StarRating rating={4.6} style={{ color: 'var(--dark-yellow-color)' }} />
                            <div className={cx('rate-count')}>{`(${Number(132131).toLocaleString(
                                'en-US',
                            )} ratings)`}</div>

                            <div className={cx('student-count')}>{`${Number(1676840).toLocaleString(
                                'en-US',
                            )} students`}</div>
                        </div>
                        <div className={cx('intro-instructor')}>
                            Created by <Link href={''}>Dr. Angela Yu, Developer and Lead Instructor</Link>
                        </div>
                        <div className={cx('intro-date')}>
                            <FontAwesomeIcon icon={faCircleExclamation} />
                            <span>Last updated 8/2025</span>
                            <FontAwesomeIcon icon={faEarth} />
                            <span>English</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('sidebar-container')}>
                <div className={cx('sidebar-content')}>
                    <div className={cx('sidebar-content-group')}>
                        <div className={cx('intro-asset')}>
                            <Image
                                src="https://res.cloudinary.com/dypjq4erd/image/upload/v1761461011/course-img-7_e2ojel.webp"
                                alt="introduction asset"
                                width={480}
                                height={270}
                                priority
                            />
                            <div className={cx('play-btn-overlay')}>
                                <div className={cx('play-btn')}>
                                    <FontAwesomeIcon fontSize="2.4rem" icon={faPlay} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('purchase-section')}>
                            <div className={cx('purchase-price')}>
                                <span>đ</span>
                                {`${Number(309000).toLocaleString('en-US')}`}
                                <span>82% off</span>
                            </div>

                            <div className={cx('left-day')}>
                                <FontAwesomeIcon icon={faClock} style={{ marginInlineEnd: '0.4rem' }} />2 days left at
                                this price!
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
                                        <FontAwesomeIcon icon={faYoutubeSquare} />
                                        <div className={cx('include-text')}>61 hours on-demand video</div>
                                    </div>
                                </li>
                                <li>
                                    <div className={cx('include-item')}>
                                        <FontAwesomeIcon icon={faCode} />
                                        <div className={cx('include-text')}>22 practical examples</div>
                                    </div>
                                </li>

                                <li>
                                    <div className={cx('include-item')}>
                                        <FontAwesomeIcon icon={faNewspaper} />
                                        <div className={cx('include-text')}>66 articles</div>
                                    </div>
                                </li>
                                <li>
                                    <div className={cx('include-item')}>
                                        <FontAwesomeIcon icon={faDownload} />
                                        <div className={cx('include-text')}>194 downloadable resources</div>
                                    </div>
                                </li>
                                <li>
                                    <div className={cx('include-item')}>
                                        <FontAwesomeIcon icon={faMobileScreen} />
                                        <div className={cx('include-text')}>Access on mobile and TV</div>
                                    </div>
                                </li>
                                <li>
                                    <div className={cx('include-item')}>
                                        <FontAwesomeIcon icon={faInfinity} />
                                        <div className={cx('include-text')}>Full lifetime access</div>
                                    </div>
                                </li>
                                <li>
                                    <div className={cx('include-item')}>
                                        <FontAwesomeIcon icon={faAward} />
                                        <div className={cx('include-text')}>Certificate of completion</div>
                                    </div>
                                </li>
                            </ul>

                            <FlexibleButton className={cx('share-btn')}>Share this course</FlexibleButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('bot-container')}>
                <div className={cx('bot-content')}>
                    <div className={cx('learn-group')}>
                        <h2 className={cx('what-learn-heading')}>What you&apos;ll learn</h2>
                        <ul className={cx('learn-list')}>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Use Python for Data Science and Machine Learning</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Use Spark for Big Data Analysis</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Implement Machine Learning Algorithms</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Learn to use NumPy for Numerical Data</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Learn to use Pandas for Data Analysis</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Learn to use Matplotlib for Python Plotting</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Learn to use Seaborn for statistical plots</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Use Plotly for interactive dynamic visualizations</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Use SciKit-Learn for Machine Learning Tasks</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>K-Means Clustering</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Logistic Regression</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Linear Regression</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Random Forest and Decision Trees</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Natural Language Processing and Spam Filters</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Neural Networks</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('what-item')}>
                                    <FontAwesomeIcon style={{ paddingBlock: '0.64rem' }} icon={faCheck} />
                                    <span>Support Vector Machines</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('related-topic')}>
                        <h2 className={cx('related-heading')}>Explore related topics</h2>
                        <div className={cx('related-btn-group')}>
                            <FlexibleButton className={cx('topic-btn')}>Python</FlexibleButton>
                            <FlexibleButton className={cx('topic-btn')}>Data Science</FlexibleButton>
                            <FlexibleButton className={cx('topic-btn')}>Machine Learning</FlexibleButton>
                            <FlexibleButton className={cx('topic-btn')}>Development</FlexibleButton>
                        </div>
                    </div>

                    {/* course content */}
                    <ViewCourseContent />
                </div>
            </div>
        </div>
    );
}

export default ViewCourse;
