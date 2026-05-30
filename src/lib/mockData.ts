import { type ArtworkDocument, type BlogDocument } from '@/types';

export const mockArtworks: ArtworkDocument[] = [
  {
    _id: 'art-1',
    _type: 'artwork',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: {
      vi: 'Hoa Sen Trong Tĩnh Lặng',
      en: 'Lotus in Silence',
    },
    slug: {
      _type: 'slug',
      current: 'lotus-in-silence',
    },
    excerpt: {
      vi: 'Một sự suy tư về sự thanh khiết và tĩnh lặng của buổi sớm mai, được dệt vẽ trên lụa tơ tằm tự nhiên.',
      en: 'A meditation on purity and early dawn quietude, painted patiently on raw organic silk.',
    },
    description: {
      vi: 'Tác phẩm "Hoa Sen Trong Tĩnh Lặng" được hoàn thiện sau nhiều tuần suy ngẫm và thực hành chánh niệm. Sử dụng các hạt màu khoáng tự nhiên xếp lớp tỉ mỉ trên nền lụa tơ tằm mộc mạc, tạo nên những khoảng mờ ảo diệu. Chất lụa mỏng manh cho phép ánh sáng tự nhiên xuyên thấu, biến đổi sắc thái tác phẩm theo từng thời khắc trong ngày. Đây không chỉ là một bức tranh, mà là một lời mời gọi quay về với hơi thở và sự bình yên nội tại.',
      en: 'Lotus in Silence was painted over several weeks of quiet contemplation and mindfulness. Layering natural mineral pigments onto raw organic silk allows the natural weave of the fabric to breathe through. The delicate transparency of the silk catches natural light, gently shifting the artwork\'s mood from dawn to dusk. It serves not as a mere decoration, but as a silent invitation to return to one\'s breath and inner stillness.',
    },
    category: 'silk-painting',
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-lotus-hero',
          _type: 'reference',
        },
        // High quality serene minimalist lotus image
        alt_vi: 'Tranh lụa Hoa Sen Trong Tĩnh Lặng - góc nhìn trực diện',
        alt_en: 'Lotus in Silence silk painting - front hero view',
      },
      {
        _type: 'image',
        asset: {
          _ref: 'image-lotus-detail',
          _type: 'reference',
        },
        alt_vi: 'Chi tiết sợi lụa và hạt màu khoáng tự nhiên',
        alt_en: 'Close up of organic silk fibers and mineral pigments',
      },
      {
        _type: 'image',
        asset: {
          _ref: 'image-lotus-room',
          _type: 'reference',
        },
        alt_vi: 'Tác phẩm được treo trong phòng thiền phong cách tối giản',
        alt_en: 'Lotus in Silence installed in a minimalist meditation room',
      },
    ],
    dimensions: {
      vi: '80 x 100 cm (chưa khung)',
      en: '80 x 100 cm (unframed)',
    },
    materials: {
      vi: 'Màu khoáng tự nhiên trên lụa tơ tằm nguyên bản',
      en: 'Natural mineral pigments on organic raw silk',
    },
    price: 35000000,
    currency: 'VND',
    status: 'available',
    featured: true,
    seo: {
      title: {
        vi: 'Tranh Lụa Hoa Sen Trong Tĩnh Lặng | Kayla Nguyen',
        en: 'Lotus in Silence Silk Painting | Kayla Nguyen',
      },
      description: {
        vi: 'Tác phẩm nghệ thuật vẽ lụa tơ tằm độc bản lấy cảm hứng từ thiền định, chánh niệm và vẻ đẹp dung dị của thiên nhiên.',
        en: 'Unique silk wall art inspired by meditation, Zen, and the organic textures of raw silk.',
      },
    },
  },
  {
    _id: 'art-2',
    _type: 'artwork',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: {
      vi: 'Thì Thầm Của Đất',
      en: 'Earthly Whispers',
    },
    slug: {
      _type: 'slug',
      current: 'earthly-whispers',
    },
    excerpt: {
      vi: 'Tác phẩm điêu khắc đắp nổi ba chiều đầy xúc giác từ cát mịn và thạch cao trắng.',
      en: 'A tactile three-dimensional sculptural painting built from sand and plaster.',
    },
    description: {
      vi: '"Thì Thầm Của Đất" là một cuộc khám phá xúc giác về cấu trúc địa hình và sự chuyển động vô hình của gió trên bề mặt cát. Được đắp nổi hoàn toàn bằng tay trên vải canvas dày thông qua sự kết hợp giữa cát mịn, thạch cao tự nhiên và màu nước acrylic tông ấm. Bề mặt nhám thô ráp tạo nên bóng đổ sâu thẳm dưới ánh sáng bên hông, mang đến cho không gian một sự ấm áp, mộc mạc và tĩnh lặng tối đa.',
      en: 'Earthly Whispers is a tactile exploration of topography and the unseen movements of wind over sand. Hand-sculpted over canvas using dynamic plaster techniques, organic sand, and warm natural pigments. The rough, organic surface creates profound light shadows when lit from the side, instilling a warm, grounded, and rustic quietude into modern living spaces.',
    },
    category: 'sculptural-painting',
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-earth-hero',
          _type: 'reference',
        },
        alt_vi: 'Tranh đắp nổi Thì Thầm Của Đất - góc nhìn trực diện',
        alt_en: 'Earthly Whispers sculptural painting - front view',
      },
      {
        _type: 'image',
        asset: {
          _ref: 'image-earth-detail',
          _type: 'reference',
        },
        alt_vi: 'Chi tiết độ nổi thạch cao thô ráp',
        alt_en: 'Detailed close up of tactile plaster and sand texture',
      },
      {
        _type: 'image',
        asset: {
          _ref: 'image-earth-room',
          _type: 'reference',
        },
        alt_vi: 'Tác phẩm treo trên bàn gỗ sồi thô mộc',
        alt_en: 'Artwork hung above a rustic oak console table',
      },
    ],
    dimensions: {
      vi: '120 x 120 cm (đã căng khung gỗ)',
      en: '120 x 120 cm (stretched canvas)',
    },
    materials: {
      vi: 'Thạch cao đắp nổi, cát tự nhiên, acrylic trên vải canvas',
      en: 'Sculptural plaster, organic sand, acrylic on canvas',
    },
    price: 48000000,
    currency: 'VND',
    status: 'available',
    featured: true,
    seo: {
      title: {
        vi: 'Tranh Đắp Nổi Thì Thầm Của Đất | Kayla Nguyen',
        en: 'Earthly Whispers Sculptural Painting | Kayla Nguyen',
      },
      description: {
        vi: 'Tranh đắp nổi thạch cao thô mộc tối giản phong cách Japandi và Wabi-sabi.',
        en: 'Minimalist white plaster wall art capturing organic shadows. Japandi & Wabi-Sabi style.',
      },
    },
  },
  {
    _id: 'art-3',
    _type: 'artwork',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: {
      vi: 'Dưới Bóng Cây Bồ Đề',
      en: 'Under the Bodhi Tree',
    },
    slug: {
      _type: 'slug',
      current: 'under-the-bodhi-tree',
    },
    excerpt: {
      vi: 'Bức tranh tôn vinh sự giác ngộ tĩnh lặng và năng lượng từ hòa dưới bóng lá xanh mướt.',
      en: 'An artwork honoring silent enlightenment and loving-kindness under the sacred leaves.',
    },
    description: {
      vi: 'Khắc họa khoảnh khắc thiền định tự tại sâu thẳm của Đức Phật dưới tàng cây cổ thụ. Tác phẩm kết hợp kỹ thuật vẽ mịn màu tự nhiên trên nền vải truyền thống và dát vàng lá 24k tinh xảo. Ánh kim loại vàng bắt sáng nhẹ nhàng dưới ánh đèn vàng ấm, tạo nên một không gian linh thiêng, ấm cúng và đầy bình an cho ngôi nhà.',
      en: 'Capturing the deep, serene moment of meditation beneath the ancient Bodhi canopy. This artwork combines fine line brushwork with genuine 24k gold leaf detailing. The golden accents catch soft ambient light in the evening, creating a peaceful, sacred sanctuary in your home.',
    },
    category: 'buddhist-art',
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-bodhi-hero',
          _type: 'reference',
        },
        alt_vi: 'Tranh Phật Giáo Dưới Bóng Cây Bồ Đề - góc trực diện',
        alt_en: 'Under the Bodhi Tree Buddhist painting - front view',
      },
      {
        _type: 'image',
        asset: {
          _ref: 'image-bodhi-detail',
          _type: 'reference',
        },
        alt_vi: 'Chi tiết dát vàng lá 24k bắt sáng',
        alt_en: 'Detailed close up of catch-light 24k gold leaf gilding',
      },
    ],
    dimensions: {
      vi: '90 x 90 cm',
      en: '90 x 90 cm',
    },
    materials: {
      vi: 'Màu khoáng và vàng lá 24k dát tay trên vải thô sợi tự nhiên',
      en: 'Mineral pigment and 24k gold leaf on raw organic canvas',
    },
    price: 39000000,
    currency: 'VND',
    status: 'commission-open',
    featured: true,
    seo: {
      title: {
        vi: 'Tranh Phật Giáo Dưới Bóng Cây Bồ Đề | Kayla Nguyen',
        en: 'Under the Bodhi Tree Buddhist Art | Kayla Nguyen',
      },
      description: {
        vi: 'Tranh Phật dát vàng lá nghệ thuật tối giản, sang trọng và tràn đầy năng lượng bình an.',
        en: 'Serene Buddhist art with 24k hand-gilded gold leaf detailing. Inspires deep peace.',
      },
    },
  },
  {
    _id: 'art-4',
    _type: 'artwork',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: {
      vi: 'Vòng Cát Tròn Trắng',
      en: 'White Circular Sand',
    },
    slug: {
      _type: 'slug',
      current: 'white-circular-sand',
    },
    excerpt: {
      vi: 'Tác phẩm đặt riêng hoàn thiện cho không gian thiền của một căn hộ Japandi tại Hà Nội.',
      en: 'A custom-tailored commission created for a private minimalist home in Hanoi.',
    },
    description: {
      vi: 'Được đặt hàng thiết kế riêng dựa trên không gian nội thất mộc mạc và câu chuyện về vòng tròn thiền Enso biểu tượng cho sự trọn vẹn, vô thường. Tác phẩm mang tông màu kem ngà nhẹ nhàng, tích hợp bột cát sông tự nhiên để tạo chiều sâu xúc giác mộc mạc tối đa. Tác phẩm thể hiện sự hợp tác hài hòa tuyệt đối giữa tâm hồn người nghệ sĩ và không gian sống của nhà sưu tập.',
      en: 'Comcommissioned specifically for a serene home interior, inspired by the Zen Enso circle symbolizing wholeness, empty space, and impermanence. Formulated with sand collected from local rivers, layered over a soft ivory backdrop. It stands as a harmonious dialogue between the collector\'s space and the artist\'s patient hand.',
    },
    category: 'commissioned',
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-sand-hero',
          _type: 'reference',
        },
        alt_vi: 'Tranh vòng cát trắng tối giản Enso',
        alt_en: 'Minimalist white sand circular Enso artwork',
      },
    ],
    dimensions: {
      vi: '100 x 100 cm',
      en: '100 x 100 cm',
    },
    materials: {
      vi: 'Cát mịn tự nhiên, thạch cao và acrylic trên nền vải thô',
      en: 'Organic river sand, plaster, and acrylic on raw canvas',
    },
    price: 36000000,
    currency: 'VND',
    status: 'sold',
    featured: false,
    seo: {
      title: {
        vi: 'Tranh Đặt Riêng Vòng Cát Tròn Trắng | Kayla Nguyen',
        en: 'White Circular Sand Commission | Kayla Nguyen',
      },
      description: {
        vi: 'Tác phẩm tranh đặt riêng Enso phong cách Wabi-sabi thanh tịnh.',
        en: 'Bespoke Enso sand painting illustrating Zen mindfulness and slow Hanoi living.',
      },
    },
  },
];

