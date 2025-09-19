import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, MapPin, Phone, Globe, Search, Filter, Calendar, Video, Users, Award } from "lucide-react";
import Rating from "@/pages/Rating";

const FindLawyers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [selectedRating, setSelectedRating] = useState("");

  const lawyers = [
    {
      id: 1,
      name: "Adv. Rajesh Kumar",
      specialty: "Criminal Law",
      rating: 4.8,
      reviews: 156,
      experience: "15 years",
      location: "Delhi",
      fees: "₹2,500/consultation",
      languages: ["Hindi", "English"],
      verified: true,
      available: true,
      image: "/placeholder.svg",
      consultations: 1200,
      successRate: 94,
      description: "Senior criminal lawyer with extensive experience in high-profile cases. Specializes in white-collar crimes and corporate fraud."
    },
    {
      id: 2,
      name: "Adv. Priya Sharma",
      specialty: "Family Law",
      rating: 4.9,
      reviews: 203,
      experience: "12 years",
      location: "Mumbai",
      fees: "₹3,000/consultation",
      languages: ["Hindi", "English", "Marathi"],
      verified: true,
      available: false,
      image: "/placeholder.svg",
      consultations: 890,
      successRate: 97,
      description: "Compassionate family lawyer helping clients navigate divorce, custody, and matrimonial disputes with sensitivity and expertise."
    },
    {
      id: 3,
      name: "Adv. Vikram Singh",
      specialty: "Corporate Law",
      rating: 4.7,
      reviews: 89,
      experience: "18 years",
      location: "Bangalore",
      fees: "₹5,000/consultation",
      languages: ["Hindi", "English", "Kannada"],
      verified: true,
      available: true,
      image: "/placeholder.svg",
      consultations: 650,
      successRate: 92,
      description: "Corporate law expert specializing in mergers & acquisitions, startup legal matters, and intellectual property rights."
    },
    {
      id: 4,
      name: "Adv. Meera Patel",
      specialty: "Property Law",
      rating: 4.6,
      reviews: 142,
      experience: "10 years",
      location: "Ahmedabad",
      fees: "₹2,800/consultation",
      languages: ["Hindi", "English", "Gujarati"],
      verified: true,
      available: true,
      image: "/placeholder.svg",
      consultations: 520,
      successRate: 89,
      description: "Property law specialist with deep knowledge of real estate transactions, land acquisition, and property disputes."
    }
  ];

  const specialties = [
    "Criminal Law", "Family Law", "Corporate Law", "Property Law", 
    "Labor Law", "Consumer Protection", "Tax Law", "Immigration Law",
    "Intellectual Property", "Banking Law", "Environmental Law", "Cyber Law"
  ];

  const cities = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", 
    "Ahmedabad", "Pune", "Surat", "Jaipur", "Lucknow", "Kanpur"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground">Find Expert Lawyers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified legal professionals across India. Filter by location, specialty, ratings, and consultation fees to find the perfect lawyer for your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Lawyers
            </CardTitle>
            <CardDescription>
              Find the right legal expert based on your specific requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, specialty, or keywords..."
                className="pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            </div>

            {/* Filter Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Legal Specialty</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty.toLowerCase()}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15000}
                  min={500}
                  step={500}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Available Lawyers ({lawyers.length})</h2>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {lawyers.map((lawyer, index) => (
              <Card key={lawyer.id} className="hover:shadow-medium transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Profile Image and Basic Info */}
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="w-32 h-32 bg-muted rounded-full mx-auto flex items-center justify-center">
                          <Users className="w-16 h-16 text-muted-foreground" />
                        </div>
                        {lawyer.verified && (
                          <Badge className="absolute -top-2 -right-2 bg-green-600">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-center space-y-1">
                        <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                        <Badge variant="secondary">{lawyer.specialty}</Badge>
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lawyer.location}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="text-muted-foreground text-sm">{lawyer.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Rating value={lawyer.rating} />
                          </div>
                          <span className="text-muted-foreground">({lawyer.reviews} reviews)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Experience: </span>
                            <span className="font-medium">{lawyer.experience}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Success Rate: </span>
                            <span className="font-medium text-green-600">{lawyer.successRate}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Consultations: </span>
                            <span className="font-medium">{lawyer.consultations}</span>
                          </div>
                          <div className={`font-medium ${lawyer.available ? 'text-green-600' : 'text-red-600'}`}>
                            {lawyer.available ? 'Available Now' : 'Busy'}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {lawyer.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing and Actions */}
                    <div className="space-y-4">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-primary">{lawyer.fees}</div>
                        <p className="text-sm text-muted-foreground">Per consultation</p>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full" disabled={!lawyer.available}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Consultation
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </Button>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Globe className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Award className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center animate-fade-in">
          <Button variant="outline" size="lg">
            Load More Lawyers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindLawyers;