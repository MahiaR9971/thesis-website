'use client'

import { Home, Users, School, Briefcase, Shield } from 'lucide-react'

const MobilityFactorCard = ({ icon: Icon, title, description }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <Icon className="h-8 w-8 text-[#87A6A8] mb-4" />
    <h3 className="text-xl font-bold text-[#2c4547] mb-2">{title}</h3>
    <p className="text-[#536b6f]">{description}</p>
  </div>
)

export default function Education() {
  const mobilityFactors = [
    {
      icon: Home,
      title: "Family Stability",
      description: "Strong family relationships and consistent housing provide the foundation for upward mobility."
    },
    {
      icon: Users,
      title: "Social Capital",
      description: "Strong community connections and mentorship opportunities increase chances of success."
    },
    {
      icon: School,
      title: "Education Quality",
      description: "Access to high-quality schools is a key predictor of future earning potential."
    },
    {
      icon: Briefcase,
      title: "Employment Access",
      description: "Proximity to job opportunities and stable employment enhance economic mobility."
    },
    {
      icon: Shield,
      title: "Community Safety",
      description: "Safe neighborhoods contribute to better educational and economic outcomes."
    }
  ]

  return (
    <div className="min-h-screen bg-[#DFE5E4]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2c4547] mb-6">
            Learn About Mobility
          </h1>
          <p className="text-xl text-[#536b6f]">
            Understand the key factors that influence your child's opportunities for economic mobility
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#DFE5E4] p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-[#2c4547] mb-6">Key Statistics</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-[#87A6A8]">20%</span>
                  <p className="text-[#536b6f]">Higher college attendance rates in high-opportunity areas</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-[#87A6A8]">2x</span>
                  <p className="text-[#536b6f]">Greater earning potential in integrated communities</p>
                </div>
              </div>
            </div>
            <div className="bg-[#DFE5E4] p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-[#2c4547] mb-6">Systemic Factors</h2>
              <div className="space-y-4">
                <p className="text-[#536b6f]"><strong>Segregation:</strong> Historical patterns affect resource distribution</p>
                <p className="text-[#536b6f]"><strong>Access Barriers:</strong> Transportation and zoning impact opportunities</p>
                <p className="text-[#536b6f]"><strong>Resource Gaps:</strong> Disparities in funding and services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobility Factors */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2c4547] mb-12 text-center">
            Factors Influencing Upward Mobility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobilityFactors.map((factor, index) => (
              <MobilityFactorCard key={index} {...factor} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}