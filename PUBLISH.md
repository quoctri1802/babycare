# Hướng dẫn Public ứng dụng Mẹ & Bé

Ứng dụng của bạn đã sẵn sàng để đưa lên Internet! Dưới đây là các bước đơn giản nhất để bạn public ứng dụng và sử dụng trên điện thoại:

### Cách 1: Sử dụng Vercel (Khuyên dùng - Nhanh nhất)
Vercel là nền tảng miễn phí, ổn định và hỗ trợ HTTPS (bắt buộc cho ứng dụng PWA của bạn).

1.  **Cài đặt Vercel CLI (nếu bạn có Node.js):**
    Mở terminal tại thư mục dự án và chạy:
    ```bash
    npm i -g vercel
    ```
2.  **Deploy:**
    Chỉ cần gõ lệnh sau và nhấn Enter qua các câu hỏi:
    ```bash
    vercel
    ```
3.  **Xong!** Bạn sẽ nhận được một đường link (ví dụ: `baby-care-app.vercel.app`).

### Cách 2: Sử dụng Netlify (Kéo và Thả)
Nếu bạn không muốn dùng dòng lệnh:
1.  Truy cập [Netlify Drop](https://app.netlify.com/drop).
2.  Mở thư mục dự án trên máy tính của bạn.
3.  Kéo toàn bộ thư mục **`dist`** (vừa được tạo sau khi build) và thả vào trang web Netlify.
4.  Ứng dụng sẽ được public ngay lập tức với link HTTPS.

### Cách 3: Sử dụng GitHub Pages
Nếu bạn đã có tài khoản GitHub:
1.  Đưa mã nguồn lên một repository mới.
2.  Vào phần **Settings > Pages**.
3.  Chọn nguồn là thư mục `root` (nhưng lưu ý bạn cần cấu hình Vite để build vào root hoặc dùng công cụ hỗ trợ).

---

## ⚠️ Lưu ý Quan trọng sau khi Public
1.  **HTTPS:** Ứng dụng PWA và hệ thống thông báo (Web Push) **chỉ hoạt động** trên môi trường bảo mật HTTPS. Các dịch vụ trên đều cung cấp sẵn HTTPS miễn phí.
2.  **Cài đặt vào điện thoại:**
    -   **iPhone (Safari):** Nhấn biểu tượng "Chia sẻ" (ô vuông có mũi tên lên) -> Chọn **"Thêm vào MH chính" (Add to Home Screen)**.
    -   **Android (Chrome):** Nhấn dấu 3 chấm -> Chọn **"Cài đặt ứng dụng"** hoặc **"Thêm vào màn hình chính"**.
3.  **Dữ liệu:** Dữ liệu được lưu trữ riêng trên điện thoại của mỗi người dùng. Nếu bạn muốn quản lý dữ liệu tập trung (ví dụ: mẹ và bố cùng xem một dữ liệu), chúng ta sẽ cần tích hợp thêm Database (Firebase/Supabase) trong tương lai.

**Chúc mừng bạn đã hoàn thành dự án!**
