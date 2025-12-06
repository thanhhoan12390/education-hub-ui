'use client';

import classNames from 'classnames/bind';
import { Input } from 'antd';
import { useState, useRef, useEffect, useTransition, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import type { TextAreaRef } from 'antd/es/input/TextArea';

import FlexibleButton from '~/components/ui/FlexibleButton/FlexibleButton';
import { formatTime } from '~/utils/formatTime';
import styles from './TextAreaModal.module.scss';

const cx = classNames.bind(styles);

interface TextAreaModalProps {
    time?: number;
    note?: string;
    onNoteChange?: React.Dispatch<React.SetStateAction<string>>;
    open?: boolean;
    onClose?: () => void;
    modalAction?: () => void;
}

function TextAreaModal({ time, open = true, onClose, note, onNoteChange, modalAction }: TextAreaModalProps) {
    const [isWarning, setIsWarning] = useState(false);
    const [isPending, startTransition] = useTransition();

    const textareaRef = useRef<TextAreaRef>(null);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        onNoteChange?.(value);

        if (value.trim()) {
            setIsWarning(false);
        }
    };

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (!note?.trim()) {
            setIsWarning(true);
            return;
        }

        if (modalAction) {
            startTransition(() => {
                modalAction();
                onClose?.();
            });
        }
    }

    useEffect(() => {
        setIsWarning(false);
        const element = textareaRef.current?.resizableTextArea?.textArea; // lấy element textarea của antd
        if (!element) return;

        // Focus
        element.focus();

        // Caret cuối
        const length = element.value.length;
        element.setSelectionRange(length, length);
    }, [open]);

    return open ? (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('note-time')}>{formatTime(time ?? 0)}</div>

                <div className={cx('textarea-group')}>
                    <Input.TextArea
                        value={note}
                        rows={3}
                        onChange={handleTextareaChange}
                        // custom class name theo kiểu antd (Semantic DOM): classNames ≠ className(mặc định)
                        classNames={{
                            textarea: cx('antd-custom-textarea'),
                        }}
                        // custom style inline  theo kiểu antd (Semantic DOM): styles ≠ style(mặc định)
                        styles={{
                            textarea: {
                                // color: 'var(--text-color)',
                            },
                        }}
                        name="note-textarea"
                        ref={textareaRef}
                    />

                    <div className={cx('btn-group')}>
                        <FlexibleButton onClick={onClose} className={cx('cancel-btn')} hover>
                            Cancel
                        </FlexibleButton>
                        <div
                            className={cx('save-btn-wrapper', {
                                ['save-btn-disabled-wrapper']: isPending,
                            })}
                        >
                            <FlexibleButton
                                onClick={handleSubmit}
                                className={cx('save-btn')}
                                primary
                                disabled={isPending}
                            >
                                Save note
                            </FlexibleButton>
                        </div>
                    </div>

                    {isWarning && (
                        <div className={cx('warning-banner')}>
                            <FontAwesomeIcon
                                style={{
                                    color: '#c4710d',
                                    fontSize: '2.4rem',
                                }}
                                icon={faTriangleExclamation}
                            />
                            <span>You can&apos;t save an empty note</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : null;
}

export default memo(TextAreaModal);
