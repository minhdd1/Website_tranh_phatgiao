'use client';

import { useParams } from 'next/navigation';
import { type Locale } from '@/types';

const dictionary = {
  nav: {
    home: { vi: 'Trang Chủ', en: 'Home' },
    about: { vi: 'Câu Chuyện', en: 'Story' },
    gallery: { vi: 'Triển Lãm', en: 'Gallery' },
    blog: { vi: 'Nhật Ký', en: 'Journal' },
    commissions: { vi: 'Đặt Tác Phẩm', en: 'Commissions' },
    contact: { vi: 'Liên Hệ', en: 'Contact' },
  },
  footer: {
    storyText: {
      vi: 'Tranh đương đại được kiến tạo từ sự tĩnh tại, chánh niệm và chiều sâu cuộc sống.',
      en: 'Contemporary artwork inspired by stillness, mindfulness, nature, and meaningful living.',
    },
    quickLinks: { vi: 'Đường Dẫn', en: 'Quick Links' },
    categories: { vi: 'Thể Loại', en: 'Categories' },
    newsletterTitle: { vi: 'Cập nhật từ Studio', en: 'Updates from the Studio' },
    newsletterSub: { vi: 'Nhận thư tĩnh lặng định kỳ.', en: 'Subscribe to quiet studio journals.' },
    placeholder: { vi: 'Địa chỉ email...', en: 'Email address...' },
    subscribe: { vi: 'Đăng Ký', en: 'Subscribe' },
    copyright: { vi: 'Bản quyền hình ảnh thuộc về nghệ sĩ.', en: 'All rights reserved.' },
  },
  artwork: {
    viewCollection: { vi: 'Xem Bộ Sưu Tập', en: 'View Collection' },
    discoverStory: { vi: 'Đọc Câu Chuyện', en: 'Discover the Story' },
    exploreArtwork: { vi: 'Khám Phá Tác Phẩm', en: 'Explore the Artwork' },
    readJournal: { vi: 'Đọc Nhật Ký', en: 'Read the Journal' },
    commissionPiece: { vi: 'Đặt Tác Phẩm Riêng', en: 'Commission a Piece' },
    status: {
      available: { vi: 'Sẵn Sàng', en: 'Available' },
      sold: { vi: 'Bộ Sưu Tập Tư Nhân', en: 'Private Collection' },
      commissionOpen: { vi: 'Nhận Đặt Tranh', en: 'Commission Open' },
    },
    materials: { vi: 'Chất liệu', en: 'Materials' },
    dimensions: { vi: 'Kích thước', en: 'Dimensions' },
    price: { vi: 'Giá tác phẩm', en: 'Price' },
    inquireButton: { vi: 'Gửi Yêu Cầu Chi Tiết', en: 'Send Detailed Inquiry' },
  },
};

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'vi';

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = dictionary;

    for (const key of keys) {
      if (current[key] !== undefined) {
        current = current[key];
      } else {
        return keyPath; // fallback to key path if missing
      }
    }

    if (current && typeof current === 'object' && current[locale] !== undefined) {
      return current[locale];
    }

    return keyPath;
  };

  return { t, locale };
}
