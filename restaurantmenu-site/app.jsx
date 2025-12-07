import React, { useState, useEffect } from 'react';
import { ChefHat, MapPin, Clock, Phone, Mail, Star, Heart, Filter, Calendar, Users, Utensils, Wine, Leaf, ChevronDown, Menu as MenuIcon, X } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [language, setLanguage] = useState('en');

  // Mock data
  const menuItems = [
    {
      id: 1,
      name: { en: "Truffle Risotto", it: "Risotto al Tartufo" },
      description: { en: "Carnaroli rice with black truffle and parmesan", it: "Riso Carnaroli con tartufo nero e parmigiano" },
      price: 28,
      category: "main",
      popular: true,
      image: "https://placehold.co/300x200/8B0000/FFFFFF?text=Truffle+Risotto"
    },
    {
      id: 2,
      name: { en: "Burrata Caprese", it: "Burrata Caprese" },
      description: { en: "Fresh burrata with heirloom tomatoes and basil", it: "Burrata fresca con pomodori datterini e basilico" },
      price: 18,
      category: "starter",
      popular: false,
      image: "https://placehold.co/300x200/228B22/FFFFFF?text=Burrata+Caprese"
    },
    {
      id: 3,
      name: { en: "Tiramisu Classico", it: "Tiramisù Classico" },
      description: { en: "Traditional Italian tiramisu with mascarpone", it: "Tiramisù tradizionale con mascarpone" },
      price: 12,
      category: "dessert",
      popular: true,
      image: "https://placehold.co/300x200/DAA520/FFFFFF?text=Tiramisu"
    },
    {
      id: 4,
      name: { en: "Osso Buco", it: "Osso Buco" },
      description: { en: "Slow-cooked veal shank with saffron risotto", it: "Stinco di vitello brasato con risotto allo zafferano" },
      price: 32,
      category: "main",
      popular: false,
      image: "https://placehold.co/300x200/8B0000/FFFFFF?text=Osso+Buco"
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      rating: 5,
      text: { en: "An authentic taste of Italy in the heart of the city", it: "Un gusto autentico d'Italia nel cuore della città" },
      image: "https://placehold.co/80x80/8B0000/FFFFFF?text=MR"
    },
    {
      name: "Sophie Laurent",
      rating: 5,
      text: { en: "The truffle risotto is simply divine!", it: "Il risotto al tartufo è semplicemente divino!" },
      image: "https://placehold.co/80x80/228B22/FFFFFF?text=SL"
    }
  ];

  const galleryImages = [
    "https://placehold.co/400x300/8B0000/FFFFFF?text=Pasta+Artisanale",
    "https://placehold.co/400x400/228B22/FFFFFF?text=Wine+Cellar",
    "https://placehold.co/300x400/DAA520/FFFFFF?text=Chef+Kitchen",
    "https://placehold.co/400x250/8B0000/FFFFFF?text=Dining+Room",
    "https://placehold.co/350x350/228B22/FFFFFF?text=Antipasti",
    "https://placehold.co/400x300/DAA520/FFFFFF?text=Desserts"
  ];

  const categories = [
    { id: 'all', name: { en: 'All', it: 'Tutto' }, icon: Utensils },
    { id: 'starter', name: { en: 'Starters', it: 'Antipasti' }, icon: Leaf },
    { id: 'main', name: { en: 'Main Courses', it: 'Primi e Secondi' }, icon: ChefHat },
    { id: 'dessert', name: { en: 'Desserts', it: 'Dolci' }, icon: Heart }
  ];

  const filteredMenu = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleScroll = () => {
    const sections = ['home', 'about', 'menu', 'reservation', 'gallery', 'contact'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (currentSection) setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-amber-100">Mr. Kharjang</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'menu', 'reservation', 'gallery', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-gray-300 hover:text-amber-300'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                language === 'en' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('it')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                language === 'it' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              IT
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-amber-300 p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-amber-900/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['home', 'about', 'menu', 'reservation', 'gallery', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block px-3 py-2 text-base font-medium w-full text-left ${
                  activeSection === item
                    ? 'text-amber-400 bg-gray-800'
                    : 'text-gray-300 hover:text-amber-300 hover:bg-gray-800'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <div className="flex space-x-2 px-3 pt-4">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm rounded-full ${
                  language === 'en' ? 'bg-amber-600 text-white' : 'text-gray-300 bg-gray-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('it')}
                className={`px-3 py-1 text-sm rounded-full ${
                  language === 'it' ? 'bg-amber-600 text-white' : 'text-gray-300 bg-gray-800'
                }`}
              >
                IT
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://placehold.co/1920x1080/8B0000/FFFFFF?text=Luxury+Italian+Cuisine)' }}
      ></div>
      <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
          {language === 'en' ? 'Authentic Italian Cuisine' : 'Cucina Italiana Autentica'}
        </h1>
        <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Experience the soul of Italy through every dish crafted with passion and tradition' 
            : 'Scopri l\'anima dell\'Italia attraverso ogni piatto creato con passione e tradizione'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('reservation')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
          >
            {language === 'en' ? 'Reserve a Table' : 'Prenota un Tavolo'}
          </button>
          <button 
            onClick={() => scrollToSection('menu')}
            className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300"
          >
            {language === 'en' ? 'View Menu' : 'Guarda il Menu'}
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-amber-400" size={32} />
      </div>
    </section>
  );

  const About = () => (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-100 mb-6">
              {language === 'en' ? 'Our Italian Heritage' : 'La Nostra Eredità Italiana'}
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {language === 'en' 
                ? 'Founded in 1987, Mr. Kharjang brings the authentic flavors of Northern Italy to your table. Our chef, Giovanni Rossi, trained under legendary chefs in Milan and brings decades of expertise to every dish.' 
                : 'Fondato nel 1987, Mr. Kharjang porta i sapori autentici del Nord Italia sulla tua tavola. Il nostro chef, Giovanni Rossi, si è formato sotto chef leggendari a Milano e porta decenni di esperienza in ogni piatto.'}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              {language === 'en' 
                ? 'We source only the finest ingredients from local farmers and Italian importers, ensuring every bite tells a story of tradition and quality.' 
                : 'Selezioniamo solo gli ingredienti migliori da agricoltori locali e importatori italiani, garantendo che ogni morso racconti una storia di tradizione e qualità.'}
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://placehold.co/600x400/228B22/FFFFFF?text=Chef+Giovanni+Rossi" 
              alt="Chef Giovanni Rossi" 
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-amber-600 p-4 rounded-lg">
              <ChefHat className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Menu = () => (
    <section id="menu" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Our Menu' : 'Il Nostro Menu'}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our seasonal menu crafted with passion and the finest ingredients' 
              : 'Scopri il nostro menu stagionale creato con passione e gli ingredienti migliori'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-200'
                }`}
              >
                <IconComponent size={18} />
                {category.name[language]}
              </button>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img src={item.image} alt={item.name[language]} className="w-full h-48 object-cover" />
                {item.popular && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {language === 'en' ? 'Popular' : 'Popolare'}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-gray-900">{item.name[language]}</h3>
                  <span className="text-amber-600 font-bold text-lg">€{item.price}</span>
                </div>
                <p className="text-gray-600">{item.description[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Reservation = () => (
    <section id="reservation" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-100 mb-6">
              {language === 'en' ? 'Make a Reservation' : 'Prenota un Tavolo'}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {language === 'en' 
                ? 'Book your table online for an unforgettable Italian dining experience' 
                : 'Prenota il tuo tavolo online per un\'esperienza di cena italiana indimenticabile'}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-100">
                    {language === 'en' ? 'Opening Hours' : 'Orari di Apertura'}
                  </h3>
                  <p className="text-gray-400">
                    {language === 'en' ? 'Mon-Sun: 11:30 AM - 11:00 PM' : 'Lun-Dom: 11:30 - 23:00'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-100">
                    {language === 'en' ? 'Capacity' : 'Capacità'}
                  </h3>
                  <p className="text-gray-400">
                    {language === 'en' ? 'Up to 120 guests' : 'Fino a 120 ospiti'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-100">
                    {language === 'en' ? 'Call Us' : 'Chiamaci'}
                  </h3>
                  <p className="text-gray-400">+39 02 1234 5678</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-100 mb-2 font-medium">
                    {language === 'en' ? 'Name' : 'Nome'}
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'Your name' : 'Il tuo nome'}
                  />
                </div>
                <div>
                  <label className="block text-amber-100 mb-2 font-medium">
                    {language === 'en' ? 'Email' : 'Email'}
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'your@email.com' : 'la@tua.email.com'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-100 mb-2 font-medium">
                    {language === 'en' ? 'Date' : 'Data'}
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-amber-100 mb-2 font-medium">
                    {language === 'en' ? 'Time' : 'Ora'}
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    <option>18:00</option>
                    <option>18:30</option>
                    <option>19:00</option>
                    <option>19:30</option>
                    <option>20:00</option>
                    <option>20:30</option>
                    <option>21:00</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-amber-100 mb-2 font-medium">
                  {language === 'en' ? 'Guests' : 'Ospiti'}
                </label>
                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {language === 'en' ? 'guest' : 'ospite'}{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
              >
                {language === 'en' ? 'Reserve Table' : 'Prenota Tavolo'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  const Gallery = () => (
    <section id="gallery" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Gallery' : 'Galleria'}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Experience the ambiance and culinary artistry of Mr. Kharjang' 
              : 'Vivi l\'atmosfera e l\'arte culinaria di Mr. Kharjang'}
          </p>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={image} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-100 mb-4">
            {language === 'en' ? 'What Our Guests Say' : 'Cosa Dicono i Nostri Ospiti'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-amber-100">{testimonial.name}</h3>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={16} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-lg italic">"{testimonial.text[language]}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Contact = () => (
    <section id="contact" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Contact Us' : 'Contattaci'}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {language === 'en' 
                ? 'Visit us or get in touch for any inquiries' 
                : 'Visitanoci o contattaci per qualsiasi informazione'}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-amber-600 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'en' ? 'Address' : 'Indirizzo'}
                  </h3>
                  <p className="text-gray-600">
                    Via della Cucina 123<br />
                    20121 Milano, Italy
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="text-amber-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'en' ? 'Phone' : 'Telefono'}
                  </h3>
                  <p className="text-gray-600">+39 02 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="text-amber-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'en' ? 'Email' : 'Email'}
                  </h3>
                  <p className="text-gray-600">info@mrkharjang.it</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Clock className="text-amber-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'en' ? 'Opening Hours' : 'Orari di Apertura'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Monday - Sunday: 11:30 AM - 11:00 PM' 
                      : 'Lunedì - Domenica: 11:30 - 23:00'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Send us a message' : 'Mandaci un messaggio'}
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  {language === 'en' ? 'Name' : 'Nome'}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your name' : 'Il tuo nome'}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  {language === 'en' ? 'Email' : 'Email'}
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'your@email.com' : 'la@tua.email.com'}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  {language === 'en' ? 'Message' : 'Messaggio'}
                </label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your message...' : 'Il tuo messaggio...'}
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
              >
                {language === 'en' ? 'Send Message' : 'Invia Messaggio'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="mt-12 bg-gray-200 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="text-gray-400 mx-auto mb-4" size={48} />
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Google Maps Integration would appear here' 
                : 'L\'integrazione con Google Maps apparirebbe qui'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-amber-100 mb-4">Mr. Kharjang</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              {language === 'en' 
                ? 'Bringing authentic Italian cuisine to your table with passion and tradition since 1987.' 
                : 'Portiamo la cucina italiana autentica sulla tua tavola con passione e tradizione dal 1987.'}
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-amber-400 transition-colors">
                <Wine size={24} />
              </button>
              <button className="text-gray-400 hover:text-amber-400 transition-colors">
                <ChefHat size={24} />
              </button>
              <button className="text-gray-400 hover:text-amber-400 transition-colors">
                <Leaf size={24} />
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-amber-100 mb-4">
              {language === 'en' ? 'Quick Links' : 'Link Veloci'}
            </h4>
            <ul className="space-y-2">
              {['home', 'about', 'menu', 'reservation', 'gallery', 'contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item)}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-amber-100 mb-4">
              {language === 'en' ? 'Contact Info' : 'Informazioni di Contatto'}
            </h4>
            <address className="text-gray-400 not-italic">
              Via della Cucina 123<br />
              20121 Milano, Italy<br />
              +39 02 1234 5678<br />
              info@mrkharjang.it
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Mr. Kharjang. {language === 'en' ? 'All rights reserved.' : 'Tutti i diritti riservati.'}</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Reservation />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
    