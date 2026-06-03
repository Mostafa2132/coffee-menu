import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export async function seedSampleData() {
  const supabase = createSupabaseBrowserClient();

  // ─── تصنيفات ───────────────────────────────────────────────────────────────
  const categories = [
    { name: "قهوة سادة",   slug: "plain-coffee",   sort_order: 1 },
    { name: "قهوة ممزوجة", slug: "blended-coffee",  sort_order: 2 },
    { name: "قهوة مثلجة",  slug: "iced-coffee",     sort_order: 3 },
    { name: "شاي",         slug: "tea",             sort_order: 4 },
    { name: "عصائر",       slug: "juices",          sort_order: 5 },
    { name: "حلويات",      slug: "desserts",        sort_order: 6 },
  ];

  for (const category of categories) {
    const { error } = await supabase
      .from("categories")
      .upsert(category, { onConflict: "slug" });
    if (error) console.error("Error seeding category:", error);
  }

  // جلب التصنيفات
  const { data: categoryData } = await supabase
    .from("categories")
    .select("id, slug");

  const categoryMap = new Map(
    categoryData?.map((c) => [c.slug, c.id]) || []
  );

  // ─── منتجات ────────────────────────────────────────────────────────────────
  const products = [
    // ── قهوة سادة (4 منتجات) ──────────────────────────────────────────────
    {
      title: "إسبريسو",
      slug: "espresso",
      description: "جرعة مركّزة من أجود حبوب القهوة المختارة",
      price: 15,
      category_id: categoryMap.get("plain-coffee"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=600&fit=crop", // Real espresso shot
    },
    {
      title: "أمريكانو",
      slug: "americano",
      description: "إسبريسو ممزوج بالماء الساخن بنسبة مثالية",
      price: 20,
      category_id: categoryMap.get("plain-coffee"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&h=600&fit=crop", // Real Americano
    },
    {
      title: "ريستريتو",
      slug: "ristretto",
      description: "أقوى من الإسبريسو وأكثر تركيزاً وعمقاً",
      price: 18,
      category_id: categoryMap.get("plain-coffee"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1508089456569-8db2c9e782ea?w=600&h=600&fit=crop", // Ristretto / small shot
    },
    {
      title: "لونغو",
      slug: "lungo",
      description: "إسبريسو طويل بنكهة أخف وحجم أكبر",
      price: 17,
      category_id: categoryMap.get("plain-coffee"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&h=600&fit=crop", // Black coffee lungo
    },

    // ── قهوة ممزوجة (5 منتجات) ────────────────────────────────────────────
    {
      title: "لاتيه",
      slug: "latte",
      description: "إسبريسو مع حليب مبخّر وطبقة كريمة ناعمة",
      price: 25,
      category_id: categoryMap.get("blended-coffee"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&h=600&fit=crop", // Latte art
    },
    {
      title: "كابتشينو",
      slug: "cappuccino",
      description: "إسبريسو مع رغوة الحليب بنسبة متوازنة كلاسيكية",
      price: 28,
      category_id: categoryMap.get("blended-coffee"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&h=600&fit=crop", // Cappuccino with foam
    },
    {
      title: "موكا",
      slug: "mocha",
      description: "إسبريسو مع الشوكولاته والحليب المبخّر",
      price: 30,
      category_id: categoryMap.get("blended-coffee"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&h=600&fit=crop", // Mocha with chocolate
    },
    {
      title: "فلات وايت",
      slug: "flat-white",
      description: "إسبريسو مزدوج مع حليب مخملي قليل الرغوة",
      price: 27,
      category_id: categoryMap.get("blended-coffee"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&h=600&fit=crop", // Flat white
    },
    {
      title: "ماكياتو",
      slug: "macchiato",
      description: "إسبريسو مع ملعقة صغيرة من رغوة الحليب",
      price: 22,
      category_id: categoryMap.get("blended-coffee"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&h=600&fit=crop", // Macchiato
    },

    // ── قهوة مثلجة (4 منتجات) ─────────────────────────────────────────────
    {
      title: "آيس لاتيه",
      slug: "iced-latte",
      description: "لاتيه بارد منعش مع الثلج الطازج",
      price: 28,
      category_id: categoryMap.get("iced-coffee"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&h=600&fit=crop", // Iced Latte
    },
    {
      title: "آيس أمريكانو",
      slug: "iced-americano",
      description: "أمريكانو مثلج بنكهة قهوة قوية ومنعشة",
      price: 22,
      category_id: categoryMap.get("iced-coffee"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=600&h=600&fit=crop", // Iced Americano
    },
    {
      title: "كولد برو",
      slug: "cold-brew",
      description: "قهوة مستخلصة بالبرودة لمدة 12 ساعة لنكهة أعمق",
      price: 32,
      category_id: categoryMap.get("iced-coffee"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop", // Cold brew
    },
    {
      title: "فرابتشينو قهوة",
      slug: "coffee-frappuccino",
      description: "مزيج مثلج من القهوة والحليب والكراميل",
      price: 35,
      category_id: categoryMap.get("iced-coffee"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1662047913374-297eb0ccab9c?w=600&h=600&fit=crop", // Frappuccino
    },

    // ── شاي (4 منتجات) ────────────────────────────────────────────────────
    {
      title: "شاي أخضر",
      slug: "green-tea",
      description: "شاي أخضر ياباني غني بمضادات الأكسدة",
      price: 18,
      category_id: categoryMap.get("tea"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1627492275510-189f71c46399?w=600&h=600&fit=crop", // Green tea
    },
    {
      title: "شاي أسود",
      slug: "black-tea",
      description: "شاي أسود تقليدي بنكهة قوية ومميزة",
      price: 15,
      category_id: categoryMap.get("tea"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&h=600&fit=crop", // Black tea cup
    },
    {
      title: "شاي مراكشي",
      slug: "moroccan-tea",
      description: "شاي أخضر بالنعناع الطازج على الطريقة المغربية",
      price: 20,
      category_id: categoryMap.get("tea"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop", // Moroccan mint tea
    },
    {
      title: "شاي كرك",
      slug: "karak-tea",
      description: "شاي هندي مع بهارات الهيل والزنجبيل والحليب",
      price: 22,
      category_id: categoryMap.get("tea"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&h=600&fit=crop", // Chai / Karak tea
    },

    // ── عصائر (4 منتجات) ─────────────────────────────────────────────────
    {
      title: "عصير برتقال",
      slug: "orange-juice",
      description: "برتقال طازج معصور أمامك لحظياً",
      price: 20,
      category_id: categoryMap.get("juices"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&h=600&fit=crop", // Orange juice
    },
    {
      title: "عصير ليمون بالنعناع",
      slug: "lemon-mint-juice",
      description: "ليمون حامض منعش مع النعناع والثلج",
      price: 18,
      category_id: categoryMap.get("juices"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=600&fit=crop", // Lemon mint
    },
    {
      title: "عصير مانجو",
      slug: "mango-juice",
      description: "مانجو طبيعية 100% بدون إضافات",
      price: 25,
      category_id: categoryMap.get("juices"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=600&fit=crop", // Mango juice
    },
    {
      title: "سموذي توت",
      slug: "berry-smoothie",
      description: "مزيج من التوت الأحمر والأزرق مع الزبادي",
      price: 30,
      category_id: categoryMap.get("juices"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1553530666-ba11a90a3c39?w=600&h=600&fit=crop", // Berry smoothie
    },

    // ── حلويات (5 منتجات) ────────────────────────────────────────────────
    {
      title: "تشيز كيك",
      slug: "cheesecake",
      description: "تشيز كيك كريمي بقاعدة البسكويت الهشة",
      price: 35,
      category_id: categoryMap.get("desserts"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=600&fit=crop", // Cheesecake
    },
    {
      title: "كرواسون",
      slug: "croissant",
      description: "كرواسون فرنسي أصيل مقرمش من الخارج طري من الداخل",
      price: 12,
      category_id: categoryMap.get("desserts"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808d?w=600&h=600&fit=crop", // Croissant
    },
    {
      title: "براوني شوكولاتة",
      slug: "chocolate-brownie",
      description: "براوني غني بالشوكولاتة الداكنة الفاخرة",
      price: 22,
      category_id: categoryMap.get("desserts"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop", // Brownie
    },
    {
      title: "تيراميسو",
      slug: "tiramisu",
      description: "حلوى إيطالية بالقهوة والكريمة ومسحوق الكاكاو",
      price: 38,
      category_id: categoryMap.get("desserts"),
      available: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=600&fit=crop", // Tiramisu
    },
    {
      title: "كيك الريد فيلفيت",
      slug: "red-velvet-cake",
      description: "كعكة الريد فيلفيت مع كريمة الجبن البيضاء",
      price: 40,
      category_id: categoryMap.get("desserts"),
      available: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&h=600&fit=crop", // Red velvet
    },
  ];

  for (const product of products) {
    const { error } = await supabase
      .from("products")
      .upsert(product, { onConflict: "slug" });
    if (error) console.error("Error seeding product:", error);
  }

  // ─── إعدادات افتراضية ──────────────────────────────────────────────────────
  const { error: settingsError } = await supabase
    .from("settings")
    .upsert(
      {
        id: 1,
        store_name: "كافيه كوفي",
        address: "شارع الملك فهد، الرياض",
        phone: "+966501234567",
        opening_hours: "8:00 ص — 12:00 م",
        instagram: "https://instagram.com/coffeecoffee",
        facebook: "https://facebook.com/coffeecoffee",
        tiktok: "https://tiktok.com/@coffeecoffee",
      },
      { onConflict: "id" }
    );

  if (settingsError) console.error("Error seeding settings:", settingsError);

  return { success: true };
}
