import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Shield, 
  Sparkles, 
  Car, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Award,
  Users,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Data
const services = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: '3M Graphene Shield Coating',
    description: 'An ultra-thin, polymer-based coating infused with graphene for durable protection and a deep, rich finish.',
    features: ['Graphene Infused', 'Moisture Curing', 'Paint Protection', 'High Gloss Finish']
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: '3M Ceramic Coating',
    description: 'The science of shine with durable protection that helps enrich gloss and keep paint looking freshly polished.',
    features: ['Long-Lasting Shine', 'Durable Protection', 'Gloss Enhancement', 'Easy Maintenance']
  },
  {
    icon: <Car className="w-8 h-8" />,
    title: '3M Paint Protection Film',
    description: 'Self-protective film that helps keep the vehicle looking newer for longer by guarding against everyday wear and tear.',
    features: ['Wear and Tear Protection', 'Invisible Finish', 'Surface Defense', 'Long-Term Coverage']
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: '3M Window Film',
    description: 'High-performance window film that rejects heat without changing the car\'s appearance, improving cabin comfort.',
    features: ['Heat Rejection', 'UV Protection', 'Glare Reduction', 'Comfort Boost']
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: '3M Car Wrap Film',
    description: 'Express your style with a wide range of colors, textures, and finishes for a bold new look.',
    features: ['Nearly 100 Colours', 'Textures and Finishes', 'Style Upgrade', 'Custom Look']
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Interior and Engine Care',
    description: 'From air care to underbody coating, engine coating, and rat repellent, the studio covers complete vehicle protection.',
    features: ['Air Care', 'Underbody Coating', 'Engine Coating', 'Rat Repellent']
  }
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    rating: 5,
    text: 'Got ceramic coating done for my BMW. The results are absolutely stunning! The team was professional and the finish is mirror-like. Highly recommended!',
    car: 'BMW X5',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    imagePosition: 'center 20%'
  },
  {
    name: 'Priya Patel',
    rating: 5,
    text: 'PPF installation was flawless. You can\'t even tell it\'s there. My car is now protected from daily scratches. Worth every penny!',
    car: 'Mercedes C-Class',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    imagePosition: 'center 25%'
  },
  {
    name: 'Amit Deshmukh',
    rating: 5,
    text: 'Complete detailing service transformed my 5-year-old car. It looks brand new now. The attention to detail is remarkable.',
    car: 'Honda City',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    imagePosition: 'center 18%'
  },
  {
    name: 'Sneha Kulkarni',
    rating: 5,
    text: 'Best car care studio in Chinchwad. Professional staff, genuine 3M products, and excellent customer service. Will definitely return!',
    car: 'Hyundai Creta',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    imagePosition: 'center 15%'
  }
];

const galleryImages = [
  {
    id: 1,
    title: '3M Graphene Shield Coating',
    category: 'Exterior Protection',
    src: 'https://cdn4.singleinterface.com/files/banner_images/284051/5398_1772532831_m3.jpg'
  },
  {
    id: 2,
    title: '3M Ceramic Coating',
    category: 'Exterior Protection',
    src: 'https://cdn4.singleinterface.com/files/banner_images/284051/2295_1693301549_CeramicCoating.jpg'
  },
  {
    id: 3,
    title: '3M Paint Protection Film',
    category: 'Protection',
    src: 'https://cdn4.singleinterface.com/files/banner_images/284051/257_1693301548_PPF.jpg'
  },
  {
    id: 4,
    title: '3M Window Film',
    category: 'Comfort',
    src: 'https://cdn4.singleinterface.com/files/banner_images/284051/6422_1693301549_SunFilms.jpg'
  },
  {
    id: 5,
    title: '3M Car Wrap Film',
    category: 'Appearance',
    src: 'https://cdn4.singleinterface.com/files/banner_images/284051/9676_1693301616_CarWraps.jpg'
  },
  {
    id: 6,
    title: '3M Underbody Coating',
    category: 'Anti-Rust',
    src: 'https://cdn4.singleinterface.com/files/banner_images/284051/4768_1693301563_UnderbodyCoating.jpg'
  }
];

