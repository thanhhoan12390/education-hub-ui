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
}

function ClickableDropdown({
    children,
    dropdownContent,
    isOpen = false,
    onClose,
    dropdownWidth,
    dropdownHeight,
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

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleKeydown);
        };
    }, [isOpen, onClose]);

    return (
        <div className={cx('wrapper', className)} ref={dropdownRef} {...rest}>
            {children}

            <PopperWrapper
                style={{ inlineSize: dropdownWidth, blockSize: dropdownHeight }}
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
