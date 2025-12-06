'use client';

import classNames from 'classnames/bind';
import { useState, useMemo, memo, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';

import styles from './StudyAccordionPanel.module.scss';

const cx = classNames.bind(styles);

interface StudyAccordionPanelProps {
    className?: string;
    sectionIndex?: number;
    sectionTitle?: string;
    panelContent: {
        lectureHeading: string;
        lectureMin: number;
    }[];
    contentStartIndex?: number;
    activeItemData?: {
        activePanelIndex: number;
        activePanelTitle: string;
        sectionIndex: number;
        sectionTitle: string;
    };
    onActiveChange?: React.Dispatch<
        React.SetStateAction<{
            activePanelIndex: number;
            activePanelTitle: string;
            sectionIndex: number;
            sectionTitle: string;
        }>
    >;
    checkedList?: number[];
    onCheckedListChange?: React.Dispatch<React.SetStateAction<number[]>>;
    onResetStreamingTime?: () => void;
}

function StudyAccordionPanel({
    className,
    sectionIndex = 1,
    sectionTitle,
    panelContent,
    contentStartIndex = 0,
    activeItemData,
    onActiveChange,
    checkedList,
    onCheckedListChange,
    onResetStreamingTime,
}: StudyAccordionPanelProps) {
    const [isContentOpen, setIsContentOpen] = useState(() => {
        const isDefaultExpand =
            (activeItemData?.activePanelIndex ?? 1) > contentStartIndex &&
            (activeItemData?.activePanelIndex ?? 1) <= contentStartIndex + panelContent.length;

        return isDefaultExpand;
    });

    const hasInitialized = useRef(false);

    const totalMin = useMemo(
        () => panelContent?.reduce((totalMin, currItem) => totalMin + currItem.lectureMin, 0),
        [panelContent],
    );

    const handleCheck = (id: number) => {
        if (onCheckedListChange) {
            onCheckedListChange((pre) => {
                const isChecked = pre.includes(id);

                if (isChecked) {
                    return pre.filter((item) => item !== id);
                } else {
                    return [...pre, id];
                }
            });
        }
    };

    const checkedCount = useMemo(() => {
        let totalChecked = 0;

        checkedList?.forEach((item) => {
            if (item > contentStartIndex && item <= contentStartIndex + panelContent.length) {
                totalChecked += 1;
            }
        });

        return totalChecked;
    }, [checkedList, contentStartIndex, panelContent.length]);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        panelContent?.forEach((item, index) => {
            const panelOrderNum = index + 1 + contentStartIndex;

            if (panelOrderNum === activeItemData?.activePanelIndex) {
                onActiveChange?.((pre) => ({
                    ...pre,
                    activePanelIndex: panelOrderNum,
                    activePanelTitle: item.lectureHeading,
                    sectionIndex,
                    sectionTitle: sectionTitle ?? '',
                }));
            }
        });
    }, [activeItemData?.activePanelIndex, contentStartIndex, onActiveChange, panelContent, sectionIndex, sectionTitle]);

    return (
        <div className={cx('wrapper', className)}>
            <div onClick={() => setIsContentOpen(!isContentOpen)} className={cx('panel-title')}>
                <div className={cx('panel-heading-group')}>
                    <h3 className={cx('panel-heading')}>
                        Section {sectionIndex}: {sectionTitle}
                    </h3>
                    <div className={cx('total-lecture')}>
                        <span>
                            {checkedCount} / {panelContent?.length}
                        </span>
                        &nbsp;|&nbsp;<span>{totalMin}min</span>
                    </div>
                </div>
                <FontAwesomeIcon
                    className={cx('title-icon', {
                        ['expand-panel-icon-rotate']: isContentOpen,
                    })}
                    icon={faChevronDown}
                />
            </div>
            <div
                className={cx('panel-container', {
                    ['panel-container-expand']: isContentOpen,
                })}
            >
                <div className={cx('panel-content')}>
                    {panelContent?.map((item, index) => {
                        const panelItemIndex = index + 1;
                        const panelOrderNum = panelItemIndex + contentStartIndex;

                        return (
                            <div
                                key={index}
                                className={cx('content-item', {
                                    ['content-item-active']: panelOrderNum === activeItemData?.activePanelIndex,
                                })}
                                onClick={() => {
                                    onActiveChange?.((pre) => ({
                                        ...pre,
                                        activePanelIndex: panelOrderNum,
                                        activePanelTitle: item.lectureHeading,
                                        sectionIndex: sectionIndex,
                                        sectionTitle: sectionTitle ?? '',
                                    }));

                                    onResetStreamingTime?.();
                                }}
                            >
                                <label className={cx('checkbox-container')} onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        checked={checkedList?.includes(panelOrderNum)}
                                        onChange={() => handleCheck(panelOrderNum)}
                                    />
                                    <span className={cx('checkmark')} />
                                </label>

                                <div className={cx('des-group')}>
                                    <div className={cx('des-title')}>
                                        {panelOrderNum}.&nbsp;{item.lectureHeading}
                                    </div>
                                    <div className={cx('des-min')}>
                                        <FontAwesomeIcon fontSize="1.4rem" icon={faYoutubeSquare} />
                                        <span>{item.lectureMin}min</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default memo(StudyAccordionPanel);
