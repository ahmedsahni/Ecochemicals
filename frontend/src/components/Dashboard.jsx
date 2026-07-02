import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, Users, BarChart2, MousePointerClick,
  Map, Settings, Lock, ArrowLeft, RefreshCw, Search, Filter,
  MapPin, MessageSquare, Clock, Database, CheckCircle, TrendingUp,
  Phone, Download, LogOut, Menu, X, ChevronRight, Zap, Globe,
  Activity, Eye, FileText, ExternalLink, AlertCircle, Home,
  Package, HelpCircle, Info
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

// ─── Tiny helpers ────────────────────────────────────────────────────────────
const API_BASE = '/api';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const formatShortDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' });
};

const exportCSV = (leads) => {
  const headers = ['Name', 'Phone', 'City', 'Farm Size', 'Pad Count', 'Status', 'Message', 'Date'];
  const rows = leads.map(l => [
    l.name, l.phone, l.city, l.farmSize, l.padCount || '',
    l.status, (l.message || '').replace(/,/g, ';'), formatDate(l.createdAt)
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `eco-chemicals-leads-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── Palette ─────────────────────────────────────────────────────────────────
const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
const PIE_COLORS = { Small: '#10B981', Medium: '#3B82F6', Large: '#8B5CF6' };
const STATUS_COLORS = { new: '#F59E0B', contacted: '#3B82F6', completed: '#10B981' };

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',      icon: LayoutDashboard },
  { id: 'leads',     label: 'Leads CRM',     icon: Users },
  { id: 'analytics', label: 'Analytics',     icon: BarChart2 },
  { id: 'events',    label: 'Click Events',  icon: MousePointerClick },
  { id: 'sitemap',   label: 'Sitemap',       icon: Map },
  { id: 'settings',  label: 'Settings',      icon: Settings },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, color, sub, pulse }) => (
  <div className={`relative bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 overflow-hidden group hover:border-slate-700 transition-all duration-300`}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className={`w-5 h-5 ${pulse ? 'animate-pulse' : ''}`} />
      </div>
    </div>
    <div className="text-3xl font-black text-white">{value}</div>
    {sub && <div className="text-xs text-slate-500 font-semibold">{sub}</div>}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h2 className="text-xl font-black text-white">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 font-medium mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    new:       { label: 'New',       bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    contacted: { label: 'Contacted', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    completed: { label: 'Completed', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  };
  const { label, bg } = config[status] || { label: status, bg: 'bg-slate-700 text-slate-300 border-slate-600' };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${bg}`}>
      {label}
    </span>
  );
};

