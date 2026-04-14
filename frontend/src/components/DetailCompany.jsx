import { Popover } from 'antd';
import React from 'react';
import TooltipComponent from './TooltipComponent'; 

const mockMucLuong = "15 - 20 triệu";
const mockHanNop = "Còn 10 ngày";


const DetailCompany = ({data}) => {
  return (
    <div className="detail_company">
      <div className="company_info">
        <a href={`/cong-ty-tnhh-mau-a`} className="avata_com">
          <img
            src="/images/candidate/applicant1.png" 
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
              e.currentTarget.src = '/images/candidate/applicant1.png';
            }}
          />
        </a>
        <div className="box_detail_com">
          <div className="box_tt_c">
            <Popover
              content={<TooltipComponent content={data.title} />}
              overlayClassName="custom-tooltip"
            >
              <a
                href={`/get-job-detail/${data.id}`}
                className="title_com cl3582CD"
              >
                <h3 className="title_com">{data.title}</h3>
              </a>
            </Popover>
            <Popover
              content={<TooltipComponent content={`${data.employerName}`} />}
              overlayClassName="custom-tooltip"
            >
              <a href={`/cong-ty-tnhh-mau-a`}>
                <p className="name_com">{`${data.employerName}`}</p>
              </a>
            </Popover>
          </div>
        </div>
      </div>
      <div className="more_info_com">
        <Popover
          content={
            <TooltipComponent
              content={`${
                Array.isArray(data?.cityName)
                  ? data.cityName.join(', ')
                  : data.cityName
              }`}
            />
          }
          overlayClassName="custom-tooltip"
        >
        </Popover>
        <p className="mor_i">{data.cityName}</p>
        <p className="mor_i">{data.districtName}</p>
        <p className="mor_i">{data.jobLevelName}</p>
        <p className="mor_i">{data.workTypeName}</p>
        <p className="mor_i">{data.experienceYearName}</p>
        {/* <p className="mor_i">{mockHanNop}</p> */}
      </div>
    </div>
  );
};

export default DetailCompany;