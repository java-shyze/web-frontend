export interface Analytics {
  alias: string
  period: AnalyticsPeriod
  totalClicks: number
  uniqueClicks: number
  browserStats: StatsEntry[]
  deviceStats: StatsEntry[]
  topReferrers: StatsEntry[]
  globalStats: GlobalStats
}

export interface AnalyticsPeriod {
  start: string
  end: string
}

interface StatsEntry {
  name: string
  count: number
  percent: number
}

interface GlobalStats {
  grouping: string
  data: GlobalStatsEntry[]
}

interface GlobalStatsEntry {
  date: string
  count: number
}
