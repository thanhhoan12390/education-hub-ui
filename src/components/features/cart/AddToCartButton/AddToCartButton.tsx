'use client';

import { useTransition } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useSWR from 'swr';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { addToCart } from '~/lib/actions';
import { Cart } from '~/types';

interface AddToCartButtonProps {
    courseId: number;
}

function AddToCartButton({ courseId }: AddToCartButtonProps) {
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
            large
            primary
            onClick={() =>
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
                })
            }
        >
            {isPending || isLoading ? (
                <Spin style={{ color: 'var(--gray-color-100)' }} indicator={<LoadingOutlined spin />} size="large" />
            ) : (
                'Add to cart'
            )}
        </FlexibleButton>
    ) : (
        <FlexibleButton href="/cart" large primary>
            {isPending || isLoading ? (
                <Spin style={{ color: 'var(--gray-color-100)' }} indicator={<LoadingOutlined spin />} size="large" />
            ) : (
                'Go to cart'
            )}
        </FlexibleButton>
    );
}

export default AddToCartButton;
