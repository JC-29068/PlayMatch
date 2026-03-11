import React from 'react';
import { MessageSquare, Heart, Share2, Plus } from 'lucide-react';
import { mockPosts } from '../data/mock';

export default function Community() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
        <button className="bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-green-900 transition shadow-sm">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="space-y-4">
        {mockPosts.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{post.authorName}</h4>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${post.type === 'Recruitment' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                {post.type}
              </span>
            </div>
            
            <p className="text-gray-800 text-sm mb-4">{post.content}</p>
            
            <div className="flex items-center gap-6 pt-3 border-t border-gray-50 text-gray-500">
              <button className="flex items-center gap-1.5 text-sm hover:text-orange-500 transition">
                <Heart size={18} /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-sm hover:text-green-600 transition">
                <MessageSquare size={18} /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-sm hover:text-blue-600 transition ml-auto">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
