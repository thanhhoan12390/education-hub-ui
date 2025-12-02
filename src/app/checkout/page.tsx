'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

import { Course } from '~/types';
import CheckoutButton from '~/components/features/checkout/CheckoutButton';
import styles from './Checkout.module.scss';

const cx = classNames.bind(styles);

function Checkout() {
    const [country, setCountry] = useState();

    const url = `/api/cart-detail`;

    const { data, isLoading } = useSWR<Course[]>(url, { revalidateOnFocus: false });

    const totalPrice = useMemo(() => data?.reduce((total, course) => total + course.price, 0), [data]);

    const cart = useMemo(() => data?.map((course) => course.courseId), [data]);

    if (isLoading)
        return (
            <Flex
                align="center"
                justify="center"
                gap="middle"
                style={{ inlineSize: '100%', minBlockSize: 'calc(100vb - 12rem)' }}
            >
                <Spin indicator={<LoadingOutlined style={{ color: 'var(--purple-color)', fontSize: '6rem' }} spin />} />
            </Flex>
        );

    return (
        <div className={cx('checkout-container')}>
            <div className={cx('checkout-content')}>
                {/* checkout main */}
                <main className={cx('checkout-overview')}>
                    <h1 className={cx('checkout-heading')}>Checkout</h1>
                    <section className={cx('checkout-address')}>
                        <h2 className={cx('address-heading')}>Billing address</h2>
                        <div className={cx('select-group')}>
                            <div className={cx('select-label')}>Country</div>
                            <Select
                                style={{ blockSize: '4rem', inlineSize: '100%', minInlineSize: '100%' }}
                                className={cx('country-select')}
                                suffixIcon={<FontAwesomeIcon fontSize={'1.6rem'} icon={faEarth} />}
                                showSearch
                                value={country}
                                onChange={(value) => setCountry(value)}
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '')
                                        .toLowerCase()
                                        .localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: 'AU',
                                        label: 'Australia',
                                    },
                                    {
                                        value: 'BR',
                                        label: 'Brazil',
                                    },
                                    {
                                        value: 'BN',
                                        label: 'Brunei',
                                    },
                                    {
                                        value: 'CM',
                                        label: 'Cameroon',
                                    },
                                    {
                                        value: 'CL',
                                        label: 'Chile',
                                    },
                                    {
                                        value: 'IS',
                                        label: 'Iceland',
                                    },
                                    {
                                        value: 'MX',
                                        label: 'Mexico',
                                    },
                                    {
                                        value: 'GB',
                                        label: 'United Kingdom',
                                    },
                                    {
                                        value: 'US',
                                        label: 'United States',
                                    },
                                    {
                                        value: 'VE',
                                        label: 'Venezuela',
                                    },
                                    {
                                        value: 'VN',
                                        label: 'Vietnam',
                                    },
                                    {
                                        value: 'YE',
                                        label: 'Yemen',
                                    },
                                    {
                                        value: 'ZM',
                                        label: 'Zambia',
                                    },
                                ]}
                            />
                        </div>
                        <div className={cx('select-term')}>
                            Website is required by law to collect applicable transaction taxes for purchases made in
                            certain tax jurisdictions.
                        </div>
                    </section>
                    <section className={cx('order-details')}>
                        <h2 className={cx('order-heading')}>
                            Order details&nbsp;
                            {data?.length ?? 0 <= 1 ? `(${data?.length} course)` : `(${data?.length} courses)`}
                        </h2>
                        <ul className={cx('order-list')}>
                            {data?.map((course, index) => (
                                <li className={cx('order-item')} key={index}>
                                    <div className={cx('item-des')}>
                                        <Image src={course.imageUrl} alt="order image" width={50} height={50} />
                                        <div className={cx('item-title')}>{course.title}</div>
                                    </div>
                                    <div className={cx('item-price')}>
                                        <span>đ</span>
                                        {`${course.price.toLocaleString('en-US')}`}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
                {/* checkout aside */}
                <aside className={cx('checkout-summary')}>
                    <div className={cx('summary-wrapper')}>
                        <div className={cx('order-summary')}>
                            <h2 className={cx('summary-heading')}>Order summary</h2>
                            <div className={cx('price-group')}>
                                <span className={cx('price-title')}>Original Price:</span>
                                <div className={cx('sum-price')}>
                                    <span>đ</span>
                                    {`${totalPrice?.toLocaleString('en-US')}`}
                                </div>
                            </div>
                            <div className={cx('price-group')}>
                                <span className={cx('price-title')}>Discounts (0% Off):</span>
                                <div className={cx('sum-price')}>
                                    <span>đ</span>
                                    {`${Number(0).toLocaleString('en-US')}`}
                                </div>
                            </div>
                            <div className={cx('checkout-divider')} />
                            <div className={cx('price-group')}>
                                <span className={cx('total-text')}>
                                    Total&nbsp;
                                    {data?.length ?? 0 <= 1 ? `(${data?.length} course)` : `(${data?.length} courses)`}:
                                </span>
                                <div className={cx('total-price')}>
                                    <span>đ</span>
                                    {`${totalPrice?.toLocaleString('en-US')}`}
                                </div>
                            </div>
                        </div>
                        <div className={cx('marketplace-checkout')}>
                            <div className={cx('marketplace-term')}>
                                By completing your purchase, you agree to these term of use
                            </div>
                            <CheckoutButton totalPrice={totalPrice ?? 0} cart={cart ?? []} />
                            <div className={cx('checkout-term')}>30-Day Money-Back Guarantee</div>
                            <div className={cx('checkout-term-detail')}>
                                Not satisfied? Get a full refund within 30 days. Simple and straightforward!
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Checkout;
