# Hướng dẫn Public Ứng dụng "Mẹ & Bé"

Ứng dụng của bạn đã sẵn sàng để sử dụng rộng rãi. Dưới đây là các cách để đưa ứng dụng lên internet miễn phí và chuyên nghiệp nhất.

## 1. Sử dụng Vercel (Khuyên dùng)
Đây là cách nhanh và chuyên nghiệp nhất, hỗ trợ tốt cho PWA (Cài đặt ứng dụng lên màn hình chính).

1. Truy cập [Vercel.com](https://vercel.com/) và đăng ký tài khoản (dùng GitHub hoặc Email).
2. Nhấn **"Add New"** -> **"Project"**.
3. Kết nối với kho lưu trữ GitHub của bạn hoặc kéo thả thư mục ứng dụng vào.
4. Vercel sẽ tự động nhận diện project Vite và build cho bạn.
5. Sau khi xong, bạn sẽ có một tên miền dạng `ten-ung-dung.vercel.app`.

## 2. Sử dụng Netlify
Tương tự như Vercel, rất ổn định.

1. Truy cập [Netlify.com](https://www.netlify.com/).
2. Chọn **"Add new site"** -> **"Deploy manually"**.
3. Chạy lệnh `npm run build` trong thư mục ứng dụng của bạn.
4. Kéo thư mục `dist` vừa tạo được thả vào ô upload trên Netlify.

## 3. Cách cài đặt lên điện thoại (Dành cho người dùng)
Sau khi đã public link:

- **Trên iPhone (Safari)**: Nhấn nút **Share** (hình vuông có mũi tên lên) -> Chọn **"Thêm vào MH chính"** (Add to Home Screen).
- **Trên Android (Chrome)**: Nhấn dấu **3 chấm** ở góc trên bên phải -> Chọn **"Cài đặt ứng dụng"** (Install app).

## Lưu ý để ứng dụng "xịn" hơn:
- **Tên miền riêng**: Bạn có thể mua tên miền `.com` hoặc `.vn` để gán vào Vercel/Netlify.
- **Icon**: Tôi đã cập nhật các icon nghệ thuật hơn (Milk, Waves, Sparkles). Bạn có thể thay đổi icon trong `main.js` nếu muốn.
- **Thông báo**: Người dùng cần nhấn **"Bật ngay"** khi lần đầu truy cập để hệ thống có quyền gửi nhắc nhở.
