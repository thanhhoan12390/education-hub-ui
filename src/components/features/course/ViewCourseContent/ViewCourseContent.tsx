'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';

import FlexibleButton from '~/components/ui/FlexibleButton';
import AccordionPanel from '~/components/ui/AccordionPanel';
import PreviewModalButton from '../PreviewModalButton';
import styles from './ViewCourseContent.module.scss';

const cx = classNames.bind(styles);

function ViewCourseContent() {
    const [isExpand, setIsExpand] = useState(false);

    const virtualArr = Array.from({ length: 24 }, (_, i) => i + 1);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('course-content-heading')}>Course content</h2>
            <div className={cx('course-curriculum')}>27 sections • 165 lectures • 24h 54m total length</div>
            <div>
                <AccordionPanel defaultExpand heading="Course introduction" totalLecture={3} totalLectureMin={7}>
                    <ul className={cx('lectures-group')}>
                        <li>
                            <div className={cx('lecture-item')}>
                                <FontAwesomeIcon
                                    className={cx('lecture-icon')}
                                    fontSize="1.4rem"
                                    icon={faYoutubeSquare}
                                />
                                <div className={cx('lecture-field')}>
                                    <h4 className={cx('lecture-name')}>Introduction to the Course</h4>
                                    <span style={{ flex: '1 1 0%' }} />
                                    <PreviewModalButton />
                                    <span className={cx('lecture-minute')}>03:33</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('lecture-item')}>
                                <FontAwesomeIcon
                                    className={cx('lecture-icon')}
                                    fontSize="1.4rem"
                                    icon={faYoutubeSquare}
                                />
                                <div className={cx('lecture-field')}>
                                    <h4 className={cx('lecture-name')}>Course Help and Welcome</h4>
                                    <span style={{ flex: '1 1 0%' }} />
                                    <PreviewModalButton />
                                    <span className={cx('lecture-minute')}>00:36</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('lecture-item')}>
                                <FontAwesomeIcon className={cx('lecture-icon')} fontSize="1.4rem" icon={faNewspaper} />
                                <div className={cx('lecture-field')}>
                                    <h4 className={cx('lecture-name')}>Course FAQs</h4>
                                    <span style={{ flex: '1 1 0%' }} />
                                    <span className={cx('lecture-minute')}>03:02</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </AccordionPanel>
                <AccordionPanel heading="Environment Setup" totalLecture={1} totalLectureMin={11}>
                    <ul className={cx('lectures-group')}>
                        <li>
                            <div className={cx('lecture-item')}>
                                <FontAwesomeIcon
                                    className={cx('lecture-icon')}
                                    fontSize="1.4rem"
                                    icon={faYoutubeSquare}
                                />
                                <div className={cx('lecture-field')}>
                                    <h4 className={cx('lecture-name')}>Python Environment Setup</h4>
                                    <span style={{ flex: '1 1 0%' }} />
                                    <PreviewModalButton />
                                    <span className={cx('lecture-minute')}>11:14</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </AccordionPanel>
                <AccordionPanel heading="Jupyter Overview" totalLecture={3} totalLectureMin={24}>
                    <ul className={cx('lectures-group')}>
                        <li>
                            <div className={cx('lecture-item')}>
                                <FontAwesomeIcon className={cx('lecture-icon')} fontSize="1.4rem" icon={faNewspaper} />
                                <div className={cx('lecture-field')}>
                                    <h4 className={cx('lecture-name')}>Updates to Notebook Zip</h4>
                                    <span style={{ flex: '1 1 0%' }} />
                                    <span className={cx('lecture-minute')}>00:09</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('lecture-item')}>
                                <FontAwesomeIcon
                                    className={cx('lecture-icon')}
                                    fontSize="1.4rem"
                                    icon={faYoutubeSquare}
                                />
                                <div className={cx('lecture-field')}>
                                    <h4 className={cx('lecture-name')}>Jupyter Notebooks</h4>
                                    <span style={{ flex: '1 1 0%' }} />

                                    <span className={cx('lecture-minute')}>13:48</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('lecture-item')}>
                                <FontAwesomeIcon
                                    className={cx('lecture-icon')}
                                    fontSize="1.4rem"
                                    icon={faYoutubeSquare}
                                />
                                <div className={cx('lecture-field')}>
                                    <h4 className={cx('lecture-name')}>Optional: Virtual Environments</h4>
                                    <span style={{ flex: '1 1 0%' }} />

                                    <span className={cx('lecture-minute')}>09:51</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </AccordionPanel>

                {virtualArr.slice(0, isExpand ? virtualArr.length : 7).map((_, index) => (
                    <AccordionPanel
                        key={index}
                        heading={`Python Course ${index + 1}`}
                        totalLecture={3}
                        totalLectureMin={24}
                    >
                        <ul className={cx('lectures-group')}>
                            <li>
                                <div className={cx('lecture-item')}>
                                    <FontAwesomeIcon
                                        className={cx('lecture-icon')}
                                        fontSize="1.4rem"
                                        icon={faNewspaper}
                                    />
                                    <div className={cx('lecture-field')}>
                                        <h4 className={cx('lecture-name')}>Welcome to the Python Course Section!</h4>
                                        <span style={{ flex: '1 1 0%' }} />
                                        <span className={cx('lecture-minute')}>00:09</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('lecture-item')}>
                                    <FontAwesomeIcon
                                        className={cx('lecture-icon')}
                                        fontSize="1.4rem"
                                        icon={faYoutubeSquare}
                                    />
                                    <div className={cx('lecture-field')}>
                                        <h4 className={cx('lecture-name')}>Introduction to Python Course</h4>
                                        <span style={{ flex: '1 1 0%' }} />

                                        <span className={cx('lecture-minute')}>13:48</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('lecture-item')}>
                                    <FontAwesomeIcon
                                        className={cx('lecture-icon')}
                                        fontSize="1.4rem"
                                        icon={faYoutubeSquare}
                                    />
                                    <div className={cx('lecture-field')}>
                                        <h4 className={cx('lecture-name')}>Python Course - Part 1</h4>
                                        <span style={{ flex: '1 1 0%' }} />

                                        <span className={cx('lecture-minute')}>09:51</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </AccordionPanel>
                ))}
            </div>

            <FlexibleButton
                onClick={() => setIsExpand(true)}
                outline
                className={cx('more-section-btn', {
                    ['more-section-btn-hidden']: isExpand,
                })}
            >
                {virtualArr.length - 7 === 1 ? '1 more section' : `${virtualArr.length - 7} more sections`}
            </FlexibleButton>
        </div>
    );
}

export default ViewCourseContent;
