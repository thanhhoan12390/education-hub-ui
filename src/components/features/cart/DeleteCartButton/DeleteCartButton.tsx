'use client';

import classNames from 'classnames/bind';
import { startTransition } from 'react';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { removeCartItem } from '~/lib/actions';
import styles from './DeleteCartButton.module.scss';

const cx = classNames.bind(styles);

interface DeleteCartButtonProps {
    courseId: number;
}

function DeleteCartButton({ courseId }: DeleteCartButtonProps) {
    return (
        <FlexibleButton
            onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                e.stopPropagation();
                e.preventDefault();

                startTransition(async () => {
                    await removeCartItem(courseId);
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
