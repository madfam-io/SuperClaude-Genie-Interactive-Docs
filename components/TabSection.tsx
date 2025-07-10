'use client'

import { useState } from 'react'
import { OverviewTab } from './tabs/OverviewTab'
import { CommandsTab } from './tabs/CommandsTab'
import { PersonasTab } from './tabs/PersonasTab'
import { WorkflowsTab } from './tabs/WorkflowsTab'
import { ScenariosTab } from './tabs/ScenariosTab'
import { EnterpriseTab } from './tabs/EnterpriseTab'

const tabs = [
  { id: 'overview', label: 'Overview', component: OverviewTab },
  { id: 'commands', label: 'Commands', component: CommandsTab },
  { id: 'personas', label: 'Personas', component: PersonasTab },
  { id: 'workflows', label: 'Workflows', component: WorkflowsTab },
  { id: 'scenarios', label: 'Common Scenarios', component: ScenariosTab },
  { id: 'enterprise', label: 'Enterprise', component: EnterpriseTab },
]

export function TabSection() {
  const [activeTab, setActiveTab] = useState('overview')

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || OverviewTab

  return (
    <section className="py-8" id="main-content">
      <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-bg-light overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold whitespace-nowrap transition-all duration-300 relative ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="animate-fade-in">
        <ActiveComponent />
      </div>
    </section>
  )
}