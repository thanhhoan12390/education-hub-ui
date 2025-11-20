import classNames from 'classnames/bind';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getCourseById, getPurchasedList } from '~/lib/data';
import images from '~/assets/images';
import StreamingPlayer from '~/components/ui/StreamingPlayer';
import StudyAccordionPanel from '~/components/ui/StudyAccordionPanel';
import styles from './VideoStudying.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

interface VideoStudyingProps {
    params: Promise<{ courseId: string }>;
}

async function VideoStudying({ params }: VideoStudyingProps) {
    const { courseId } = await params;
    const purchasedList = await getPurchasedList();

    if (!purchasedList.purchasedIds.includes(+courseId)) {
        notFound();
    }

    const course = await getCourseById(+courseId);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Link href="/" className={cx('header-logo')}>
                    <Image width={128} height={128} src={images.logo} alt="Logo image" loading="lazy" />
                </Link>
                <h1 className={cx('header-title')}>{course.title}</h1>
            </header>
            <main className={cx('main-container')}>
                <div className={cx('main-content')}>
                    <div className={cx('video-container')}>
                        <div className={cx('video-content')}>
                            <div className={cx('video-aspect-ratio')}>
                                <div className={cx('video-wrapper')}>
                                    <StreamingPlayer
                                        style={{ position: 'unset' }}
                                        src="https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sidebar')}>
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
                                            key={index}
                                            defaultExpand={panelIndex === 1}
                                            panelIndex={panelIndex}
                                            panelTitle={data.panelTitle}
                                            panelContent={data.panelContent}
                                            contentStartIndex={originalArr
                                                .slice(0, index)
                                                .reduce((total, item) => total + item.panelContent.length, 0)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={cx('dashboard')}></div>
                </div>
            </main>
        </div>
    );
}

export default VideoStudying;
