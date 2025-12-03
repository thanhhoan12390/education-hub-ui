'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { MouseEvent, useTransition } from 'react';
import useSWR, { mutate as mutateGlobal } from 'swr';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { addToWishlist, removeFromWishlist } from '~/lib/actions';
import FlexibleButton from '~/components/ui/FlexibleButton';
import { Wishlist } from '~/types';
import styles from './WishlistButton.module.scss';

const cx = classNames.bind(styles);

interface WishlistButtonProps {
    courseId: number;
    whiteTheme?: boolean;
    className?: string;
}

function WishlistButton({ courseId, className, whiteTheme = false }: WishlistButtonProps) {
    const [isPending, startTransition] = useTransition();

    const url = `/api/wishlist`;

    const {
        data: wishlist,
        error,
        isLoading,
        mutate,
    } = useSWR<Wishlist>(url, {
        revalidateOnFocus: false,
    });

    const handleAddToWishlist = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        startTransition(async () => {
            // Optimistic UI update, Cập nhật UI ngay lập tức, không đợi response
            mutate(
                (currentWishlist) => ({
                    ...currentWishlist,
                    wishedIds: [...(currentWishlist?.wishedIds ?? []), courseId],
                }),
                { revalidate: false },
            );

            await addToWishlist(courseId);

            mutate();
            mutateGlobal('/api/wishlist/detail');
        });
    };

    const handleRemoveFromWishlist = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        startTransition(async () => {
            // Optimistic UI update, Cập nhật UI ngay lập tức, không đợi response
            mutate(
                (currentWishlist) => ({
                    ...currentWishlist,
                    wishedIds: (currentWishlist?.wishedIds ?? []).filter((id) => id !== courseId),
                }),
                { revalidate: false },
            );

            await removeFromWishlist(courseId);

            mutate();
            mutateGlobal('/api/wishlist/detail');
        });
    };

    if (isLoading || isPending)
        return (
            <div
                className={cx('wrapper', className, {
                    ['white-theme']: whiteTheme,
                })}
            >
                <FlexibleButton rounded large className={cx('popover-whist')}>
                    <Spin
                        style={{ color: whiteTheme ? 'var(--white-color)' : 'var(--purple-color)' }}
                        indicator={<LoadingOutlined spin />}
                        size="default"
                    />
                </FlexibleButton>
            </div>
        );

    return wishlist?.wishedIds.includes(courseId) ? (
        <div
            className={cx('wrapper', className, {
                ['white-theme']: whiteTheme,
            })}
        >
            <FlexibleButton rounded large className={cx('popover-whist')} onClick={handleRemoveFromWishlist}>
                <FontAwesomeIcon className={cx('popover-whist-icon')} icon={solidFaHeart} />
            </FlexibleButton>
        </div>
    ) : (
        <div
            className={cx('wrapper', className, {
                ['white-theme']: whiteTheme,
            })}
        >
            <FlexibleButton rounded large className={cx('popover-whist')} onClick={handleAddToWishlist}>
                <FontAwesomeIcon className={cx('popover-whist-icon')} icon={faHeart} />
            </FlexibleButton>
        </div>
    );
}

export default WishlistButton;
