# Hướng dẫn deploy nancylemflorist.com lên Hostinger

Áp dụng cho gói **Business / Cloud** có mục **Node.js** trong hPanel.

Trên máy bạn, thư mục `deploy/` (không đưa lên GitHub) có file `deploy/hostinger-env.txt` chứa sẵn toàn bộ biến môi trường. Mật khẩu admin và khóa bí mật đã được tạo ngẫu nhiên.

---

## Bước 1: Tạo hộp thư email

1. hPanel → **Emails** → thêm tên miền `nancylemflorist.com` (nếu chưa có) → tạo hộp thư `contact@nancylemflorist.com`.
2. Ghi lại mật khẩu hộp thư, điền vào dòng `SMTP_PASS` trong `deploy/hostinger-env.txt`.

## Bước 2: Tạo thư mục lưu đơn hàng

Đơn hàng và yêu cầu liên hệ được lưu dưới dạng file JSON. Thư mục này phải nằm **ngoài** thư mục ứng dụng để không bị xóa khi deploy lại.

1. hPanel → **Files → File Manager**. Xem đường dẫn thư mục home, ví dụ `/home/u123456789/`.
2. Tạo thư mục `nancylemflorist-data` ngay trong home.
3. Sửa dòng `DATA_DIR` trong `deploy/hostinger-env.txt`, thay `<user>` bằng tên user thật, ví dụ `DATA_DIR=/home/u123456789/nancylemflorist-data`.

## Bước 3: Tạo ứng dụng Node.js từ GitHub

1. hPanel → **Websites → Add website → Node.js Apps** (hoặc mở website nancylemflorist.com → **Node.js**).
2. Chọn **Import Git repository**, đăng nhập GitHub khi được hỏi, chọn repo `thanhnhaclaude/nha-nancylemflorist`, nhánh `main`.
3. Cấu hình:
   - **Node.js version:** 22.x (tối thiểu 20.9)
   - **Build command:** `npm run build`
   - **Start command:** `npm start`
   - **Root directory:** để mặc định (thư mục gốc repo)

## Bước 4: Khai báo biến môi trường (trước khi bấm Deploy)

Trong phần **Environment variables**, thêm **từng dòng** trong `deploy/hostinger-env.txt` (tên biến và giá trị).

| Biến | Ý nghĩa |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://nancylemflorist.com`. Được ghi vào lúc build, đổi giá trị thì phải **Deploy lại** |
| `ADMIN_PASSWORD` | Mật khẩu đăng nhập trang `/admin` |
| `AUTH_SECRET` | Khóa ký cookie đăng nhập (giữ bí mật) |
| `DATA_DIR` | Thư mục lưu đơn hàng (Bước 2) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Hộp thư gửi email (Bước 1) |
| `SHOP_EMAIL` | Hộp thư nhận thông báo đơn mới |

## Bước 5: Deploy và gắn tên miền

1. Bấm **Deploy**. Lần đầu mất vài phút.
2. Trỏ tên miền **nancylemflorist.com** (và `www`) về ứng dụng này, bật **SSL** (hPanel → **Security → SSL**).

## Bước 6: Kiểm tra sau khi chạy

- [ ] https://nancylemflorist.com/ hiển thị trang chủ có ảnh
- [ ] https://nancylemflorist.com/api/health → `"status":"ok"`, và `DATA_DIR_writable`, `SMTP_configured`, `ADMIN_configured` đều là `true`
- [ ] https://nancylemflorist.com/shop/midnight-garden → đặt thử một đơn
  - Hộp thư `SHOP_EMAIL` nhận email "New order…", email khách nhận "We received your order request…"
- [ ] https://nancylemflorist.com/admin → đăng nhập bằng `ADMIN_PASSWORD`, thấy đơn vừa đặt, đổi trạng thái được
- [ ] https://nancylemflorist.com/weddings-events → gửi thử form yêu cầu báo giá
- [ ] https://nancylemflorist.com/sitemap.xml và /robots.txt hiển thị đúng

## Bước 7: Google

1. Thêm **nancylemflorist.com** vào Google Search Console và gửi sitemap `https://nancylemflorist.com/sitemap.xml`.
2. Tạo Google Business Profile nếu muốn hiển thị trên Google Maps.

---

## Quy trình xử lý đơn hàng

Website **không thu tiền trực tiếp**. Khi khách gửi form:

1. Đơn được lưu vào `DATA_DIR/orders.json`, shop nhận email, khách nhận email xác nhận.
2. Nhân viên vào `/admin`, gọi hoặc email cho khách để xác nhận, rồi gửi **link thanh toán** (Stripe Payment Link, Square, PayPal…). Chuyển trạng thái đơn sang **confirmed**.
3. Khách trả tiền → chuyển sang **paid** → giao hoa → **delivered**.

## Cập nhật website

Mỗi lần push lên nhánh `main` trên GitHub, vào hPanel bấm **Redeploy** (hoặc bật auto-deploy nếu Hostinger hỗ trợ cho repo). Dữ liệu trong `DATA_DIR` không bị ảnh hưởng.

## Sao lưu

Tải định kỳ file `orders.json` và `inquiries.json` trong thư mục `DATA_DIR` bằng File Manager.
