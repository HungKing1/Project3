/* eslint-disable @next/next/no-img-element */
import { Popover } from 'antd';
import React from 'react';
import TooltipComponent from './TooltipComponent'; // Giả định component này tồn tại

// --- Dữ liệu mẫu (Mock Data) ---
const mockData = {
  usc_alias: 'cong-ty-tnhh-mau-a',
  usc_logo: '/images/company-logo-mock.png', // Đường dẫn ảnh mẫu
  new_title: 'Nhân Viên Kinh Doanh (Việc Làm Mẫu)',
  new_alias: 'nhan-vien-kinh-doanh-viec-lam-mau',
  new_id: 12345,
  usc_company: 'Công Ty TNHH Mẫu A (Job247)',
  new_city: ['Hà Nội', 'Đà Nẵng'], // Sử dụng mảng như code gốc
};

// Dữ liệu mẫu cho các hàm đã bị loại bỏ
const mockMucLuong = "15 - 20 triệu";
const mockHanNop = "Còn 10 ngày";
const mockImageSrc = "/images/candidate/ava_default.jpg"; // Ảnh mặc định
// --- Kết thúc Dữ liệu mẫu ---

const DetailCompany = () => {
  // Dùng dữ liệu mẫu (mockData) thay vì props
  const data = mockData;

  return (
    <div className="detail_company">
      <div className="company_info">
        {/* <Link> đã được thay bằng <a> với href mẫu */}
        <a href={`/${data?.usc_alias}`} className="avata_com">
          <img
            src={mockImageSrc} // Sử dụng ảnh mẫu
            alt="avatar NTD"
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.currentTarget.src = '/images/candidate/ava_default.jpg';
            }}
          />
          {/* Các thành phần 'dot_online' và 'tiaset' đã bị comment
              giống như trong code gốc */}
        </a>
        <div className="box_detail_com">
          <div className="box_tt_c">
            <Popover
              content={<TooltipComponent content={data.new_title} />}
              overlayClassName="custom-tooltip"
            >
              {/* <Link> đã được thay bằng <a> với href mẫu */}
              <a
                href={`/${data.new_alias}-${data.new_id}`}
                className="title_com cl3582CD"
              >
                <h3 className="title_com">{data.new_title}</h3>
              </a>
            </Popover>
            <Popover
              content={<TooltipComponent content={`${data.usc_company}`} />}
              overlayClassName="custom-tooltip"
            >
              <a href={`/${data?.usc_alias}`}>
                <p className="name_com">{`${data.usc_company}`}</p>
              </a>
            </Popover>
            {/* 'vote_com' đã bị comment giống code gốc */}
          </div>
          {/* 'img_mess' đã bị comment giống code gốc */}
        </div>
      </div>
      <div className="more_info_com">
        <Popover
          content={
            <TooltipComponent
              content={`${
                Array.isArray(data?.new_city)
                  ? data.new_city.join(', ')
                  : data.new_city
              }`}
            />
          }
          overlayClassName="custom-tooltip"
        >
          {/* Hiển thị thành phố đầu tiên từ dữ liệu mẫu */}
          <p className="mor_i">{data.new_city[0]}</p>
        </Popover>
        {/* Thay thế hàm getMucLuong bằng chuỗi mẫu */}
        <p className="mor_i">{mockMucLuong}</p>
        {/* Thay thế hàm getHanNop bằng chuỗi mẫu */}
        <p className="mor_i">{mockHanNop}</p>
      </div>
    </div>
  );
};

export default DetailCompany;