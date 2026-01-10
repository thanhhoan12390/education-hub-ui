import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import PopperWrapper from '~/components/ui/PopperWrapper';
import FlexibleButton from '~/components/ui/FlexibleButton';
import HeaderNavAvatar from '~/components/layout/components/HeaderNavAvatar';
import styles from './InstructorHeader.module.css';

function InstructorHeader() {
    return (
        <div className={styles.wrapper}>
            <div style={{ flex: '1 1 0%' }} />

            <div className={`${styles.navItem} ${styles.navStudentLink}`}>
                <Link href="" className={styles.navLink}>
                    Student
                </Link>

                <PopperWrapper className={`${styles.navStudentDropdown}`}>
                    <div className={`${styles.navDropdownContent} ${styles.navStudentDropdownContent}`}>
                        Switch to the student view here - get back to the courses you&apos;re taking.
                    </div>
                </PopperWrapper>
            </div>

            <div className={`${styles.navItem} ${styles.navNotify}`}>
                <Link href="" className={styles.navLink}>
                    <FontAwesomeIcon icon={faBell} className={styles.navIcon} />
                </Link>

                <PopperWrapper className={`${styles.navNotifyDropdown}`}>
                    <div className={styles.navDropdownContent}>
                        <div className={styles.navNotifyHeader}>
                            <div className={styles.navNotifyHeading}>Notifications</div>
                            <FlexibleButton text className={styles.navNotifySetting}>
                                Settings
                            </FlexibleButton>
                        </div>

                        <div className={styles.navNotifyText}>No notifications.</div>
                    </div>
                </PopperWrapper>
            </div>

            <HeaderNavAvatar />
        </div>
    );
}

export default InstructorHeader;
