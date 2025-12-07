'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, memo } from 'react';
import useSWR from 'swr';

import { Note } from '~/types';
import { formatTime } from '~/utils/formatTime';
import TextAreaModal from '~/components/features/video-studying/TextAreaModal';
import { addNote } from '~/lib/actions';
import NoteDisplayItem from '~/components/features/video-studying/NoteDisplayItem';
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

    const noteUrl = '/api/notes';

    const { data: allNotes, mutate: mutateNotes } = useSWR<Note[]>(noteUrl, {
        revalidateOnFocus: false,
    });

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

                    await addNote(data);

                    // Optimistic UI update, Cập nhật UI ngay lập tức, không đợi response
                    mutateNotes(
                        (currentNotes) => {
                            if (currentNotes) {
                                // thêm trước một id ngẫu nhiên để Optimistic,
                                // sau đó sẽ được mutate sau nên không cần chính xác tuyệt đối
                                const predictedId = (currentNotes[0]?.noteId ?? 0) + 1000000000;

                                return [{ ...data, noteId: predictedId }, ...currentNotes];
                            }
                        },
                        { revalidate: false, rollbackOnError: true },
                    );

                    mutateNotes();
                    setNote('');
                }}
            />

            <div className={cx('note-bookmarks')}>
                {allNotes?.map((item, index) => {
                    return <NoteDisplayItem key={index} noteInfo={item} onMutateNotes={mutateNotes} />;
                })}
            </div>
        </div>
    );
}

export default memo(DashboardNotes);
