import classNames from 'classnames/bind';

import NavigationTab from '~/components/layout/components/NavigationTab';
import styles from './LearningLayout.module.scss';

const cx = classNames.bind(styles);

interface LearningLayoutProps {
    children: React.ReactNode;
}

function LearningLayout({ children }: LearningLayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title-container')}>
                <h1 className={cx('page-heading')}>My learning</h1>
                <div className={cx('navigation-tab')}>
                    <NavigationTab
                        navigationTabData={[
                            { title: 'All courses', pathUrl: '/my-courses' },
                            { title: 'Wishlist', pathUrl: '/wishlist' },
                        ]}
                    />
                </div>
            </div>
            {children}
        </div>
    );
}

export default LearningLayout;
