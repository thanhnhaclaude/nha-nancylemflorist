# Hướng dẫn deploy nancylemflorist.com lên Hostinger

Áp dụng cho gói **Business / Cloud** có mục **Node.js** trong hPanel.

Trên máy bạn, thư mục `deploy/` (không đưa lên GitHub) có file `deploy/hostinger-env.txt` chứa sẵn toàn bộ biến môi trường. Mật khẩu admin và khóa bí mật đã được tạo ngẫu nhiên.

---

## Bước 1: Tạo hộp thư email

1. hPanel → **Emails** → thêm tên miền `nancylemflorist.com` (nếu chưa có) → tạo hộp thư `contact@nancylemflorist.com`.
2. Ghi lại mật khẩu hộp thư, điền vào dòng `SMTP_PASS` trong `deploy/hostinger-env.txt`.

## Bước 2: Thư mục lưu đơn hàng (tự động)

Đơn hàng và yêu cầu liên hệ được lưu dạng file JSON trong thư mục `nancylemflorist-data` nằm ở thư mục home trên Hostinger (ví dụ `/home/u123456789/nancylemflorist-data`), **ngoài** thư mục ứng dụng nên không bị xóa khi deploy lại. Website tự tạo thư mục này.

- **Không cần** khai báo biến `DATA_DIR`. Nếu đã khai báo mà còn chữ `<user>`, hãy **xóa biến đó** đi.
- Chỉ khai báo `DATA_DIR` nếu muốn lưu ở chỗ khác, và phải ghi đường dẫn đầy đủ, đúng.

## Bước 2b: Tạo tài khoản Stripe (cổng thanh toán)

1. Đăng ký tại https://dashboard.stripe.com/register bằng thông tin **NancyLem LLC** (Business type: *LLC*, EIN, địa chỉ Sheridan WY, website `https://nancylemflorist.com`, mô tả: *Online florist – fresh flower delivery*). Hoàn tất xác minh để nhận tiền.
2. **Developers → API keys** → copy **Secret key** (`sk_live_...`) vào dòng `STRIPE_SECRET_KEY`.
3. **Developers → Webhooks → Add endpoint**:
   - URL: `https://nancylemflorist.com/api/stripe/webhook`
   - Sự kiện: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired`, `charge.refunded`
   - Copy **Signing secret** (`whsec_...`) vào dòng `STRIPE_WEBHOOK_SECRET`.
4. (Tùy chọn) Bật **Stripe Tax** nếu cần thu thuế bán hàng, rồi đặt `STRIPE_AUTOMATIC_TAX=true`.
5. **Settings → Public details**: tên hiển thị *NancyLem Florist*, statement descriptor `NANCYLEM FLORIST`, email `contact@nancylemflorist.com`, số điện thoại hỗ trợ.

> Muốn thử trước bằng tiền ảo: dùng khóa `sk_test_...` và webhook ở chế độ Test, đặt hàng với thẻ thử `4242 4242 4242 4242`. Chuyển sang khóa `sk_live_...` khi chạy thật.
>
> Nếu chưa điền `STRIPE_SECRET_KEY`, website vẫn chạy: nút thanh toán đổi thành **Place order request** và shop liên hệ khách để thu tiền sau.

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
| `DATA_DIR` | Không bắt buộc (xem Bước 2) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Hộp thư gửi email (Bước 1) |
| `SHOP_EMAIL` | Hộp thư nhận thông báo đơn mới |
| `STRIPE_SECRET_KEY` | Khóa bí mật Stripe (Bước 2b) |
| `STRIPE_WEBHOOK_SECRET` | Signing secret của webhook (Bước 2b) |
| `STRIPE_AUTOMATIC_TAX` | `false`, hoặc `true` nếu đã bật Stripe Tax |

## Bước 5: Deploy và gắn tên miền

1. Bấm **Deploy**. Lần đầu mất vài phút.
2. Trỏ tên miền **nancylemflorist.com** (và `www`) về ứng dụng này, bật **SSL** (hPanel → **Security → SSL**).

## Bước 6: Kiểm tra sau khi chạy

- [ ] https://nancylemflorist.com/ hiển thị trang chủ có ảnh
- [ ] https://nancylemflorist.com/api/health → `"status":"ok"`, và `DATA_DIR_writable`, `SMTP_configured`, `ADMIN_configured`, `STRIPE_configured`, `STRIPE_webhook_configured` đều là `true`
- [ ] https://nancylemflorist.com/shop/midnight-garden → **Add to cart** → **Checkout** → thanh toán
  - Sau khi thanh toán: trang "Order confirmed", shop nhận email "PAID order…", khách nhận "Order confirmed…"
  - Trong Stripe Dashboard → Webhooks: sự kiện `checkout.session.completed` trả về 200
- [ ] Footer có khối **Company Information** (NancyLem LLC, địa chỉ, email, điện thoại) và link 4 trang chính sách
- [ ] https://nancylemflorist.com/admin → đăng nhập bằng `ADMIN_PASSWORD`, thấy đơn vừa đặt, đổi trạng thái được
- [ ] https://nancylemflorist.com/weddings-events → gửi thử form yêu cầu báo giá
- [ ] https://nancylemflorist.com/sitemap.xml và /robots.txt hiển thị đúng

## Bước 7: Google

1. Thêm **nancylemflorist.com** vào Google Search Console và gửi sitemap `https://nancylemflorist.com/sitemap.xml`.
2. Tạo Google Business Profile nếu muốn hiển thị trên Google Maps.

