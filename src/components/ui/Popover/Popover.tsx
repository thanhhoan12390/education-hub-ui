'use client';

import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';
import { useRef, useState, useEffect } from 'react';

import styles from './Popover.module.scss';

const cx = classNames.bind(styles);

interface PopoverProps {
    children: React.ReactNode;
    targetRef: React.RefObject<HTMLElement | null>;
    className?: string;
}

/**
 * Popover hiển thị nội dung trong portal gắn vào document.body
 * và tự động canh vị trí theo targetRef.
 *
 * @param {PopoverProps} props
 * @returns {React.ReactPortal}
 */
function Popover({ children, targetRef, className }: PopoverProps) {
    const [arrowDirection, setArrowDirection] = useState<
        'popover-arrow-left' | 'popover-arrow-bottom' | 'popover-arrow-right'
    >('popover-arrow-right');
    const [style, setStyle] = useState<React.CSSProperties>({});
    const popoverRef = useRef<HTMLDivElement>(null);
    const styleRef = useRef(style);

    useEffect(() => {
        const updatePosition = () => {
            if (!targetRef.current || !popoverRef.current) return;

            const targetRect = targetRef.current.getBoundingClientRect();
            // const popoverRect = popoverRef.current.getBoundingClientRect();

            const totalTargetWidth =
                targetRef.current.clientWidth +
                parseFloat(getComputedStyle(targetRef.current).marginLeft) +
                parseFloat(getComputedStyle(targetRef.current).marginRight);

            const totalPopoverWidth =
                popoverRef.current.clientWidth +
                parseFloat(getComputedStyle(popoverRef.current).marginLeft) +
                parseFloat(getComputedStyle(popoverRef.current).marginRight);

            const totalTargetHeight =
                targetRef.current.clientHeight +
                +parseFloat(getComputedStyle(targetRef.current).marginTop) +
                parseFloat(getComputedStyle(targetRef.current).marginBottom);

            const totalPopoverHeight =
                popoverRef.current.clientHeight +
                parseFloat(getComputedStyle(popoverRef.current).marginTop) +
                parseFloat(getComputedStyle(popoverRef.current).marginBottom);

            const spaceRight = window.innerWidth - targetRect.right;
            const spaceLeft = targetRect.left;

            let top = targetRect.top + totalTargetHeight / 2 - totalPopoverHeight / 2 + window.scrollY;
            let left;

            let nextArrow: typeof arrowDirection = 'popover-arrow-right';

            if (spaceRight >= totalPopoverWidth) {
                left = targetRect.right + window.scrollX;
                nextArrow = 'popover-arrow-right';
            } else if (spaceLeft >= totalPopoverWidth) {
                left = targetRect.left - totalPopoverWidth + window.scrollX;
                nextArrow = 'popover-arrow-left';
            } else {
                left = targetRect.left + totalTargetWidth / 2 - popoverRef.current.clientWidth / 2 + window.scrollX;
                top = targetRect.bottom + window.scrollY;
                nextArrow = 'popover-arrow-bottom';
            }

            const nextStyle: React.CSSProperties = {
                top: Math.max(0, top),
                left: Math.max(0, left),
            };

            // Chỉ setState nếu giá trị thực sự thay đổi
            const styleChanged = JSON.stringify(styleRef.current) !== JSON.stringify(nextStyle);
            if (styleChanged) {
                styleRef.current = nextStyle;
                setStyle(nextStyle);
            }

            setArrowDirection((prev) => (prev === nextArrow ? prev : nextArrow));
        };
        updatePosition();
    }, [targetRef]);

    return ReactDOM.createPortal(
        <div style={{ ...style }} className={cx('popover-wrapper')}>
            <div
                ref={popoverRef}
                className={cx('popover-container', className, {
                    ['popover-right']: arrowDirection === 'popover-arrow-right',
                    ['popover-left']: arrowDirection === 'popover-arrow-left',
                    ['popover-bottom']: arrowDirection === 'popover-arrow-bottom',
                })}
            >
                {children}
                <div className={cx('popover-arrow', arrowDirection)}></div>
            </div>
        </div>,
        document.body,
    );
}

export default Popover;
