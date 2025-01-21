'use client'

import { useState, useRef } from 'react'
import { MapPin } from 'lucide-react'
import OpportunityScore from '@/components/assess/opportunity-score'
import CommunityMap from '@/components/assess/community-map'
import AssessmentChat from '@/components/assess/assessment-chat'

export default function AssessCommunity() {
  const [userDetails, setUserDetails] = useState({
    zipCode: '',
    income: '',
    childAge: '',
    race: '',
    gender: ''
  })

  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFactor, setSelectedFactor] = useState('opportunity')
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setShowResults(true)
    setIsLoading(false)
    
    // Smooth scroll to results section
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#DFE5E4]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2c4547] mb-6">
            Community Assessment
          </h1>
          <p className="text-xl text-[#536b6f]">
            Discover your community&apos;s opportunity score and explore factors that influence upward mobility
          </p>
        </div>
      </section>

      {/* Get Started Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2c4547] mb-8 text-center">
            Get Personalized Insights
          </h2>
          <div className="bg-[#DFE5E4] p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ZIP Code Input */}
              <div className="md:col-span-2">
                <label className="block text-[#2c4547] font-medium mb-2">
                  ZIP Code
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#87A6A8]" />
                  <input
                    required
                    type="text"
                    value={userDetails.zipCode}
                    onChange={(e) => setUserDetails({...userDetails, zipCode: e.target.value})}
                    className="w-full p-2 pl-10 rounded border border-[#87A6A8] bg-white"
                    placeholder="Enter your ZIP code"
                    pattern="[0-9]{5}"
                  />
                </div>
              </div>

              {/* Income Input */}
              <div>
                <label className="block text-[#2c4547] font-medium mb-2">
                  Annual Household Income
                </label>
                <select
                  required
                  value={userDetails.income}
                  onChange={(e) => setUserDetails({...userDetails, income: e.target.value})}
                  className="w-full p-2 rounded border border-[#87A6A8] bg-white"
                >
                  <option value="">Select Income Range</option>
                  <option value="<30k">Less than $30,000</option>
                  <option value="30-50k">$30,000 - $50,000</option>
                  <option value="50-75k">$50,000 - $75,000</option>
                  <option value=">75k">More than $75,000</option>
                </select>
              </div>

              {/* Child Age Input */}
              <div>
                <label className="block text-[#2c4547] font-medium mb-2">
                  Child&apos;s Age
                </label>
                <input
                  required
                  type="number"
                  value={userDetails.childAge}
                  onChange={(e) => setUserDetails({...userDetails, childAge: e.target.value})}
                  className="w-full p-2 rounded border border-[#87A6A8] bg-white"
                  min="0"
                  max="18"
                />
              </div>

              {/* Race/Ethnicity Input */}
              <div>
                <label className="block text-[#2c4547] font-medium mb-2">
                  Race/Ethnicity
                </label>
                <select
                  required
                  value={userDetails.race}
                  onChange={(e) => setUserDetails({...userDetails, race: e.target.value})}
                  className="w-full p-2 rounded border border-[#87A6A8] bg-white"
                >
                  <option value="">Select Race/Ethnicity</option>
                  <option value="asian">Asian</option>
                  <option value="black">Black or African American</option>
                  <option value="hispanic">Hispanic or Latino</option>
                  <option value="white">White</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Gender Input */}
              <div>
                <label className="block text-[#2c4547] font-medium mb-2">
                  Child&apos;s Gender
                </label>
                <select
                  required
                  value={userDetails.gender}
                  onChange={(e) => setUserDetails({...userDetails, gender: e.target.value})}
                  className="w-full p-2 rounded border border-[#87A6A8] bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-[#87A6A8] text-white px-8 py-3 rounded text-lg font-medium 
                    transition-all duration-300 ease-in-out
                    ${isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#6B8A8C]'}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Get Assessment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section - Single Row Layout */}
      {showResults && (
        <section ref={resultsRef} className="py-8">
          <div className="max-w-[92%] mx-auto px-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Community Map - 6 columns */}
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[800px] flex flex-col">
                  <div className="flex-1">
                    <CommunityMap
                      selectedFactor={selectedFactor}
                      zipCode={userDetails.zipCode}
                    />
                  </div>
                  {/* Factor Selection */}
                  <div className="p-4 bg-white border-t">
                    <div className="grid grid-cols-5 gap-2">
                      {['opportunity', 'education', 'safety', 'resources', 'income'].map((factor) => (
                        <button
                          key={factor}
                          onClick={() => setSelectedFactor(factor)}
                          className={`p-2 rounded text-sm transition-all duration-300
                            ${selectedFactor === factor
                              ? 'bg-[#87A6A8] text-white'
                              : 'bg-[#DFE5E4] text-[#2c4547] hover:bg-[#87A6A8] hover:text-white'}`}
                        >
                          {factor.charAt(0).toUpperCase() + factor.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Opportunity Score - 3 columns */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg h-[800px] overflow-hidden">
                  <OpportunityScore zipCode={userDetails.zipCode} />
                </div>
              </div>

              {/* Chat Interface - 3 columns */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg h-[800px] overflow-hidden">
                  <AssessmentChat 
                    zipCode={userDetails.zipCode}
                    selectedFactor={selectedFactor}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}