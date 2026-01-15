import React, { useState, useEffect } from "react";
import { Select, Spin, message } from "antd";
import s from "./DesiredJob.module.scss";
import * as selectData from "../../../../assets/selectData.js";
import * as callData from "../../../../assets/function.js";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const DesiredJob = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [careerGoal, setCareerGoal] = useState();
  const [birthday, setBirthday] = useState();
  const [experienceYearId, setExperienceYearId] = useState();
  const [jobLevelId, setJobLevelId] = useState();
  const [workTypeId, setWorkTypeId] = useState();
  const [gender, setGender] = useState();
  const [industryId, setIndustryId] = useState();
  const [salaryId, setSalaryId] = useState();
  const [cityId, setCityId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();

  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);

  const updateDistrictAndWard = async (value) => {
    setCityId(value)
    // const districtData = await callData.getDistrictsByCityId(value)
    // const wardData = await callData.getWardsByCityId(value)
    // setDistricts(districtData)
    // setWards(wardData)
  }

  const [formFields, setFormFields] = useState({
    job_name: "",
    hinh_thuc: 0,
    cap_bac: 0,
    kinh_nghiem: 0,
    city: [],
    district: [],
    nganh_nghe: [],
    muc_luong: 1,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormFields((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formFields.job_name.trim()) newErrors.job_name = "Vui lòng nhập tên công việc mong muốn";
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        const requestBody = {
          jobTitle: formFields.job_name,
          cityId: cityId,
          districtId: districtId,
          expectedSalaryId: salaryId,
          industryId: industryId,
          wardId: wardId,
          workTypeId: workTypeId,
          jobLevelId: jobLevelId
        };
        const response = await api.post("/candidate/update-desired-job", requestBody);
        if (response.data.success) {
          message.success("Cập nhật thông tin thành công!");
        }
      } catch (error) {
        message.error("Có lỗi xảy ra khi cập nhật thông tin.");
      } finally {
        setIsLoading(false);
      }
    } else {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
    }
  };

  const ErrorMessage = ({ field }) => (
    errors[field] ? <div style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>{errors[field]}</div> : null
  );

  const fetchDesiredJob = async () => {
    try {
      const response = await api.get("/candidate/get-desired-job");
      if (response.data.success) {
        const d = response.data.data;
        
        setFormFields(prev => ({ ...prev, job_name: d?.jobTitle || "" }));
        setWorkTypeId(d.workType?.id);
        setJobLevelId(d.jobLevel?.id);
        setIndustryId(d.industry?.id);
        setSalaryId(d.expectedSalary?.id);
        setExperienceYearId(d.experienceYear?.id);
        
        if (d.city?.id) {
          setCityId(d.city.id);
          const districtData = await callData.getDistrictsByCityId(d.city.id);
          setDistricts(districtData);
        }
        
        if (d.district?.id) {
          setDistrictId(d.district.id);
          const wardData = await callData.getWardsByDistrictId(d.district.id);
          setWards(wardData);
        }

        if (d.ward?.id) {
          setWardId(d.ward.id);
        }
      }
    } catch (error) {
      message.error("Không thể lấy thông tin công việc.");
    }
  }

  useEffect(() => {
    fetchDesiredJob();
  }, [])

  return (
    <>
      <style>
        {`
            .ant-select-selector {
              border: none !important;
            }
          `}
      </style>

      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>CÔNG VIỆC MONG MUỐN</div>
            <div className={s.title_2}></div>
          </div>
          
          <div className={s.form}>
            <div className={s.form_input}>
              <label htmlFor="job_name">
                Công việc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <input
                  type="text"
                  value={formFields.job_name}
                  name="job_name"
                  placeholder="Nhập tên công việc mong muốn"
                  onChange={(e) => handleChange("job_name", e.target.value)}
                />
              </div>
              <ErrorMessage field="job_name" />
            </div>

            <div className={s.form_input}>
              <label htmlFor="hinh_thuc">
                Hình thức làm việc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={workTypeId}
                  placeholder="Chọn hình thức làm việc"
                  className={`${s.select} select_search_AI select_hs_uv`}
                  onChange={setWorkTypeId} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={selectData.workTypes}
                />
              </div>
              <ErrorMessage field="hinh_thuc" />
            </div>

            <div className={s.form_input}>
              <label htmlFor="cap_bac">
                Cấp bậc mong muốn <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={jobLevelId}
                  placeholder="Chọn cấp bậc mong muốn"
                  className={`${s.select} select_search_AI select_hs_uv`}
                  onChange={setJobLevelId} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={selectData.jobLevels}
                />
              </div>
              <ErrorMessage field="cap_bac" />
            </div>

            {/* <div className={s.form_input}>
              <label htmlFor="kinh_nghiem">
                Kinh nghiệm làm việc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={experienceYearId}
                  placeholder="Chọn kinh nghiệm làm việc"
                  className={`${s.select} select_search_AI select_hs_uv`}
                  onChange={setExperienceYearId} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={selectData.experienceYears}
                />
              </div>
              <ErrorMessage field="kinh_nghiem" />
            </div> */}

            <div className={s.form_input}>
              <label htmlFor="city">
                Tỉnh thành <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={cityId}
                  placeholder="Chọn tỉnh thành mong muốn"
                  className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                  onChange={updateDistrictAndWard} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={selectData.cities} showSearch 
                  filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
                />
              </div>
              <ErrorMessage field="city" />
            </div>

            {/* <div className={s.form_input}>
              <label htmlFor="district">
                Quận/ huyện <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={districtId}
                  placeholder={"Chọn quận huyện"}
                  className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                  onChange={setDistrictId} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={districts} showSearch filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
                />
              </div>
              <ErrorMessage field="district" />
            </div>

            <div className={s.form_input}>
              <label htmlFor="ward">
                Phường/ xã <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={wardId}
                  placeholder={"Chọn phường xã"}
                  className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                  onChange={setWardId} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={wards} showSearch filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
                />
              </div>
              <ErrorMessage field="ward" />
            </div> */}

            <div className={s.form_input}>
              <label htmlFor="nganh_nghe">
                Ngành nghề mong muốn <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={industryId}
                  placeholder="Chọn ngành nghề mong muốn"
                  className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                  onChange={setIndustryId} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={selectData.industries} 
                  showSearch 
                  filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
                />
              </div>
              <ErrorMessage field="nganh_nghe" />
            </div>

            <div className={s.form_input}>
              <label htmlFor="muc_luong">
                Mức lương mong muốn <span style={{ color: "red" }}>*</span>
              </label>
              <div className={`${s.form_input_div} ${s.form_input_div_no_pad}`}>
                <Select
                  value={salaryId}
                  placeholder="Chọn mức lương mong muốn"
                  className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                  onChange={setSalaryId} 
                  fieldNames={{label: 'name', value: 'id'}} 
                  options={selectData.salaries} 
                  showSearch 
                  filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
                />
              </div>
              <ErrorMessage field="muc_luong" />
            </div>

            <div className={s.btn_wrapper}>
              <button
                disabled={isLoading}
                type="button"
                className={s.btn_submit}
                onClick={onSubmit}
              >
                {isLoading ? <Spin /> : "Cập nhật"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesiredJob;