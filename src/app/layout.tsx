import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@ant-design/v5-patch-for-react-19';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AntdRegistry } from '@ant-design/nextjs-registry'; //extract and inject AntD's first-screen styles into HTML to avoid page flicker: https://ant.design/docs/react/use-with-next#using-app-router

import SWRProvider from '~/providers/SWRProvider';
import '~/styles/globals.scss';

config.autoAddCss = false; // Ngăn FA tự chèn CSS chậm trong Fontawesome

export const tikTokFont = localFont({
    src: [
        { path: '../assets/fonts/TikTokFont-Regular.woff2', weight: '400', style: 'normal' },
        { path: '../assets/fonts/TikTokFont-Semibold.woff2', weight: '600', style: 'normal' },
        { path: '../assets/fonts/TikTokFont-Bold.woff2', weight: '700', style: 'normal' },
    ],
    variable: '--tiktok-font',
    display: 'swap',
});

export const tikTokDisplayFont = localFont({
    src: [
        { path: '../assets/fonts/TikTokDisplayFont-Semibold.woff2', weight: '600', style: 'normal' },
        { path: '../assets/fonts/TikTokDisplayFont-Bold.woff2', weight: '700', style: 'normal' },
    ],
    variable: '--tiktok-display-font',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Education Hub',
    description: 'A learning platform application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${tikTokFont.variable} ${tikTokDisplayFont.variable}`}>
            <body>
                <SWRProvider>
                    <AntdRegistry>{children}</AntdRegistry>
                </SWRProvider>
            </body>
        </html>
    );
}
