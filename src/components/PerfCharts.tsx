'use client'

import React from 'react'
import { LineChart } from './AreaChart'
import { useStore } from '@/lib/store'
import { BarChart } from './BarChart'

export default function PerfCharts() {
    const metrics = useStore(state => state.metrics)
    return (
        <BarChart name="Performance Benchmarks" description="Comparaison different pattern lengths" data={metrics} />
    )
}
