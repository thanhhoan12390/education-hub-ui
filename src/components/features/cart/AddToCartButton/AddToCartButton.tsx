'use client';

import { useTransition } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useSWR, { mutate as mutateGlobal } from 'swr';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { addToCart } from '~/lib/actions';
import { Cart } from '~/types';

interface AddToCartButtonProps {
    medium?: boolean;
    noPrimary?: boolean;
    courseId: number;
}

function AddToCartButton({ courseId, noPrimary = false, medium = false }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();

    const url = '/api/cart';

    const {
        data: cart,
        error,
        isLoading,
        mutate,
    } = useSWR<Cart>(url, {
        revalidateOnFocus: false,
    });

    return !cart?.courseIds.includes(courseId) ? (
        <FlexibleButton
            outline={noPrimary}
            large={!medium}
            primary={!noPrimary}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                startTransition(async () => {
                    // Optimistic UI update, Cập nhật UI ngay lập tức, không đợi response
                    mutate(
                        (currentCart) => ({
                            ...currentCart,
                            courseIds: [...(currentCart?.courseIds ?? []), courseId],
                        }),
                        { revalidate: false },
                    );

                    // Gửi POST thật lên backend
                    await addToCart(courseId);

                    //	Sau khi server xử lý xong, fetch lại dữ liệu thật để đồng bộ
                    mutate();
                    mutateGlobal('/api/cart-detail');
                });
            }}
        >
            {isPending || isLoading ? (
                <Spin
                    style={noPrimary ? { color: 'var(--purple-color)' } : { color: 'var(--gray-color-100)' }}
                    indicator={<LoadingOutlined spin />}
                    size={noPrimary ? 'default' : 'large'}
                />
            ) : (
                'Add to cart'
            )}
        </FlexibleButton>
    ) : (
        <FlexibleButton href="/cart" outline={noPrimary} large={!medium} primary={!noPrimary}>
            {isPending || isLoading ? (
                <Spin
                    style={noPrimary ? { color: 'var(--purple-color)' } : { color: 'var(--gray-color-100)' }}
                    indicator={<LoadingOutlined spin />}
                    size={noPrimary ? 'default' : 'large'}
                />
            ) : (
                'Go to cart'
            )}
        </FlexibleButton>
    );
}

export default AddToCartButton;
