import React from 'react'

// Optional: use custom layout to prevent double footer
CareersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>
}

export default function CareersPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <div className="text-center p-10 border border-gray-300 dark:border-white/10 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Careers Page Coming Soon</h1>
        <p className="text-gray-600 dark:text-gray-400">
          We're building something extraordinary. Check back later for open roles!
        </p>
      </div>
    </div>
  )
}
