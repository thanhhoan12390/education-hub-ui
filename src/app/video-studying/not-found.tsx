import { Button, Result } from 'antd';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist or maybe you haven't purchased this course yet"
            extra={
                <Link href="/">
                    <Button type="primary" style={{ backgroundColor: 'var(--purple-color)' }}>
                        Back Home
                    </Button>
                </Link>
            }
        />
    );
}
