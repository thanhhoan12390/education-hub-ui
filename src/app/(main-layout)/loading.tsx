import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

function Loading() {
    return (
        <Flex
            align="center"
            justify="center"
            gap="middle"
            style={{ inlineSize: '100%', minBlockSize: 'calc(100vh - 72px)', backgroundColor: '#fff' }}
        >
            <Spin
                indicator={
                    <Loading3QuartersOutlined style={{ color: 'var(--purple-color)', fontSize: '4.8rem' }} spin />
                }
            />
        </Flex>
    );
}

export default Loading;
