/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import s from './menu-account.module.css';

// --- Dữ liệu mẫu (Mock Data) & Hàm giả lập (Stubs) ---

// Giả lập (stub) các hàm tiện ích
const isExperiment = false; 
const handleImageSource = (src) => src || '/images/candidate/ava_default.jpg';
const createLinkTilte = (title) => title ? title.toLowerCase().replace(/ /g, '-') : 'mock-alias';

// Giả lập ID
const mockCookieId = '123456';

// Giả lập dữ liệu lấy từ Context
const mockContext = {
    name: "Tên Người Dùng Mẫu",
    phone: "0123456789",
    ava: "/images/candidate/ava_default.jpg",
    point: 100, // Điểm NTD
    percentHoSo: 80, // % hồ sơ UV
    candiAllowSearch_context: '1' // '1' = Bật, '0' = Tắt
};

// --- Menu cho Nhà Tuyển Dụng (NTD) ---
const listMenuCompany = [
    {
        id: 1, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.66663 10.7334V9.26669C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.39169 18.3416 9.26669V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>, href: '/nha-tuyen-dung/quan-ly-chung', name: 'Quản lý chung',
        listObjChildren: []
    },
    {
        id: 1, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path d="M17.0833 9.91668V6.36669C17.0833 3.00836 16.3 2.16669 13.15 2.16669H6.84996C3.69996 2.16669 2.91663 3.00836 2.91663 6.36669V15.75C2.91663 17.9667 4.1333 18.4917 5.6083 16.9084L5.61662 16.9C6.29995 16.175 7.34162 16.2333 7.93328 17.025L8.77496 18.15" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.66663 6.33331H13.3333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 9.66669H12.5" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.175 12.8083L12.225 15.7583C12.1084 15.875 12 16.0917 11.975 16.25L11.8167 17.375C11.7584 17.7833 12.0417 18.0667 12.45 18.0083L13.575 17.85C13.7334 17.825 13.9584 17.7167 14.0667 17.6L17.0167 14.65C17.525 14.1417 17.7667 13.55 17.0167 12.8C16.275 12.0583 15.6834 12.3 15.175 12.8083Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.75 13.2333C15 14.1333 15.7 14.8333 16.6 15.0833" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>, href: '/nha-tuyen-dung/dang-tin-moi', name: 'Đăng tin', listObjChildren: []
    },
    {
        id: 3, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="7.49996" cy="4.99999" r="3.33333" stroke="#3582CD" strokeWidth="1.5" />
            <path d="M12.5 7.5C13.8807 7.5 15 6.38071 15 5C15 3.61929 13.8807 2.5 12.5 2.5" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="7.49996" cy="14.1667" rx="5.83333" ry="3.33333" stroke="#3582CD" strokeWidth="1.5" />
            <path d="M15 11.6667C16.4619 11.9872 17.5 12.7991 17.5 13.75C17.5 14.6078 16.6552 15.3524 15.4167 15.7254" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
        </svg>, href: '/nha-tuyen-dung/ung-vien-den-ung-tuyen', name: 'Ứng viên ứng tuyển', listObjChildren: []
    },
    ...(!isExperiment ? [{
        id: 4, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="7.50004" cy="7.50001" r="1.66667" stroke="#3582CD" />
            <path d="M10.8333 12.5C10.8333 13.4205 10.8333 14.1667 7.49996 14.1667C4.16663 14.1667 4.16663 13.4205 4.16663 12.5C4.16663 11.5795 5.65901 10.8333 7.49996 10.8333C9.34091 10.8333 10.8333 11.5795 10.8333 12.5Z" stroke="#3582CD" />
            <path d="M1.66663 10C1.66663 6.85731 1.66663 5.28596 2.64294 4.30965C3.61925 3.33334 5.1906 3.33334 8.33329 3.33334H11.6666C14.8093 3.33334 16.3807 3.33334 17.357 4.30965C18.3333 5.28596 18.3333 6.85731 18.3333 10C18.3333 13.1427 18.3333 14.7141 17.357 15.6904C16.3807 16.6667 14.8093 16.6667 11.6666 16.6667H8.33329C5.1906 16.6667 3.61925 16.6667 2.64294 15.6904C1.66663 14.7141 1.66663 13.1427 1.66663 10Z" stroke="#3582CD" strokeWidth="1.5" />
            <path d="M15.8334 10H12.5" stroke="#3582CD" strokeLinecap="round" />
            <path d="M15.8334 7.5H11.6667" stroke="#3582CD" strokeLinecap="round" />
            <path d="M15.8334 12.5H13.3334" stroke="#3582CD" strokeLinecap="round" />
        </svg>, href: '/nha-tuyen-dung/chuyen-vien-gui-ung-vien', name: 'Chuyên viên gửi ứng viên', listObjChildren: []
    }] : []),
    ...(!isExperiment ? [{
        id: 6, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M18.3333 7.49999C18.3333 3.33332 16.6666 1.66666 12.5 1.66666H7.49996C3.33329 1.66666 1.66663 3.33332 1.66663 7.49999V12.5C1.66663 16.6667 3.33329 18.3333 7.49996 18.3333H12.5C16.6666 18.3333 18.3333 16.6667 18.3333 12.5V10.8083" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.83337 4.15832V2.03333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.1667 2.03333V10.35C14.1667 11.9917 12.9917 12.6333 11.55 11.7667L10.45 11.1083C10.2 10.9583 9.80004 10.9583 9.55004 11.1083L8.45004 11.7667C7.00837 12.625 5.83337 11.9917 5.83337 10.35V7.49999" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>, href: '/nha-tuyen-dung/ho-so-ung-vien-da-luu', name: 'Hồ sơ ứng viên đã lưu', listObjChildren: []
    }] : []),
    {
        id: 8,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6V18" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3582CD" strokeWidth="1.s" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: '/bang-gia', name: 'Bảng giá', listObjChildren: []
    },
    {
        id: 7, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4.16666 8.33335H5.83333C7.5 8.33335 8.33333 7.50002 8.33333 5.83335V4.16669C8.33333 2.50002 7.5 1.66669 5.83333 1.66669H4.16666C2.5 1.66669 1.66666 2.50002 1.66666 4.16669V5.83335C1.66666 7.50002 2.5 8.33335 4.16666 8.33335Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.1667 8.33335H15.8333C17.5 8.33335 18.3333 7.50002 18.3333 5.83335V4.16669C18.3333 2.50002 17.5 1.66669 15.8333 1.66669H14.1667C12.5 1.66669 11.6667 2.50002 11.6667 4.16669V5.83335C11.6667 7.50002 12.5 8.33335 14.1667 8.33335Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.1667 18.3334H15.8333C17.5 18.3334 18.3333 17.5 18.3333 15.8334V14.1667C18.3333 12.5 17.5 11.6667 15.8333 11.6667H14.1667C12.5 11.6667 11.6667 12.5 11.6667 14.1667V15.8334C11.6667 17.5 12.5 18.3334 14.1667 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.16666 18.3334H5.83333C7.5 18.3334 8.33333 17.5 8.33333 15.8334V14.1667C8.33333 12.5 7.5 11.6667 5.83333 11.6667H4.16666C2.5 11.6667 1.66666 12.5 1.66666 14.1667V15.8334C1.66666 17.5 2.5 18.3334 4.16666 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>, href: '', name: 'Quản lý tài khoản', listObjChildren: [
            {
                id: 1000,
                itemLeft: 'Đổi mật khẩu',
                itemRight: 'Thông tin cá nhân',
                hrefLeft: '/nha-tuyen-dung/doi-mat-khau',
                hrefRight: '/nha-tuyen-dung/cap-nhat-thong-tin'
            },
        ]
    },

];
// --- Kết thúc dữ liệu menu ---


