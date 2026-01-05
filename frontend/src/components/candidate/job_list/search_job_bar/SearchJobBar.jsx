/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import { Select } from 'antd';
import s from './styles.module.scss';
import * as selectData from "../../../../assets/selectData.js"
import * as callData from "../../../../assets/function.js"
import { createSearchParams, useNavigate } from 'react-router-dom';

// --- Dữ liệu mẫu (Mock Data) ---
const mockTotalHuyHieu = 50;

// Hàm giả lập (stub) cho filter của AntD
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SearchJobBar = (props) => {
  const tagContainerRef = useRef(null);
  const navigate = useNavigate()

  // --- State cho UI ---
  const [keyword, setKeyword] = useState(""); 
  const [filter, setFilter] = useState(false); 
  const [showDistrict, setShowDistrict] = useState(false); 

  const {
        city, exp, salary, edu, workType, district, 
        setCity, setExp, setSalary, setEdu, setWorkType, setDistrict, setDistritList,
        totalJob, districtList
    } = props;
  
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleFilter = () => {
    setFilter(!filter);
    if (city !== 0 && city) { // Kiểm tra city tồn tại
      setShowDistrict(true);
    }
  };

  const apply = () => {
    setFilter(false);
    handleSearchJob();
  };

  const onChangeDistrict = (value) => {
    setDistrict(value);
  };

  const onSelectExp = (value) => setExp(value);
  const onSelectSalary = (value) => setSalary(value);
  const onSelectLevel = (value) => setEdu(value);
  const onSelectWorkForm = (value) => setWorkType(value);

  const resetFilter = () => {
    setCity(undefined); // Reset về undefined để Antd Select hiển thị placeholder
    setExp(undefined);
    setSalary(undefined);
    setEdu(undefined);
    setWorkType(undefined);
    setDistrict(undefined);  
    setDistritList([]);
    setShowDistrict(false);
    setKeyword("");
  };

  const scrollLeft = () => {
    if (tagContainerRef.current) {
      tagContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tagContainerRef.current) {
      tagContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleSearchJob = async () => {
    const params = {
      keyword, // Thêm keyword vào params
      city, exp, salary, 
      job_level: edu, work_type: workType, district
    }

    Object.keys(params).forEach(key => {
            const value = params[key];
            if (value === null || value === undefined || value === "") {
                delete params[key];
            }
        });

    navigate({
          pathname: '/tim-viec-lam',
          search: createSearchParams(params).toString()
      });
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.body}>
          
          {/* --- THANH TÌM KIẾM CHÍNH --- */}
          <div className={s.search_bar_wrapper}>
            <div className={s.input_group}>
              <img src="/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/ep_search.svg" alt="icon" className={s.search_icon} />
              <input
                type="text"
                placeholder="Nhập từ khóa công việc, kỹ năng..."
                value={keyword}
                onChange={handleInputChange}
                className={s.search_input}
              />
            </div>

            <div className={s.divider}></div>

            <div className={s.select_group}>
              <img src="/images/home/icon_filter_auto.svg" alt="location" className={s.location_icon} /> {/* Giả định icon location */}
               <Select
                showSearch
                value={city}
                style={{ width: '100%' }}
                onChange={async (value) => {
                  setCity(value)
                  const data = await callData.getDistrictsByCityId(value)
                  if(data) {
                    setDistritList(data)
                    setShowDistrict(true)
                  } else {
                      setShowDistrict(false)
                  }
                }}
                filterOption={filterOption}
                className={s.ant_select_custom}
                options={selectData.cities}
                fieldNames={{label: 'name', value: 'id'}}
                placeholder="Tất cả tỉnh thành"
                variant="borderless" // Bỏ border mặc định của Antd
              />
            </div>
            
            <div className={s.action_group}>
                 <button className={s.btn_reset} onClick={resetFilter}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                 </button>
                 <button className={s.btn_search} onClick={handleSearchJob}>Tìm kiếm</button>
            </div>
          </div>

          {/* --- THANH CÔNG CỤ PHỤ (Tổng kết quả + Lọc nâng cao) --- */}
          <div className={s.toolbar}>
            <div className={s.total_result}>
              Tìm thấy <span className={s.highlight}>{totalJob}</span> công việc phù hợp
            </div>

            <button className={`${s.btn_filter} ${filter ? s.active : s.active}`} onClick={handleFilter}>
              <img src="/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/filter-remove.svg" alt="filter" />
              Lọc nâng cao
              <img src={`/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/${filter ? 'up' : 'down'}.svg`} alt="arrow" className={s.arrow_icon} />
            </button>
          </div>

          {/* --- KHU VỰC LỌC NÂNG CAO (Mở rộng) --- */}
          <div className={`${s.advanced_filter_area} ${filter ? s.show : ''}`}>
             <div className={s.filter_grid}>
                {/* Kinh nghiệm */}
                <div className={s.filter_item}>
                    <label>Kinh nghiệm</label>
                    <Select
                        showSearch
                        value={exp}
                        onChange={setExp}
                        filterOption={filterOption}
                        className={s.filter_select}
                        options={selectData.experienceYears}
                        fieldNames={{label: 'name', value: 'id'}}
                        placeholder="Tất cả"
                    />
                </div>
                 {/* Mức lương */}
                 <div className={s.filter_item}>
                    <label>Mức lương</label>
                    <Select
                        showSearch
                        value={salary}
                        onChange={setSalary}
                        filterOption={filterOption}
                        className={s.filter_select}
                        options={selectData.salaries}
                        fieldNames={{label: 'name', value: 'id'}}
                        placeholder="Tất cả"
                    />
                </div>
                {/* Trình độ */}
                 <div className={s.filter_item}>
                    <label>Trình độ</label>
                    <Select
                        showSearch
                        value={edu}
                        onChange={setEdu}
                        filterOption={filterOption}
                        className={s.filter_select}
                        options={selectData.jobLevels}
                        fieldNames={{label: 'name', value: 'id'}}
                        placeholder="Tất cả"
                    />
                </div>
                 {/* Hình thức */}
                 <div className={s.filter_item}>
                    <label>Hình thức</label>
                    <Select
                        showSearch
                        value={workType}
                        onChange={setWorkType}
                        filterOption={filterOption}
                        className={s.filter_select}
                        options={selectData.workTypes}
                        fieldNames={{label: 'name', value: 'id'}}
                        placeholder="Tất cả"
                    />
                </div>
             </div>

             {/* Chọn Quận/Huyện (Chỉ hiện khi đã chọn Tỉnh/Thành) */}
             {showDistrict && districtList?.length > 0 && (
                 <div className={s.district_section}>
                    <div className={s.scroll_btn} onClick={scrollLeft}>‹</div>
                    <div className={s.district_list} ref={tagContainerRef}>
                        {districtList.map((item) => (
                            <div 
                                key={item.id} 
                                className={`${s.district_tag} ${district === item.id ? s.selected : ''}`} 
                                onClick={() => onChangeDistrict(item.id)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <div className={s.scroll_btn} onClick={scrollRight}>›</div>
                 </div>
             )}
             
             <div className={s.filter_footer}>
                <button className={s.btn_close_filter} onClick={() => setFilter(false)}>Đóng lại</button>
                <button className={s.btn_apply_filter} onClick={apply}>Áp dụng bộ lọc</button>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SearchJobBar;