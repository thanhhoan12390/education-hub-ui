import LearningLayout from '~/components/layout/LearningLayout';

export default function LearningGroupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <LearningLayout>{children}</LearningLayout>;
}
