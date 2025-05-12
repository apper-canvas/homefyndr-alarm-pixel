import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Define icon components
  const BuildingIcon = getIcon('Building');
  const HomeIcon = getIcon('Home');
  const TreePineIcon = getIcon('Flower');
  const SearchIcon = getIcon('Search');
  const MapPinIcon = getIcon('MapPin');
  const BedDoubleIcon = getIcon('BedDouble');
  const BathIcon = getIcon('Bath');
  const TagIcon = getIcon('Tag');
  const SquareIcon = getIcon('Square');
  const ChevronDownIcon = getIcon('ChevronDown');
  const FilterIcon = getIcon('SlidersHorizontal');
  const XIcon = getIcon('X');
  const SaveIcon = getIcon('BookmarkPlus');
  const HeartIcon = getIcon('Heart');
  const ShareIcon = getIcon('Share2');
  const InfoIcon = getIcon('Info');

  // Property search form state
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    isOpen: true,
  });

  // Filter panel state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Results state
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedProperties, setSavedProperties] = useState([]);
  const [mapView, setMapView] = useState(false);

  // Dummy property data (would come from API in real app)
  const dummyProperties = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 1250000,
      address: "123 Oceanview Dr, Malibu, CA",
      bedrooms: 5,
      bathrooms: 4.5,
      area: 3800,
      type: "House",
      status: "For Sale",
      description: "Stunning modern villa with ocean views, featuring a chef's kitchen, infinity pool, and smart home technology."
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
      type: "Apartment",
      status: "For Rent",
      description: "Stylish downtown apartment near major attractions, restaurants, and transportation. Features hardwood floors and city views."
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
      type: "House",
      status: "For Sale",
      description: "Charming family home in a quiet suburb with excellent schools. Features spacious backyard, updated kitchen, and finished basement."
    },
    {
      id: 4,
      title: "Cozy Cottage Near Lake",
      image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 329000,
      address: "234 Lake Road, Seattle, WA",
      bedrooms: 3,
      bathrooms: 2,
      area: 1650,
      type: "House",
      status: "For Sale",
      description: "Picturesque cottage with lake access. Features stone fireplace, updated appliances, and wraparound porch."
    },
    {
      id: 5,
      title: "Luxury Condo with City View",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 5200,
      address: "555 Skyline Ave, San Francisco, CA",
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      type: "Condo",
      status: "For Rent",
      description: "High-end condo with panoramic city views. Features gourmet kitchen, floor-to-ceiling windows, and building amenities."
    },
    {
      id: 6,
      title: "Historic Brownstone",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 875000,
      address: "321 Heritage Blvd, Boston, MA",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 3200,
      type: "House",
      status: "For Sale",
      description: "Stunning restored brownstone with original details and modern amenities. Features garden, hardwood floors, and exposed brick."
    }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchParams.location) {
      toast.warning("Please enter a location to search", {
        icon: <MapPinIcon className="w-5 h-5" />,
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Filter dummy data based on search params
      let filteredResults = [...dummyProperties];
      
      if (searchParams.propertyType) {
        filteredResults = filteredResults.filter(property => 
          property.type.toLowerCase() === searchParams.propertyType.toLowerCase()
        );
      }
      
      if (searchParams.minPrice) {
        filteredResults = filteredResults.filter(property => 
          property.price >= parseInt(searchParams.minPrice)
        );
      }
      
      if (searchParams.maxPrice) {
        filteredResults = filteredResults.filter(property => 
          property.price <= parseInt(searchParams.maxPrice)
        );
      }
      
      if (searchParams.bedrooms) {
        filteredResults = filteredResults.filter(property => 
          property.bedrooms >= parseInt(searchParams.bedrooms)
        );
      }
      
      if (searchParams.bathrooms) {
        filteredResults = filteredResults.filter(property => 
          property.bathrooms >= parseInt(searchParams.bathrooms)
        );
      }
      
      setSearchResults(filteredResults);
      setIsLoading(false);
      setHasSearched(true);
      
      // Close search form on mobile
      if (window.innerWidth < 768) {
        setSearchParams(prev => ({
          ...prev,
          isOpen: false
        }));
      }
      
      toast.success(`Found ${filteredResults.length} properties matching your criteria`, {
        icon: <SearchIcon className="w-5 h-5" />,
      });
    }, 1500);
  };

  // Toggle search form visibility (mobile only)
  const toggleSearchForm = () => {
    setSearchParams(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Format price
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price}`;
    }
  };

  // Toggle saved property
  const toggleSaveProperty = (propertyId) => {
    if (savedProperties.includes(propertyId)) {
      setSavedProperties(savedProperties.filter(id => id !== propertyId));
      toast.info("Property removed from saved list", {
        icon: <XIcon className="w-5 h-5" />,
      });
    } else {
      setSavedProperties([...savedProperties, propertyId]);
      toast.success("Property saved to your list", {
        icon: <SaveIcon className="w-5 h-5" />,
      });
    }
  };

  // Toggle map view
  const toggleMapView = () => {
    setMapView(!mapView);
  };

  // Reset search
  const resetSearch = () => {
    setSearchParams({
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      isOpen: true,
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <section className="py-12 bg-surface-50 dark:bg-surface-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Property Search</h2>
            <p className="text-surface-600 dark:text-surface-400 mb-4 md:mb-0">
              Find your perfect property with our advanced search tools
            </p>
          </div>
          
          {/* Mobile search toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleSearchForm}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
            >
              {searchParams.isOpen ? (
                <>
                  <XIcon className="w-4 h-4" />
                  <span>Hide Search</span>
                </>
              ) : (
                <>
                  <SearchIcon className="w-4 h-4" />
                  <span>Show Search</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search Form (Collapsible on mobile) */}
          <AnimatePresence>
            {searchParams.isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:col-span-1 overflow-hidden"
              >
                <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <SearchIcon className="w-5 h-5 text-primary" />
                    Find Properties
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPinIcon className="w-4 h-4 text-surface-400" />
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={searchParams.location}
                          onChange={handleInputChange}
                          placeholder="City, neighborhood, or zip"
                          className="input pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Property Type</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <HomeIcon className="w-4 h-4 text-surface-400" />
                        </div>
                        <select
                          name="propertyType"
                          value={searchParams.propertyType}
                          onChange={handleInputChange}
                          className="input pl-10 appearance-none"
                        >
                          <option value="">Any Type</option>
                          <option value="house">House</option>
                          <option value="apartment">Apartment</option>
                          <option value="condo">Condo</option>
                          <option value="land">Land</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDownIcon className="w-4 h-4 text-surface-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Min Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <TagIcon className="w-4 h-4 text-surface-400" />
                          </div>
                          <input
                            type="number"
                            name="minPrice"
                            value={searchParams.minPrice}
                            onChange={handleInputChange}
                            placeholder="Min"
                            className="input pl-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Max Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <TagIcon className="w-4 h-4 text-surface-400" />
                          </div>
                          <input
                            type="number"
                            name="maxPrice"
                            value={searchParams.maxPrice}
                            onChange={handleInputChange}
                            placeholder="Max"
                            className="input pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Bedrooms</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BedDoubleIcon className="w-4 h-4 text-surface-400" />
                          </div>
                          <select
                            name="bedrooms"
                            value={searchParams.bedrooms}
                            onChange={handleInputChange}
                            className="input pl-10 appearance-none"
                          >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ChevronDownIcon className="w-4 h-4 text-surface-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Bathrooms</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BathIcon className="w-4 h-4 text-surface-400" />
                          </div>
                          <select
                            name="bathrooms"
                            value={searchParams.bathrooms}
                            onChange={handleInputChange}
                            className="input pl-10 appearance-none"
                          >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ChevronDownIcon className="w-4 h-4 text-surface-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-grow btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searching...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <SearchIcon className="w-4 h-4" />
                            Search
                          </span>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={resetSearch}
                        className="btn btn-outline"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Results Area */}
          <div className={`${searchParams.isOpen ? 'md:col-span-2' : 'col-span-full'}`}>
            {/* Results Controls */}
            {hasSearched && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div className="text-sm text-surface-600 dark:text-surface-400">
                  Found <span className="font-medium">{searchResults.length}</span> properties
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={toggleFilterPanel}
                    className="btn btn-outline flex items-center gap-1"
                  >
                    <FilterIcon className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  
                  <button
                    onClick={toggleMapView}
                    className={`btn ${mapView ? 'btn-primary' : 'btn-outline'} flex items-center gap-1`}
                  >
                    {getIcon(mapView ? 'List' : 'Map')({ className: "w-4 h-4" })}
                    <span>{mapView ? 'List View' : 'Map View'}</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Search Results */}
            {!hasSearched && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to find your next home?</h3>
                <p className="text-surface-600 dark:text-surface-300 mb-4">
                  Use the search form to discover properties that match your criteria.
                </p>
                {!searchParams.isOpen && (
                  <button
                    onClick={toggleSearchForm}
                    className="btn btn-primary"
                  >
                    <SearchIcon className="w-4 h-4 mr-2" />
                    Show Search Form
                  </button>
                )}
              </motion.div>
            )}
            
            {isLoading && (
              <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Searching Properties</h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Finding the best matches for you...
                </p>
              </div>
            )}
            
            {hasSearched && !isLoading && (
              <>
                {/* Map View (Placeholder) */}
                {mapView && (
                  <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft overflow-hidden h-[500px] relative mb-4">
                    {/* This would be replaced with an actual map component in a real app */}
                    {/* Initialize mapView to prevent "mapView is not defined" error */}
                    <div className="absolute inset-0 bg-surface-200 dark:bg-surface-700 flex items-center justify-center p-4 text-center">
                      <div>
                        <MapPinIcon className="w-12 h-12 text-primary/60 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Map View</h3>
                        <p className="text-surface-600 dark:text-surface-300 max-w-md mx-auto">
                          This is a placeholder for the interactive map. In a real application, an interactive map would display property listings.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              
                {/* List View */}
                {!mapView && (
                  <div className="space-y-4">
                    {searchResults.length === 0 ? (
                      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 text-center">
                        <InfoIcon className="w-10 h-10 text-surface-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                        <p className="text-surface-600 dark:text-surface-300 mb-4">
                          Try adjusting your search criteria to see more results.
                        </p>
                        <button 
                          onClick={resetSearch}
                          className="btn btn-primary"
                        >
                          Reset Search
                        </button>
                      </div>
                    ) : (
                      searchResults.map(property => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-surface-800 rounded-xl shadow-soft overflow-hidden"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 relative">
                              <div className={`absolute top-2 left-2 z-10 px-2 py-1 text-xs font-medium text-white rounded-md ${property.status === 'For Sale' ? 'bg-accent' : 'bg-secondary'}`}>
                                {property.status}
                              </div>
                              <img 
                                src={property.image} 
                                alt={property.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            
                            <div className="p-5 md:p-6 flex-grow">
                              <div className="flex flex-col h-full">
                                <div className="flex-grow">
                                  <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold mb-1">{property.title}</h3>
                                    <div className="text-xl font-bold text-primary">
                                      {property.status === 'For Rent' ? `$${property.price}/mo` : formatPrice(property.price)}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center text-surface-500 dark:text-surface-400 mb-4">
                                    <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                                    <span className="text-sm">{property.address}</span>
                                  </div>
                                  
                                  <p className="text-surface-600 dark:text-surface-300 mb-4 line-clamp-2">
                                    {property.description}
                                  </p>
                                </div>
                                
                                <div className="mt-auto">
                                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-surface-600 dark:text-surface-300 mb-4">
                                    <div className="flex items-center">
                                      <HomeIcon className="w-4 h-4 mr-1" />
                                      <span>{property.type}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <BedDoubleIcon className="w-4 h-4 mr-1" />
                                      <span>{property.bedrooms} Beds</span>
                                    </div>
                                    <div className="flex items-center">
                                      <BathIcon className="w-4 h-4 mr-1" />
                                      <span>{property.bathrooms} Baths</span>
                                    </div>
                                    <div className="flex items-center">
                                      <SquareIcon className="w-4 h-4 mr-1" />
                                      <span>{property.area.toLocaleString()} sq ft</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-2">
                                    <button className="btn btn-primary flex-grow sm:flex-grow-0">
                                      View Details
                                    </button>
                                    <button 
                                      onClick={() => toggleSaveProperty(property.id)}
                                      className={`btn ${savedProperties.includes(property.id) ? 'btn-accent' : 'btn-outline'}`}
                                    >
                                      {savedProperties.includes(property.id) ? (
                                        <HeartIcon className="w-4 h-4 fill-current" />
                                      ) : (
                                        <HeartIcon className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button className="btn btn-outline">
                                      <ShareIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Filter Panel (Mobile) */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white dark:bg-surface-800 rounded-xl w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filter Properties</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sort By</label>
                  <select className="input">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Beds (Most)</option>
                    <option>Baths (Most)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Property Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-primary" />
                      <span className="ml-2">Pool</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-primary" />
                      <span className="ml-2">Garage</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-primary" />
                      <span className="ml-2">Air Conditioning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-primary" />
                      <span className="ml-2">Furnished</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-2 flex gap-3">
                  <button 
                    className="btn btn-primary flex-grow"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                  <button className="btn btn-outline">
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MainFeature;