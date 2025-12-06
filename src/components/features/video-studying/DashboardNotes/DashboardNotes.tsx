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
                    await addNote({
                        noteData: note,
                        panelOrder: activePanelData.activePanelIndex,
                        panelTitle: activePanelData.activePanelTitle,
                        sectionOrder: activePanelData.sectionIndex,
                        sectionTitle: activePanelData.sectionTitle,
                        time: curStreamingTime ?? 0,
                    });

                    mutateNotes();
                    setNote('');
                }}
            />

            {allNotes?.map((item, index) => {
                return (
                    <div key={index}>
                        {item.time}
                        <pre>{item.noteData}</pre>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(DashboardNotes);
