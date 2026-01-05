import React, { useState } from "react";
import style from "./styles.module.scss";

const GeneralManagement = () => {
  const [displayCount, setDisplayCount] = useState(6);

  const sampleData = {
    daUngTuyen: 15,
    viecLamDuocNhan: 3,
    viecLamTuChoi: 5,
    viecLamPhuHop: [
      {
        new_id: 1,
        new_title: "Frontend Developer",
        usc_company: "Tech Corp",
        new_city: ["Hà Nội"],
        new_money_type: 1,
        new_money_from: 10000000,
        new_money_to: 20000000,
        new_money: 0,
        usc_update_time: 1678886400,
        new_han_nop: 1681564800,
        usc_logo: "https://via.placeholder.com/150",
        new_alias: "frontend-developer",
      },
      {
        new_id: 2,
        new_title: "Backend Developer",
        usc_company: "Data Systems",
        new_city: ["Hồ Chí Minh"],
        new_money_type: 2,
        new_money_from: 0,
        new_money_to: 0,
        new_money: 0, // Thỏa thuận
        usc_update_time: 1678790000,
        new_han_nop: 1681478400,
        usc_logo: "https://via.placeholder.com/150",
        new_alias: "backend-developer",
      },
      {
        new_id: 3,
        new_title: "UI/UX Designer",
        usc_company: "Creative Studio",
        new_city: ["Đà Nẵng"],
        new_money_type: 1,
        new_money_from: 12000000,
        new_money_to: 18000000,
        new_money: 0,
        usc_update_time: 1678703600,
        new_han_nop: 1681392000,
        usc_logo: "https://via.placeholder.com/150",
        new_alias: "ui-ux-designer",
      }
    ],
    mauCvDaTao: 2,
    xemHoSo: 10,
    CvCuaToi: [
      { name_cv: "/images/cv/trang-chu-cv/mau1.png", alias: "CV IT 1" },
      { name_cv: "/images/cv/trang-chu-cv/mau2.png", alias: "CV Marketing" },
    ],
    mauCvDeXuat: [
      { image: "/images/cv/trang-chu-cv/mau3.png", alias: "CV Sales" },
      { image: "/images/cv/trang-chu-cv/mau4.png", alias: "CV HR" },
    ],
    camNangTimViec: [
      {
        new_title: "Cách viết CV ấn tượng",
        new_picture: "/images/candidate/cam-nang-1.png",
        new_title_rewrite: "cach-viet-cv-an-tuong",
      },
       {
        new_title: "Bí quyết phỏng vấn thành công",
        new_picture: "/images/candidate/cam-nang-2.png",
        new_title_rewrite: "bi-quyet-phong-van-thanh-cong",
      },
    ],
  };

  const [dataManager, setDataManager] = useState(sampleData);

  const showMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const showLess = () => {
    setDisplayCount(6);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  
  const getMucLuong = (type, from, to, money) => {
      if (type === 2) return "Thỏa thuận";
      if (from && to) return `${(from/1000000).toLocaleString()} - ${(to/1000000).toLocaleString()} triệu`;
      if (from) return `Từ ${(from/1000000).toLocaleString()} triệu`;
      if (to) return `Đến ${(to/1000000).toLocaleString()} triệu`;
      return "Thỏa thuận";
  }

  const formatDateDifference = (date1, date2, defaultText) => {
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if(diffDays < 1) return defaultText;
      return `${diffDays} ngày`;
  }

  const getHanNop = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleDateString('vi-VN');
  }


  return (
    <>
        <div className={style.container}>
          <div className={style.box_ung_tuyen}>
            <div className={style.item} style={{ borderColor: "#ffaa60" }}>
              <div className={style.text}>
                <p>Đã ứng tuyển</p>
                <img
                  src="/images/ung-vien/quan-ly-chung/icon_handshake.svg"
                  style={{ width: "72px", height: "72px" }}
                  alt="Icon bắt tay"
                />
              </div>
              <div className={style.quanlity} style={{ color: "#ffaa60" }}>
                {dataManager?.daUngTuyen ? dataManager.daUngTuyen : 0}
              </div>
            </div>

             <div className={style.item} style={{ borderColor: "#89ff8d" }}>
              <div className={style.text}>
                <p>Việc làm được nhận</p>
                <img
                  src="/images/ung-vien/quan-ly-chung/icon_cv.svg" 
                  style={{ width: "71px", height: "71px" }}
                  alt="Icon được nhận"
                />
              </div>
              <div className={style.quanlity} style={{ color: "#89ff8d" }}>
                {dataManager?.viecLamDuocNhan ? dataManager.viecLamDuocNhan : 0}
              </div>
            </div>

            <div className={style.item} style={{ borderColor: "#ff89d7" }}>
              <div className={style.text}>
                <p>Việc làm từ chối</p>
                <img
                  src="/images/ung-vien/quan-ly-chung/icon_folder.svg" 
                  style={{ width: "70px", height: "70px" }}
                  alt="Icon từ chối"
                />
              </div>
              <div className={style.quanlity} style={{ color: "#ff89d7" }}>
                 {dataManager?.viecLamTuChoi ? dataManager.viecLamTuChoi : 0}
              </div>
            </div>
          </div>

          <div className={style.box_suitable_job}>
            <div className={style.title}>
              <p>VIỆC LÀM PHÙ HỢP</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
              {dataManager?.viecLamPhuHop &&
                dataManager?.viecLamPhuHop
                  .slice(0, displayCount)
                  .map((data, index) => (
                    <div className={style.item} key={index}>
                      <div className={style.avatar}>
                        <img
                          src={data.usc_logo || "//images/candidate/applicant1.png"}
                          alt={data.new_alias}
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "1px solid #3582CD80",
                          }}
                          onError={(e) => {
                            e.currentTarget.src =
                              "//images/candidate/applicant1.png";
                          }}
                        />
                      </div>
                      <div className={style.text}>
                        <div className={style.required}>
                          <a href={`/${data.new_alias}-${data.new_id}`}>
                            <p>{data.new_title}</p>
                          </a>
                        </div>
                        <div className={style.com_name}>
                          <p>{data.usc_company}</p>
                        </div>
                        <div className={style.job_desc}>
                          <p>{data.new_city[0]}</p>
                          <p>
                            {getMucLuong(
                              data.new_money_type || 0,
                              data.new_money_from,
                              data.new_money_to,
                              data.new_money
                            )}
                          </p>
                          <p>
                            Cập nhật:{" "}
                            {formatDateDifference(
                              new Date(data.usc_update_time * 1000),
                              new Date(),
                              "Ít phút"
                            )}{" "}
                            trước
                          </p>
                          <p>{getHanNop(data.new_han_nop)} ứng tuyển</p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            {displayCount < dataManager?.viecLamPhuHop?.length && (
              <div className={style.button} onClick={showMore}>
                Xem thêm
              </div>
            )}
            {displayCount === dataManager?.viecLamPhuHop?.length && (
              <div className={style.button} onClick={showLess}>
                Rút gọn
              </div>
            )}
          </div>
          {/* <div className={style.box_cv}>
            <div className={style.item}>
              <div className={style.title}>
                <p>DANH SÁCH CV CỦA TÔI</p>
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: "#f39623",
                  }}
                ></div>
              </div>
              <div
                className={style.content}
                style={{
                  overflowX: "auto",
                  scrollbarWidth: "thin",
                  flexGrow: 1,
                }}
              >
                {dataManager?.CvCuaToi &&
                  dataManager.CvCuaToi.map((cv, index) => (
                    <img
                      key={index}
                      src={cv.name_cv}
                      alt={cv.alias}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxHeight: "452px",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.currentTarget.srcset =
                          "/images/cv/trang-chu-cv/mau11.png";
                      }}
                      onClick={() => {
                        window.location.href = `/ung-vien/CV-xin-viec`;
                      }}
                    />
                  ))}
              </div>
              {dataManager?.mauCvDeXuat?.length > 0 && (
                <div className={style.button}>
                  <p>
                    <a href={"/ung-vien/CV-xin-viec"} style={{ all: "inherit" }}>
                      Xem tất cả
                    </a>
                  </p>
                  <img
                    src="/images/ung-vien/quan-ly-chung/double_arrow.svg"
                    alt="Icon mũi tên đôi"
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
              )}
            </div>
            <div className={style.item}>
              <div className={style.title}>
                <p>MẪU CV ĐỀ XUẤT</p>
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: "#f39623",
                  }}
                ></div>
              </div>
              <div
                className={style.content}
                style={{
                  overflowX: "auto",
                  scrollbarWidth: "thin",
                  flexGrow: 1,
                }}
              >
                {dataManager?.mauCvDeXuat &&
                  dataManager.mauCvDeXuat.map((mau, index) => (
                    <img
                      key={index}
                      src={mau.image}
                      alt={mau.alias}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxHeight: "452px",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.currentTarget.srcset =
                          "/images/cv/trang-chu-cv/mau11.png";
                      }}
                      onClick={() => {
                          window.location.href = '/mau-cv-xin-viec';
                      }}
                    />
                  ))}
              </div>
              {dataManager?.mauCvDeXuat?.length > 0 && (
                <div className={style.button}>
                  <p>
                    <a href={"/mau-cv-xin-viec"} style={{ all: "inherit" }}>
                      Xem tất cả
                    </a>
                  </p>
                  <img
                    src="/images/ung-vien/quan-ly-chung/double_arrow.svg"
                    alt="Icon mũi tên đôi"
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
              )}
            </div>
          </div> */}
        </div>
    </>
  );
};

export default GeneralManagement;