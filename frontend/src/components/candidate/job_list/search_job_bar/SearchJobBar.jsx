/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import { Select } from 'antd';
import s from './styles.module.scss';

// --- Dữ liệu mẫu (Mock Data) ---
const mockTotal = 1234;
const mockTotalHuyHieu = 50;

const mockListCity = [
  { cit_id: 0, cit_name: 'Tất cả tỉnh thành' },
  { cit_id: 1, cit_name: 'Hà Nội' },
  { cit_id: 45, cit_name: 'Hồ Chí Minh' },
  { cit_id: 26, cit_name: 'Đà Nẵng' },
];

const mockListDistrict = [
  { value: 10, label: 'Quận Cầu Giấy' },
  { value: 11, label: 'Quận Ba Đình' },
  { value: 12, label: 'Quận Hoàn Kiếm' },
  { value: 13, label: 'Quận Hai Bà Trưng' },
  { value: 14, label: 'Quận Đống Đa' },
  { value: 15, label: 'Quận Tây Hồ' },
];

const mockListJob = [
  { value: 0, label: 'Tất cả ngành nghề' },
  { value: 1, label: 'Kế toán' },
  { value: 2, label: 'IT Phần mềm' },
  { value: 3, label: 'Marketing' },
];

const mockListExp = [
  { value: 0, label: 'Tất cả kinh nghiệm' },
  { value: 1, label: 'Chưa có kinh nghiệm' },
  { value: 2, label: '1 năm' },
  { value: 3, label: '2 năm' },
];

const mockListSalary = [
  { value: 0, label: 'Tất cả mức lương' },
  { value: 1, label: 'Dưới 10 triệu' },
  { value: 2, label: '10 - 15 triệu' },
  { value: 3, label: '15 - 20 triệu' },
];

const mockListLevel = [
  { value: 0, label: 'Tất cả trình độ' },
  { value: 1, label: 'Đại học' },
  { value: 2, label: 'Cao đẳng' },
  { value: 3, label: 'Trung cấp' },
];

const mockListWorkForm = [
  { value: 0, label: 'Tất cả hình thức' },
  { value: 1, label: 'Full-time' },
  { value: 2, label: 'Part-time' },
  { value: 3, label: 'Remote' },
];
// --- Kết thúc Dữ liệu mẫu ---

