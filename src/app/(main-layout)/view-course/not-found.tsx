import { Button, Result } from 'antd';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist or you purchased the course."
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
