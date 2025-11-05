/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import s from './banner_top.module.scss';
// Giả định component SearchBar này tồn tại trong dự án React của bạn
import SearchBar from '../search_bar/SearchBar';

const Banner = () => {
  // Dữ liệu mẫu (mock data)
  const categories = [
    'Kinh doanh - Bán hàng',
    'IT phần mềm',
    'Bán hàng',
    'Bất động sản',
  ];
  
  // State cho logic giao diện (chọn danh mục đang active)
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Logic Giao diện: Xử lý khi nhấp vào một danh mục
  const handleLinkClick = (category, event) => {
    event.preventDefault(); // Ngăn thẻ <a> tải lại trang
    setActiveCategory(category);
    // Logic điều hướng (router.push) đã bị loại bỏ
  };

  // Logic clickHandle (điều hướng trên mobile) đã bị loại bỏ

  return (
    <>
      {/* --- PHIÊN BẢN DESKTOP --- */}
      <div
        className="banner_top"
        style={{
          width: '100%',
          height: '435px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '435px',
          }}
        >
          <img
            style={{
              height: '100%',
              width: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
            src="/images/banner1.jpg"
            loading="lazy"
            decoding="async"
            alt="Banner tuyển dụng"
          />
        </div>

        <div
          className="box_banner"
          style={{
            position: 'absolute',
          }}
        >
          <div className="content_bn_left" style={{}}>
            <h1 className="title ffffff">
              <span className="F8971C font32_800 ">TUYỂN DỤNG NHANH</span>
              <span className="font32_800 ">, NHẬN ỨNG VIÊN CHẤT LƯỢNG</span>
            </h1>
            <p className="font20_500 ffffff ">
              Work AI - Việc Làm Chất Lượng, Ứng Viên Tiềm Năng
            </p>
            <div className="form_search_job">
              <SearchBar />
            </div>
            <div className="box_keyword">
              <span className="tukhoa ffffff">Từ khóa nổi bật</span>
              <div className="list_keyword">
                {categories.map((category) => (
                  // Đã chuyển đổi <Link> của Next.js thành <a>
                  <a
                    key={category}
                    href="#" // Sử dụng href="#" vì logic điều hướng đã bị loại bỏ
                    className={`font16_500 ffffff ${
                      activeCategory === category ? 'active' : ''
                    }`}
                    onClick={(e) => handleLinkClick(category, e)}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
            <div className="btn_post">
              <a className="post_btn" href={'/nha-tuyen-dung/dang-tin-moi'}>
                Đăng tin tuyển dụng miễn phí
              </a>
            </div>
          </div>
          <div className="content_bn_right">
            <div className={'img_sm_rb ' + `${s.sm_rb_animation}`}>
              <img
                src="/images/small_robot.jpg"
                alt="Robot"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={'img_big_rb ' + `${s.big_rb_animation}`}>
              <img
                src="/images/big_robot.jpg"
                alt="Robot"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- PHIÊN BẢN MOBILE --- */}
      <div className={s['banner-top-mobile']}>
        <div className={s.backgroud}></div>
        <div className={s['box-container']}>
          <p className={s.title}>
            TÌM VIỆC NHANH{' '}
            <span className={s.title_bot} style={{ color: '#fff' }}>
              ,
            </span>
          </p>
          <p className={s.title_bot}> TUYỂN DỤNG HIỆU QUẢ</p>
          <p className={s.des}>
            Work AI - việc làm chất lượng, ứng viên tiềm năng
          </p>
          <SearchBar />
          <div className={s.box_keyword}>
            <p className={s.key}>Từ khóa nổi bật</p>
            <div className={s.list_keyword}>
              {categories.map((category) => (
                <div
                  className={s.keyword}
                  key={category}
                  // Logic onClick={clickHandle} đã bị loại bỏ
                >
                  <p>{category}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="btn_post">
            <a className="post_btn" href={'/nha-tuyen-dung/dang-tin-moi'}>
              Đăng tin tuyển dụng miễn phí
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;