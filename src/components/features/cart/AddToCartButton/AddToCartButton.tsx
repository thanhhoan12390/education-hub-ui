'use client';

import { useTransition } from 'react';
import { Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import useSWR, { mutate as mutateGlobal } from 'swr';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { addToCart } from '~/lib/actions';
import { Cart } from '~/types';

interface AddToCartButtonProps {
    medium?: boolean;
    noPrimary?: boolean;
    courseId: number;
    small?: boolean;
    isInline?: boolean;
}

function AddToCartButton({
    courseId,
    noPrimary = false,
    medium = false,
    small = false,
    isInline = false,
}: AddToCartButtonProps) {
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
            small={small}
            style={{
                ...(isInline && {
                    inlineSize: 'unset',
                    minInlineSize: 'unset',
                }),
            }}
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
                    indicator={<Loading3QuartersOutlined spin />}
                    size={noPrimary ? 'default' : 'large'}
                />
            ) : (
                'Add to cart'
            )}
        </FlexibleButton>
    ) : (
        <FlexibleButton
            style={{
                ...(isInline && {
                    inlineSize: 'unset',
                    minInlineSize: 'unset',
                }),
            }}
            href="/cart"
            outline={noPrimary}
            large={!medium}
            primary={!noPrimary}
            small={small}
            onClick={(e) => e.stopPropagation()}
        >
            {isPending || isLoading ? (
                <Spin
                    style={noPrimary ? { color: 'var(--purple-color)' } : { color: 'var(--gray-color-100)' }}
                    indicator={<Loading3QuartersOutlined spin />}
                    size={noPrimary ? 'default' : 'large'}
                />
            ) : (
                'Go to cart'
            )}
        </FlexibleButton>
    );
}

export default AddToCartButton;
