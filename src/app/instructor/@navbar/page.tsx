import styles from './InstructorNavbar.module.css';

function InstructorNavbar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.navInner}>
                    <div className={styles.navMenu}></div>
                </div>
            </div>
        </div>
    );
}

export default InstructorNavbar;
