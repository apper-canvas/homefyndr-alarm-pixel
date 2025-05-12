import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils'; 
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeroFormVisible, setIsHeroFormVisible] = useState(false);

  // Define icon components
  const SearchIcon = getIcon('Search');
  const MapPinIcon = getIcon('MapPin');
  const HomeIcon = getIcon('Home');
  const DollarSignIcon = getIcon('DollarSign');
  const ChevronUpIcon = getIcon('ChevronUp');
  const ChevronDownIcon = getIcon('ChevronDown');
  const BedDoubleIcon = getIcon('BedDouble');
  const ShowerHeadIcon = getIcon('ShowerHead');
  const AreaIcon = getIcon('Move');
  const HeartIcon = getIcon('Heart');
  const ArrowRightIcon = getIcon('ArrowRight');
  const ListIcon = getIcon('List');
  const MapIcon = getIcon('Map');
  const mapView = useRef(null);
  const ClipboardCheckIcon = getIcon('ClipboardCheck');

  const SmileIcon = getIcon('Smile');
  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warning("Please enter a location to search", {
        icon: <MapPinIcon className="w-5 h-5" />,
      });
      return;
    }
    
    toast.success(`Searching for properties in "${searchQuery}"`, {
      icon: <SearchIcon className="w-5 h-5" />,
    });
  };

  const toggleHeroForm = () => {
    setIsHeroFormVisible(!isHeroFormVisible);
  };

  // Featured properties data
  const featuredProperties = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 1250000,
      address: "123 Oceanview Dr, Malibu, CA",
      bedrooms: 5,
      bathrooms: 4.5,
      area: 3800,
      type: "For Sale",
      badgeColor: "bg-accent"
    },
    {
      id: 2,
      title: "Downtown Apartment",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 3500,
      address: "456 City Center, New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "For Rent",
      badgeColor: "bg-secondary"
    },
    {
      id: 3,
      title: "Suburban Family Home",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 475000,
      address: "789 Maple St, Chicago, IL",
      bedrooms: 4,
      bathrooms: 2.5,
      area: 2400,
      type: "For Sale",
      badgeColor: "bg-accent"
    },
    {
      id: 4,
      title: "Mountain View Cabin",
      image: "https://images.unsplash.com/photo-1542965244-9ad1a1dba9ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 2200,
      address: "101 Pine Ridge, Denver, CO",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      type: "For Rent",
      badgeColor: "bg-secondary"
    }
  ];

  const formatPrice = (price, isRent = false) => {
    if (isRent) {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-primary-dark/90 dark:from-primary-dark/90 dark:to-primary/80 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Dream Home Today
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl opacity-90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover thousands of properties for sale and rent across the country
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPinIcon className="w-5 h-5 text-white/70" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="City, neighborhood, or address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleQuickSearch}
                  className="flex-shrink-0 bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <SearchIcon className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
              
              <button
                onClick={toggleHeroForm}
                className="mt-4 text-white/80 hover:text-white text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
              >
                {isHeroFormVisible ? "Simple Search" : "Advanced Search"} 
                {isHeroFormVisible ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                
              </button>
              
              {isHeroFormVisible && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <select className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                      <option value="">Any Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <select className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                      <option value="">Any Price</option>
                      <option value="0-100000">$0 - $100,000</option>
                      <option value="100000-300000">$100,000 - $300,000</option>
                      <option value="300000-500000">$300,000 - $500,000</option>
                      <option value="500000-1000000">$500,000 - $1,000,000</option>
                      <option value="1000000+">$1,000,000+</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bedrooms</label>
                    <select className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 md:py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Featured Properties</h2>
            <a href="#" className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors flex items-center gap-1">
              View all properties
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <motion.div
                key={property.id}
                className="card-property group rounded-xl overflow-hidden bg-white dark:bg-surface-800"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <span className={`card-property-badge ${property.badgeColor} text-white`}>
                    {property.type}
                  </span>
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-primary transition-colors">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center text-surface-500 dark:text-surface-400 mb-2">
                    <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{property.address}</span>
                  </div>
                  
                  <div className="text-xl font-bold text-primary mb-3">
                    {formatPrice(property.price, property.type === "For Rent")}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm text-surface-600 dark:text-surface-300">
                    <div className="flex items-center">
                      <BedDoubleIcon className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <ShowerHeadIcon className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <AreaIcon className="w-4 h-4 mr-1" />
                      <span>{property.area} ft²</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <MainFeature />

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose HomeFyndr</h2>
            <p className="text-surface-600 dark:text-surface-300">
              We make finding your perfect property simple, efficient, and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Find exactly what you're looking for with our powerful filters and search tools.
              </p>
            </div>
            
            <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <ClipboardCheckIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-surface-600 dark:text-surface-300">
                All our properties are verified for authenticity, so you can browse with confidence.
              </p>
            </div>
            
            <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <SmileIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
              <p className="text-surface-600 dark:text-surface-300">
                <Link to="/mood-tracker" className="text-accent hover:text-accent/80 transition-colors">Track your emotional wellbeing</Link> with our new mood tracking feature to understand your patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional content would go here */}
    </div>
  );
};

export default Home;