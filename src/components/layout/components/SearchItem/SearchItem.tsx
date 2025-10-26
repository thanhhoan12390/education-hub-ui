'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { memo } from 'react';

import type { SearchItemInfo } from '~/types';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

interface SearchItemProps {
    searchItemURL: string;
}

function SearchItem({ searchItemURL }: SearchItemProps) {
    const { data, error, isLoading } = useSWR<SearchItemInfo>(searchItemURL, {
        revalidateOnFocus: false,
    });

    if (isLoading) return <div>Loading....</div>;
    if (error) return <div>Co loi xay ra....</div>;

    return data ? (
        <div className={cx('wrapper')}>
            <Link href="" className={cx('container')}>
                <div className={cx('search-img')}>
                    <Image
                        src={data.sprites.other['official-artwork'].front_default}
                        alt="search image"
                        height={32}
                        width={32}
                    />
                </div>
                <div className={cx('search-content')}>
                    <div className={cx('content-title')}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry
                    </div>
                    <div className={cx('content-course')}>
                        <div className={cx('course-text')}>Course</div>
                        <div className={cx('course-instructor')}>{data.name}</div>
                    </div>
                </div>
            </Link>
        </div>
    ) : null;
}

export default memo(SearchItem);
