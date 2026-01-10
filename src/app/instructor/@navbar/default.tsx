import InstructorNavbar from './page';

/**
 * default.tsx là component mặc định cho một named slot,
 * dùng để đảm bảo tất cả route con luôn có đủ slot đã khai báo trong layout. Nếu thiếu → 404.`
 * Được dùng khi reload trang (hard navigation) khiến Next.js không biết slot nào đang active,
 * nên nó render default.tsx để thay thế. https://nextjs.org/docs/15/app/api-reference/file-conventions/default
 */
function NavbarFallback() {
    return <InstructorNavbar />;
}

export default NavbarFallback;
