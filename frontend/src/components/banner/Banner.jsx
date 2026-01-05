/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import s from './banner_top.module.scss';
// Giả định component SearchBar này tồn tại trong dự án React của bạn
import SearchBar from '../search_bar/SearchBar';

const Banner = () => {
  const categories = [
    'Kinh doanh - Bán hàng',
    'IT phần mềm',
    'Bán hàng',
    'Bất động sản',
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleLinkClick = (category, event) => {
    event.preventDefault();
    setActiveCategory(category);
  };

  return (
    <>
      {/* --- PHIÊN BẢN DESKTOP --- */}
      <div className={s.banner_top_desktop}>
        <div className={s.banner_background}>
          <img
            src="/images/banner1.jpg"
            loading="lazy"
            decoding="async"
            alt="Banner tuyển dụng"
          />
          {/* Lớp phủ màu đen mờ để làm nổi bật chữ */}
          <div className={s.overlay}></div>
        </div>

        <div className={s.box_banner_content}>
          <div className={s.content_wrapper}>
            <h1 className={s.main_title}>
              <span className={s.highlight_text}>TUYỂN DỤNG NHANH</span>
              <span className={s.white_text}>, NHẬN ỨNG VIÊN CHẤT LƯỢNG</span>
            </h1>
            
            <p className={s.sub_title}>
              Việc Làm Chất Lượng, Ứng Viên Tiềm Năng
            </p>

            <div className={s.search_container}>
              <SearchBar />
            </div>

            <div className={s.keyword_section}>
              <span className={s.keyword_label}>Từ khóa nổi bật:</span>
              <div className={s.keyword_list}>
                {categories.map((category) => (
                  <a
                    key={category}
                    href="#"
                    className={`${s.keyword_item} ${
                      activeCategory === category ? s.active : ''
                    }`}
                    onClick={(e) => handleLinkClick(category, e)}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            <div className={s.action_btn_container}>
              <a className={s.btn_post_job} href={'/nha-tuyen-dung/dang-tin-moi'}>
                 Đăng tin tuyển dụng miễn phí
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHIÊN BẢN MOBILE --- */}
      <div className={s.banner_top_mobile}>
        <div className={s.mobile_bg_overlay}></div>
        <div className={s.mobile_container}>
          <p className={s.mobile_title}>
            <span className={s.orange_text}>TÌM VIỆC NHANH</span>
            <span className={s.white_text}>, TUYỂN DỤNG HIỆU QUẢ</span>
          </p>
          
          <div className={s.mobile_search}>
            <SearchBar />
          </div>

          <div className={s.mobile_keywords}>
            <p className={s.key_label}>Từ khóa nổi bật</p>
            <div className={s.list_keyword}>
              {categories.map((category) => (
                <div className={s.keyword_pill} key={category}>
                  <p>{category}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={s.mobile_action}>
            <a className={s.btn_post_job_mobile} href={'/nha-tuyen-dung/dang-tin-moi'}>
              Đăng tin tuyển dụng miễn phí
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;