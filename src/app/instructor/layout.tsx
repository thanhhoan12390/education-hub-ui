import Footer from '~/components/layout/components/Footer';
import styles from './Instructor.module.css';

function InstructorLayout({
    children,
    header,
    navbar,
}: {
    children: React.ReactNode;
    header: React.ReactNode;
    navbar: React.ReactNode;
}) {
    return (
        <div className={styles.wrapper}>
            {/* header */}
            {header}

            {/* main content */}
            <main className={styles.mainContent}>
                <div className={styles.mainPageFrame}>
                    {navbar}
                    {children}
                </div>
            </main>

            {/* footer */}
            <Footer />
        </div>
    );
}

export default InstructorLayout;
