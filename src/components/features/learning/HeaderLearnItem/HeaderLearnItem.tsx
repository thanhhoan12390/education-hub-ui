import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';

import { Course } from '~/types';
import styles from './HeaderLearnItem.module.scss';

const cx = classNames.bind(styles);

interface HeaderLearnItemProps {
    className?: string;
    learnItemData: Course;
}

function HeaderLearnItem({ className, learnItemData }: HeaderLearnItemProps) {
    return (
        <Link href={``} className={cx('wrapper', className)}>
            <div className={cx('image-wrapper')}>
                <Image src={learnItemData.imageUrl} alt="learning item" width={64} height={64} />
            </div>

            <div className={cx('item-des')}>
                <div className={cx('item-title')}>{learnItemData.title}</div>
                <div className={cx('leaning-text')}>Start learning</div>
            </div>
        </Link>
    );
}

export default HeaderLearnItem;
