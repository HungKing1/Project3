/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from "react";
import sMenu from "./menu-account.module.css";
import s from "./menu-sidebar.module.css";

// --- Dữ liệu mẫu (Mock Data) & Hàm giả lập (Stubs) ---

// true = Đã đăng nhập, false = Chưa đăng nhập
const mockIsLoggedIn = true;
// '2' = Ứng viên (UV), '1' = Nhà tuyển dụng (NTD)
const mockUserType = '2';
const mockCookieId = '123456';

// Giả lập (stub) các hàm tiện ích
const isExperiment = () => false;
const linkPageCv = () => "/mau-cv-xin-viec";
const handleImageSource = (src) => src || '/images/candidate/ava_default.jpg';
const createLinkTilte = (title) => title ? title.toLowerCase().replace(/ /g, '-') : 'mock-alias';
const logOut = () => { console.log("Đã đăng xuất!"); };

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
        id: 1,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.66663 10.7334V9.26669C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.39169 18.3416 9.26669V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: "/nha-tuyen-dung/quan-ly-chung",
        name: "Quản lý chung",
        listObjChildren: []
    },
    {
        id: 2, // ID bị trùng, nhưng giữ nguyên theo code gốc
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path d="M17.0833 9.91668V6.36669C17.0833 3.00836 16.3 2.16669 13.15 2.16669H6.84996C3.69996 2.16669 2.91663 3.00836 2.91663 6.36669V15.75C2.91663 17.9667 4.1333 18.4917 5.6083 16.9084L5.61662 16.9C6.29995 16.175 7.34162 16.2333 7.93328 17.025L8.77496 18.15" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66663 6.33331H13.3333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 9.66669H12.5" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.175 12.8083L12.225 15.7583C12.1084 15.875 12 16.0917 11.975 16.25L11.8167 17.375C11.7584 17.7833 12.0417 18.0667 12.45 18.0083L13.575 17.85C13.7334 17.825 13.9584 17.7167 14.0667 17.6L17.0167 14.65C17.525 14.1417 17.7667 13.55 17.0167 12.8C16.275 12.0583 15.6834 12.3 15.175 12.8083Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.75 13.2333C15 14.1333 15.7 14.8333 16.6 15.0833" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: "/nha-tuyen-dung/dang-tin-moi",
        name: "Đăng tin",
        listObjChildren: []
    },
    {
        id: 3,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="7.49996" cy="4.99999" r="3.33333" stroke="#3582CD" strokeWidth="1.5" />
                <path d="M12.5 7.5C13.8807 7.5 15 6.38071 15 5C15 3.61929 13.8807 2.5 12.5 2.5" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="7.49996" cy="14.1667" rx="5.83333" ry="3.33333" stroke="#3582CD" strokeWidth="1.5" />
                <path d="M15 11.6667C16.4619 11.9872 17.5 12.7991 17.5 13.75C17.5 14.6078 16.6552 15.3524 15.4167 15.7254" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        href: "/nha-tuyen-dung/ung-vien-den-ung-tuyen",
        name: "Ứng viên ứng tuyển",
        listObjChildren: []
    },
    ...(!isExperiment ? [{
        id: 4,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="7.50004" cy="7.50001" r="1.66667" stroke="#3582CD" />
                <path d="M10.8333 12.5C10.8333 13.4205 10.8333 14.1667 7.49996 14.1667C4.16663 14.1667 4.16663 13.4205 4.16663 12.5C4.16663 11.5795 5.65901 10.8333 7.49996 10.8333C9.34091 10.8333 10.8333 11.5795 10.8333 12.5Z" stroke="#3582CD" />
                <path d="M1.66663 10C1.66663 6.85731 1.66663 5.28596 2.64294 4.30965C3.61925 3.33334 5.1906 3.33334 8.33329 3.33334H11.6666C14.8093 3.33334 16.3807 3.33334 17.357 4.30965C18.3333 5.28596 18.3333 6.85731 18.3333 10C18.3333 13.1427 18.3333 14.7141 17.357 15.6904C16.3807 16.6667 14.8093 16.6667 11.6666 16.6667H8.33329C5.1906 16.6667 3.61925 16.6667 2.64294 15.6904C1.66663 14.7141 1.66663 13.1427 1.66663 10Z" stroke="#3582CD" strokeWidth="1.5" />
                <path d="M15.8334 10H12.5" stroke="#3582CD" strokeLinecap="round" />
                <path d="M15.8334 7.5H11.6667" stroke="#3582CD" strokeLinecap="round" />
                <path d="M15.8334 12.5H13.3334" stroke="#3582CD" strokeLinecap="round" />
            </svg>
        ),
        href: "/nha-tuyen-dung/chuyen-vien-gui-ung-vien",
        name: "Chuyên viên gửi ứng viên",
        listObjChildren: []
    }] : []),
    ...(!isExperiment ? [{
        id: 6,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.3333 7.49999C18.3333 3.33332 16.6666 1.66666 12.5 1.66666H7.49996C3.33329 1.66666 1.66663 3.33332 1.66663 7.49999V12.5C1.66663 16.6667 3.33329 18.3333 7.49996 18.3333H12.5C16.6666 18.3333 18.3333 16.6667 18.3333 12.5V10.8083" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.83337 4.15832V2.03333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 2.03333V10.35C14.1667 11.9917 12.9917 12.6333 11.55 11.7667L10.45 11.1083C10.2 10.9583 9.80004 10.9583 9.55004 11.1083L8.45004 11.7667C7.00837 12.625 5.83337 11.9917 5.83337 10.35V7.49999" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: "/nha-tuyen-dung/ho-so-ung-vien-da-luu",
        name: "Hồ sơ ứng viên đã lưu",
        listObjChildren: []
    }] : []),
    {
        id: 7,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16666 8.33335H5.83333C7.5 8.33335 8.33333 7.50002 8.33333 5.83335V4.16669C8.33333 2.50002 7.5 1.66669 5.83333 1.66669H4.16666C2.5 1.66669 1.66666 2.50002 1.66666 4.16669V5.83335C1.66666 7.50002 2.5 8.33335 4.16666 8.33335Z" stroke="#3582CD" strokeWidth="1.s" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 8.33335H15.8333C17.5 8.33335 18.3333 7.50002 18.3333 5.83335V4.16669C18.3333 2.50002 17.5 1.66669 15.8333 1.66669H14.1667C12.5 1.66669 11.6667 2.50002 11.6667 4.16669V5.83335C11.6667 7.50002 12.5 8.33335 14.1667 8.33335Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 18.3334H15.8333C17.5 18.3334 18.3333 17.5 18.3333 15.8334V14.1667C18.3333 12.5 17.5 11.6667 15.8333 11.6667H14.1667C12.5 11.6667 11.6667 12.5 11.6667 14.1667V15.8334C11.6667 17.5 12.5 18.3334 14.1667 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.16666 18.3334H5.83333C7.5 18.3334 8.33333 17.5 8.33333 15.8334V14.1667C8.33333 12.5 7.5 11.6667 5.83333 11.6667H4.16666C2.5 11.6667 1.66666 12.5 1.66666 14.1667V15.8334C1.66666 17.5 2.5 18.3334 4.16666 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: "",
        name: "Quản lý tài khoản",
        listObjChildren: [
            {
                id: 1000,
                itemLeft: "Đổi mật khẩu",
                itemRight: "Thông tin cá nhân",
                hrefLeft: "/nha-tuyen-dung/doi-mat-khau",
                hrefRight: "/nha-tuyen-dung/cap-nhat-thong-tin"
            },
        ]
    },
    {
        id: 8,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6V18" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: "/bang-gia",
        name: "Bảng giá",
        listObjChildren: []
    }
];