// ─── Event Type Badge ─────────────────────────────────────────────────────────
const EventBadge = ({ type }) => {
  const config = {
    call_click:      { label: '📞 Call Click',    bg: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
    whatsapp_click:  { label: '💬 WhatsApp',      bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
    contact_click:   { label: '✉️ Contact CTA',   bg: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
    form_submit:     { label: '📋 Form Submit',   bg: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  };
  const { label, bg } = config[type] || { label: type, bg: 'bg-slate-700 text-slate-300 border-slate-600' };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black border ${bg}`}>
      {label}
    </span>
  );
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 shadow-2xl text-sm">
      <p className="text-slate-300 font-bold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-black">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
//  PANEL: OVERVIEW
// ════════════════════════════════════════════════════════════════════════════════
const OverviewPanel = ({ leads, events, analytics, loading }) => {
  const newCount       = leads.filter(l => l.status === 'new').length;
  const contactedCount = leads.filter(l => l.status === 'contacted').length;
  const completedCount = leads.filter(l => l.status === 'completed').length;
  const totalPads      = leads.reduce((s, l) => s + (l.padCount || 0), 0);
  const callClicks     = events?.summary?.call_click || 0;
  const waClicks       = events?.summary?.whatsapp_click || 0;

  // Mini area data from leadsPerDay
  const sparkData = analytics?.leadsPerDay?.slice(-7) || [];

  return (
    <div className="space-y-6">
      <SectionHeader icon={LayoutDashboard} title="Overview" subtitle="Real-time snapshot of your leads pipeline and engagement." />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Leads"  value={leads.length}   icon={Users}             color="bg-blue-500/10 text-blue-400" sub="All time" />
        <StatCard label="New Leads"    value={newCount}        icon={Clock}             color="bg-amber-500/10 text-amber-400" pulse sub="Awaiting contact" />
        <StatCard label="In Progress"  value={contactedCount}  icon={RefreshCw}         color="bg-sky-500/10 text-sky-400" sub="Being followed up" />
        <StatCard label="Completed"    value={completedCount}  icon={CheckCircle}       color="bg-emerald-500/10 text-emerald-400" sub="Converted" />
        <StatCard label="Total Pads"   value={totalPads}       icon={Database}          color="bg-violet-500/10 text-violet-400" sub="Across all farms" />
        <StatCard label="Call Clicks"  value={callClicks + waClicks} icon={Phone}       color="bg-rose-500/10 text-rose-400" sub="Call + WhatsApp" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Leads Over Time */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Leads — Last 30 Days</h3>
          {sparkData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={sparkData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={formatShortDate} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="count" name="Leads" stroke="#3B82F6" fill="url(#leadGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center text-slate-600 text-sm font-bold">No data yet for the last 30 days.</div>
          )}
        </div>

        {/* Status Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Status Split</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={[
                  { name: 'New', value: newCount },
                  { name: 'Contacted', value: contactedCount },
                  { name: 'Completed', value: completedCount },
                ]}
                cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                paddingAngle={3} dataKey="value"
              >
                {[STATUS_COLORS.new, STATUS_COLORS.contacted, STATUS_COLORS.completed].map((color, i) => (
                  <Cell key={i} fill={color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads mini table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Latest 5 Inquiries</h3>
          <span className="text-xs text-slate-500 font-bold">Most recent first</span>
        </div>
        <div className="divide-y divide-slate-800/60">
          {leads.slice(0, 5).map(lead => (
            <div key={lead._id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-800/30 transition-colors">
              <div>
                <div className="font-bold text-white text-sm">{lead.name}</div>
                <div className="text-xs text-slate-400 font-medium">{lead.city} · {lead.farmSize}</div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={lead.status} />
                <span className="text-xs text-slate-500">{formatShortDate(lead.createdAt)}</span>
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="py-10 text-center text-slate-500 text-sm font-bold">No leads yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
//  PANEL: LEADS CRM
// ════════════════════════════════════════════════════════════════════════════════
const LeadsPanel = ({ leads, onStatusChange, loading }) => {
  const [search, setSearch] = useState('');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = leads.filter(lead => {
    const q = search.toLowerCase();
    const matchSearch = lead.name.toLowerCase().includes(q) || lead.phone.includes(q) || lead.city.toLowerCase().includes(q);
    const matchSize   = sizeFilter === 'All' || lead.farmSize === sizeFilter;
    const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchSearch && matchSize && matchStatus;
  });

  return (
    <div className="space-y-5">
      <SectionHeader icon={Users} title="Leads CRM" subtitle={`${leads.length} total inquiries in database`} />

      {/* Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search name, phone, city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-200 placeholder-slate-600"
          />
        </div>
        <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}
          className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px]">
          <option value="All">All Farm Sizes</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px]">
          <option value="All">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="completed">Completed</option>
        </select>
        <span className="ml-auto text-xs text-slate-500 font-bold">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                <th className="py-4 px-5">Farmer & Contact</th>
                <th className="py-4 px-5">Location</th>
                <th className="py-4 px-5">Farm Details</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions & Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.length > 0 ? filtered.map(lead => {
                const waPhone = lead.phone.replace(/\D/g, '').startsWith('0')
                  ? '92' + lead.phone.replace(/\D/g, '').substring(1)
                  : lead.phone.replace(/\D/g, '');
                const isExpanded = expandedId === lead._id;

                return (
                  <React.Fragment key={lead._id}>
                    <tr
                      className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : lead._id)}
                    >
                      <td className="py-4 px-5">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()}
                          className="text-xs text-slate-400 hover:text-blue-400 transition-colors font-semibold">
                          {lead.phone}
                        </a>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5 text-sm text-slate-200 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                          {lead.city}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="text-xs font-bold text-slate-300">
                          {lead.farmSize} Farm
                        </div>
                        <div className="text-xs text-slate-500 font-semibold mt-0.5">
                          {lead.padCount ? `${lead.padCount} pads` : 'Pads N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <select
                          value={lead.status}
                          onClick={e => e.stopPropagation()}
                          onChange={e => onStatusChange(lead._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                            lead.status === 'new'       ? 'bg-amber-950/20 text-amber-400 border-amber-900/40'
                            : lead.status === 'contacted' ? 'bg-blue-950/20 text-blue-400 border-blue-900/40'
                            : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40'
                          }`}
                        >
                          <option value="new"       className="bg-slate-900 text-white">New</option>
                          <option value="contacted"  className="bg-slate-900 text-white">Contacted</option>
                          <option value="completed"  className="bg-slate-900 text-white">Completed</option>
                        </select>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="text-xs text-slate-400 font-semibold">{formatDate(lead.createdAt)}</div>
                        <div className="flex items-center justify-end gap-2 mt-1.5">
                          <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-[10px] text-emerald-400 hover:underline font-black flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 fill-current" /> WA
                          </a>
                          <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()}
                            className="text-[10px] text-blue-400 hover:underline font-black flex items-center gap-1">
                            <Phone className="w-3 h-3" /> Call
                          </a>
                          <button onClick={e => { e.stopPropagation(); setExpandedId(isExpanded ? null : lead._id); }}
                            className="text-slate-500 hover:text-slate-300 transition-colors">
                            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-800/20">
                        <td colSpan={5} className="px-5 py-4">
                          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Message / Notes</p>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed">
                              {lead.message || <span className="text-slate-600 italic">No message provided.</span>}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-slate-500 font-bold uppercase tracking-wider text-xs">
                    No matching leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
//  PANEL: ANALYTICS
// ════════════════════════════════════════════════════════════════════════════════
const AnalyticsPanel = ({ analytics }) => {
  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 font-bold">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading analytics…
      </div>
    );
  }

  const farmPieData = Object.entries(analytics.farmSizeBreakdown || {}).map(([name, value]) => ({ name, value }));
  const statusPieData = Object.entries(analytics.statusCounts || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <SectionHeader icon={BarChart2} title="Analytics" subtitle="Lead trends, city distribution, and farm size breakdown." />

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Leads', value: analytics.totalLeads || 0 },
          { label: 'New', value: analytics.statusCounts?.new || 0 },
          { label: 'Completed', value: analytics.statusCounts?.completed || 0 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <div className="text-3xl font-black text-white">{value}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Leads Per Day Bar Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-5">Leads Per Day — Last 30 Days</h3>
        {analytics.leadsPerDay?.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analytics.leadsPerDay} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={formatShortDate} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} allowDecimals={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="count" name="Leads" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-slate-600 text-sm font-bold">
            No data for the last 30 days.
          </div>
        )}
      </div>

      {/* Two columns: City Bar + Farm Size Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* City Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-5">Top Cities</h3>
          {analytics.cityBreakdown?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart layout="vertical" data={analytics.cityBreakdown} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} allowDecimals={false} />
                <YAxis type="category" dataKey="city" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Leads" fill="#10B981" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {analytics.cityBreakdown.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-slate-600 text-sm font-bold">No city data.</div>
          )}
        </div>

        {/* Farm Size Donut */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-5">Farm Size Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={farmPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}>
                {farmPieData.map((entry, i) => (
                  <Cell key={i} fill={PIE_COLORS[entry.name] || CHART_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
//  PANEL: CLICK EVENTS
// ════════════════════════════════════════════════════════════════════════════════
const EventsPanel = ({ events }) => {
  if (!events) {
    return <div className="flex items-center justify-center h-64 text-slate-500 font-bold"><RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading events…</div>;
  }

  const summary = events.summary || {};
  const data = events.data || [];

  const summaryCards = [
    { label: '📞 Call Clicks',    value: summary.call_click || 0,     color: 'text-blue-400' },
    { label: '💬 WhatsApp',       value: summary.whatsapp_click || 0, color: 'text-emerald-400' },
    { label: '✉️ Contact CTA',   value: summary.contact_click || 0,  color: 'text-violet-400' },
    { label: '📋 Form Submits',   value: summary.form_submit || 0,    color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader icon={MousePointerClick} title="Click Events" subtitle="Every tracked interaction on your website — last 30 days." />

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(c => (
          <div key={c.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className={`text-3xl font-black ${c.color}`}>{c.value}</div>
            <div className="text-xs font-bold text-slate-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Event log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Event Log</h3>
          <span className="text-xs text-slate-500 font-bold">{data.length} events</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                <th className="py-3.5 px-5">Event Type</th>
                <th className="py-3.5 px-5">Source Section</th>
                <th className="py-3.5 px-5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.length > 0 ? data.slice(0, 100).map(ev => (
                <tr key={ev._id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-3.5 px-5"><EventBadge type={ev.eventType} /></td>
                  <td className="py-3.5 px-5">
                    <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg">
                      {ev.source}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-xs text-slate-400 font-semibold whitespace-nowrap">
                    {formatDate(ev.timestamp)}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="py-14 text-center text-slate-500 font-bold text-xs uppercase tracking-wider">
                    No events tracked yet. They will appear here once visitors interact with the site.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
//  PANEL: SITEMAP
// ════════════════════════════════════════════════════════════════════════════════
const SITE_SECTIONS = [
  { id: 'home',          icon: Home,        label: 'Hero / Home',          desc: 'Landing section with product headline, trust badges, and CTA.', anchor: '#home' },
  { id: 'partners',      icon: Globe,        label: 'Trusted Partners',     desc: 'Marquee of partner brands and certifications.', anchor: '#partners' },
  { id: 'stats',         icon: TrendingUp,   label: 'Dynamic Stats',        desc: 'Animated counters showcasing impact numbers.', anchor: '#stats' },
  { id: 'solution',      icon: Zap,          label: 'Problem / Solution',   desc: 'Side-by-side comparison: algae problems vs Cleanex solution.', anchor: '#solution' },
  { id: 'product',       icon: Package,      label: 'Product & Dosage',     desc: 'Spec table, pricing, and interactive dosage calculator.', anchor: '#product' },
  { id: 'how-it-works',  icon: Activity,     label: 'How It Works',         desc: 'Step-by-step cleaning timeline infographic.', anchor: '#how-it-works' },
  { id: 'why-us',        icon: CheckCircle,  label: 'Why Choose Us',        desc: 'Feature cards highlighting competitive advantages.', anchor: '#why-us' },
  { id: 'testimonials',  icon: MessageSquare,label: 'Testimonials',         desc: 'Real farmer reviews and success stories.', anchor: '#testimonials' },
  { id: 'contact-form',  icon: FileText,     label: 'Quote / Lead Form',    desc: 'Primary lead capture form with farm size calculator.', anchor: '#contact-form' },
  { id: 'contact',       icon: Phone,        label: 'Contact Details',      desc: 'Direct phone, WhatsApp, and office location info.', anchor: '#contact' },
];

const SitemapPanel = ({ onClose }) => (
  <div className="space-y-6">
    <SectionHeader icon={Map} title="Sitemap" subtitle="Visual overview of all sections on the ECO Chemicals website." />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SITE_SECTIONS.map((section, idx) => (
        <a
          key={section.id}
          href={section.anchor}
          onClick={onClose}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:border-blue-500/40 hover:bg-slate-800/50 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-blue-500/10 border border-slate-700 group-hover:border-blue-500/20 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-all flex-shrink-0">
            <section.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 font-bold">#{idx + 1}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="font-bold text-white text-sm mt-1 group-hover:text-blue-300 transition-colors">{section.label}</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">{section.desc}</p>
          </div>
        </a>
      ))}
    </div>

    {/* Admin route */}
    <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
        <Lock className="w-5 h-5" />
      </div>
      <div>
        <div className="font-bold text-white text-sm">Admin Dashboard</div>
        <p className="text-xs text-slate-500 mt-1 font-medium">Accessible via <code className="bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded text-[10px]">/#admin</code> — protected by token authentication.</p>
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
//  PANEL: SETTINGS
// ════════════════════════════════════════════════════════════════════════════════
const SettingsPanel = ({ leads, onLogout }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + '/#admin').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader icon={Settings} title="Settings" subtitle="Manage exports, session, and dashboard configuration." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Export Leads</h3>
              <p className="text-xs text-slate-500 font-medium">Download all leads as CSV</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Export all <strong className="text-white">{leads.length} leads</strong> in CSV format — compatible with Excel, Google Sheets, and CRM tools.
          </p>
          <button
            onClick={() => exportCSV(leads)}
            disabled={leads.length === 0}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download leads.csv
          </button>
        </div>

        {/* Dashboard Link */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Admin Dashboard URL</h3>
              <p className="text-xs text-slate-500 font-medium">Share or bookmark the admin link</p>
            </div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 font-mono break-all">
            {window.location.origin}/#admin
          </div>
          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all"
          >
            {copied ? '✓ Copied!' : 'Copy Dashboard Link'}
          </button>
        </div>

        {/* Session */}
        <div className="bg-slate-900 border border-amber-500/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Session Management</h3>
              <p className="text-xs text-slate-500 font-medium">Log out of the admin panel</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            This will clear your stored admin token from local storage and return you to the login screen.
          </p>
          <button
            onClick={onLogout}
            className="w-full py-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/20 text-amber-400 font-bold text-sm transition-all"
          >
            Lock Panel & Log Out
          </button>
        </div>

        {/* Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">System Info</h3>
              <p className="text-xs text-slate-500 font-medium">Dashboard metadata</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-400 font-medium">
            {[
              { label: 'Platform',       value: 'ECO Chemicals Admin v2.0' },
              { label: 'Total Leads',    value: leads.length },
              { label: 'Environment',    value: window.location.hostname },
              { label: 'Built With',     value: 'React + Vite + Recharts' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-300 font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
//  MAIN DASHBOARD COMPONENT
// ════════════════════════════════════════════════════════════════════════════════
const Dashboard = ({ onClose }) => {
  const [token,           setToken]           = useState(localStorage.getItem('adminToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads,           setLeads]           = useState([]);
  const [analytics,       setAnalytics]       = useState(null);
  const [events,          setEvents]          = useState(null);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState('');
  const [activePanel,     setActivePanel]     = useState('overview');
  const [sidebarOpen,     setSidebarOpen]     = useState(false);

  // ── Auth & Fetch ─────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async (tkn = token) => {
    if (!tkn) return;
    setLoading(true);
    setError('');
    try {
      const [leadsRes, analyticsRes, eventsRes] = await Promise.all([
        fetch(`${API_BASE}/leads?token=${encodeURIComponent(tkn)}`),
        fetch(`${API_BASE}/leads/analytics?token=${encodeURIComponent(tkn)}`),
        fetch(`${API_BASE}/events?token=${encodeURIComponent(tkn)}`),
      ]);

      if (!leadsRes.ok) {
        const d = await leadsRes.json();
        setError(d.message || 'Authentication failed.');
        setIsAuthenticated(false);
        return;
      }

      const [leadsData, analyticsData, eventsData] = await Promise.all([
        leadsRes.json(), analyticsRes.json(), eventsRes.json(),
      ]);

      if (leadsData.success) {
        setLeads(leadsData.data);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', tkn);
      }
      if (analyticsData.success) setAnalytics(analyticsData);
      if (eventsData.success)    setEvents(eventsData);

    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { if (token) fetchAll(token); }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!token.trim()) { setError('Token is required.'); return; }
    fetchAll(token);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res  = await fetch(`${API_BASE}/leads/${leadId}?token=${encodeURIComponent(token)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(prev => prev.map(l => l._id === leadId ? { ...l, status: newStatus } : l));
      } else {
        alert(data.message || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setToken('');
    setLeads([]);
    setAnalytics(null);
    setEvents(null);
  };

  // ── LOGIN SCREEN ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060b14] flex items-center justify-center p-4">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-sm">
          {/* Back link */}
          <button onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Main Site
          </button>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-blue-400" />
              </div>
              <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
              <p className="text-xs text-slate-500 mt-2 font-medium">ECO Chemicals — Secure Panel Access</p>
            </div>

            {error && (
              <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Admin Token
                </label>
                <input
                  type="password"
                  placeholder="Enter secret token…"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white outline-none transition-all placeholder-slate-600"
                />
                <p className="text-[10px] text-slate-600 mt-1.5 font-semibold">
                  Default: <code className="text-blue-400 bg-slate-950 px-1 rounded">admin-secret-key</code>
                </p>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Authenticating…</> : 'Unlock Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD SHELL ───────────────────────────────────────────────────────────
  const activeNav = NAV_ITEMS.find(n => n.id === activePanel);

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex">

      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed top-0 left-0 h-full z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>

        {/* Brand */}
        <div className="px-5 py-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-600/30">
              EC
            </div>
            <div>
              <div className="text-sm font-black text-white leading-tight">ECO Chemicals</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Admin Console</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-5 right-4 text-slate-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePanel(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all duration-200
                  ${active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
                {item.id === 'leads' && leads.filter(l => l.status === 'new').length > 0 && (
                  <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-amber-500/20 text-amber-400'}`}>
                    {leads.filter(l => l.status === 'new').length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-800/80 space-y-2">
          <button onClick={onClose}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all">
            <ArrowLeft className="w-5 h-5" /> Main Site
          </button>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-amber-400 hover:bg-amber-500/5 transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top Bar */}
        <header className="bg-slate-950/80 backdrop-blur border-b border-slate-800/80 px-5 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-sm font-black text-white">{activeNav?.label}</h2>
              <p className="text-[10px] text-slate-500 font-bold hidden sm:block">ECO Chemicals Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Live
            </span>
            <button
              onClick={() => fetchAll()}
              disabled={loading}
              title="Refresh all data"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* Panel Area */}
        <main className="flex-1 p-5 sm:p-7 overflow-y-auto">
          {activePanel === 'overview'  && <OverviewPanel  leads={leads} events={events} analytics={analytics} loading={loading} />}
          {activePanel === 'leads'     && <LeadsPanel     leads={leads} onStatusChange={handleStatusChange} loading={loading} />}
          {activePanel === 'analytics' && <AnalyticsPanel analytics={analytics} />}
          {activePanel === 'events'    && <EventsPanel    events={events} />}
          {activePanel === 'sitemap'   && <SitemapPanel   onClose={onClose} />}
          {activePanel === 'settings'  && <SettingsPanel  leads={leads} onLogout={handleLogout} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
