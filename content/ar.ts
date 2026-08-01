export const content = {
  meta: {
    title: 'Trainify - اعثر على الكوتش المناسب لهدفك',
    description: 'منصة تربط الرياضيين بالمدربين المحترفين. اختر مدربك، اشترك بسهولة، وابدأ رحلتك الرياضية مع Trainify.',
    keywords: 'تدريب رياضي، مدرب شخصي، كوتش، لياقة بدنية، تمارين، خطة تدريب، Trainify',
  },

  hero: {
    headline: 'اعثر على المدرب المناسب لهدفك',
    subheadline: 'قارن بين المدربين، اشترك بأمان، وتابع تقدمك من مكان واحد',
    ctaPrimary: 'ابدأ الآن',
    ctaSecondary: 'انضم كمدرب',
    trustIndicators: [
      'مدفوعات آمنة',
      'متابعة مباشرة',
      'خطط تدريب احترافية',
    ],
  },

  goals: {
    title: 'إيه هدفك؟',
    items: [
      { id: 'weight-loss', label: 'خسارة الوزن', icon: '🔥' },
      { id: 'muscle-building', label: 'بناء العضلات', icon: '💪' },
      { id: 'fitness', label: 'تحسين اللياقة', icon: '🏃' },
      { id: 'nutrition', label: 'التغذية', icon: '🥗' },
      { id: 'strength', label: 'القوة', icon: '🏋️' },
    ],
  },

  coaches: {
    title: 'أفضل المدربين',
    cta: 'شوف كل المدربين',
    items: [
      {
        id: '1',
        name: 'أحمد محمد',
        specialty: 'مدرب بناء عضلات',
        headline: 'مدرب بناء عضلات معتمد',
        rating: 4.9,
        subscribers: 250,
        experience: 8,
        price: 800,
        image: '/WhatsApp Image 2026-08-01 at 9.04.47 PM (1).jpeg',
        goals: ['muscle', 'strength'],
      },
      {
        id: '2',
        name: 'سارة علي',
        specialty: 'مدربة لياقة ونحافة',
        headline: 'مدربة لياقة ونحافة معتمدة',
        rating: 4.8,
        subscribers: 180,
        experience: 6,
        price: 600,
        image: '/WhatsApp Image 2026-08-01 at 9.06.11 PM.jpeg',
        goals: ['weight-loss', 'fitness'],
      },
      {
        id: '3',
        name: 'محمد حسن',
        specialty: 'مدرب تغذية رياضية',
        headline: 'مدرب تغذية رياضية معتمد',
        rating: 4.7,
        subscribers: 150,
        experience: 9,
        price: 500,
        image: '/WhatsApp Image 2026-08-01 at 9.04.47 PM.jpeg',
        goals: ['fitness', 'nutrition'],
      },
    ],
  },

  whyTrainify: {
    title: 'ليش Trainify؟',
    features: [
      {
        icon: 'trophy',
        title: 'اختار الكوتش المناسب',
        description: 'قارن بين المدربين واختر الأنسب حسب خبرته وسعره.',
      },
      {
        icon: 'message-circle',
        title: 'متابعة في مكان واحد',
        description: 'شات، تمارين، وخطط تدريب داخل التطبيق.',
      },
      {
        icon: 'shield-check',
        title: 'مدفوعات آمنة',
        description: 'اشتراكك يتم من خلال Trainify لضمان تجربة آمنة.',
      },
      {
        icon: 'zap',
        title: 'كل شيء أسهل',
        description: 'إدارة التدريب أصبحت في مكان واحد.',
      },
    ],
  },

  howItWorks: {
    title: 'كيف يعمل Trainify؟',
    athlete: {
      title: 'للاعب',
      steps: [
        { number: '1', text: 'حمل التطبيق' },
        { number: '2', text: 'اختر الكوتش' },
        { number: '3', text: 'اشترك' },
        { number: '4', text: 'ابدأ التدريب' },
      ],
    },
    coach: {
      title: 'للمدرب',
      steps: [
        { number: '1', text: 'أنشئ حسابك' },
        { number: '2', text: 'اعرض خدماتك' },
        { number: '3', text: 'استقبل الاشتراكات' },
        { number: '4', text: 'تابع متدربيك' },
      ],
    },
  },

  trust: {
    title: 'اشترك وأنت مطمن - فلوسك محمية',
    subtitle: 'نحن نحمي حقوقك وحقوق المدرب',
    steps: [
      {
        icon: 'lock',
        title: 'الدفع من خلال Trainify',
        description: 'لن يتم تحويل قيمة الاشتراك للمدرب مباشرة',
      },
      {
        icon: 'check-circle',
        title: 'نراجع بدء التدريب',
        description: 'يقوم Trainify بمراجعة الاشتراك والتأكد من بدء التدريب',
      },
      {
        icon: 'shield',
        title: 'حماية حقوقك',
        description: 'في حالة وجود مشكلة، يقوم فريق Trainify بمراجعة الحالة وقد يشمل ذلك استرداد قيمة الاشتراك وفقًا لسياسة المنصة',
      },
      {
        icon: 'calendar',
        title: 'صرف دوري للمدربين',
        description: 'يتم صرف مستحقات المدربين كل أسبوعين بعد مراجعة الاشتراكات',
      },
    ],
    badges: [
      { icon: 'lock', text: 'Secure Payment' },
      { icon: 'shield-check', text: 'Verified Coaches' },
      { icon: 'check-circle', text: 'Protected Transactions' },
    ],
  },

  comparison: {
    title: 'ليه تشترك من خلال Trainify بدل ما تكلم المدرب مباشرة؟',
    subtitle: 'أنت مش بس بتشترك في تطبيق، أنت بتشترك في منصة تحميك وتحمي المدرب',
    items: [
      {
        without: 'تحويل مباشر بدون حماية',
        with: 'مدفوعات محمية',
      },
      {
        without: 'مفيش وسيط',
        with: 'فريق دعم متاح',
      },
      {
        without: 'مفيش مراجعة للاشتراك',
        with: 'متابعة حتى بدء التدريب',
      },
      {
        without: 'صعب تغير المدرب',
        with: 'دعم في حالة وجود مشكلة',
      },
      {
        without: 'مفيش ضمانات',
        with: 'حماية لحقوق الطرفين',
      },
    ],
  },

  screenshots: {
    title: 'شوف التطبيق من جوا',
    items: [
      {
        image: '/WhatsApp Image 2026-08-01 at 9.04.47 PM.jpeg',
        title: 'قارن بين المدربين',
        description: 'قارن بين المدربين واختر الأنسب ليك',
      },
      {
        image: '/WhatsApp Image 2026-08-01 at 9.04.08 PM (3).jpeg',
        title: 'بروفايل المدرب',
        description: 'شوف تفاصيل المدرب وتقييمات المتدربين',
      },
      {
        image: '/WhatsApp Image 2026-08-01 at 9.04.08 PM (1).jpeg',
        title: 'خطة التدريب',
        description: 'خطط تدريب مخصصة حسب هدفك',
      },
      {
        image: '/WhatsApp Image 2026-08-01 at 9.04.08 PM.jpeg',
        title: 'تمارينك',
        description: 'شاهد فيديوهات التمارين وتعليمات المدرب',
      },
      {
        image: '/WhatsApp Image 2026-08-01 at 9.06.10 PM.jpeg',
        title: 'تابع تقدمك',
        description: 'تابع تقدمك وسجل تمارينك',
      },
    ],
  },

  forCoaches: {
    title: 'هل أنت مدرب؟',
    benefits: [
      {
        icon: 'users',
        title: 'وصل لمتدربين جدد بدون الحاجة للبحث عنهم',
        description: 'متدربين يبحثون عنك، مش أنت اللي تبحث عنهم',
      },
      {
        icon: 'zap',
        title: 'ركز على التدريب واترك لنا إدارة الاشتراكات',
        description: 'نحن نهتم بالمدفوعات، أنت اهتم بالنتائج',
      },
      {
        icon: 'target',
        title: 'اعرض خدماتك أمام لاعبين يبحثون عن مدرب مناسب',
        description: 'منصة تجمع اللاعبين الجادين فقط',
      },
      {
        icon: 'dollar-sign',
        title: 'استلم مستحقاتك بشكل دوري وآمن',
        description: 'كل أسبوعين، بدون تأخير',
      },
    ],
    cta: 'انضم كمدرب',
  },

  testimonials: {
    title: 'آراء المستخدمين',
    items: [
      {
        name: 'أحمد السالم',
        role: 'لاعب كمال أجسام',
        text: 'التطبيق سهل وواضح، والكوتش ملتزم بالخطة. فرق واضح في أدائي.',
        rating: 5,
      },
      {
        name: 'سارة محمد',
        role: 'مدربة لياقة',
        text: 'منصة احترافية تسهل التواصل مع المتدربين وإدارة الاشتراكات.',
        rating: 5,
      },
      {
        name: 'خالد العتيبي',
        role: 'رياضي',
        text: 'وجدت الكوتش المناسب لي بسرعة، والمتابعة ممتازة.',
        rating: 5,
      },
    ],
  },

  faq: {
    title: 'الأسئلة الشائعة',
    items: [
      {
        question: 'كيف أختار المدرب المناسب؟',
        answer: 'تقدر تتصفح ملفات المدربين، تشوف خبرتهم وتقييماتهم وأسعارهم، وتختار اللي يناسب هدفك.',
      },
      {
        question: 'هل الدفع آمن؟',
        answer: 'نعم، كل المدفوعات تتم من خلال Trainify بشكل آمن ومشفر.',
      },
      {
        question: 'ماذا يحدث إذا لم يبدأ المدرب التدريب؟',
        answer: 'فريق Trainify يراجع كل الاشتراكات، وفي حالة عدم التزام المدرب، يتم استرداد قيمة الاشتراك حسب سياسة المنصة.',
      },
      {
        question: 'هل يمكنني تغيير المدرب؟',
        answer: 'نعم، تقدر تلغي الاشتراك وتختار مدرب ثاني حسب سياسة الإلغاء.',
      },
      {
        question: 'متى يحصل المدرب على مستحقاته؟',
        answer: 'يتم صرف مستحقات المدربين كل أسبوعين بعد مراجعة الاشتراكات والتأكد من التزامهم.',
      },
    ],
  },

  finalCta: {
    title: 'ابدأ رحلتك الرياضية اليوم',
    ctaPrimary: 'تحميل التطبيق',
    ctaSecondary: 'انضم كمدرب',
  },

  footer: {
    download: {
      title: 'حمل التطبيق',
      googlePlay: 'https://play.google.com/store',
      appStore: 'https://apps.apple.com',
    },
    links: {
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      refund: 'سياسة الاسترداد',
      support: 'الدعم',
      contact: 'تواصل معنا',
    },
    social: {
      instagram: { label: 'انستقرام', url: 'https://instagram.com/trainify' },
      tiktok: { label: 'تيك توك', url: 'https://tiktok.com/@trainify' },
      facebook: { label: 'فيسبوك', url: 'https://facebook.com/trainify' },
      twitter: { label: 'تويتر', url: 'https://twitter.com/trainify' },
    },
    contact: {
      email: 'support@trainify.app',
      phone: '+966 XX XXX XXXX',
    },
    copyright: '© 2024 Trainify. جميع الحقوق محفوظة.',
  },
};
