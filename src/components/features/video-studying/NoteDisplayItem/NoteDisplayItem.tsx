'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useState, memo, Fragment } from 'react';
import type { KeyedMutator } from 'swr';

import { Note } from '~/types';
import { formatTime } from '~/utils/formatTime';
import TextAreaModal from '~/components/features/video-studying/TextAreaModal';
import { updateNote, deleteNote } from '~/lib/actions';
import OverlayModal from '~/components/ui/OverlayModal';
import FlexibleButton from '~/components/ui/FlexibleButton';
import styles from './NoteDisplayItem.module.scss';

const cx = classNames.bind(styles);

interface NoteDisplayItemProps {
    noteInfo: Note;
    onMutateNotes?: KeyedMutator<Note[]>;
}

function NoteDisplayItem({ noteInfo, onMutateNotes }: NoteDisplayItemProps) {
    const [isOpenTextarea, setIsOpenTextarea] = useState(false);
    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
    const [note, setNote] = useState('');

    const handleUpdateNote = async () => {
        await updateNote(noteInfo.noteId, { noteData: note });
        // Optimistic UI update, Cập nhật UI ngay lập tức, không đợi response
        onMutateNotes?.(
            (currentNotes) => {
                return currentNotes?.map((item) =>
                    item.noteId === noteInfo.noteId
                        ? {
                              ...item,
                              noteData: note,
                          }
                        : item,
                );
            },
            { revalidate: false, rollbackOnError: true },
        );

        // onMutateNotes?.();
    };

    const handleDeleteNote = async () => {
        onMutateNotes?.((currentNotes) => currentNotes?.filter((item) => item.noteId !== noteInfo.noteId), {
            revalidate: false,
            rollbackOnError: true,
        });

        //dùng Optimistic UI update xong đóng, giống hành vi của Udemy, await và validate nếu có lỗi
        setIsOpenDeleteConfirm(false);

        const res = await deleteNote(noteInfo.noteId);

        if (res?.error) {
            onMutateNotes?.();
        }
    };

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('note-duration-wrapper')}>
                    <div className={cx('note-duration')}>{formatTime(noteInfo.time)}</div>
                </div>
                <div className={cx('note-content')}>
                    <div className={cx('title-group')}>
                        <div className={cx('section-description')}>
                            <div
                                className={cx('section-title')}
                            >{`${noteInfo.sectionOrder}. ${noteInfo.sectionTitle}`}</div>
                            <div className={cx('panel-title')}>{`${noteInfo.panelOrder}. ${noteInfo.panelTitle}`}</div>
                        </div>
                        <div className={cx('note-actions')}>
                            <div
                                className={cx('update-action-wrapper')}
                                onClick={() => {
                                    setIsOpenTextarea(!isOpenTextarea);
                                    setNote(noteInfo.noteData);
                                }}
                            >
                                <FontAwesomeIcon fontSize="1.2rem" icon={faPencil} />
                            </div>
                            <div className={cx('delete-action-wrapper')} onClick={() => setIsOpenDeleteConfirm(true)}>
                                <FontAwesomeIcon fontSize="1.2rem" icon={faTrashCan} />
                            </div>
                        </div>
                    </div>

                    {!isOpenTextarea && (
                        <div className={cx('note-data')}>
                            <pre>{noteInfo.noteData}</pre>
                        </div>
                    )}

                    <TextAreaModal
                        className={cx('textarea-modal')}
                        hideDuration
                        note={note}
                        onNoteChange={setNote}
                        open={isOpenTextarea}
                        onClose={() => setIsOpenTextarea(false)}
                        modalAction={handleUpdateNote}
                    />
                </div>
            </div>

            <OverlayModal open={isOpenDeleteConfirm} onClose={() => setIsOpenDeleteConfirm(false)}>
                <div className={cx('delete-confirm-wrapper')}>
                    <div className={cx('delete-confirm-container')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('delete-modal-title')}>
                            <h2 className={cx('delete-modal-heading')}>Please confirm</h2>
                            <FlexibleButton
                                hover
                                className={cx('delete-modal-close-btn')}
                                onClick={() => setIsOpenDeleteConfirm(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </FlexibleButton>
                        </div>
                        <div className={cx('delete-modal-message')}>Are you sure you want to delete your note?</div>
                        <div className={cx('delete-modal-buttons')}>
                            <FlexibleButton
                                className={cx('delete-modal-cancel-btn')}
                                hover
                                onClick={() => setIsOpenDeleteConfirm(false)}
                            >
                                Cancel
                            </FlexibleButton>
                            <div className={cx('ok-btn-wrapper')}>
                                <FlexibleButton
                                    className={cx('delete-modal-ok-btn')}
                                    primary
                                    onClick={handleDeleteNote}
                                >
                                    OK
                                </FlexibleButton>
                            </div>
                        </div>
                    </div>
                </div>
            </OverlayModal>
        </Fragment>
    );
}

export default memo(NoteDisplayItem);