// --- Menu khi chưa đăng nhập ---
const listMenuNotAuth = [
    {
        id: 2,
        icon: (
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3334 7.16675C18.3334 3.83341 16.6667 2.16675 13.3334 2.16675H6.66675C3.33341 2.16675 1.66675 3.83341 1.66675 7.16675V18.0001C1.66675 18.4584 2.04175 18.8334 2.50008 18.8334H13.3334C16.6667 18.8334 18.3334 17.1667 18.3334 13.8334V10.5001" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.16437 14.5H6.7625C5.79062 14.5 5 13.7094 5 12.7381V8.7625C5 7.79062 5.79063 7 6.76188 7H8.16375C8.50875 7 8.78875 7.28 8.78875 7.625C8.78875 7.97 8.50875 8.25 8.16375 8.25H6.76188C6.47938 8.25 6.25 8.48 6.25 8.76188V12.7375C6.25 13.02 6.48 13.2494 6.76188 13.2494H8.16375C8.50875 13.2494 8.78875 13.5294 8.78875 13.8744C8.78875 14.2194 8.50937 14.5 8.16437 14.5Z" fill="#3582CD" />
                <path d="M11.7188 14.5C11.7107 14.5 11.7032 14.5 11.6951 14.5C11.4157 14.4894 11.1776 14.295 11.1113 14.0231L9.58755 7.77314C9.50568 7.43751 9.7113 7.09939 10.0469 7.01814C10.3832 6.94001 10.7207 7.14189 10.8019 7.47751L11.8044 11.5888L13.1551 7.43251C13.2619 7.10501 13.6138 6.92501 13.9426 7.03126C14.2707 7.13814 14.4507 7.49064 14.3438 7.81876L12.3126 14.0688C12.2294 14.3263 11.9888 14.5 11.7188 14.5Z" fill="#3582CD" />
            </svg>
        ),
        href: linkPageCv(),
        name: "CV xin việc",
        listObjChildren: []
    },
    {
        id: 4,
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.28756 1.04169H11.7123C12.852 1.04167 13.7706 1.04166 14.4931 1.13879C15.2432 1.23964 15.8747 1.45538 16.3763 1.95698C16.8779 2.45858 17.0937 3.09014 17.1945 3.84023C17.2917 4.5627 17.2916 5.4813 17.2916 6.62096V13.3791C17.2916 14.5187 17.2917 15.4373 17.1945 16.1598C17.0937 16.9099 16.8779 17.5415 16.3763 18.0431C15.8747 18.5447 15.2432 18.7604 14.4931 18.8613C13.7706 18.9584 12.852 18.9584 11.7123 18.9584H8.28756C7.1479 18.9584 6.2293 18.9584 5.50683 18.8613C4.75674 18.7604 4.12517 18.5447 3.62358 18.0431C3.12198 17.5415 2.90623 16.9099 2.80539 16.1598C2.77314 15.92 2.7516 15.6585 2.73721 15.3745C2.70465 15.2717 2.6983 15.1594 2.72392 15.0474C2.70827 14.5541 2.70828 13.9993 2.70828 13.3791V6.62096C2.70827 5.4813 2.70825 4.5627 2.80539 3.84023C2.90623 3.09014 3.12198 2.45858 3.62358 1.95698C4.12517 1.45538 4.75674 1.23964 5.50683 1.13879C6.2293 1.04166 7.1479 1.04167 8.28756 1.04169ZM3.98058 15.2076C3.99325 15.5024 4.01311 15.7617 4.04424 15.9933C4.12645 16.6047 4.27682 16.9285 4.50746 17.1592C4.7381 17.3898 5.06191 17.5402 5.67339 17.6224C6.30284 17.707 7.13711 17.7084 8.33329 17.7084H11.6666C12.8628 17.7084 13.6971 17.707 14.3265 17.6224C14.938 17.5402 15.2618 17.3898 15.4924 17.1592C15.656 16.9956 15.7792 16.7851 15.8664 16.4584H6.66662C6.32144 16.4584 6.04162 16.1785 6.04162 15.8334C6.04162 15.4882 6.32144 15.2084 6.66662 15.2084H16.0193C16.0347 14.8492 16.0395 14.4372 16.041 13.9584H6.58143C5.76622 13.9584 5.48122 13.9637 5.26281 14.0222C4.66338 14.1829 4.18552 14.6284 3.98058 15.2076ZM16.0416 12.7084H6.58143C6.54879 12.7084 6.51663 12.7083 6.48493 12.7083C5.8033 12.7081 5.33817 12.708 4.93929 12.8148C4.58264 12.9104 4.25182 13.0665 3.95829 13.2716V6.66669C3.95829 5.47051 3.95961 4.63625 4.04424 4.00679C4.12645 3.39531 4.27682 3.0715 4.50746 2.84086C4.7381 2.61023 5.06191 2.45986 5.67339 2.37764C6.30284 2.29302 7.13711 2.29169 8.33329 2.29169H11.6666C12.8628 2.29169 13.6971 2.29302 14.3265 2.37764C14.938 2.45986 15.2618 2.61023 15.4924 2.84086C15.7231 3.0715 15.8735 3.39531 15.9557 4.00679C16.0403 4.63625 16.0416 5.47051 16.0416 6.66669V12.7084ZM6.04162 5.83335C6.04162 5.48818 6.32144 5.20835 6.66662 5.20835H13.3333C13.6785 5.20835 13.9583 5.48818 13.9583 5.83335C13.9583 6.17853 13.6785 6.45835 13.3333 6.45835H6.66662C6.32144 6.45835 6.04162 6.17853 6.04162 5.83335ZM6.04162 8.75002C6.04162 8.40484 6.32144 8.12502 6.66662 8.12502H10.8333C11.1785 8.12502 11.4583 8.40484 11.4583 8.75002C11.4583 9.0952 11.1785 9.37502 10.8333 9.37502H6.66662C6.32144 9.37502 6.04162 9.0952 6.04162 8.75002Z" fill="#3582CD" />
            </svg>
        ),
        name: "Cẩm nang tìm việc",
        url: "/cam-nang-tim-viec",
        listObjChildren: []
    },
    {
        id: 5,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path d="M17.0833 9.91668V6.36669C17.0833 3.00836 16.3 2.16669 13.15 2.16669H6.84996C3.69996 2.16669 2.91663 3.00836 2.91663 6.36669V15.75C2.91663 17.9667 4.1333 18.4917 5.6083 16.9084L5.61662 16.9C6.29995 16.175 7.34162 16.2333 7.93328 17.025L8.77496 18.15" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66663 6.33331H13.3333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 9.66669H12.5" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.175 12.8083L12.225 15.7583C12.1084 15.875 12 16.0917 11.975 16.25L11.8167 17.375C11.7584 17.7833 12.0417 18.0667 12.45 18.0083L13.575 17.85C13.7334 17.825 13.9584 17.7167 14.0667 17.6L17.0167 14.65C17.525 14.1417 17.7667 13.55 17.0167 12.8C16.275 12.0583 15.6834 12.3 15.175 12.8083Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.75 13.2333C15 14.1333 15.7 14.8333 16.6 15.0833" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: !isExperiment ? "/dang-tin-tuyen-dung" : "/dang-tin-mien-phi",
        name: "Đăng tin",
        listObjChildren: []
    },
    {
        id: 6,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6V18" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        href: "/bang-gia",
        name: "Bảng giá",
        listObjChildren: []
    },
    {
        id: 7,
        icon: (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="#4c83ce" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.56106 7.57312C9.5456 8.03847 10.3851 8.76279 10.9896 9.66854C11.5941 10.5743 11.941 11.6274 11.9931 12.7151C11.9999 12.8148 11.9868 12.9148 11.9545 13.0093C11.9222 13.1038 11.8713 13.1909 11.8049 13.2655C11.7384 13.3401 11.6578 13.4007 11.5676 13.4436C11.4775 13.4866 11.3796 13.5112 11.2798 13.5158C11.1801 13.5205 11.0804 13.5052 10.9866 13.4708C10.8928 13.4364 10.8069 13.3836 10.7338 13.3156C10.6606 13.2475 10.6019 13.1655 10.5609 13.0744C10.5199 12.9833 10.4975 12.885 10.4951 12.7851C10.4405 11.6296 9.94316 10.5395 9.10616 9.7411C8.26916 8.94265 7.15682 8.49719 6.00006 8.49719C4.8433 8.49719 3.73097 8.94265 2.89397 9.7411C2.05696 10.5395 1.55958 11.6296 1.50506 12.7851C1.49159 12.9807 1.40208 13.1632 1.25568 13.2936C1.10929 13.424 0.91766 13.4919 0.721828 13.4828C0.525996 13.4736 0.341531 13.3882 0.207936 13.2447C0.0743415 13.1012 0.00223686 12.9111 0.00706354 12.7151C0.0589244 11.6275 0.405595 10.5744 1.00997 9.66864C1.61434 8.76288 2.45365 8.03852 3.43806 7.57312C2.80708 7.04681 2.35353 6.3389 2.13912 5.5457C1.9247 4.75249 1.95983 3.91249 2.23973 3.13995C2.51962 2.36742 3.0307 1.69986 3.70343 1.22807C4.37616 0.756282 5.17789 0.503174 5.99956 0.503174C6.82124 0.503174 7.62297 0.756282 8.2957 1.22807C8.96843 1.69986 9.4795 2.36742 9.7594 3.13995C10.0393 3.91249 10.0744 4.75249 9.86001 5.5457C9.6456 6.3389 9.19205 7.04681 8.56106 7.57312ZM8.50006 4.50012C8.50006 3.83708 8.23667 3.2012 7.76783 2.73235C7.29899 2.26351 6.6631 2.00012 6.00006 2.00012C5.33702 2.00012 4.70114 2.26351 4.2323 2.73235C3.76346 3.2012 3.50006 3.83708 3.50006 4.50012C3.50006 5.16316 3.76346 5.79905 4.2323 6.26789C4.70114 6.73673 5.33702 7.00012 6.00006 7.00012C6.6631 7.00012 7.29899 6.73673 7.76783 6.26789C8.23667 5.79905 8.50006 5.16316 8.50006 4.50012Z" fill="#3582CD" />
            </svg>
        ),
        href: "/dang-nhap",
        name: "Đăng nhập",
        listObjChildren: []
    },
    {
        id: 8,
        icon: (
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.76224 1.65881C7.83707 1.42848 8.16293 1.42849 8.23776 1.65881L9.30733 4.95061C9.54161 5.67165 10.2135 6.15983 10.9717 6.15983H14.4329C14.6751 6.15983 14.7758 6.46973 14.5798 6.61208L11.7797 8.64653C11.1663 9.09215 10.9097 9.88205 11.1439 10.6031L12.2135 13.8949C12.2883 14.1252 12.0247 14.3167 11.8288 14.1744L9.02862 12.1399C8.41527 11.6943 7.58473 11.6943 6.97138 12.1399L4.17121 14.1744L4.61204 14.7812L4.17121 14.1744C3.97528 14.3167 3.71166 14.1252 3.7865 13.8949L4.85607 10.6031C5.09035 9.88205 4.83369 9.09215 4.22034 8.64653L1.42017 6.61208C1.22424 6.46973 1.32494 6.15983 1.56712 6.15983H5.02832C5.78646 6.15983 6.45839 5.67165 6.69267 4.95061L7.76224 1.65881Z" stroke="#3582CD" strokeWidth="1.5" />
            </svg>
        ),
        href: "/dang-ky",
        name: "Đăng ký",
        listObjChildren: []
    },
];

