'use client'

import { useState } from 'react'
import { Home, School, Building, ShieldCheck, Users } from 'lucide-react'
import MapVisualization from './map-visualization'

interface CommunityMapProps {
  selectedFactor: string
  zipCode: string
}

// Mock data structure for community resources
const mockCommunityData = {
  schools: [
    { id: 1, name: 'Lincoln Elementary', rating: 8, lat: '40.7128', lng: '-74.006', type: 'Elementary' },
    { id: 2, name: 'Washington Middle', rating: 9, lat: '40.7138', lng: '-74.008', type: 'Middle' },
    { id: 3, name: 'Jefferson High', rating: 7, lat: '40.7148', lng: '-74.007', type: 'High' }
  ],
  resources: [
    { id: 1, name: 'Community Center', type: 'Recreation', rating: 4.5 },
    { id: 2, name: 'Public Library', type: 'Education', rating: 4.8 },
    { id: 3, name: 'Youth Program Center', type: 'Social Services', rating: 4.2 }
  ],
  safetyMetrics: {
    crimeRate: 'Low',
    policeResponse: '8 min',
    safetyScore: 85
  },
  opportunities: {
    jobGrowth: '5.2%',
    medianIncome: '$65,000',
    businessCount: 450
  }
}

export default function CommunityMap({ selectedFactor, zipCode }: CommunityMapProps) {
  const [activeTab, setActiveTab] = useState('map')
  const [selectedResource, setSelectedResource] = useState<any>(null)

  const getFactorIcon = (factor: string) => {
    switch (factor) {
      case 'education': return School
      case 'safety': return ShieldCheck
      case 'resources': return Users
      case 'opportunities': return Building
      default: return Home
    }
  }

  const FactorIcon = getFactorIcon(selectedFactor)

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'map'
              ? 'bg-[#DFE5E4] text-[#2c4547] border-b-2 border-[#87A6A8]'
              : 'text-[#536b6f] hover:bg-gray-50'
          }`}
        >
          Map View
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'list'
              ? 'bg-[#DFE5E4] text-[#2c4547] border-b-2 border-[#87A6A8]'
              : 'text-[#536b6f] hover:bg-gray-50'
          }`}
        >
          List View
        </button>
      </div>

      {/* Map View */}
      {activeTab === 'map' && (
        <MapVisualization
          selectedFactor={selectedFactor}
          zipCode={zipCode}
        />
      )}

      {/* List View */}
      {activeTab === 'list' && (
        <div className="max-h-[500px] overflow-y-auto">
          <div className="p-4 space-y-4">
            {selectedFactor === 'education' && mockCommunityData.schools.map(school => (
              <div key={school.id} className="bg-[#DFE5E4] p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[#2c4547]">{school.name}</h3>
                    <p className="text-sm text-[#536b6f]">{school.type}</p>
                  </div>
                  <span className="bg-[#87A6A8] text-white px-2 py-1 rounded text-sm">
                    Rating: {school.rating}/10
                  </span>
                </div>
              </div>
            ))}

            {selectedFactor === 'resources' && mockCommunityData.resources.map(resource => (
              <div key={resource.id} className="bg-[#DFE5E4] p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[#2c4547]">{resource.name}</h3>
                    <p className="text-sm text-[#536b6f]">{resource.type}</p>
                  </div>
                  <span className="bg-[#87A6A8] text-white px-2 py-1 rounded text-sm">
                    ★ {resource.rating}
                  </span>
                </div>
              </div>
            ))}

            {selectedFactor === 'safety' && (
              <div className="space-y-4">
                <div className="bg-[#DFE5E4] p-4 rounded-lg">
                  <h3 className="font-medium text-[#2c4547]">Crime Rate</h3>
                  <p className="text-[#536b6f]">{mockCommunityData.safetyMetrics.crimeRate}</p>
                </div>
                <div className="bg-[#DFE5E4] p-4 rounded-lg">
                  <h3 className="font-medium text-[#2c4547]">Police Response Time</h3>
                  <p className="text-[#536b6f]">{mockCommunityData.safetyMetrics.policeResponse}</p>
                </div>
                <div className="bg-[#DFE5E4] p-4 rounded-lg">
                  <h3 className="font-medium text-[#2c4547]">Safety Score</h3>
                  <p className="text-[#536b6f]">{mockCommunityData.safetyMetrics.safetyScore}/100</p>
                </div>
              </div>
            )}

            {selectedFactor === 'opportunity' && (
              <div className="space-y-4">
                <div className="bg-[#DFE5E4] p-4 rounded-lg">
                  <h3 className="font-medium text-[#2c4547]">Job Growth</h3>
                  <p className="text-[#536b6f]">{mockCommunityData.opportunities.jobGrowth} annually</p>
                </div>
                <div className="bg-[#DFE5E4] p-4 rounded-lg">
                  <h3 className="font-medium text-[#2c4547]">Median Income</h3>
                  <p className="text-[#536b6f]">{mockCommunityData.opportunities.medianIncome}</p>
                </div>
                <div className="bg-[#DFE5E4] p-4 rounded-lg">
                  <h3 className="font-medium text-[#2c4547]">Local Businesses</h3>
                  <p className="text-[#536b6f]">{mockCommunityData.opportunities.businessCount} establishments</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <FactorIcon className="h-5 w-5 text-[#87A6A8]" />
          <span className="text-sm text-[#536b6f]">
            Showing {selectedFactor.charAt(0).toUpperCase() + selectedFactor.slice(1)} data
          </span>
        </div>
      </div>
    </div>
  )
}