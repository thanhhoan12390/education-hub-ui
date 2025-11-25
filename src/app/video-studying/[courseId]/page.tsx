'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LoadingOutlined } from '@ant-design/icons';
import useSWR from 'swr';
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
import { Preview } from '~/types';
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
    const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>();

    // vì api chỉ có 5 sample để ví dụ
    const url = `/api/previews/${activePanelIndex % 5 || 5}`;

    const { data, error, isLoading } = useSWR<Preview>(url, {
        revalidateOnFocus: false,
    });

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

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cx('main-content')}>
            {/* video container */}
            <div className={cx('video-container')}>
                <div className={cx('video-content')}>
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
                </div>
            </div>
            {/* sidebar */}
            <div style={sidebarStyle} className={cx('sidebar')}>
                <div className={cx('sidebar-container')}>
                    <div className={cx('sidebar-header')}>
                        <h2 className={cx('sidebar-heading')}>Course content</h2>
                        <div className={cx('sidebar-icon-wrapper')}>
                            <FontAwesomeIcon fontSize="1rem" icon={faXmark} />
                        </div>
                    </div>
                    <div className={cx('panel-scroll-container')}>
                        {studyPanelData.map((data, index, originalArr) => {
                            const panelIndex = index + 1;
                            return (
                                <StudyAccordionPanel
                                    className={cx('accordion-panel')}
                                    key={index}
                                    defaultExpand={panelIndex === 1}
                                    panelIndex={panelIndex}
                                    panelTitle={data.panelTitle}
                                    panelContent={data.panelContent}
                                    contentStartIndex={originalArr
                                        .slice(0, index)
                                        .reduce((total, item) => total + item.panelContent.length, 0)}
                                    activeItemIndex={activePanelIndex}
                                    onActiveChange={setActivePanelIndex}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* dashboard */}
            <div className={cx('dashboard')}>
                <div className={cx('dashboard-container')}>
                    <section className={cx('dashboard-content')}>
                        <DashboardTab tabTitles={['Overview', 'Notes', 'Announcements']}>
                            {[
                                <div key="content-1">content 1 </div>,
                                <div key="content-2">note at: {Math.floor(curStreamingTime ?? 0)}</div>,
                            ]}
                        </DashboardTab>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default VideoStudying;
