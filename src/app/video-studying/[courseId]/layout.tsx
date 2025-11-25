import classNames from 'classnames/bind';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getCourseById, getPurchasedList } from '~/lib/data';
import images from '~/assets/images';
import styles from './VideoStudying.module.scss';

const cx = classNames.bind(styles);

interface VideoStudyingLayoutProps {
    children: React.ReactNode;
    params: Promise<{ courseId: string }>;
}

async function VideoStudyingLayout({ children, params }: VideoStudyingLayoutProps) {
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
            <main className={cx('main-container')}>{children}</main>
        </div>
    );
}

export default VideoStudyingLayout;
