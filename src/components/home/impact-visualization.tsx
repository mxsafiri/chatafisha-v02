"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Recycle, Users, Shield, BarChart3, CheckCircle2 } from "lucide-react"
import { useTheme } from "next-themes"

// Impact features with value propositions
const impactFeatures = [
  {
    id: 1,
    name: "Verification",
    valueProposition: "Transparent verification of environmental impact claims through third-party validators",
    icon: CheckCircle2,
    color: "#10b981", // Green
    lightColor: "#059669", // Darker green for light mode
  },
  {
    id: 2,
    name: "Community",
    valueProposition: "Empowering local communities to lead sustainable initiatives and create lasting change",
    icon: Users,
    color: "#3b82f6", // Blue
    lightColor: "#2563eb", // Darker blue for light mode
  },
  {
    id: 3,
    name: "Impact Metrics",
    valueProposition: "Quantifiable environmental and social impact data to measure real-world change",
    icon: BarChart3,
    color: "#8b5cf6", // Purple
    lightColor: "#7c3aed", // Darker purple for light mode
  },
  {
    id: 4,
    name: "Trust",
    valueProposition: "Building trust through transparent verification processes and blockchain technology",
    icon: Shield,
    color: "#f59e0b", // Amber
    lightColor: "#d97706", // Darker amber for light mode
  },
  {
    id: 5,
    name: "Circular Economy",
    valueProposition: "Transforming waste into resources through innovative collection and recycling projects",
    icon: Recycle,
    color: "#ec4899", // Pink
    lightColor: "#db2777", // Darker pink for light mode
  },
  {
    id: 6,
    name: "Environmental Impact",
    valueProposition: "Creating measurable positive change for our planet through verified sustainability initiatives",
    icon: Leaf,
    color: "#06b6d4", // Cyan
    lightColor: "#0891b2", // Darker cyan for light mode
  },
]

export function ImpactVisualization() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  
  // Auto-rotate through features
  useEffect(() => {
    if (!autoRotate) return
    
    const interval = setInterval(() => {
      setActiveFeature(current => {
        if (current === null) return 1
        return current >= impactFeatures.length ? 1 : current + 1
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [autoRotate])

  return (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 flex flex-col"
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-center opacity-10 dark:opacity-5" />
      
      {/* Icons section */}
      <div className="flex-1 flex items-center justify-center pt-8 pb-4">
        <div className="w-full max-w-5xl px-4 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
          {impactFeatures.map((feature, index) => {
            const isActive = activeFeature === feature.id
            const featureColor = isDark ? feature.color : feature.lightColor
            
            return (
              <motion.div 
                key={feature.id}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  zIndex: isActive ? 10 : 1
                }}
              >
                <motion.div
                  className={`cursor-pointer rounded-full flex items-center justify-center mb-3 p-4 sm:p-5
                    ${isActive 
                      ? 'bg-white dark:bg-gray-800 shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-800/80'}`}
                  onClick={() => setActiveFeature(feature.id)}
                  style={{ 
                    boxShadow: isActive 
                      ? `0 0 20px ${featureColor}80` 
                      : 'none',
                  }}
                  animate={{
                    rotate: isActive ? [0, -10, 10, -5, 5, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <feature.icon 
                    className="h-6 w-6 sm:h-7 sm:w-7" 
                    style={{ color: featureColor }} 
                  />
                </motion.div>
                
                {/* Feature name below icon */}
                <motion.div
                  className={`text-sm font-medium text-center
                    ${isActive 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-700 dark:text-gray-300'}`}
                  animate={{ 
                    opacity: isActive ? 1 : 0.9,
                    y: isActive ? -2 : 0
                  }}
                  style={{
                    color: isActive ? featureColor : undefined,
                    maxWidth: '100px',
                  }}
                >
                  {feature.name}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* Feature value proposition panel */}
      <div className="min-h-[220px] sm:min-h-[180px] md:min-h-[160px] relative">
        <AnimatePresence mode="wait">
          {activeFeature ? (
            <motion.div
              key={`panel-${activeFeature}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 px-4 pb-6 pt-2 flex items-start justify-center"
            >
              {(() => {
                const feature = impactFeatures.find(f => f.id === activeFeature)
                if (!feature) return null
                const featureColor = isDark ? feature.color : feature.lightColor
                
                return (
                  <div className="w-full max-w-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: `${featureColor}20` }}
                      >
                        <feature.icon style={{ color: featureColor }} className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{feature.name}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{feature.valueProposition}</p>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                Click on an icon above to explore our platform features
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
