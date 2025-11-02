export default function Layout({
    children,
    courseContent,
    topDescription,
    multiPurposeSidebar,
}: Readonly<{
    children: React.ReactNode;
    courseContent: React.ReactNode;
    topDescription: React.ReactNode;
    multiPurposeSidebar: React.ReactNode;
}>) {
    return (
        <div
            style={
                {
                    '--max-inline': '118.4rem',
                    position: 'relative',
                } as React.CSSProperties
            }
        >
            {topDescription}
            {multiPurposeSidebar}
            {courseContent}
            {children}
        </div>
    );
}
