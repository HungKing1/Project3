/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

// --- Giả lập (Stub) hàm functions/renderPagination ---
// Hàm này tạo ra một mảng số trang, ví dụ: [1, 2, 3, 4, 5]
const renderPagination = (total) => {
  if (!total || total <= 1) return [1];
  // Tạo một mảng đơn giản từ 1 đến total
  return Array.from({ length: total }, (_, index) => index + 1);
};
// ---

const Pagination = () => {
  // --- Dữ liệu mẫu (Mock Data) ---
  const totalItem = 5; // Giả sử có 5 trang
  
  // --- State nội bộ để quản lý UI ---
  const [page, setPage] = useState(1); // Trang hiện tại, bắt đầu từ 1

  // Hàm nội bộ để xử lý việc nhấp vào trang
  const handleSetPage = (newPage) => {
    // Logic của prop (handleGoToSlide) đã bị loại bỏ
    setPage(newPage);
  };

  // useEffect đồng bộ với prop (currentPage) đã bị loại bỏ

  return (
    <div className="pagination_com">
      <div
        className="show_tag show_left"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          // Xử lý logic "Trước" bằng state nội bộ
          if (page <= 1) {
            /* Không làm gì */
          } else {
            handleSetPage(page - 1);
          }
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
          <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
          <path
            d="M12.9187 14.5059C12.7616 14.3717 12.6733 14.1897 12.6733 14C12.6733 13.8103 12.7616 13.6283 12.9187 13.4941L16.7614 10.2126C16.9141 10.0777 16.9985 9.89694 16.9966 9.70932C16.9947 9.52171 16.9066 9.34224 16.7512 9.20958C16.5958 9.07691 16.3856 9.00166 16.1658 9.00003C15.9461 8.9984 15.7344 9.07052 15.5763 9.20086L11.7362 12.4823C11.2648 12.8849 11 13.4308 11 14C11 14.5692 11.2648 15.1151 11.7362 15.5177L15.5797 18.7991C15.7377 18.9295 15.9494 19.0016 16.1692 19C16.3889 18.9983 16.5991 18.9231 16.7545 18.7904C16.9099 18.6578 16.9981 18.4783 17 18.2907C17.0019 18.1031 16.9174 17.9223 16.7647 17.7874L12.9187 14.5059Z"
            fill="#3582CD"
          />
        </svg>
      </div>
      <div className="list_pag">
        {/* Sử dụng hàm renderPagination đã giả lập */}
        {renderPagination(totalItem)?.map((item) => (
          <div
            key={item}
            className={`item_pag ${
              page === item && 'bg_3582CD bd_3582CD ffffff'
            }`}
            onClick={() => {
              handleSetPage(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        className="show_tag show_right"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          // Xử lý logic "Sau" bằng state nội bộ
          if (page >= totalItem) {
            /* Không làm gì */
          } else {
            handleSetPage(page + 1);
          }
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
          <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
          <path
            d="M16.2651 12.4687L12.4255 9.18492C12.2662 9.06164 12.0576 8.99552 11.8429 9.00024C11.6281 9.00495 11.4238 9.08015 11.2721 9.21027C11.1204 9.34038 11.0329 9.51543 11.0279 9.69919C11.0228 9.88295 11.1005 10.0613 11.2449 10.1974L15.082 13.4812C15.2388 13.6155 15.327 13.7976 15.327 13.9875C15.327 14.1774 15.2388 14.3595 15.082 14.4937L11.2449 17.7776C11.088 17.9119 10.9999 18.0941 11 18.2841C11.0001 18.474 11.0883 18.6561 11.2453 18.7904C11.4023 18.9247 11.6152 19.0001 11.8372 19C12.0591 18.9999 12.2719 18.9244 12.4288 18.7901L16.2651 15.5062C16.7356 15.1034 17 14.5571 17 13.9875C17 13.4179 16.7356 12.8716 16.2651 12.4687Z"
            fill="#3582CD"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;