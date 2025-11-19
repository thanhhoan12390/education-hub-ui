import classNames from 'classnames/bind';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getCourseById, getPurchasedList } from '~/lib/data';
import images from '~/assets/images';
import StreamingPlayer from '~/components/ui/StreamingPlayer';
import styles from './VideoStudying.module.scss';

const cx = classNames.bind(styles);

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
                    <div className={cx('sidebar')}></div>
                    <div className={cx('dashboard')}></div>
                </div>
            </main>
        </div>
    );
}

export default VideoStudying;
