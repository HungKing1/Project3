import { ConfigProvider, Select } from "antd";
import s from "./style.module.scss";
import React, { useState } from "react";

// --- Dữ liệu mẫu (Mock Data) ---
const mockCities = [
  { value: 1, label: 'Hà Nội' },
  { value: 2, label: 'Hồ Chí Minh' },
  { value: 45, label: 'Đà Nẵng' },
  { value: 13, label: 'Bắc Ninh' },
];

const mockJobs = [
  { value: 10, label: 'Kế toán', alias: 'ke-toan' },
  { value: 12, label: 'Lập trình viên', alias: 'lap-trinh-vien' },
  { value: 15, label: 'Nhân viên kinh doanh', alias: 'nhan-vien-kinh-doanh' },
  { value: 21, label: 'Marketing', alias: 'marketing' },
  { value: 22, label: 'Tài xế', alias: 'tai-xe' },
];

const mockHistory = [
  { value: 10, label: 'Kế toán', alias: 'ke-toan' },
  { value: 99, label: 'Việc làm IT', alias: 'viec-lam-it' }
];
// --- Kết thúc Dữ liệu mẫu ---

// Hàm filterOption mẫu (vì logic đã bị loại bỏ)
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SearchBar = ({ typeSearch = 1 }) => {
  // --- State cho giao diện ---
  const [inputText, setInputText] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [showlist, setShowlist] = useState(false);

  // --- State sử dụng dữ liệu mẫu ---
  const [cityOption, setCityOption] = useState(mockCities);
  const [listJob, setListJob] = useState(mockJobs); // Dùng cho "Từ khóa phổ biến"
  const [historyList, setHistoryList] = useState(mockHistory); // Dùng cho "Từ khóa gần đây"

  // Dữ liệu cho kết quả tìm kiếm (để trống vì logic lọc đã bị xóa)
  const [recentListJob, setRecentListJob] = useState([]);
  const [recentTagJob, setRecentTagJob] = useState([]);

  // --- Hàm xử lý mẫu (đã loại bỏ logic) ---

  // Xử lý khi nhấp vào một mục trong danh sách gợi ý
  const handleItemClick = (label, value, alias) => {
    // Logic: chỉ cập nhật input và đóng popup
    setInputText(label);
    setShowlist(false);
    console.log("Đã chọn:", { label, value, alias });
    // Logic (addItemToHistory, setSelectedAlias...) đã bị loại bỏ
  };

  // Xử lý khi nhấp nút tìm kiếm
  const handleSearch = () => {
    alert("Bắt đầu tìm kiếm! (Logic đã bị loại bỏ)");
    console.log("Tìm kiếm với:", { inputText, selectedCity });
    // Logic (tạo link, điều hướng...) đã bị loại bỏ
  };

  // Tất cả useEffect đã bị loại bỏ

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorBorder: "white",
            colorPrimary: "white",
            colorPrimaryBgHover: "white",
            colorPrimaryBorder: "white",
            colorTextPlaceholder: "#757575",
            fontSize: 16,
          },
        }}
      >
        <div className={s.container}>
          {/* --- Thanh tìm kiếm Desktop --- */}
          <div className={s.search_container}>
            <div className={s.sub_container}>
              <div className={s.search_component_container}>
                <div className={s.search_component}>
                  <label htmlFor="nganhnghe_desktop">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="6.6001"
                        cy="6.6001"
                        r={6}
                        stroke="#51526C"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M11 11L15.2426 15.2426"
                        stroke="#51526C"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                  <input
                    type="text"
                    name="nganhnghe_desktop"
                    id="nganhnghe_desktop"
                    placeholder="Vị trí ứng tuyển"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      // Logic (setSelectedAlias...) đã bị loại bỏ
                    }}
                    onFocus={(e) => {
                      setShowlist(true);
                    }}
                  />
                </div>
                <div className={s.search_component}>
                  <label htmlFor="tinhthanh_desktop">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.9999 1.2C5.01756 1.2 2.5999 3.61766 2.5999 6.6C2.5999 7.12497 2.79182 7.78531 3.15148 8.54169C3.5068 9.28895 4.00288 10.0828 4.55764 10.8617C5.66693 12.4191 6.9746 13.8664 7.75278 14.6869C7.89108 14.8328 8.10873 14.8328 8.24702 14.6869C9.0252 13.8664 10.3329 12.4191 11.4422 10.8617C11.9969 10.0828 12.493 9.28895 12.8483 8.54169C13.208 7.78531 13.3999 7.12497 13.3999 6.6C13.3999 3.61766 10.9822 1.2 7.9999 1.2ZM1.3999 6.6C1.3999 2.95492 4.35482 0 7.9999 0C11.645 0 14.5999 2.95492 14.5999 6.6C14.5999 7.384 14.3237 8.23334 13.9321 9.057C13.5361 9.88979 12.9976 10.7463 12.4196 11.5579C11.2633 13.1813 9.91217 14.675 9.11773 15.5127C8.5062 16.1575 7.4936 16.1575 6.88207 15.5127C6.08763 14.675 4.73655 13.1813 3.58022 11.5579C3.00218 10.7463 2.46375 9.88979 2.06775 9.057C1.6761 8.23334 1.3999 7.384 1.3999 6.6ZM7.9999 4.2C6.95056 4.2 6.0999 5.05066 6.0999 6.1C6.0999 7.14934 6.95056 8 7.9999 8C9.04924 8 9.8999 7.14934 9.8999 6.1C9.8999 5.05066 9.04924 4.2 7.9999 4.2ZM4.8999 6.1C4.8999 4.38792 6.28782 3 7.9999 3C9.71198 3 11.0999 4.38792 11.0999 6.1C11.0999 7.81208 9.71198 9.2 7.9999 9.2C6.28782 9.2 4.8999 7.81208 4.8999 6.1Z"
                        fill="#51526C"
                      />
                      <circle cx={8} cy="6.1001" r="2.5" stroke="#51526C" strokeWidth="1.2" />
                    </svg>
                  </label>
                  <div className={s.external_component_container}>
                    <Select
                      style={{
                        width: "100%",
                      }}
                      options={cityOption} // Dùng dữ liệu mẫu
                      showSearch
                      filterOption={filterOption} // Dùng hàm mẫu
                      placeholder="Chọn địa điểm"
                      value={selectedCity}
                      onChange={(value) => {
                        setSelectedCity(value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={s.search_button} onClick={handleSearch}>
                <div className={s.search_btn_txt}>Tìm kiếm</div>
              </div>
            </div>
          </div>

          {/* --- Thanh tìm kiếm Mobile (Chỉ Input) --- */}
          <div className={s.search_container_mb}>
            <div className={s.search_component}>
              <label htmlFor="nganhnghe_mobile">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.6001"
                    cy="6.6001"
                    r={6}
                    stroke="#51526C"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M11 11L15.2426 15.2426"
                    stroke="#51526C"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                type="text"
                name="nganhnghe_mobile"
                id="nganhnghe_mobile"
                placeholder="Vị trí ứng tuyển"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
                onFocus={(e) => {
                  setShowlist(true);
                }}
              />
            </div>
          </div>

          {/* --- Popup Gợi ý (Chung cho cả 2) --- */}
          <div className={`${s.list_container} ${showlist ? "" : s.hide_list}`}>
            <div
              className={s.close_btn}
              onClick={() => {
                setShowlist(false);
              }}
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L15.2418 15.0418"
                  stroke="#51526C"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.2417 1L0.999904 15.0418"
                  stroke="#51526C"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={s.recent_search_container}>
              <div className={s.title}>Từ khóa gần đây</div>
              <ul>
                {/* Hiển thị lịch sử mẫu khi không gõ gì */}
                {!inputText ? (
                  historyList.map((item, index) => (
                    <li
                      onClick={() => {
                        handleItemClick(item?.label, item?.value, item?.alias);
                      }}
                      key={index}
                    >
                      {item?.label}
                    </li>
                  ))
                ) : (
                  <></>
                )}
                {/* Logic lọc (recentListJob, recentTagJob) đã bị loại bỏ.
                  Bạn có thể thêm lại logic lọc đơn giản ở đây nếu muốn:
                */}
              </ul>
            </div>
            <div className={s.popular_search_container}>
              <div className={s.title}>Từ khóa phổ biến</div>
              <ul>
                {listJob.map((item, index) => (
                  <li
                    onClick={() => {
                      handleItemClick(item?.label, item?.value, item?.alias);
                    }}
                    key={index}
                  >
                    {item?.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- Select Tỉnh/Thành & Nút tìm kiếm (Mobile) --- */}
          <div className={s.search_container_mb}>
            <div className={s.search_component}>
              <label htmlFor="tinhthanh_mobile">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.9999 1.2C5.01756 1.2 2.5999 3.61766 2.5999 6.6C2.5999 7.12497 2.79182 7.78531 3.15148 8.54169C3.5068 9.28895 4.00288 10.0828 4.55764 10.8617C5.66693 12.4191 6.9746 13.8664 7.75278 14.6869C7.89108 14.8328 8.10873 14.8328 8.24702 14.6869C9.0252 13.8664 10.3329 12.4191 11.4422 10.8617C11.9969 10.0828 12.493 9.28895 12.8483 8.54169C13.208 7.78531 13.3999 7.12497 13.3999 6.6C13.3999 3.61766 10.9822 1.2 7.9999 1.2ZM1.3999 6.6C1.3999 2.95492 4.35482 0 7.9999 0C11.645 0 14.5999 2.95492 14.5999 6.6C14.5999 7.384 14.3237 8.23334 13.9321 9.057C13.5361 9.88979 12.9976 10.7463 12.4196 11.5579C11.2633 13.1813 9.91217 14.675 9.11773 15.5127C8.5062 16.1575 7.4936 16.1575 6.88207 15.5127C6.08763 14.675 4.73655 13.1813 3.58022 11.5579C3.00218 10.7463 2.46375 9.88979 2.06775 9.057C1.6761 8.23334 1.3999 7.384 1.3999 6.6ZM7.9999 4.2C6.95056 4.2 6.0999 5.05066 6.0999 6.1C6.0999 7.14934 6.95056 8 7.9999 8C9.04924 8 9.8999 7.14934 9.8999 6.1C9.8999 5.05066 9.04924 4.2 7.9999 4.2ZM4.8999 6.1C4.8999 4.38792 6.28782 3 7.9999 3C9.71198 3 11.0999 4.38792 11.0999 6.1C11.0999 7.81208 9.71198 9.2 7.9999 9.2C6.28782 9.2 4.8999 7.81208 4.8999 6.1Z"
                    fill="#51526C"
                  />
                  <circle cx={8} cy="6.1001" r="2.5" stroke="#51526C" strokeWidth="1.2" />
                </svg>
              </label>
              <div className={s.external_component_container}>
                <Select
                  style={{
                    width: "100%",
                  }}
                  options={cityOption}
                  showSearch
                  filterOption={filterOption}
                  placeholder="Chọn địa điểm"
                  value={selectedCity}
                  onChange={(value) => {
                    setSelectedCity(value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={s.search_container_mb}>
            <div className={s.search_button} onClick={handleSearch}>
              <div className={s.search_btn_txt}>Tìm kiếm</div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default SearchBar;