// Hàm giả lập (stub) cho filter của AntD
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SearchJobBar = () => {
  const tagContainerRef = useRef(null);

  // --- State cho UI ---
  const [keyword, setKeyword] = useState(""); // từ khóa thanh tìm kiếm
  const [filter, setFilter] = useState(false); // Bật tắt tìm kiếm nâng cao
  const [showDistrict, setShowDistrict] = useState(false); // Hiện nút chọn quận huyện
  
  // State cho các giá trị được chọn
  const [selectCity, setSelectCity] = useState(0); // Giá trị tỉnh thành đã chọn
  const [selectDistrict, setSelectDistrict] = useState(0); // Giá trị quận huyện đã chọn
  const [selectJob, setSelectJob] = useState(0); // Giá trị ngành nghề đã chọn
  const [selectExp, setSelectExp] = useState(0); // Giá trị kinh nghiệm đã chọn
  const [selectSalary, setSelectSalary] = useState(0); // Giá trị mức lương đã chọn
  const [selectLevel, setSelectLevel] = useState(0); // Giá trị học vấn đã chọn
  const [selectWorkForm, setSelectWorkForm] = useState(0); // Giá trị hình thức làm việc đã chọn

  // (Logic `useSearchVariables`, `useContext`, `useRouter` đã bị loại bỏ)
  // (Logic `useEffect` để đồng bộ URL và fetch data đã bị loại bỏ)
  
  // --- Các hàm xử lý UI (đã stub/đơn giản hóa) ---

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleFilter = () => {
    setFilter(!filter);
    // Logic kiểm tra URL params đã bị loại bỏ
    if (selectCity !== 0) {
      setShowDistrict(true);
    }
  };

  // Hàm stub cho tìm kiếm
  const handleSearch = () => {
    alert('Bắt đầu tìm kiếm! (Logic đã bị loại bỏ)');
    // (onClickSearch prop đã bị loại bỏ)
  };

  const apply = () => {
    setFilter(false);
    handleSearch();
  };

  const onChangeDistrict = (value) => {
    setSelectDistrict(value);
  };

  const onChangeCity = (value) => {
    setSelectCity(value);
    if (value === 0) {
      setShowDistrict(false);
      setSelectDistrict(0);
    } else {
      setShowDistrict(true); // Hiển thị quận huyện khi chọn thành phố
    }
  };

  const onChangeJob = (value) => {
    setSelectJob(value);
  };

  const onSelectExp = (value) => {
    setSelectExp(value);
  };

  const onSelectSalary = (value) => {
    setSelectSalary(value);
  };

  const onSelectLevel = (value) => {
    setSelectLevel(value);
  };

  const onSelectWorkForm = (value) => {
    setSelectWorkForm(value);
  };

  const resetFilter = () => {
    setSelectCity(0);
    setSelectDistrict(0);
    setSelectJob(0);
    setSelectExp(0);
    setSelectSalary(0);
    setSelectLevel(0);
    setSelectWorkForm(0);
    setShowDistrict(false);
  };

  const handleTotalHuyHieu = () => {
    if (mockTotalHuyHieu > 0) {
      alert('Chuyển đến trang Huy hiệu tia sét! (Logic đã bị loại bỏ)');
    }
  };

  const scrollLeft = () => {
    if (tagContainerRef.current) {
      tagContainerRef.current.scrollTo({
        left: tagContainerRef.current.scrollLeft - 400,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (tagContainerRef.current) {
      tagContainerRef.current.scrollTo({
        left: tagContainerRef.current.scrollLeft + 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Thẻ link CSS (select2) này có thể không cần thiết
          nếu bạn chỉ dùng Ant Design, nhưng giữ lại theo code gốc */}
      <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
      
      <div className={s.container}>
        <div className={s.body}>
          <div className={s.item_1}>
            <div className={s.group_input}>
              {/* <Image> đã được thay bằng <img> */}
              <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/ep_search.svg"} alt={"logo tim kiem"} height={23} width={23} style={{ height: "23px", width: "23px" }} />
              <input
                type="search"
                autoComplete="off"
                placeholder="Nhập từ khóa mong muốn..."
                value={keyword}
                onChange={handleInputChange}
                // (Logic showSearchList đã bị loại bỏ)
              />
              {/* (Khung gợi ý tìm kiếm đã bị loại bỏ) */}
            </div>

            {/* Đã thay thế <select> (của select2) bằng <Select> (của Ant Design) */}
            <div className={`${s.group_select_1} select_2 select_ds_tin_tuyen_dung`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z" stroke="#6B6B6B" strokeWidth="1.5" />
                <path d="M14.1249 12.1178L15.5 13.5M14.1249 12.1178C14.6657 11.5752 15 10.8266 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C12.8302 13 13.5817 12.6628 14.1249 12.1178Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <Select
                showSearch
                value={selectCity}
                style={{ width: '100%' }}
                onChange={onChangeCity}
                filterOption={filterOption}
                className={`${s.select} select-location city`}
                options={mockListCity.map(item => ({
                  value: item.cit_id,
                  label: item.cit_name
                }))}
              />
            </div>
            
            <div
              className={`${s.button_search} ${s.displayMobiHide}`}
              style={{ backgroundColor: "#F8971C" }}
              onClick={() => {
                setKeyword("");
                resetFilter();
              }}
            >Xóa lọc</div>
            <div className={s.button_search} onClick={handleSearch}>Tìm kiếm</div>
          </div>

          <div className={s.item_2}>
            <div className={s.total}>
              <span className={s.text}>Tổng <span>{mockTotal}</span> kết quả</span>
              {/* (Logic huy hiệu tia sét đã bị stub) */}
            </div>

            <div className={s.advanced_filtering} onClick={handleFilter}>
              <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/filter-remove.svg"} alt={"Logo loc nang cao"} height={20} width={20} style={{ height: "20px", width: "20px" }} />
              Lọc nâng cao
              {filter === true ? <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/up.svg"} alt={"Logo loc"} height={20} width={20} style={{ height: "20px", width: "20px", marginLeft: "auto" }} /> :
                <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/down.svg"} alt={"Logo loc"} height={20} width={20} style={{ height: "20px", width: "20px", marginLeft: "auto" }} />}
            </div>
          </div>

          {filter === true ? (
            <div className={s.item_3}>
              <div className={s.box_search_1}>
                <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/dollar_circle.png"} alt={"Logo kinh nghiem"} width={24} height={24} style={{ height: "24px", width: "24px" }} />
                <Select
                  showSearch
                  value={selectExp}
                  optionFilterProp="children"
                  onChange={onSelectExp}
                  filterOption={filterOption}
                  options={mockListExp} // Dùng mock data
                  className={"select_search_1"}
                />
              </div>
              <div className={s.box_search_2}>
                <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/select_salary.png"} alt={"Logo luong"} width={24} height={24} style={{ height: "24px", width: "24px" }} />
                <Select
                  showSearch
                  value={selectSalary}
                  optionFilterProp="children"
                  onChange={onSelectSalary}
                  filterOption={filterOption}
                  options={mockListSalary} // Dùng mock data
                  className={"select_search_1"}
                />
              </div>
              <div className={s.box_search_3}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  {/* ... (path SVG) ... */}
                </svg>
                <Select
                  showSearch
                  value={selectLevel}
                  optionFilterProp="children"
                  onChange={onSelectLevel}
                  filterOption={filterOption}
                  options={mockListLevel} // Dùng mock data
                  className={"select_search_1"}
                />
              </div>
              <div className={s.box_search_4}>
                <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/select_wf.png"} alt={"Logo hinh thuc"} width={24} height={24} style={{ height: "24px", width: "24px" }} />
                <Select
                  showSearch
                  value={selectWorkForm}
                  optionFilterProp="children"
                  onChange={onSelectWorkForm}
                  filterOption={filterOption}
                  options={mockListWorkForm} // Dùng mock data
                  className={"select_search_1"}
                />
              </div>
              <div className={s.box_search_5} style={{
                display: showDistrict ? 'flex' : 'none' // Dùng mock data
              }}>
                <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/left_icon.svg"} alt={"Logo trai"} width={28} height={28} style={{ height: "28px", width: "28px" }} onClick={scrollLeft} />
                <div className={s.district_wrap} ref={tagContainerRef}>
                  {mockListDistrict?.map((item) => { // Dùng mock data
                    return (
                      <div key={item.value} className={selectDistrict == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onChangeDistrict(item.value)}>{item.label}</div>
                    )
                  })}
                </div>
                <img src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/right_icon.svg"} alt={"Logo phai"} width={28} height={28} style={{ height: "28px", width: "28px" }} onClick={scrollRight} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* --- Modal Lọc nâng cao (Mobile) --- */}
      <div>
        <div className={filter ? s.modal_mask : s.displayNone}></div>
        <div className={filter ? s.modal_wrap : s.displayNone}>
          <div className={s.filter}>
            <div className={s.header} onClick={() => { }}>
              <div>Bộ lọc nâng cao</div>
              <svg style={{ cursor: "pointer" }} onClick={handleFilter} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <rect y="0.5" width="24" height="24" rx="12" fill="white" fillOpacity="0.15" />
                <path d="M16.9497 7.55025L7.05025 17.4497M7.05025 7.55025L16.9497 17.4497" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className={s.body_filter}>
              <div className={s.box_1}>
                <span className={s.text_district}>Địa điểm</span>
                <div className={s.select_district}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    {/* ... (path SVG) ... */}
                  </svg>
                  <Select
                    showSearch
                    value={selectCity}
                    optionFilterProp="children"
                    onChange={onChangeCity}
                    filterOption={filterOption}
                    options={mockListCity?.map((city) => ({ // Dùng mock data
                      label: city.cit_name,
                      value: Number(city.cit_id)
                    }))}
                    className={"select_search_1"}
                  />
                </div>
              </div>

              <div className={s.box_2}>
                <span className={s.text_exp}>Kinh nghiệm</span>
                <div className={s.select_exp}>
                  {mockListExp?.map((item) => { // Dùng mock data
                    return (
                      <div key={item.value} className={selectExp == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectExp(item.value)}>{item.label}</div>
                    )
                  })}
                </div>
              </div>

              <div className={s.box_2}>
                <span className={s.text_exp}>Mức lương</span>
                <div className={s.select_exp}>
                  {mockListSalary?.map((item) => { // Dùng mock data
                    return (
                      <div key={item.value} className={selectSalary == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectSalary(item.value)}>{item.label}</div>
                    )
                  })}
                </div>
              </div>

              <div className={s.box_2}>
                <span className={s.text_exp}>Trình độ</span>
                <div className={s.select_exp}>
                  {mockListLevel?.map((item) => { // Dùng mock data
                    return (
                      <div key={item.value} className={selectLevel == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectLevel(item.value)}>{item.label}</div>
                    )
                  })}
                </div>
              </div>

              <div className={s.box_2}>
                <span className={s.text_exp}>Hình thức làm việc</span>
                <div className={s.select_exp}>
                  {mockListWorkForm?.map((item) => { // Dùng mock data
                    return (
                      <div key={item.value} className={selectWorkForm == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectWorkForm(item.value)}>{item.label}</div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className={s.footer}>
              <button className={s.reset_filter} onClick={resetFilter}>Xóa lọc</button>
              <button className={s.apply} onClick={apply}>Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchJobBar;