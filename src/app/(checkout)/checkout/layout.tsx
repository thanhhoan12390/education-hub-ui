export default function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div>Checkout layout</div>
            {children}
        </div>
    );
}
