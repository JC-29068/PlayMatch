import React from 'react';
import { Users, MapPin, Calendar, ShieldAlert } from 'lucide-react';

export default function Admin() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-full overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <ShieldAlert className="text-red-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Overview Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <Users className="text-blue-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">1,248</h3>
          <p className="text-xs text-green-600 mt-2">+12% this month</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500 font-medium">Active Matches</p>
            <Calendar className="text-orange-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">84</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500 font-medium">Turf Bookings</p>
            <MapPin className="text-green-600" size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">342</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500 font-medium">Pending Approvals</p>
            <ShieldAlert className="text-red-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">12</h3>
        </div>
      </div>

      {/* Data Table Mock */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-gray-900">Recent Turf Listings (Pending)</h2>
          <button className="text-sm text-green-700 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 font-medium">Turf Name</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Owner</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4 font-medium text-gray-900">Westside Arena</td>
                <td className="p-4 text-gray-500">West District</td>
                <td className="p-4 text-gray-500">john.doe@email.com</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-200">Approve</button>
                    <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-200">Reject</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900">City Center Courts</td>
                <td className="p-4 text-gray-500">Downtown</td>
                <td className="p-4 text-gray-500">sarah.m@email.com</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-200">Approve</button>
                    <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-200">Reject</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
