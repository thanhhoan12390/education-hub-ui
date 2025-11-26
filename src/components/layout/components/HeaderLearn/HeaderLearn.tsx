import classNames from 'classnames/bind';
import { Fragment, use } from 'react';
import Link from 'next/link';

import PopperWrapper from '~/components/ui/PopperWrapper';
import FlexibleButton from '~/components/ui/FlexibleButton';
import { Course } from '~/types';
import HeaderLearnItem from '~/components/features/learning/HeaderLearnItem';
import styles from './HeaderLearn.module.scss';

const cx = classNames.bind(styles);

interface HeaderLearnProps {
    className?: string;
    purchasedListPromise: Promise<Course[]>;
}

function HeaderLearn({ className, purchasedListPromise }: HeaderLearnProps) {
    const purchasedListData = use(purchasedListPromise);

    return (
        <div className={cx('nav-item', className)}>
            <Link className={cx('nav-link')} href="/my-courses">
                My learning
            </Link>
            {/* Popper */}
            <PopperWrapper className={cx('nav-learn-wrapper')}>
                <div className={cx('learn-container')}>
                    {purchasedListData.length > 0 ? (
                        <Fragment>
                            <div className={cx('learn-content')}>
                                {purchasedListData.map((item) => (
                                    <HeaderLearnItem key={item.courseId} learnItemData={item} />
                                ))}
                            </div>

                            <div className={cx('button-wrapper')}>
                                <FlexibleButton href="/my-courses" primary>
                                    Go to My learning
                                </FlexibleButton>
                            </div>
                        </Fragment>
                    ) : (
                        <div className={cx('no-learning-content')}>
                            <div className={cx('nav-learning-text')}>Start learning today.</div>
                            <FlexibleButton href="/" outline>
                                Browser now
                            </FlexibleButton>
                        </div>
                    )}
                </div>
            </PopperWrapper>
        </div>
    );
}

export default HeaderLearn;
