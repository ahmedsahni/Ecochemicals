"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  RefreshCw, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  Database, 
  Eye, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Lock,
  ArrowLeft,
  Filter
} from 'lucide-react';

const Dashboard = ({ onClose }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('adminUsername') || '');
  const [password, setPassword] = useState(localStorage.getItem('adminPassword') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Load leads from API
  const fetchLeads = async (user = username, pass = password) => {
    if (!user || !pass) return;
    setLoading(true);
    setError('');
    try {
      const basicAuth = btoa(`${user}:${pass}`);
      const response = await fetch(`/api/leads`, {
        headers: {
          'Authorization': `Basic ${basicAuth}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setLeads(data.data || data.leads || []);
        setIsAuthenticated(true);
        localStorage.setItem('adminUsername', user);
        localStorage.setItem('adminPassword', pass);
      } else {
        setError(data.message || 'Authentication failed. Please verify credentials.');
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username && password) {
      fetchLeads(username, password);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }
    fetchLeads(username, password);
  };

  // Change lead status via API
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const basicAuth = btoa(`${username}:${password}`);
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuth}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Update local state
        setLeads(leads.map(lead => lead._id === leadId ? { ...lead, status: newStatus } : lead));
      } else {
        alert(data.message || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend API.');
    }
  };

  // Format date utility
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSize = sizeFilter === 'All' || lead.farmSize === sizeFilter;
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesSize && matchesStatus;
  });

  // Calculate Metrics
  const totalPadsCount = filteredLeads.reduce((acc, curr) => acc + (curr.padCount || 0), 0);
  const newLeadsCount = filteredLeads.filter(l => l.status === 'new').length;
  const contactedLeadsCount = filteredLeads.filter(l => l.status === 'contacted').length;
  const completedLeadsCount = filteredLeads.filter(l => l.status === 'completed').length;

  // Render Login Panel if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative">
          
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>

          <div className="text-center mt-6 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary mb-4 border border-primary/20">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white">Admin Access Gating</h2>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Enter the administration security token to view incoming leads database records.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all text-sm flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Unlock Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-wider">
                Console View
              </span>
              <button 
                onClick={onClose}
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4.5 h-4.5" /> Back to Main Site
              </button>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-1">
              ECO Chemicals Leads Management
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchLeads()}
              disabled={loading}
              className="p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all text-slate-300"
              title="Refresh Database"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('adminUsername');
                localStorage.removeItem('adminPassword');
                setIsAuthenticated(false);
              }}
              className="px-4 py-2.5 bg-slate-800/50 hover:bg-amber-900/20 border border-slate-700 hover:border-amber-900 text-xs font-bold text-slate-300 hover:text-amber-400 rounded-xl transition-all"
            >
              Lock Panel
            </button>
          </div>
        </div>

        {/* Dashboard Cards Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white">{filteredLeads.length}</span>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">New Enquiries</span>
              <Clock className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white">{newLeadsCount}</span>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Follow Up Calls</span>
              <RefreshCw className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white">{contactedLeadsCount}</span>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Targeted Pads</span>
              <Database className="w-5 h-5 text-accent" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white">{totalPadsCount}</span>
          </div>
        </div>

        {/* Searching and filters toolbar */}
        <div className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800/80 flex flex-col md:flex-row items-center gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, phone, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Size Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="w-full md:w-40 px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="All">All Farm Sizes</option>
              <option value="Small">Small (under 10k birds)</option>
              <option value="Medium">Medium (10k-50k birds)</option>
              <option value="Large">Large (50k+ birds)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-40 px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="All">All Statuses</option>
              <option value="new">New Inquiries</option>
              <option value="contacted">Contacted / In Progress</option>
              <option value="completed">Completed / Dispatched</option>
            </select>
          </div>
        </div>

        {/* Leads Table Card */}
        <div className="bg-slate-900/40 rounded-3xl border border-slate-800/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800 text-[10px] sm:text-xs font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Farmer & Contact</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Details</th>
                  <th className="py-4 px-6">Message</th>
                  <th className="py-4 px-6">Status Action</th>
                  <th className="py-4 px-6 text-right">Date Recieved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const waCleanPhone = lead.phone.replace(/\D/g, '').startsWith('0') 
                      ? '92' + lead.phone.replace(/\D/g, '').substring(1) 
                      : lead.phone.replace(/\D/g, '');

                    return (
                      <tr key={lead._id} className="hover:bg-slate-900/30 transition-all">
                        {/* Name and Phone */}
                        <td className="py-4 px-6">
                          <div className="font-extrabold text-white">{lead.name}</div>
                          <div className="text-slate-400 font-semibold mt-0.5">
                            <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                          </div>
                        </td>

                        {/* City / District */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1 font-semibold text-slate-200">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            {lead.city}
                          </div>
                        </td>

                        {/* Farm details */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-0.5 font-semibold">
                            <span className="text-slate-300">Size: <strong className="text-primary">{lead.farmSize}</strong></span>
                            <span className="text-slate-400 text-xs">Pads: <strong>{lead.padCount || 'N/A'}</strong></span>
                          </div>
                        </td>

                        {/* Message field */}
                        <td className="py-4 px-6 max-w-xs">
                          <div className="text-xs text-slate-300 line-clamp-2" title={lead.message}>
                            {lead.message || <span className="text-slate-600 italic">No notes</span>}
                          </div>
                        </td>

                        {/* Status Select action */}
                        <td className="py-4 px-6">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                              lead.status === 'new' 
                                ? 'bg-amber-950/20 text-amber-400 border-amber-900/50' 
                                : lead.status === 'contacted'
                                ? 'bg-blue-950/20 text-blue-400 border-blue-900/50'
                                : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/50'
                            }`}
                          >
                            <option value="new" className="bg-slate-900 text-white">New</option>
                            <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                            <option value="completed" className="bg-slate-900 text-white">Completed</option>
                          </select>
                        </td>

                        {/* Created Date */}
                        <td className="py-4 px-6 text-right whitespace-nowrap text-slate-400 font-semibold">
                          <div className="flex flex-col items-end">
                            <div>{formatDate(lead.createdAt)}</div>
                            {/* WhatsApp link helper */}
                            <a
                              href={`https://wa.me/${waCleanPhone}?text=Assalam-o-Alaikum%20${encodeURIComponent(lead.name)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-accent hover:underline flex items-center gap-1 mt-1 font-bold"
                            >
                              <MessageSquare className="w-3 h-3 fill-current" /> WhatsApp
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500 font-bold uppercase tracking-wider">
                      No matching leads found inside Database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
