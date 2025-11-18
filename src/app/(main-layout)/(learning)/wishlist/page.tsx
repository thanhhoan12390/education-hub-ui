import classNames from 'classnames/bind';

import styles from './Wishlist.module.scss';

const cx = classNames.bind(styles);

function Wishlist() {
    return <div className={cx('wrapper')}>Wish list page</div>;
}

export default Wishlist;
