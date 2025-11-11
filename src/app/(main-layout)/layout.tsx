import DefaultLayout from '~/components/layout/DefaultLayout';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DefaultLayout>{children}</DefaultLayout>;
}
