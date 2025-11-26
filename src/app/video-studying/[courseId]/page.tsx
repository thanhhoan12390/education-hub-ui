'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { LoadingOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { Spin, Flex } from 'antd';

const StreamingPlayer = dynamic(() => import('~/components/ui/StreamingPlayer'), {
    ssr: false, // tránh SSR load video.js
    loading: () => (
        <Flex justify="center" align="center" style={{ blockSize: '100%' }}>
            <Spin style={{ color: 'var(--gray-color-100)' }} indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
    ),
});
import StudyAccordionPanel from '~/components/ui/StudyAccordionPanel';
import DashboardTab from '~/components/ui/DashboardTab';
import { Course, Preview } from '~/types';
import FlexibleButton from '~/components/ui/FlexibleButton';
import CourseDescription from '~/components/features/course/CourseDescription';
import styles from './VideoStudying.module.scss';

const cx = classNames.bind(styles);

const studyPanelData = [
    {
        panelTitle: 'Course Introduction',
        panelContent: [
            {
                lectureHeading: 'Welcome To This Course',
                lectureMin: 3,
            },
            {
                lectureHeading: 'BEFORE YOU START',
                lectureMin: 1,
            },
            {
                lectureHeading: 'E-book Resources 2.0',
                lectureMin: 1,
            },
        ],
    },
    {
        panelTitle: 'The 25+ Guidelines Of Amazing Design',
        panelContent: [
            {
                lectureHeading: 'Introduction',
                lectureMin: 5,
            },
            {
                lectureHeading: 'Beautiful Typography',
                lectureMin: 4,
            },
            {
                lectureHeading: 'Using Colors Like A Pro',
                lectureMin: 6,
            },
            {
                lectureHeading: 'Working With Images',
                lectureMin: 2,
            },
            {
                lectureHeading: 'Getting Inspired: The Secret Ingredient',
                lectureMin: 4,
            },
        ],
    },
    {
        panelTitle: 'Course Summary',
        panelContent: [
            {
                lectureHeading: 'Wrapping Up What We’ve Learned',
                lectureMin: 3,
            },
            {
                lectureHeading: 'The Ultimate Cheatsheet: All Guidelines In One Place',
                lectureMin: 4,
            },
            {
                lectureHeading: 'Where To Go From Here?',
                lectureMin: 1,
            },
        ],
    },
];

