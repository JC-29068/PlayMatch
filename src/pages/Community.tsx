import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Share2, Plus, Loader } from 'lucide-react';
import { getPosts, createPost } from '../lib/firestore';
import { useAuth } from '../context/AuthContext';

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', type: 'Discussion' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error loading posts:', err);
    }
    setLoading(false);
  };

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) return;
    setSubmitting(true);
    try {
      await createPost({
        content: newPost.content,
        type: newPost.type,
        authorId: user?.uid,
        authorName: user?.email?.split('@')[0] || 'Anonymous',
        likes: 0,
        comments: 0,
        timestamp: 'Just now'
      });
      setNewPost({ content: '', type: 'Discussion' });
      setShowForm(false);
      await loadPosts();
    } catch (err) {
      console.error('Error creating post:', err);
    }
    setSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-green-900 transition shadow-sm"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none text-sm"
            rows={3}
            placeholder="What's on your mind?"
          />
          <div className="flex justify-between items-center mt-3">
            <select
              value={newPost.type}
              onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
              className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"
            >
              <option value="Discussion">Discussion</option>
              <option value="Recruitment">Recruitment</option>
            </select>
            <button
              onClick={handleCreatePost}
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin text-green-700" size={32} />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="font-medium">No posts yet.</p>
          <p className="text-sm">Be the first to post something!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {post.authorName?.charAt(0).toUpperCase()}
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
      )}
    </div>
  );
}