const MenuSidebar = ({ closeMenuSidebar }) => {
    // Logic điều hướng (router) đã bị loại bỏ
    // const router = useRouter();

    // Sử dụng dữ liệu mẫu (mock) thay vì context
    const { name, phone, ava, point, percentHoSo } = mockContext;
    const id = mockIsLoggedIn ? mockCookieId : null; // Lấy ID từ mock

    // Sử dụng state nội bộ để quản lý việc bật/tắt hồ sơ (thay vì context)
    const [candiAllowSearch, setCandiAllowSearch] = useState(mockContext.candiAllowSearch_context);

    // --- Menu cho Ứng Viên (UV) ---
    // Phải định nghĩa bên trong component để truy cập `percentHoSo`
    const listMenuPersonSidebar = [
        {
            id: 1,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M1.66667 15.8333L10.8333 15.8333" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.1667 15.8333L18.3333 15.8333" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.66667 10L5.83333 10" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.16667 10L18.3333 10" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.66667 4.16666L10.8333 4.16666" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.1667 4.16666L18.3333 4.16666" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.8333 2.5L10.8333 5.83333" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.8333 14.1667L10.8333 17.5" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.16666 8.33334L9.16666 11.6667" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            name: "Quản lý chi tiết",
            url: "",
            menuLevel1: [],
            menuLevel2: [
                {
                    id: 1,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.66666 10.7333V9.26666C1.66666 8.4 2.375 7.68333 3.25 7.68333C4.75833 7.68333 5.375 6.61666 4.61666 5.30833C4.18333 4.55833 4.44166 3.58333 5.2 3.15L6.64166 2.325C7.3 1.93333 8.15 2.16666 8.54166 2.825L8.63333 2.98333C9.38333 4.29166 10.6167 4.29166 11.375 2.98333L11.4667 2.825C11.8583 2.16666 12.7083 1.93333 13.3667 2.325L14.8083 3.15C15.5667 3.58333 15.825 4.55833 15.3917 5.30833C14.6333 6.61666 15.25 7.68333 16.7583 7.68333C17.625 7.68333 18.3417 8.39166 18.3417 9.26666V10.7333C18.3417 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3833 15.3917 14.6917C15.825 15.45 15.5667 16.4167 14.8083 16.85L13.3667 17.675C12.7083 18.0667 11.8583 17.8333 11.4667 17.175L11.375 17.0167C10.625 15.7083 9.39166 15.7083 8.63333 17.0167L8.54166 17.175C8.15 17.8333 7.3 18.0667 6.64166 17.675L5.2 16.85C4.44166 16.4167 4.18333 15.4417 4.61666 14.6917C5.375 13.3833 4.75833 12.3167 3.25 12.3167C2.375 12.3167 1.66666 11.6 1.66666 10.7333Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    name: "Quản lý chung",
                    url: "/ung-vien/quan-ly-chung",
                    menuLevel3: []
                },
                {
                    id: 2,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.55 16.1583C12.0333 16.5083 11.3833 16.8 10.5916 17.0583L9.27498 17.4917C5.96665 18.5583 4.22498 17.6667 3.14998 14.3583L2.08331 11.0667C1.01665 7.75833 1.89998 6.00833 5.20831 4.94167L6.52498 4.50833C6.86665 4.4 7.19165 4.30833 7.49998 4.25C7.24998 4.75833 7.04998 5.375 6.88331 6.08333L6.06665 9.575C5.24998 13.0583 6.32498 14.775 9.79998 15.6L11.2 15.9333C11.6833 16.05 12.1333 16.125 12.55 16.1583Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.5333 7.10834L14.575 8.13334" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.71667 10.3333L12.1333 10.95" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.4667 4.24999C18.3667 5.24999 18.525 6.68332 18.05 8.69999L17.2333 12.1833C16.5333 15.1917 15.15 16.4083 12.55 16.1583C12.1333 16.125 11.6833 16.05 11.2 15.9333L9.79999 15.6C6.32499 14.775 5.24999 13.0583 6.06665 9.57499L6.88332 6.08332C7.04999 5.37499 7.24999 4.75832 7.49999 4.24999C8.47499 2.23332 10.1333 1.69165 12.9167 2.34999L14.3083 2.67499" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    name: "Hồ sơ xin việc",
                    url: "/ung-vien/ho-so-xin-viec",
                    menuLevel3: [
                        {
                            nameLeft: "CV xin việc",
                            nameRight: !isExperiment ? "File tải lên" : "",
                            urlLeft: "/ung-vien/CV-xin-viec",
                            urlRight: !isExperiment ? "/ung-vien/tai-len-ho-so" : ""
                        }
                    ]
                },
                {
                    id: 3,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="7.50001" cy="7.50001" r="1.66667" stroke="#3582CD" strokeWidth="1.5" />
                            <path d="M10.8333 12.5C10.8333 13.4205 10.8333 14.1666 7.49999 14.1666C4.16666 14.1666 4.16666 13.4205 4.16666 12.5C4.16666 11.5795 5.65904 10.8333 7.49999 10.8333C9.34094 10.8333 10.8333 11.5795 10.8333 12.5Z" stroke="#3582CD" strokeWidth="1.5" />
                            <path d="M1.66666 10C1.66666 6.85731 1.66666 5.28596 2.64297 4.30965C3.61928 3.33334 5.19063 3.33334 8.33332 3.33334H11.6667C14.8094 3.33334 16.3807 3.33334 17.357 4.30965C18.3333 5.28596 18.3333 6.85731 18.3333 10C18.3333 13.1427 18.3333 14.7141 17.357 15.6904C16.3807 16.6667 14.8094 16.6667 11.6667 16.6667H8.33332C5.19063 16.6667 3.61928 16.6667 2.64297 15.6904C1.66666 14.7141 1.66666 13.1427 1.66666 10Z" stroke="#3582CD" strokeWidth="1.5" />
                            <path d="M15.8333 10H12.5" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M15.8333 7.5H11.6667" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M15.8333 12.5H13.3333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    ),
                    name: "Hoàn thiện hồ sơ",
                    url: "",
                    menuLevel3: [
                        {
                            nameLeft: `Tiến trình hoàn thiện hồ sơ ${percentHoSo ? percentHoSo + "%" : "0%"}`,
                            nameRight: "",
                            urlLeft: "/ung-vien/ho-so-xin-viec", // Sửa url
                            urlRight: ""
                        }
                    ]
                },
                {
                    id: 5,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.8083 11.6667L18.0917 8.69167C18.3083 6.65833 17.725 5 14.1667 5H5.83333C2.275 5 1.69166 6.65833 1.91666 8.69167L2.54166 15.3583C2.71666 16.9917 3.31666 18.3333 6.66666 18.3333H13.3333C16.6833 18.3333 17.2833 16.9917 17.4583 15.3583" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.66666 5.00002V4.33335C6.66666 2.85835 6.66666 1.66669 9.33332 1.66669H10.6667C13.3333 1.66669 13.3333 2.85835 13.3333 4.33335V5.00002" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.6667 10.8333V11.6667C11.6667 11.675 11.6667 11.675 11.6667 11.6833C11.6667 12.5917 11.6583 13.3333 10 13.3333C8.35001 13.3333 8.33334 12.6 8.33334 11.6917V10.8333C8.33334 10 8.33334 10 9.16668 10H10.8333C11.6667 10 11.6667 10 11.6667 10.8333Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.0417 9.16669C16.1167 10.5667 13.9167 11.4 11.6667 11.6834" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.18332 9.39166C4.05832 10.675 6.17499 11.45 8.33332 11.6917" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    name: "Việc làm đã ứng tuyển",
                    url: "/ung-vien/viec-lam-da-ung-tuyen",
                    menuLevel3: []
                },
                {
                    id: 6,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M18.3333 7.50002C18.3333 3.33335 16.6667 1.66669 12.5 1.66669H7.49999C3.33332 1.66669 1.66666 3.33335 1.66666 7.50002V12.5C1.66666 16.6667 3.33332 18.3334 7.49999 18.3334H12.5C16.6667 18.3334 18.3333 16.6667 18.3333 12.5V10.8084" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.83334 4.15832V2.03333" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.1667 2.03333V10.35C14.1667 11.9917 12.9917 12.6333 11.55 11.7667L10.45 11.1083C10.2 10.9583 9.80001 10.9583 9.55001 11.1083L8.45001 11.7667C7.00834 12.625 5.83334 11.9917 5.83334 10.35V7.49999" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    name: "Việc làm đã lưu",
                    url: "/ung-vien/viec-lam-da-luu",
                    menuLevel3: []
                },
                {
                    id: 7,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4.16666 8.33335H5.83333C7.5 8.33335 8.33333 7.50002 8.33333 5.83335V4.16669C8.33333 2.50002 7.5 1.66669 5.83333 1.66669H4.16666C2.5 1.66669 1.66666 2.50002 1.66666 4.16669V5.83335C1.66666 7.50002 2.5 8.33335 4.16666 8.33335Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.1667 8.33335H15.8333C17.5 8.33335 18.3333 7.50002 18.3333 5.83335V4.16669C18.3333 2.50002 17.5 1.66669 15.8333 1.66669H14.1667C12.5 1.66669 11.6667 2.50002 11.6667 4.16669V5.83335C11.6667 7.50002 12.5 8.33335 14.1667 8.33335Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.1667 18.3334H15.8333C17.5 18.3334 18.3333 17.5 18.3333 15.8334V14.1667C18.3333 12.5 17.5 11.6667 15.8333 11.6667H14.1667C12.5 11.6667 11.6667 12.5 11.6667 14.1667V15.8334C11.6667 17.5 12.5 18.3334 14.1667 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.16666 18.3334H5.83333C7.5 18.3334 8.33333 17.5 8.33333 15.8334V14.1667C8.33333 12.5 7.5 11.6667 5.83333 11.6667H4.16666C2.5 11.6667 1.66666 12.5 1.66666 14.1667V15.8334C1.66666 17.5 2.5 18.3334 4.16666 18.3334Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    name: "Quản lý tài khoản",
                    url: "",
                    menuLevel3: [
                        {
                            nameLeft: "Đổi mật khẩu",
                            nameRight: "Thông tin cá nhân",
                            urlLeft: "/ung-vien/doi-mat-khau",
                            urlRight: "/ung-vien/ho-so-xin-viec"
                        },
                    ]
                }
            ]
        },
    ];
    // --- Kết thúc dữ liệu menu ---

    const [activeLevel1, setActiveLevel1] = useState(null);
    const [activeLevel2, setActiveLevel2] = useState(null);
    const [expandedItems, setExpandedItems] = useState([]);
    const [isLogout, setIsLogout] = useState(!mockIsLoggedIn); // Dùng mock data

    const handleLevel1Click = (index) => {
        setActiveLevel1((prevActiveLevel1) =>
            prevActiveLevel1 === index ? null : index
        );
        setActiveLevel2(null);
    };

    const handleLevel2Click = (index) => {
        setActiveLevel2((prevActiveLevel2) =>
            prevActiveLevel2 === index ? null : index
        );
    };

    const toggleItem = (index) => {
        setExpandedItems((prevExpandedItems) => {
            if (prevExpandedItems.includes(index)) {
                return prevExpandedItems.filter((item) => item !== index);
            } else {
                return [index];
            }
        });
    };

    // Hàm render menu con (UI logic)
    const renderChildItems = (listObjChildren) => {
        if (!listObjChildren || listObjChildren.length === 0) {
            return null;
        }

        return (
            <div className={sMenu["menu-item-child"]}>
                {listObjChildren.map((child, index) => (
                    <div key={index} className={sMenu["item-child"]}>
                        {child.itemRight ? (
                            <>
                                <div
                                    className={sMenu["item-left"]}
                                    onClick={() => {
                                        if (child?.hrefLeft) window.location.href = child.hrefLeft;
                                    }}
                                >
                                    <p>{child.itemLeft}</p>
                                </div>
                                <div
                                    className={sMenu["item-right"]}
                                    onClick={() => {
                                        if (child?.hrefRight) window.location.href = child.hrefRight;
                                    }}
                                >
                                    <p>{child.itemRight}</p>
                                </div>
                            </>
                        ) : (
                            <div
                                className={sMenu["item-left"]}
                                style={{ fontSize: "14px" }}
                                onClick={() => {
                                    if (child?.hrefLeft) window.location.href = child.hrefLeft;
                                }}
                            >
                                {child.itemLeft}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // Hàm giả lập (stub) cho việc bật/tắt hồ sơ
    const handleClickActiveToggle = () => {
        console.log("candiAllowSearch", candiAllowSearch, typeof candiAllowSearch);
        if (candiAllowSearch == 1) {
            // fetchSwitchAllowSearch(0);
            setCandiAllowSearch('0')
            console.log("Đã TẮT cho phép NTD tìm kiếm");
        } else {
            // fetchSwitchAllowSearch(1);
            setCandiAllowSearch('1')
            console.log("Đã BẬT cho phép NTD tìm kiếm");
        }
    };

    // Hàm render menu chính (UI logic)
    const renderMenuItems = (menuList) => {
        return menuList.map((item, index) => (
            <Fragment key={index}>
                <div
                    className={sMenu["box-content"]}
                    onClick={() => {
                        if (item?.href) window.location.href = item.href;
                        toggleItem(index);
                    }}
                >
                    <div className={sMenu["content-left"]}>
                        {item.icon}
                        <p
                            className={`${sMenu["item-name"]} ${expandedItems.includes(index) ? sMenu.active : ""
                                }`}
                        >
                            {item.name}
                        </p>
                    </div>
                    {item.listObjChildren.length > 0 && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className={`${expandedItems.includes(index) ? s["arrow-up"] : s["arrow-down"]
                                }`}
                        >
                            <path
                                d="M14.0666 11.2333C13.9 11.4 13.7026 11.4833 13.4746 11.4833C13.2466 11.4833 13.0495 11.4 12.8833 11.2333L7.99996 6.35L3.09996 11.25C2.9444 11.4056 2.74996 11.4833 2.51663 11.4833C2.28329 11.4833 2.08329 11.4 1.91663 11.2333C1.74996 11.0667 1.66663 10.8693 1.66663 10.6413C1.66663 10.4133 1.74996 10.2162 1.91663 10.05L7.53329 4.45C7.59996 4.38334 7.67218 4.336 7.74996 4.308C7.82774 4.28 7.91107 4.26623 7.99996 4.26667C8.08885 4.26667 8.17218 4.28067 8.24996 4.30867C8.32774 4.33667 8.39996 4.38378 8.46663 4.45L14.0833 10.0667C14.2388 10.2222 14.3166 10.414 14.3166 10.642C14.3166 10.87 14.2333 11.0671 14.0666 11.2333Z"
                                fill="#3582CD"
                            />
                        </svg>
                    )}
                </div>
                {expandedItems.includes(index) &&
                    renderChildItems(item.listObjChildren)}
            </Fragment>
        ));
    };

    // useEffect(() => {
    //   // Logic Cookies.get đã bị loại bỏ và thay bằng mock
    // }, [isLogout]);

    return (
        <div className={s["wrapper-sidebar"]}>
            {id && !isLogout && ( // Đã đăng nhập
                <div className={s["header-sidebar"]}>
                    <a href={`#`}>
                        <img
                            width={50}
                            height={50}
                            src={handleImageSource(ava)} // Dùng mock data
                            alt=""
                            style={{
                                width: "50px",
                                height: "50px",
                                border: "1px solid #3582cd80",
                                borderRadius: "50%"
                            }}
                            onError={(e) => {
                                e.currentTarget.src = "/images/candidate/ava_default.jpg";
                            }}
                            loading="lazy"
                            decoding="async"
                        />
                    </a>
                    <div className={s["header-info"]}>
                        <p
                            className={s["info-name"]}
                            onClick={() => alert('Xem trang cá nhân')} // Logic router đã bị loại bỏ
                            style={{
                                maxWidth: '200px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >{name}</p>
                        {mockUserType == "2" ? ( // Giao diện Ứng Viên
                            <>
                                <div className={s["info-detail"]}>
                                    <p>
                                        Account: <span>{phone && phone}</span>
                                    </p>
                                    <p>-</p>
                                    <p>
                                        ID: <span>{id}</span>
                                    </p>
                                </div>
                                <div className={sMenu["if-contact"]} style={{ display: 'flex', gap: '10px' }}>
                                    {candiAllowSearch !== "0" ? (
                                        <svg
                                            style={{ cursor: "pointer" }}
                                            onClick={handleClickActiveToggle}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="28"
                                            height="16"
                                            viewBox="0 0 28 16"
                                            fill="none"
                                            className={sMenu["img-toggle"]}
                                        >
                                            <path
                                                d="M20.5898 0H7.41016C3.32418 0 0 3.58878 0 8C0 12.4112 3.32418 16 7.41016 16H20.5898C24.6758 16 28 12.4112 28 8C28 3.58878 24.6758 0 20.5898 0ZM20.5898 14.2288C17.4085 14.2288 14.8203 11.4346 14.8203 8C14.8203 4.56549 17.4085 1.77122 20.5898 1.77122C23.7712 1.77122 26.3594 4.56549 26.3594 8C26.3594 11.4346 23.7712 14.2288 20.5898 14.2288Z"
                                                fill="#3582CD"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            style={{ cursor: "pointer" }}
                                            onClick={handleClickActiveToggle}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="28"
                                            height="16"
                                            viewBox="0 0 28 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M7.41016 0H20.5898C24.6758 0 28 3.58878 28 8C28 12.4112 24.6758 16 20.5898 16H7.41016C3.32418 16 0 12.4112 0 8C0 3.58878 3.32418 0 7.41016 0ZM7.41016 14.2288C10.5915 14.2288 13.1797 11.4346 13.1797 8C13.1797 4.56549 10.5915 1.77122 7.41016 1.77122C4.22882 1.77122 1.64062 4.56549 1.64062 8C1.64062 11.4346 4.22882 14.2288 7.41016 14.2288Z"
                                                fill="#8B8B8B"
                                            />
                                        </svg>
                                    )}
                                    <p>{"Hiển thị hồ sơ của tôi"}</p>
                                </div>
                            </>
                        ) : ( // Giao diện Nhà Tuyển Dụng
                            <div className={sMenu["box-info-company"]}>
                                <div className={sMenu["info-point"]}>
                                    {!isExperiment && <p>
                                        Điểm lọc hồ sơ: <span>{point}</span>
                                    </p>}
                                    <p>
                                        ID: <span>{id}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* --- DANH SÁCH MENU --- */}

            {/* Menu Ứng Viên (đã đăng nhập) */}
            {id && !isLogout && mockUserType == "2" &&
                listMenuPersonSidebar.map((item, index) => {
                    return (
                        <div className={s["section-sidebar"]} key={index}>
                            <div
                                className={s["section-main"]}
                                onClick={() => {
                                    handleLevel1Click(index);
                                    if(item?.url) window.location.href = item.url;
                                }}
                            >
                                <div className={s["info-main"]}>
                                    {item.icon}
                                    <p className={`${activeLevel1 === index ? s["t-xanh"] : ""}`}>
                                        {item.name}
                                    </p>
                                </div>
                                {(item.menuLevel1.length > 0 || item.menuLevel2.length > 0) && (
                                    <svg
                                        style={{ transform: activeLevel1 === index ? "rotate(0deg)" : "rotate(180deg)" }}
                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    >
                                        <path d="M1.93333 4.76666C2.1 4.6 2.29733 4.51666 2.52533 4.51666C2.75333 4.51666 2.95044 4.6 3.11667 4.76666L8 9.65L12.9 4.75C13.0556 4.59444 13.25 4.51666 13.4833 4.51666C13.7167 4.51666 13.9167 4.6 14.0833 4.76666C14.25 4.93333 14.3333 5.13066 14.3333 5.35866C14.3333 5.58666 14.25 5.78377 14.0833 5.95L8.46667 11.55C8.4 11.6167 8.32778 11.664 8.25 11.692C8.17222 11.72 8.08889 11.7338 8 11.7333C7.91111 11.7333 7.82778 11.7193 7.74998 11.6913C7.6722 11.6633 7.59998 11.6162 7.53331 11.55L1.91665 5.93333C1.76111 5.77777 1.68331 5.586 1.68331 5.358C1.68331 5.13 1.76665 4.93288 1.93331 4.76666Z" fill="#3582CD" />
                                    </svg>
                                )}
                            </div>
                            {item.menuLevel2.length > 0 && activeLevel1 === index && (
                                <>
                                    {item.menuLevel2.map((item2, index2) => {
                                        return (
                                            <Fragment key={index2}>
                                                <div
                                                    className={s[`content-item`]}
                                                    onClick={() => {
                                                        handleLevel2Click(index2);
                                                        if(item2.url) window.location.href = item2.url;
                                                    }}
                                                >
                                                    <div className={s["item-menu-parent"]}>
                                                        {item2.icon}
                                                        <p className={`${activeLevel2 === index2 ? s["t-xanh"] : ""}`}>
                                                            {item2.name}
                                                        </p>
                                                    </div>
                                                    {item2.menuLevel3.length > 0 && (
                                                        <svg
                                                            style={{ transform: activeLevel2 === index2 ? "rotate(0deg)" : "rotate(180deg)" }}
                                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        >
                                                            <path d="M1.93331 4.76666C2.09998 4.6 2.29731 4.51666 2.52531 4.51666C2.75331 4.51666 2.95042 4.6 3.11665 4.76666L7.99998 9.65L12.9 4.75C13.0555 4.59444 13.25 4.51666 13.4833 4.51666C13.7166 4.51666 13.9166 4.6 14.0833 4.76666C14.25 4.93333 14.3333 5.13066 14.3333 5.35866C14.3333 5.58666 14.25 5.78377 14.0833 5.95L8.46665 11.55C8.39998 11.6167 8.32776 11.664 8.24998 11.692C8.1722 11.72 8.08887 11.7338 7.99998 11.7333C7.91109 11.7333 7.82776 11.7193 7.74998 11.6913C7.6722 11.6633 7.59998 11.6162 7.53331 11.55L1.91665 5.93333C1.76111 5.77777 1.68331 5.586 1.68331 5.358C1.68331 5.13 1.76665 4.93288 1.93331 4.76666Z" fill="#3582CD" />
                                                        </svg>
                                                    )}
                                                </div>
                                                {item2.menuLevel3.length > 0 && activeLevel2 === index2 && (
                                                    <div className={s["content-item-children"]}>
                                                        {item2.menuLevel3.map((item3, index) => {
                                                            return (
                                                                <div className={s["container-item-children"]} key={index}>
                                                                    <a href={item3.urlLeft}>
                                                                        <div className={s["item-left"]}>
                                                                            <p>{item3.nameLeft}</p>
                                                                        </div>
                                                                    </a>
                                                                    <a href={item3.urlRight}>
                                                                        <div className={s["item-right"]}>
                                                                            <p>{item3.nameRight}</p>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </>
                            )}
                            {item.menuLevel1.length > 0 && activeLevel1 === index && (
                                <div className={s["content-item-children"]}>
                                    {item.menuLevel1.map((item3, index) => {
                                        return (
                                            <div className={s["container-item-children"]} key={index}>
                                                <div className={s["item-left"]} onClick={() => { if(item3?.urlLeft) window.location.href = item3.urlLeft }}>
                                                    <p>{item3.nameLeft}</p>
                                                </div>
                                                <div className={s["item-right"]} onClick={() => { if(item3?.urlRight) window.location.href = item3.urlRight }}>
                                                    <p>{item3.nameRight}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

            {/* Menu Nhà Tuyển Dụng (đã đăng nhập) */}
            {id && !isLogout && mockUserType == "1" && renderMenuItems(listMenuCompany)}

            {/* Menu Chưa Đăng Nhập */}
            {isLogout && (
                <>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <p style={{ fontSize: "18px", fontWeight: "550", color: "#4c83ce" }}>
                            Đăng nhập để kết nối
                        </p>
                    </div>
                    {renderMenuItems(listMenuNotAuth)}
                </>
            )}

            {/* Nút Đăng xuất */}
            {id && !isLogout && (
                <div className={s["logout"]}>
                    <div
                        className={s["content-value"]}
                        onClick={() => {
                            logOut(); // Hàm stub
                            setIsLogout(true);
                            if (closeMenuSidebar) closeMenuSidebar();
                            alert("Đăng xuất!");
                            // window.location.reload() // Bỏ comment nếu muốn tải lại trang
                        }}
                    >
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
            )}
        </div>
    );
};

export default MenuSidebar;