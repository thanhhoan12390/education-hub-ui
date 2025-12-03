import classNames from 'classnames/bind';

import { getWishlistDetail } from '~/lib/data';
import FlexibleButton from '~/components/ui/FlexibleButton';
import CourseCard from '~/components/ui/CourseCard';
import styles from './Wishlist.module.scss';

const cx = classNames.bind(styles);

async function Wishlist() {
    const wishlist = await getWishlistDetail();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {wishlist.length === 0 && (
                    <div className={cx('no-item-content')}>
                        <FlexibleButton href="/" primary className={cx('no-item-btn')}>
                            Browser courses now
                        </FlexibleButton>
                    </div>
                )}

                <div className={cx('content')}>
                    <div className={cx('wishlist')}>
                        {wishlist.map((course, index) => (
                            <div key={index} className={cx('item-wrapper')}>
                                <CourseCard absoluteWishlistButton course={course} isPopover={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