const MenuAccount = ({ checkAccount, setCheckLogin, setIsOutside }) => {
    // Logic điều hướng (router) đã bị loại bỏ
    
    // Sử dụng dữ liệu mẫu (mock) thay vì context
    const { name, point, phone, ava, percentHoSo } = mockContext;
    
    // Sử dụng state nội bộ để quản lý việc bật/tắt hồ sơ (thay vì context)
    const [candiAllowSearch, setCandiAllowSearch] = useState(mockContext.candiAllowSearch_context);

    const menuRef = useRef(null);

    // --- Menu cho Ứng Viên (UV) ---
    // Phải định nghĩa bên trong component để truy cập `percentHoSo`
    const listMenuPerson = [
        {
            id: 1, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.66663 10.7334V9.26669C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.39169 18.3416 9.26669V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>, href: '/ung-vien/quan-ly-chung', name: 'Quản lý chung',
            listObjChildren: []
        },
        {
            id: 2, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.55 16.1583C12.0334 16.5083 11.3834 16.8 10.5917 17.0583L9.27504 17.4917C5.96671 18.5583 4.22504 17.6667 3.15004 14.3583L2.08337 11.0667C1.01671 7.75833 1.90004 6.00833 5.20837 4.94167L6.52504 4.50833C6.86671 4.4 7.19171 4.30833 7.50004 4.25C7.25004 4.75833 7.05004 5.375 6.88337 6.08333L6.06671 9.575C5.25004 13.0583 6.32504 14.775 9.80004 15.6L11.2 15.9333C11.6834 16.05 12.1334 16.125 12.55 16.1583Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5333 7.10834L14.575 8.13334" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.71667 10.3333L12.1333 10.95" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.4667 4.24999C18.3667 5.24999 18.525 6.68332 18.05 8.69999L17.2333 12.1833C16.5333 15.1917 15.15 16.4083 12.55 16.1583C12.1333 16.125 11.6833 16.05 11.2 15.9333L9.79999 15.6C6.32499 14.775 5.24999 13.0583 6.06665 9.57499L6.88332 6.08332C7.04999 5.37499 7.24999 4.75832 7.49999 4.24999C8.47499 2.23332 10.1333 1.69165 12.9167 2.34999L14.3083 2.67499" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            , href: '', name: 'Hồ sơ xin việc', listObjChildren: [
                {
                    id: 1000,
                    itemLeft: 'CV xin việc',
                    itemRight: !isExperiment ? 'File tải lên' : "",
                    hrefLeft: '/ung-vien/CV-xin-viec',
                    hrefRight: !isExperiment ? '/ung-vien/tai-len-ho-so' : "#",
                },
            ]
        },
        {
            id: 3, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="7.50004" cy="7.50001" r="1.66667" stroke="#3582CD" strokeWidth="1.5" />
                <path d="M10.8333 12.5C10.8333 13.4205 10.8333 14.1667 7.49996 14.1667C4.16663 14.1667 4.16663 13.4205 4.16663 12.5C4.16663 11.5795 5.65901 10.8333 7.49996 10.8333C9.34091 10.8333 10.8333 11.5795 10.8333 12.5Z" stroke="#3582CD" strokeWidth="1.5" />
                <path d="M1.66663 10C1.66663 6.85731 1.66663 5.28596 2.64294 4.30965C3.61925 3.33334 5.1906 3.33334 8.33329 3.33334H11.6666C14.8093 3.33334 16.3807 3.33334 17.357 4.30965C18.3333 5.28596 18.3333 6.85731 18.3333 10C18.3333 13.1427 18.3333 14.7141 17.357 15.6904C16.3807 16.6667 14.8093 16.6667 11.6666 16.6667H8.33329C5.1906 16.6667 3.61925 16.6667 2.64294 15.6904C1.66663 14.7141 1.66663 13.1427 1.66663 10Z" stroke="#3582CD" strokeWidth="1.5" />
                <path d="M15.8334 10H12.5" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M15.8334 7.5H11.6667" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M15.8334 12.5H13.3334" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
            </svg>, href: '', name: 'Hoàn thiện hồ sơ', listObjChildren: [
                {
                    id: 1001,
                    // Dùng dữ liệu mẫu (mock)
                    itemLeft: `Tiến trình hoàn thiện hồ sơ ${percentHoSo ? percentHoSo + '%' : '0%'}`,
                    itemRight: '',
                    hrefLeft: '/ung-vien/ho-so-xin-viec',
                    hrefRight: ''
                },
            ]
        },
        {
            id: 5, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.8084 11.6667L18.0917 8.69167C18.3084 6.65833 17.7251 5 14.1667 5H5.83339C2.27506 5 1.69173 6.65833 1.91673 8.69167L2.54173 15.3583C2.71673 16.9917 3.31673 18.3333 6.66673 18.3333H13.3334C16.6834 18.3333 17.2834 16.9917 17.4584 15.3583" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66663 4.99999V4.33332C6.66663 2.85832 6.66663 1.66666 9.33329 1.66666H10.6666C13.3333 1.66666 13.3333 2.85832 13.3333 4.33332V4.99999" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.6667 10.8333V11.6667C11.6667 11.675 11.6667 11.675 11.6667 11.6833C11.6667 12.5917 11.6584 13.3333 10 13.3333C8.35004 13.3333 8.33337 12.6 8.33337 11.6917V10.8333C8.33337 10 8.33337 10 9.16671 10H10.8334C11.6667 10 11.6667 10 11.6667 10.8333Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.0416 9.16666C16.1166 10.5667 13.9166 11.4 11.6666 11.6833" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.18335 9.39166C4.05835 10.675 6.17502 11.45 8.33335 11.6917" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>, href: '/ung-vien/viec-lam-da-ung-tuyen', name: 'Việc làm đã ứng tuyển', listObjChildren: []
        },
        {
            id: 6, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.3333 7.49999C18.3333 3.33332 16.6666 1.66666 12.5 1.66666H7.49996C3.33329 1.66666 1.66663 3.33332 1.66663 7.49999V12.5C1.66663 16.6667 3.33329 18.3333 7.49996 18.3333H12.5C16.6666 18.3333 18.3333 16.6667 18.3333 12.5V10.8083" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.83337 4.15832V2.03333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 2.03333V10.35C14.1667 11.9917 12.9917 12.6333 11.55 11.7667L10.45 11.1083C10.2 10.9583 9.80004 10.9583 9.55004 11.1083L8.45004 11.7667C7.00837 12.625 5.83337 11.9917 5.83337 10.35V7.49999" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>, href: '/ung-vien/viec-lam-da-luu', name: 'Việc làm đã lưu', listObjChildren: []
        },
        {
            id: 7, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16666 8.33335H5.83333C7.5 8.33335 8.33333 7.50002 8.33333 5.83335V4.16669C8.33333 2.50002 7.5 1.66669 5.83333 1.66669H4.16666C2.5 1.66669 1.66666 2.50002 1.66666 4.16669V5.83335C1.66666 7.50002 2.5 8.33335 4.16666 8.33335Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 8.33335H15.8333C17.5 8.33335 18.3333 7.50002 18.3333 5.83335V4.16669C18.3333 2.50002 17.5 1.66669 15.8333 1.66669H14.1667C12.5 1.66669 11.6667 2.50002 11.6667 4.16669V5.83335C11.6667 7.50002 12.5 8.33335 14.1667 8.33335Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 18.3334H15.8333C17.5 18.3334 18.3333 17.5 18.3333 15.8334V14.1667C18.3333 12.5 17.5 11.6667 15.8333 11.6667H14.1667C12.5 11.6667 11.6667 12.5 11.6667 14.1667V15.8334C11.6667 17.5 12.5 18.3334 14.1667 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.16666 18.3334H5.83333C7.5 18.3334 8.33333 17.5 8.33333 15.8334V14.1667C8.33333 12.5 7.5 11.6667 5.83333 11.6667H4.16666C2.5 11.6667 1.66666 12.5 1.66666 14.1667V15.8334C1.66666 17.5 2.5 18.3334 4.16666 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>, href: '', name: 'Quản lý tài khoản', listObjChildren: [
                {
                    id: 1000,
                    itemLeft: 'Đổi mật khẩu',
                    itemRight: 'Thông tin cá nhân',
                    hrefLeft: '/ung-vien/doi-mat-khau',
                    hrefRight: '/ung-vien/ho-so-xin-viec'
                },
            ]
        },
    ];

    // State cho accordion menu (UI logic)
    const [expandedItems, setExpandedItems] = useState([]);

    const toggleItem = (index) => {
        setExpandedItems((prevExpandedItems) => {
            if (prevExpandedItems.includes(index)) {
                return prevExpandedItems.filter((item) => item !== index);
            } else {
                return [index];
            }
        });
    };

    // Hàm giả lập (stub) cho việc bật/tắt hồ sơ
    const handleClickActiveToggle = () => {
        if (candiAllowSearch == '1') {
            setCandiAllowSearch('0');
            console.log("Đã TẮT cho phép NTD tìm kiếm");
        } else {
            setCandiAllowSearch('1');
            console.log("Đã BẬT cho phép NTD tìm kiếm");
        }
    };

    // Hàm render menu (UI logic)
    const renderMenuItems = (menuList) => {
        return menuList.map((item, index) => (
            <Fragment key={index}>
                <div
                    className={s["box-content"]}
                    onClick={() => {
                        // Logic điều hướng (router.push) đã bị loại bỏ
                        if (item?.href) {
                            // alert(`Chuyển đến: ${item.href}`);
                            window.location.href = item.href;
                        }
                        toggleItem(index);
                    }}
                >
                    <div className={s["content-left"]}>
                        {item.icon}
                        <p className={`${s['item-name']} ${expandedItems.includes(index) ? s.active : ''}`}>{item.name}</p>
                    </div>
                    {item.listObjChildren.length > 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={`${expandedItems.includes(index) ? s['arrow-up'] : s['arrow-down']}`}>
                            <path d="M14.0666 11.2333C13.9 11.4 13.7026 11.4833 13.4746 11.4833C13.2466 11.4833 13.0495 11.4 12.8833 11.2333L7.99996 6.35L3.09996 11.25C2.9444 11.4056 2.74996 11.4833 2.51663 11.4833C2.28329 11.4833 2.08329 11.4 1.91663 11.2333C1.74996 11.0667 1.66663 10.8693 1.66663 10.6413C1.66663 10.4133 1.74996 10.2162 1.91663 10.05L7.53329 4.45C7.59996 4.38334 7.67218 4.336 7.74996 4.308C7.82774 4.28 7.91107 4.26623 7.99996 4.26667C8.08885 4.26667 8.17218 4.28067 8.24996 4.30867C8.32774 4.33667 8.39996 4.38378 8.46663 4.45L14.0833 10.0667C14.2388 10.2222 14.3166 10.414 14.3166 10.642C14.3166 10.87 14.2333 11.0671 14.0666 11.2333Z" fill="#3582CD" />
                        </svg>
                    )}
                </div>
                {expandedItems.includes(index) && renderChildItems(item.listObjChildren)}
            </Fragment>
        ));
    };

    // Hàm render menu con (UI logic)
    const renderChildItems = (listObjChildren) => {
        if (!listObjChildren || listObjChildren.length === 0) {
            return null;
        }

        return (
            <div className={s["menu-item-child"]}>
                {listObjChildren.map((child, index) => (
                    <div key={index} className={s["item-child"]}>
                        {child.itemRight ? <>
                            <div className={s["item-left"]} onClick={() => {
                                // Logic điều hướng (router.push) đã bị loại bỏ
                                if (child?.hrefLeft) window.location.href = child.hrefLeft;
                            }}>
                                <p>{child.itemLeft}</p>
                            </div>
                            <div className={s["item-right"]} onClick={() => {
                                // Logic điều hướng (router.push) đã bị loại bỏ
                                if (child?.hrefRight) window.location.href = child.hrefRight;
                            }}>
                                <p>{child.itemRight}</p>
                            </div>
                        </> :
                            <div className={s["item-left"]} style={{ fontSize: '14px' }} onClick={() => {
                                // Logic điều hướng (router.push) đã bị loại bỏ
                                if (child?.hrefLeft) window.location.href = child.hrefLeft;
                            }}>{child.itemLeft}</div>
                        }
                    </div>
                ))}
            </div>
        );
    };

    // useEffect cho việc reset accordion (UI logic)
    // useEffect(() => {
    //     if (isOpen) { // Giả sử isOpen là prop
    //         setExpandedItems([])
    //     }
    // }, [isOpen])

    // useEffect cho việc kiểm tra click/scroll bên ngoài (UI logic)
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (menuRef?.current && setIsOutside) {
                const rect = menuRef.current.getBoundingClientRect();
                const isOut = (
                    e.clientX < rect.left ||
                    e.clientX > rect.right ||
                    e.clientY < rect.top ||
                    e.clientY > rect.bottom
                );
                setIsOutside(isOut); // Gọi hàm từ props
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [setIsOutside]) // Phụ thuộc vào prop

    return (
        <div id="content_menu" className={s['menu-wrapper']} ref={menuRef}>
            <div className={s["box-account"]}>
                <a href={`#`}>
                    {/* <Image> đã được thay bằng <img> */}
                    <img
                        width={50}
                        height={50}
                        src={handleImageSource(ava)} // Dùng mock data
                        alt=""
                        className={s["box-img"]}
                        onError={(e) => { e.currentTarget.src = '/images/candidate/ava_default.jpg' }}
                        loading='lazy'
                        decoding='async'
                    />
                </a>
                {checkAccount ? ( // Giao diện Ứng Viên
                    <div className={s["box-infor"]}>
                        <p
                            className={s["if-name"]}
                            onClick={() => { 
                                // Logic router.push đã bị loại bỏ
                                alert(`Xem trang cá nhân của: ${name}`);
                            }}
                            style={{
                                cursor: 'pointer',
                                maxWidth: '340px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >{name}</p>
                        <div className={s["if-detail"]}>
                            <p>Account: <span className={s["detail-num"]}>{phone}</span> </p>
                            <p>- </p>
                            <p>ID: <span className={s["detail-num"]}>{mockCookieId}</span></p>
                        </div>
                        <div className={s["if-contact"]} >
                            {
                                candiAllowSearch === '1' ?
                                    <svg style={{ cursor: 'pointer' }} onClick={handleClickActiveToggle} xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none" className={s["img-toggle"]}>
                                        <path d="M20.5898 0H7.41016C3.32418 0 0 3.58878 0 8C0 12.4112 3.32418 16 7.41016 16H20.5898C24.6758 16 28 12.4112 28 8C28 3.58878 24.6758 0 20.5898 0ZM20.5898 14.2288C17.4085 14.2288 14.8203 11.4346 14.8203 8C14.8203 4.56549 17.4085 1.77122 20.5898 1.77122C23.7712 1.77122 26.3594 4.56549 26.3594 8C26.3594 11.4346 23.7712 14.2288 20.5898 14.2288Z" fill="#3582CD" />
                                    </svg>
                                    :
                                    <svg style={{ cursor: 'pointer' }} onClick={handleClickActiveToggle} xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                                        <path d="M7.41016 0H20.5898C24.6758 0 28 3.58878 28 8C28 12.4112 24.6758 16 20.5898 16H7.41016C3.32418 16 0 12.4112 0 8C0 3.58878 3.32418 0 7.41016 0ZM7.41016 14.2288C10.5915 14.2288 13.1797 11.4346 13.1797 8C13.1797 4.56549 10.5915 1.77122 7.41016 1.77122C4.22882 1.77122 1.64062 4.56549 1.64062 8C1.64062 11.4346 4.22882 14.2288 7.41016 14.2288Z" fill="#8B8B8B" />
                                    </svg>
                            }
                            <p>{"Hiển thị hồ sơ của tôi"}</p>
                        </div>
                    </div>) :
                    ( // Giao diện Nhà Tuyển Dụng
                        <div className={s["box-info-company"]}>
                            <p
                                style={{
                                    cursor: 'pointer',
                                    maxWidth: '340px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                                onClick={() => alert(`Xem công ty: ${name}`)}
                            >{name}</p>
                            <div className={s["info-point"]}>
                                {!isExperiment &&
                                    <>
                                        <p>Điểm lọc hồ sơ: <span>{point}</span></p>
                                        <p>- </p>
                                    </>
                                }
                                <p>ID: <span>{mockCookieId}</span></p>
                            </div>
                        </div>
                    )}
            </div>

            {checkAccount ? renderMenuItems(listMenuPerson) : renderMenuItems(listMenuCompany)}
            
            <div className={s["logout"]}>
                <div className={s["content-value"]} onClick={() => {
                    // Logic (logOut()) đã bị loại bỏ
                    if(setCheckLogin) setCheckLogin(false);
                    alert('Đăng xuất! (Cần tải lại trang)');
                    // window.location.reload();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clipPath="url(#clip0_1738_25132)">
                            <path d="M1.66653 6.66667L1.66653 13.3333C1.66653 15.6904 1.66653 16.8689 2.39876 17.6011C3.13099 18.3333 4.3095 18.3333 6.66653 18.3333L7.49986 18.3333C9.85688 18.3333 11.0354 18.3333 11.7676 17.6011C12.4079 16.9608 12.4883 15.9792 12.4984 14.1667M12.4984 5.83334C12.4883 4.02082 12.4079 3.03922 11.7676 2.3989C11.0354 1.66667 9.85688 1.66667 7.49986 1.66667L6.66653 1.66667C4.30951 1.66667 3.13099 1.66667 2.39876 2.3989C2.14893 2.64874 1.98434 2.95052 1.8759 3.33334" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7.5 10L19 10M19 10L16 7M19 10L16 13" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1738_25132">
                                <rect x="20" width="20" height="20" rx="5" transform="rotate(90 20 0)" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p>Đăng xuất</p>
                </div>
            </div>
        </div>
    )
}

export default MenuAccount;