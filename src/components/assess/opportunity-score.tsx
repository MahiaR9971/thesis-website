'use client'

interface OpportunityScoreProps {
  zipCode: string
}

export default function OpportunityScore({ zipCode }: OpportunityScoreProps) {
  // This would normally fetch real data based on the ZIP code
  const mockScore = 7.5

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2c4547] mb-2">
          Opportunity Score
        </h2>
        <p className="text-[#536b6f]">
          For ZIP code {zipCode}
        </p>
      </div>

      {/* Score Display */}
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#DFE5E4]">
          <span className="text-4xl font-bold text-[#2c4547]">
            {mockScore}/10
          </span>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#2c4547]">Score Breakdown</h3>
        <div className="space-y-3">
          {[
            { name: 'School Quality', score: 8 },
            { name: 'Safety', score: 7 },
            { name: 'Economic Opportunity', score: 8 },
            { name: 'Community Resources', score: 7 }
          ].map((factor) => (
            <div key={factor.name}>
              <div className="flex justify-between text-sm text-[#536b6f] mb-1">
                <span>{factor.name}</span>
                <span>{factor.score}/10</span>
              </div>
              <div className="h-2 bg-[#DFE5E4] rounded-full">
                <div
                  className="h-full bg-[#87A6A8] rounded-full"
                  style={{ width: `${(factor.score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold text-[#2c4547] mb-2">Summary</h3>
        <p className="text-[#536b6f]">
          This area shows strong potential for upward mobility. The community benefits from high-quality schools and good economic opportunities, with room for improvement in community resources.
        </p>
      </div>
    </div>
  )
}