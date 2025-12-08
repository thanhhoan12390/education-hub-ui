'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, memo, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

import { Note } from '~/types';
import { formatTime } from '~/utils/formatTime';
import TextAreaModal from '~/components/features/video-studying/TextAreaModal';
import { addNote } from '~/lib/actions';
import NoteDisplayItem from '~/components/features/video-studying/NoteDisplayItem';
import FlexibleButton from '~/components/ui/FlexibleButton';
import PopperWrapper from '~/components/ui/PopperWrapper';
import styles from './DashboardNotes.module.scss';

const cx = classNames.bind(styles);

interface DashboardNotesProps {
    curStreamingTime?: number;
    activePanelData: {
        activePanelIndex: number;
        activePanelTitle: string;
        sectionIndex: number;
        sectionTitle: string;
    };
}

function DashboardNotes({ curStreamingTime, activePanelData }: DashboardNotesProps) {
    const [isOpenNote, setIsOpenNote] = useState(false);
    const [note, setNote] = useState('');
    const [isSortModeOpen, setIsSortModeOpen] = useState(false);
    const [isSortOrderOpen, setIsSortOrderOpen] = useState(false);
    const [sortParams, setSortParams] = useState<{
        filterMode: 'all' | 'match';
        sortOrder: 'newest' | 'oldest';
        sectionOrder?: number;
        panelOrder?: number;
    }>({ filterMode: 'all', sortOrder: 'newest' });

    const sortModeDropdownRef = useRef<HTMLDivElement>(null);
    const sortOrderDropdownRef = useRef<HTMLDivElement>(null);

    const noteUrl = '/api/notes';

    const {
        data: allNotes,
        isLoading,
        mutate: mutateNotes,
        isValidating,
    } = useSWR<Note[]>([noteUrl, sortParams], {
        revalidateOnFocus: false,
        dedupingInterval: 0,
        keepPreviousData: false,
        suspense: false,
    });

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sortModeDropdownRef.current && !sortModeDropdownRef.current.contains(e.target as Node)) {
                setIsSortModeOpen(false);
            }

            if (sortOrderDropdownRef.current && !sortOrderDropdownRef.current.contains(e.target as Node)) {
                setIsSortOrderOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        setSortParams((pre) => ({
            ...pre,
            sectionOrder: activePanelData.sectionIndex,
            panelOrder: activePanelData.activePanelIndex,
        }));
    }, [activePanelData]);

    return (
        <div className={cx('wrapper')}>
            {!isOpenNote && (
                <div className={cx('note-create')} onClick={() => setIsOpenNote(true)}>
                    <div className={cx('create-note-text')}>
                        Create a new note at {formatTime(curStreamingTime ?? 0)}
                    </div>
                    <FontAwesomeIcon fontSize="1.2rem" icon={faPlusCircle} />
                </div>
            )}

            <TextAreaModal
                time={curStreamingTime}
                note={note}
                onNoteChange={setNote}
                open={isOpenNote}
                onClose={() => setIsOpenNote(false)}
                modalAction={async () => {
                    const data = {
                        noteData: note,
                        panelOrder: activePanelData.activePanelIndex,
                        panelTitle: activePanelData.activePanelTitle,
                        sectionOrder: activePanelData.sectionIndex,
                        sectionTitle: activePanelData.sectionTitle,
                        time: curStreamingTime ?? 0,
                    };

                    const realNote = await addNote(data);

                    // Optimistic UI update, Cập nhật UI ngay lập tức, không đợi response
                    mutateNotes(
                        (currentNotes) => {
                            if (currentNotes && realNote) {
                                return sortParams.sortOrder === 'newest'
                                    ? [realNote, ...currentNotes]
                                    : [...currentNotes, realNote];
                            }
                        },
                        { revalidate: false, rollbackOnError: true },
                    );

                    // nếu không đổi key, tạm thời dùng Optimistic update, khi đổi key sẽ fetch lại, tận dụng isValidating
                    // để show loading state, tránh bị giật ui khi kết hợp mutate() optimistic với revalidate() khi đổi key
                    // mutateNotes();
                    setNote('');
                }}
            />

            <div className={cx('sort-container')}>
                <div className={cx('sort-wrapper')} ref={sortModeDropdownRef}>
                    <FlexibleButton
                        outline
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsSortModeOpen((prev) => !prev);
                        }}
                    >
                        {sortParams.filterMode === 'all' ? 'All lectures' : 'Current lecture'}
                        <FontAwesomeIcon
                            style={{ marginInlineStart: '0.8rem', fontSize: '0.8rem' }}
                            icon={faChevronDown}
                        />
                    </FlexibleButton>

                    <PopperWrapper
                        className={cx('sort-dropdown', {
                            ['sort-dropdown-open']: isSortModeOpen,
                        })}
                    >
                        <ul className={cx('sort-list')}>
                            <li>
                                <button
                                    className={cx('sort-item')}
                                    onClick={() => {
                                        setSortParams((pre) => ({
                                            ...pre,
                                            filterMode: 'all',
                                        }));

                                        setIsSortModeOpen((pre) => !pre);
                                    }}
                                >
                                    All lectures
                                </button>
                            </li>
                            <li>
                                <button
                                    className={cx('sort-item')}
                                    onClick={() => {
                                        setSortParams((pre) => ({
                                            ...pre,
                                            filterMode: 'match',
                                            sectionOrder: activePanelData.sectionIndex,
                                            panelOrder: activePanelData.activePanelIndex,
                                        }));

                                        setIsSortModeOpen((pre) => !pre);
                                    }}
                                >
                                    Current lecture
                                </button>
                            </li>
                        </ul>
                    </PopperWrapper>
                </div>

                <div className={cx('sort-wrapper')} ref={sortOrderDropdownRef}>
                    <FlexibleButton
                        outline
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsSortOrderOpen((prev) => !prev);
                        }}
                    >
                        {sortParams.sortOrder === 'newest' ? 'Sort by most recent' : 'Sort by oldest'}
                        <FontAwesomeIcon
                            style={{ marginInlineStart: '0.8rem', fontSize: '0.8rem' }}
                            icon={faChevronDown}
                        />
                    </FlexibleButton>

                    <PopperWrapper
                        className={cx('sort-dropdown', {
                            ['sort-dropdown-open']: isSortOrderOpen,
                        })}
                    >
                        <ul className={cx('sort-list')}>
                            <li>
                                <button
                                    className={cx('sort-item')}
                                    onClick={() => {
                                        setSortParams((pre) => ({ ...pre, sortOrder: 'newest' }));
                                        setIsSortOrderOpen((pre) => !pre);
                                    }}
                                >
                                    Sort by most recent
                                </button>
                            </li>
                            <li>
                                <button
                                    className={cx('sort-item')}
                                    onClick={() => {
                                        setSortParams((pre) => ({ ...pre, sortOrder: 'oldest' }));
                                        setIsSortOrderOpen((pre) => !pre);
                                    }}
                                >
                                    Sort by oldest
                                </button>
                            </li>
                        </ul>
                    </PopperWrapper>
                </div>
            </div>

            {isLoading || isValidating ? (
                <Flex align="center" justify="center" gap="middle">
                    <Spin
                        indicator={
                            <Loading3QuartersOutlined
                                style={{ color: 'var(--black-color)', fontSize: '4.8rem' }}
                                spin
                            />
                        }
                    />
                </Flex>
            ) : (
                <div className={cx('note-bookmarks')}>
                    {allNotes?.map((item, index) => {
                        return <NoteDisplayItem key={index} noteInfo={item} onMutateNotes={mutateNotes} />;
                    })}
                </div>
            )}
        </div>
    );
}

export default memo(DashboardNotes);
