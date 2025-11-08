import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import FlexibleButton from '~/components/ui/FlexibleButton/FlexibleButton';
import ShoppingItem from '~/components/features/cart/ShoppingItem';
import { getCartDetail } from '~/lib/data';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

async function Cart() {
    const cartData = await getCartDetail();

    const totalPrice = cartData.reduce((total, course) => total + course.price, 0);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('page-heading')}>Shopping Cart</h1>
            <div className={cx('cart-section')}>
                <div className={cx('shopping-lists')}>
                    <h3 className={cx('lists-heading')}>
                        {cartData.length <= 1
                            ? `${cartData.length} Course in Cart`
                            : `${cartData.length} Courses in Cart`}
                    </h3>
                    <ul className={cx('item-lists')}>
                        {cartData.map((course, index) => (
                            <ShoppingItem key={index} course={course} />
                        ))}
                    </ul>
                    {cartData.length === 0 && (
                        <div className={cx('empty-cart')}>
                            <Image
                                src={
                                    'https://res.cloudinary.com/dypjq4erd/image/upload/v1762610160/empty-shopping-cart_bgkgkw.webp'
                                }
                                alt="empty shopping cart image"
                                width={240}
                                height={180}
                            />
                            <p className={cx('empty-cart-text')}>Your cart is empty. Keep shopping to find a course!</p>
                            <FlexibleButton href="/" style={{ inlineSize: 'unset' }} primary>
                                Keep shopping
                            </FlexibleButton>
                        </div>
                    )}
                </div>
                {cartData.length > 0 && (
                    <div className={cx('cart-checkout')}>
                        <div className={cx('checkout-total')}>
                            <div className={cx('total-title')}>Total:</div>
                            <span className={cx('total-price')}>
                                <span>đ</span>
                                {`${totalPrice.toLocaleString('en-US')}`}
                            </span>
                        </div>
                        <div className={cx('checkout-buttons')}>
                            <FlexibleButton primary large>
                                Proceed to Checkout
                                <FontAwesomeIcon
                                    style={{ fontSize: '1.8rem', marginInlineStart: '0.4rem' }}
                                    icon={faArrowRight}
                                />
                            </FlexibleButton>
                            <div className={cx('checkout-term')}>You won&apos;t be charged yet</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