const stats = [
  { value: '4.7', label: 'Google Rating' },
  { value: 'Free', label: 'Parking On Site' },
  { value: 'Daily', label: 'Open 9:30 AM - 7:30 PM' },
  { value: '4', label: 'Payment Options' }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section
      const sections = ['home', 'about', 'services', 'gallery', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => scrollToSection('home')}
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">3M</span>
              </div>
              <div className={`${scrollY > 50 ? 'text-gray-900' : 'text-white'} hidden sm:block`}>
                <p className="font-bold text-lg leading-tight">Car Care Studio</p>
                <p className="text-xs opacity-80">Chinchwad</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors relative ${
                    scrollY > 50 ? 'text-gray-700 hover:text-red-600' : 'text-white/90 hover:text-white'
                  } ${activeSection === item.toLowerCase() ? 'text-red-600' : ''}`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+918291053562">
                <Button 
                  variant="outline" 
                  className={`${scrollY > 50 ? 'border-gray-300 text-gray-700' : 'border-white/30 text-white hover:bg-white/10'}`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Book Appointment
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-2">
                {['Home', 'About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <div className="pt-4 space-y-2">
                  <a href="tel:+918291053562" className="block w-full">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1920&q=80')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-red-400 fill-red-400" />
                <span className="text-sm font-medium text-red-300">Authorized 3M Car Care Studio</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Premium Car Care &{' '}
                <span className="text-red-500">Protection</span>
              </motion.h1>
              
               <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
                 Experience official 3M car care services in Chinchwad, Pune, including graphene coating, ceramic coating, paint protection film, window film, car wrap film, and complete vehicle protection.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Our Services
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6">
                {[
                  { value: '4.7', label: 'Google Rating' },
                  { value: 'Mon-Sun', label: 'Open Daily' },
                  { value: 'Free', label: 'Parking On Site' }
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl sm:text-3xl font-bold text-red-500">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { icon: <Shield className="w-8 h-8" />, title: 'PPF Protection', desc: 'Self-healing film' },
                { icon: <Sparkles className="w-8 h-8" />, title: 'Ceramic Coating', desc: '5+ years protection' },
                { icon: <Car className="w-8 h-8" />, title: 'Detailing', desc: 'Showroom finish' },
                { icon: <Award className="w-8 h-8" />, title: '3M Certified', desc: 'Genuine products' }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 ${index === 1 || index === 2 ? 'mt-8' : ''}`}
                >
                  <div className="text-red-400 mb-3">{card.icon}</div>
                  <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div 
                key={stat.label}
                variants={fadeInUp}
                className="text-center text-white"
              >
                <p className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-red-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">About Us</span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Pune\'s Trusted Name in{' '}
                <span className="text-red-600">Car Care</span>
              </motion.h2>
              
               <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-6">
                 3M Car Care Studio Chinchwad is an official 3M store offering premium car care solutions. We use genuine 3M products and science-backed treatments to deliver exceptional results.
              </motion.p>
              
               <motion.p variants={fadeInUp} className="text-gray-600 mb-8">
                 Located at Ground Floor, Pimpri Chinchwad, Tanaji Nagar, near Elpro Mall, our studio is equipped for exterior protection, appearance, and interior treatments.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
                {[
                   'Official 3M Store',
                   'Free Parking On Site',
                   'Multiple Payment Modes',
                   'Open All Days'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="relative"
            >
              <motion.div 
                variants={scaleIn}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800&q=80" 
                  alt="3M Car Care Studio" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="text-2xl font-bold mb-2">Authorized 3M Studio</p>
                  <p className="text-white/80">Chinchwad, Pune</p>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                variants={fadeInUp}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                    <Award className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3M</p>
                    <p className="text-gray-500">Authorized Center</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6">
              <Car className="w-4 h-4" />
              <span className="text-sm font-medium">Our Services</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Premium Car Care{' '}
              <span className="text-red-600">Solutions</span>
            </motion.h2>
            
               <motion.p variants={fadeInUp} className="text-gray-600 text-lg max-w-2xl mx-auto">
               We offer official 3M treatments across protection, appearance, and interior care so your vehicle stays protected and polished.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-gray-100 hover:border-red-200">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-6">
                Why Choose{' '}
                <span className="text-red-500">3M Car Care</span>?
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8">
                We combine 3M\'s world-class products with our expertise to deliver unmatched car care services in Pune.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                {[
                  {
                    title: 'Genuine 3M Products',
                    desc: 'We use only authentic 3M products with warranty support'
                  },
                  {
                    title: 'Expert Technicians',
                    desc: 'Our team is trained and certified by 3M professionals'
                  },
                  {
                    title: 'Advanced Facility',
                    desc: 'State-of-the-art studio with dust-free environment'
                  },
                  {
                    title: 'Customer Satisfaction',
                    desc: '4.9/5 rating from over 5000+ satisfied customers'
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    variants={fadeInUp}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="relative"
            >
              <motion.div variants={scaleIn} className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80" 
                  alt="Car Detailing" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-8 -right-8 bg-red-600 rounded-2xl p-8 hidden lg:block">
                  <p className="text-4xl font-bold mb-1">100%</p>
                  <p className="text-red-100">Quality Assured</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Our Work</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transformations That{' '}
              <span className="text-red-600">Speak</span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg max-w-2xl mx-auto">
              See the difference our professional car care services make. Every vehicle we touch gets the premium treatment it deserves.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <div className={`bg-gradient-to-br from-gray-200 to-gray-300 w-full ${index % 2 === 0 ? 'h-72' : 'h-96'}`}>
                  <img 
                    src={`${image.src}?w=600&q=80`}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs text-red-400 font-medium mb-1">{image.category}</p>
                    <p className="text-white font-semibold text-lg">{image.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Testimonials</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our{' '}
              <span className="text-red-600">Customers</span>{' '}
              Say
            </motion.h2>
            
               <motion.p variants={fadeInUp} className="text-gray-600 text-lg max-w-2xl mx-auto">
               Don\'t just take our word for it. Here\'s what customers have said about their 3M Car Care experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.name} variants={fadeInUp}>
                <Card className="h-full border-gray-100 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 ring-4 ring-red-50 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: testimonial.imagePosition }}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.car}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 rounded-full px-4 py-2 mb-6">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Contact Us</span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Visit Our{' '}
                <span className="text-red-500">Studio</span>
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8">
                Ready to give your car the care it deserves? Visit us in Chinchwad or book an appointment today.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Address</h3>
                    <p className="text-gray-400">
                      Ground Floor, Pimpri Chinchwad,<br />
                      Tanaji Nagar, Chinchwad,<br />
                      Pune - 411033<br />
                      <span className="text-red-400">Near Elpro Mall</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <a href="tel:+918291053562" className="text-gray-400 hover:text-white transition-colors">
                      +91 82910 53562
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                     <h3 className="text-white font-semibold mb-1">Working Hours</h3>
                     <p className="text-gray-400">
                       Monday - Sunday: 9:30 AM - 7:30 PM
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Book an Appointment</h3>
                     <p className="text-gray-400 mb-3">Walk-ins are welcome during business hours. Appointments help you get faster service.</p>
                    <Button 
                      onClick={() => window.open('tel:+918291053562')}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Call to Book
                      <Phone className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-400 mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/Chinchwadpcmc/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a 
                    href="https://instagram.com/lsajfk" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a 
                    href="mailto:info@3mcarchinchwad.com" 
                    className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="relative"
            >
              <motion.div variants={scaleIn} className="bg-gray-800 rounded-2xl overflow-hidden h-full min-h-[400px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.963918!2d73.7865982!3d18.6291016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9b1b719029f%3A0x9d6853f90528ce20!2s3M%20Car%20Care%20Studio%20-%20Car%20Detailing%2C%20Ceramic%20Coating%20and%20PPF%2C%20Chinchwad!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
                <a 
                  href="https://maps.app.goo.gl/AJtbN7YMfLcZZFPVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Get Directions</p>
                      <p className="text-sm text-gray-500">Open in Google Maps</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">3M</span>
                </div>
                <div>
                  <p className="font-bold">Car Care Studio</p>
                  <p className="text-xs text-gray-400">Chinchwad</p>
                </div>
              </div>
               <p className="text-gray-400 mb-6">
                 Official 3M Car Care Studio in Chinchwad offering graphene coating, ceramic coating, PPF, window film, car wrap film, and interior treatments.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/Chinchwadpcmc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com/lsajfk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Gallery', 'Contact'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase().replace(' us', ''))}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Our Services</h3>
              <ul className="space-y-3">
                {['Ceramic Coating', 'Paint Protection Film', 'Car Detailing', '3M Sun Control Film', 'Anti-Rust Treatment', 'Graphene Coating'].map((service) => (
                  <li key={service}>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Ground Floor, Pimpri Chinchwad,<br />
                    Tanaji Nagar, Chinchwad,<br />
                    Pune - 411033
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <a href="tel:+918291053562" className="text-gray-400 hover:text-white transition-colors">
                    +91 82910 53562
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-400">
                    Tue - Sun: 9:30 AM - 7:30 PM
                  </span>
                </li>
              </ul>
            </div>

            {/* Developer */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Developer</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <span className="text-white">Name:</span> Navneet Ranjan
                </li>
                <li>
                  <a href="mailto:navnitranjan919904@gmail.com" className="hover:text-white transition-colors">
                    <span className="text-white">Email:</span> navnitranjan919904@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:9835349843" className="hover:text-white transition-colors">
                    <span className="text-white">Contact:</span> 9572432388
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/navneetranjan07" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <span className="text-white">Instagram:</span> @navneetranjan07
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} 3M Car Care Studio Chinchwad. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Authorized 3M Car Care Center | Website by klsajjdfjsdl
            </p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-3 bg-white rounded-full shadow-2xl px-6 py-3 border"
      >
        <p className="text-gray-700 font-medium hidden lg:block">Ready to protect your car?</p>
        <a href="tel:+918291053562">
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full">
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
        </a>
        <Button 
          onClick={() => scrollToSection('contact')}
          variant="outline"
          className="rounded-full"
        >
          Get Directions
        </Button>
      </motion.div>
    </div>
  );
}

export default App;