---

## Quy trình xử lý đơn hàng

1. Khách thêm hoa vào giỏ → **Checkout** → nhập thông tin giao hàng → thanh toán trên trang bảo mật của Stripe.
2. Stripe báo thanh toán thành công → đơn chuyển sang **paid**, shop và khách nhận email.
3. Nhân viên vào `/admin`, chuẩn bị hoa, giao → chuyển trạng thái **delivered**.
4. Hoàn tiền: thực hiện trong Stripe Dashboard → đơn tự chuyển sang **refunded**.

Các trạng thái khác: **awaiting_payment** (khách mở trang thanh toán nhưng chưa trả, tự hủy sau 1 giờ), **new** (đơn đặt khi chưa cấu hình Stripe, cần liên hệ thu tiền).

## Các trang bắt buộc cho xác minh Google Ads / Merchant

| Yêu cầu | Trang |
|---|---|
| About Us | `/about` |
| Contact Us (form + địa chỉ + điện thoại) | `/contact` |
| Shipping & Delivery Policy | `/shipping-policy` |
| Return & Replacement Policy (đổi mới / hoàn tiền) | `/return-policy` |
| Terms of Service | `/terms` |
| Privacy Policy | `/privacy-policy` |
| Thông tin pháp nhân | Footer mọi trang: *Company Information* |

## Cập nhật website

Mỗi lần push lên nhánh `main` trên GitHub, vào hPanel bấm **Redeploy** (hoặc bật auto-deploy nếu Hostinger hỗ trợ cho repo). Dữ liệu trong `DATA_DIR` không bị ảnh hưởng.

## Sao lưu

Tải định kỳ file `orders.json` và `inquiries.json` trong thư mục `DATA_DIR` bằng File Manager.

## Tự động vá lỗ hổng thư viện

Repo có sẵn:
- `.github/dependabot.yml`: Dependabot kiểm tra thư viện mỗi ngày và tự mở pull request cập nhật.
- `.github/workflows/ci.yml`: mỗi push/PR (và mỗi ngày) chạy typecheck, build và `npm audit`.
- `.github/workflows/dependabot-automerge.yml`: PR của Dependabot loại **patch/minor** tự được merge vào `main` khi build và audit đạt. Bản **major** chỉ được gắn bình luận, chờ duyệt tay.

Bật một lần trên GitHub (repo `thanhnhaclaude/nha-nancylemflorist` → **Settings**):
1. **Code security** (hoặc *Security & analysis*) → bật **Dependabot alerts** và **Dependabot security updates**.
2. **Actions → General** → *Workflow permissions*: chọn **Read and write permissions** và tick **Allow GitHub Actions to create and approve pull requests** → **Save**.

Trên Hostinger: trong ứng dụng Node.js, bật **Auto deploy** (tự deploy khi nhánh `main` thay đổi) nếu có. Nếu không có tùy chọn này, sau mỗi email báo Dependabot đã merge, bấm **Redeploy**.
