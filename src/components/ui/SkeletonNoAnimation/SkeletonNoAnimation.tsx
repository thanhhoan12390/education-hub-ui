export default function SkeletonNoAnimation() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.6rem',
                padding: '1.6rem',
                maxWidth: '100%',
                margin: '0 auto',
            }}
        >
            {/* Tiêu đề */}
            <div
                style={{
                    width: '100%',
                    height: '3.6rem',
                    borderRadius: '0.4rem',
                    background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                    backgroundSize: '200% 100%',
                }}
            />

            {/* 4–6 dòng text */}
            {['100%', '92%', '72%', '64%'].map((w, i) => (
                <div
                    key={i}
                    style={{
                        width: w,
                        height: '2.4rem',
                        borderRadius: '0.4rem',
                        background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                        backgroundSize: '200% 100%',
                    }}
                />
            ))}
        </div>
    );
}
