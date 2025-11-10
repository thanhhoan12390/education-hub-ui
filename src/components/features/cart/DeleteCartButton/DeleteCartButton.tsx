'use client';

import classNames from 'classnames/bind';
import { useTransition } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { mutate as mutateGlobal } from 'swr';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { removeCartItem } from '~/lib/actions';
import styles from './DeleteCartButton.module.scss';

const cx = classNames.bind(styles);

interface DeleteCartButtonProps {
    courseId: number;
}

function DeleteCartButton({ courseId }: DeleteCartButtonProps) {
    const [isPending, startTransition] = useTransition();

    return isPending ? (
        <FlexibleButton
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
            className={cx('loading-button')}
            light
            small
        >
            <Spin indicator={<LoadingOutlined style={{ color: 'var(--purple-color)' }} spin />} size="default" />
        </FlexibleButton>
    ) : (
        <FlexibleButton
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                startTransition(async () => {
                    await removeCartItem(courseId);

                    mutateGlobal('/api/cart');
                    mutateGlobal('/api/cart-detail');
                });
            }}
            light
            small
            hover
            className={cx('action-button')}
        >
            Remove
        </FlexibleButton>
    );
}

export default DeleteCartButton;