export const mockBlogs: BlogDocument[] = [
  {
    _id: 'blog-1',
    _type: 'blog',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    publishedAt: '2026-05-15T09:00:00Z',
    title: {
      vi: 'Tại Sao Tôi Lựa Chọn Vẽ Trên Lụa?',
      en: 'Why I Chose Silk as My Medium',
    },
    slug: {
      _type: 'slug',
      current: 'why-i-chose-silk',
    },
    coverImage: {
      _type: 'image',
      asset: {
        _ref: 'image-blog-silk',
        _type: 'reference',
      },
      alt_vi: 'Khuôn lụa kéo căng mộc mạc trong studio',
      alt_en: 'Raw organic silk stretched in the peaceful studio',
    },
    content: {
      vi: 'Vẽ tranh trên lụa tơ tằm tự nhiên đòi hỏi một nhịp điệu hoàn toàn khác biệt so với sơn dầu hay acrylic. Lụa không cho phép sự vội vã. Mỗi lớp màu khoáng tự nhiên khi đặt lên thớ lụa sẽ thấm sâu vào từng thớ vải, tan ra và biến đổi. Nếu tâm bạn xao nhãng, nét cọ sẽ phản ánh ngay sự bất ổn ấy. Vẽ lụa là một bài thực hành chánh niệm, học cách lắng nghe hơi thở của chính mình, thả lòng và đón nhận những vết loang ngẫu nhiên đầy vẻ đẹp vô thường.',
      en: 'Painting on natural silk requires a completely different state of mind than acrylic or oils. Silk does not tolerate haste. Each layer of mineral pigment applied to the delicate fabric is absorbed deeply into the fibers, dissolving and merging. If your mind is distracted, the brushwork reflects it instantly. Painting on silk is a mindfulness practice—learning to synchronize with your breath, let go of control, and cherish the organic, impermanent bleeds of water.',
    },
    author: {
      name: 'Kayla Nguyen',
    },
    seo: {
      title: {
        vi: 'Vẽ Tranh Trên Lụa - Sự Tĩnh Lặng Đương Đại | Kayla Nguyen',
        en: 'Silk Painting as a Mindfulness Practice | Kayla Nguyen',
      },
      description: {
        vi: 'Bài chia sẻ sâu sắc về hành trình thực hành nghệ thuật chậm rãi trên chất liệu lụa tơ tằm nguyên bản.',
        en: 'Reflections on the slow, contemplative craft of silk painting in modern living.',
      },
    },
  },
  {
    _id: 'blog-2',
    _type: 'blog',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    publishedAt: '2026-05-22T10:30:00Z',
    title: {
      vi: 'Khoảng Trống Trong Ngôi Nhà Và Tâm Hồn',
      en: 'Silence as a Creative Practice',
    },
    slug: {
      _type: 'slug',
      current: 'silence-creative-practice',
    },
    coverImage: {
      _type: 'image',
      asset: {
        _ref: 'image-blog-silence',
        _type: 'reference',
      },
      alt_vi: 'Góc phòng thiền tĩnh mịch ngập tràn ánh nắng',
      alt_en: 'Tranquil meditation corner filled with soft afternoon light',
    },
    content: {
      vi: 'Trong thế giới ngập tràn tiếng ồn và những kích thích thị giác liên tục, việc tạo ra một khoảng trống tĩnh lặng trong ngôi nhà là vô cùng quan trọng. Một bức tường trống, một tác phẩm nghệ thuật dung dị mang hơi thở Wabi-sabi có thể biến căn phòng thành một chốn thiền. Tác phẩm không cần nói quá nhiều, nó nên hiện diện như một người bạn im lặng, nuôi dưỡng sự tĩnh lặng trong tâm hồn mỗi khi bạn ngồi xuống thưởng trà và ngắm nhìn ánh hoàng hôn tắt dần.',
      en: 'In a world overflowing with noise and constant visual stimulation, maintaining empty space in our homes is vital. A blank wall or a quiet, wabi-sabi artwork has the power to transform a room into a temple of rest. The artwork doesn\'t need to speak loudly; it should exist like a silent friend, nurturing inner peace every time you sit down with a warm cup of tea and watch the evening light fade.',
    },
    author: {
      name: 'Kayla Nguyen',
    },
    seo: {
      title: {
        vi: 'Tạo Không Gian Tĩnh Lặng Cho Ngôi Nhà | Kayla Nguyen',
        en: 'Creating a Sanctuary of Stillness in Your Home | Kayla Nguyen',
      },
      description: {
        vi: 'Nghệ thuật bài trí không gian tối giản Wabi-sabi giúp xoa dịu tâm hồn.',
        en: 'Exploring how minimalist artwork and spacious interiors can calm the busy mind.',
      },
    },
  },
];

// Helper to get real visual Unsplash images for our mock images
export const getMockImageUrl = (refId: string): string => {
  const imagesMap: Record<string, string> = {
    'image-lotus-hero': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop', // peaceful zen lotus look
    'image-lotus-detail': 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop', // close texture
    'image-lotus-room': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop', // clean japandi bedroom/room
    'image-earth-hero': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', // organic minimal stucco surface
    'image-earth-detail': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', // fine plaster grain sand
    'image-earth-room': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop', // console table aesthetic
    'image-bodhi-hero': 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop', // peaceful gold leaf painting theme
    'image-bodhi-detail': 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800&auto=format&fit=crop', // golden texture
    'image-sand-hero': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop', // circular zen dry landscape/sand ring
    'image-blog-silk': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop', // silk fibers texture background
    'image-blog-silence': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', // quiet sunrise beach theme
  };

  return imagesMap[refId] || 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=800&auto=format&fit=crop';
};