function VideoStudying() {
    const [curStreamingTime, setCurStreamingTime] = useState<number>();
    const [activePanelIndex, setActivePanelIndex] = useState<number>(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isBlockSidebar, setIsBlockSidebar] = useState(true);
    const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>();
    const [checkedList, setCheckedList] = useState<number[]>([]);

    const tabRef = useRef<{ onTabIndexChange: React.Dispatch<React.SetStateAction<number>> }>(null);

    const { courseId } = useParams<{ courseId: string }>();

    // vì api chỉ có 5 sample để ví dụ
    const previewUrl = `/api/previews/${activePanelIndex % 5 || 5}`;
    const courseUrl = `/api/courses/${courseId}`;

    const { data, error, isLoading } = useSWR<Preview>(previewUrl, {
        revalidateOnFocus: false,
    });

    const { data: courseData } = useSWR<Course>(courseUrl, {
        revalidateOnFocus: false,
    });

    const handleOpenCourseContent = () => {
        setIsSidebarOpen(true);
        tabRef.current?.onTabIndexChange((pre) => pre || 1);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = window.scrollY;
            // header height: 56px
            if (scrollHeight > 56) {
                setSidebarStyle({ top: 0, blockSize: '100%' });
            } else {
                setSidebarStyle({ top: 56 - scrollHeight, blockSize: `calc(100% - ${56 - scrollHeight}px)` });
            }
        };

        const handleResize = () => {
            if (window.innerWidth <= 980) {
                setIsBlockSidebar(true);
            } else {
                setIsBlockSidebar(false);
            }
        };

        handleScroll();
        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const PanelContainer = (
        <div className={cx('panel-scroll-container')}>
            {studyPanelData.map((data, index, originalArr) => {
                const panelIndex = index + 1;
                return (
                    <StudyAccordionPanel
                        className={cx({ ['no-border-top']: isSidebarOpen && !isBlockSidebar })}
                        key={index}
                        panelIndex={panelIndex}
                        panelTitle={data.panelTitle}
                        panelContent={data.panelContent}
                        contentStartIndex={originalArr
                            .slice(0, index)
                            .reduce((total, item) => total + item.panelContent.length, 0)}
                        activeItemIndex={activePanelIndex}
                        onActiveChange={setActivePanelIndex}
                        checkedList={checkedList}
                        onCheckedListChange={setCheckedList}
                    />
                );
            })}
        </div>
    );

    return (
        <div
            className={cx('main-content', {
                ['main-content-no-sidebar']: isBlockSidebar || !isSidebarOpen,
            })}
        >
            {/* video container */}
            <div className={cx('video-container')}>
                <div
                    className={cx('video-content', {
                        ['no-sidebar-video-content']: !isSidebarOpen,
                    })}
                >
                    <div className={cx('video-aspect-ratio')}>
                        <div className={cx('video-wrapper')}>
                            {isLoading ? (
                                <Flex justify="center" align="center" style={{ blockSize: '100%' }}>
                                    <Spin
                                        style={{ color: 'var(--gray-color-100)' }}
                                        indicator={<LoadingOutlined spin />}
                                        size="large"
                                    />
                                </Flex>
                            ) : (
                                // "key trick" thay vì reusing cùng <StreamingPlayer> instance,
                                // thêm key={src} để React tạo mới hẳn component mỗi khi đổi preview:
                                <StreamingPlayer
                                    key={data?.previewId}
                                    onTimeUpdate={setCurStreamingTime}
                                    style={{ position: 'unset' }}
                                    src={data?.previewSrc ?? ''}
                                />
                            )}
                        </div>
                    </div>
                    {!isSidebarOpen && !isBlockSidebar && (
                        <FlexibleButton
                            onClick={handleOpenCourseContent}
                            primary
                            className={cx('view-course-content-btn')}
                        >
                            <FontAwesomeIcon
                                style={{ fontSize: '1.8rem', marginInlineEnd: '1.2rem' }}
                                icon={faArrowLeft}
                            />
                            Course content
                        </FlexibleButton>
                    )}
                </div>
            </div>
            {/* sidebar */}
            {isSidebarOpen && !isBlockSidebar && (
                <div style={sidebarStyle} className={cx('sidebar')}>
                    <div className={cx('sidebar-container')}>
                        <div className={cx('sidebar-header')}>
                            <h2 className={cx('sidebar-heading')}>Course content</h2>
                            <div className={cx('sidebar-close-btn-wrapper')}>
                                <div onClick={() => setIsSidebarOpen(false)} className={cx('sidebar-icon-btn')}>
                                    <FontAwesomeIcon fontSize="1rem" icon={faXmark} />
                                </div>
                                <div className={cx('sidebar-close-popper')}>Close panel</div>
                            </div>
                        </div>
                        {/* panel content container */}
                        {PanelContainer}
                    </div>
                </div>
            )}
            {/* dashboard */}
            <div className={cx('dashboard')}>
                <div className={cx('dashboard-container')}>
                    <section className={cx('dashboard-content')}>
                        <DashboardTab
                            ref={tabRef}
                            defaultIndex={1}
                            tabTitles={[(isBlockSidebar || !isSidebarOpen) && 'Course content', 'Overview', 'Notes']}
                        >
                            {[
                                (isBlockSidebar || !isSidebarOpen) && PanelContainer,
                                <div key="content-1">
                                    <CourseDescription lightTheme course={courseData} />
                                    <div className={cx('des-content')}>
                                        <h2 className={cx('related-heading')}>Description</h2>
                                        <div>
                                            <p>
                                                *Update 2025: Intro to Data Science module updated for recent AI
                                                developments*
                                            </p>
                                            <p>The Problem</p>
                                            <p>
                                                Data scientist is one of the best suited professions to thrive this
                                                century. It is digital, programming-oriented, and analytical. Therefore,
                                                it comes as no surprise that the demand for data scientists has been
                                                surging in the job marketplace.
                                            </p>
                                            <p>
                                                However, supply has been very limited. It is difficult to acquire the
                                                skills necessary to be hired as a data scientist.
                                            </p>
                                            <p>And how can you do that?</p>
                                            <p>
                                                Universities have been slow at creating specialized data science
                                                programs. (not to mention that the ones that exist are very expensive
                                                and time consuming)
                                            </p>
                                            <p>
                                                Most online courses focus on a specific topic and it is difficult to
                                                understand how the skill they teach fit in the complete picture
                                            </p>
                                        </div>
                                    </div>
                                </div>,
                                <div key="content-2">
                                    <h2>This feature will be completed in the coming time.</h2>
                                    <span>note at: {Math.floor(curStreamingTime ?? 0)}</span>
                                </div>,
                            ]}
                        </DashboardTab>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default VideoStudying;
