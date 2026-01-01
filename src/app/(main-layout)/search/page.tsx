import classNames from 'classnames/bind';
import { redirect } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import FlexibleButton from '~/components/ui/FlexibleButton';
import SearchFiltersBar from '~/components/features/search/SearchFiltersBar';
import SearchFilteredContent from '~/components/features/search/SearchFilteredContent';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

async function Search({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;

    if (!params.q) {
        redirect('/');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('suggestion-header')}>
                <div className={cx('suggestion-container')}>
                    <h2 className={cx('suggestion-heading')}>
                        Recommended in <span>{params.q}</span>
                    </h2>
                    <div className={cx('suggestion-tags')}>
                        <FlexibleButton outline rounded className={cx('search-style-btn')}>
                            <FontAwesomeIcon icon={faArrowRight} className={cx('suggestion-icon')} />
                            <span>Full-Stack Web Development with JavaScript</span>
                        </FlexibleButton>
                        <FlexibleButton outline rounded className={cx('search-style-btn')}>
                            <FontAwesomeIcon icon={faArrowRight} className={cx('suggestion-icon')} />
                            <span> Modern JavaScript</span>
                        </FlexibleButton>
                        <FlexibleButton outline rounded className={cx('search-style-btn')}>
                            <FontAwesomeIcon icon={faArrowRight} className={cx('suggestion-icon')} />
                            <span>JavaScript for Beginners</span>
                        </FlexibleButton>
                        <FlexibleButton outline rounded className={cx('search-style-btn')}>
                            <FontAwesomeIcon icon={faArrowRight} className={cx('suggestion-icon')} />
                            <span>JavaScript Projects</span>
                        </FlexibleButton>
                    </div>
                </div>
            </div>
            <div className={cx('main-container')}>
                {/* filters bar */}
                <SearchFiltersBar />

                {/* filtered content */}
                <SearchFilteredContent />
            </div>
        </div>
    );
}

export default Search;
