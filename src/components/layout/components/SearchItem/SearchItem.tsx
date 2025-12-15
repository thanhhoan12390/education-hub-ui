'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { memo } from 'react';
import { Skeleton, Alert } from 'antd';

import type { SearchItemInfo } from '~/types';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

interface SearchItemProps {
    searchItemURL: string;
    onSearchChange?: (v: string) => void;
}

function SearchItem({ searchItemURL, onSearchChange }: SearchItemProps) {
    const { data, error, isLoading } = useSWR<SearchItemInfo>(searchItemURL, {
        revalidateOnFocus: false,
    });

    if (isLoading) return <Skeleton.Input active size="large" block />;
    if (error)
        return (
            <Alert
                type="error"
                message="Somethings went wrong..."
                banner
                style={{ width: '100%', borderRadius: '0.4rem' }}
            />
        );

    return data ? (
        <div className={cx('wrapper')} onClick={() => onSearchChange?.(data.name)}>
            <Link prefetch={false} href={`/search?q=${encodeURIComponent(data.name)}`} className={cx('container')}>
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
