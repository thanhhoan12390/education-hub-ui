'use client';

import classNames from 'classnames/bind';
import { useEffect, useRef, memo } from 'react';

import PopperWrapper from '~/components/ui/PopperWrapper';
import styles from './ClickableDropdown.module.scss';

const cx = classNames.bind(styles);

interface ClickableDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    dropdownContent?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    dropdownWidth?: string;
    dropdownHeight?: string;
    dropdownStyles?: React.CSSProperties;
}

function ClickableDropdown({
    children,
    dropdownContent,
    isOpen = false,
    onClose,
    dropdownWidth,
    dropdownHeight,
    dropdownStyles,
    className,

    ...rest
}: ClickableDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClose?.();
            }
        };

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'escape') {
                onClose?.();
            }
        };
        /**
         *  document.addEventListener('click', handleClickOutside);
         * ❗️“Click outside” có thể chạy sau khi React mở dropdown mới

            React onClick chạy ở bubbling phase trên document, trong khi bạn cũng dùng document.addEventListener('click', …).

            ⛔️ Vì vậy khi bạn bấm dropdown B:

            React mở dropdown B (set state → isOpenB = true)

            rồi mới tới document click handler của dropdown A

            A cố đóng lại, nhưng logic UI tổng thể của bạn không sync chung nên 2 dropdown cùng mở
         */
        document.addEventListener('pointerdown', handleClickOutside); // hoặc document.addEventListener('click', handleClickOutside, { capture: true });
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [isOpen, onClose]);

    return (
        <div className={cx('wrapper', className)} ref={dropdownRef} {...rest}>
            {children}

            <PopperWrapper
                style={{ ...dropdownStyles, inlineSize: dropdownWidth, blockSize: dropdownHeight }}
                className={cx('dropdown', {
                    ['dropdown-open']: isOpen,
                })}
            >
                {dropdownContent}
            </PopperWrapper>
        </div>
    );
}

export default memo(ClickableDropdown);
