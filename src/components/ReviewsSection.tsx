import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, X, Send } from 'lucide-react';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showWriteModal, setShowWriteModal] = useState<boolean>(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const url = filterRating ? `/api/reviews?minRating=${filterRating}` : '/api/reviews';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filterRating]);

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newComment) return;

    try {
      setSubmitting(true);
      setSubmitMessage(null);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: newAuthor,
          role: newRole || 'Verified Creator',
          rating: newRating,
          title: newTitle,
          comment: newComment
        })
      });

      if (res.ok) {
        setSubmitMessage('Review submitted successfully!');
        setNewAuthor('');
        setNewRole('');
        setNewTitle('');
        setNewComment('');
        setTimeout(() => {
          setShowWriteModal(false);
          setSubmitMessage(null);
          fetchReviews();
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section id="reviews" className="relative w-full py-16 bg-[#0c0d10] border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>Studio Verdicts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              Creator & Engineer Reviews
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWriteModal(true)}
              className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-emerald-400" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Aggregate Ratings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          
          <div className="md:col-span-4 p-6 rounded-2xl border border-white/10 bg-[#12141a] flex flex-col justify-center items-center text-center">
            <div className="text-5xl font-black text-white font-mono-numbers">
              {averageRating}
            </div>
            <div className="flex items-center gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-emerald-400 text-emerald-400"
                />
              ))}
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              Based on verified studio beta testers & Batch 1 pre-production units
            </p>
          </div>

          <div className="md:col-span-8 p-6 rounded-2xl border border-white/10 bg-[#12141a] flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-neutral-400">
                Filter by Star Rating
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFilterRating(null)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    filterRating === null
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  All ({reviews.length})
                </button>
                <button
                  onClick={() => setFilterRating(5)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    filterRating === 5
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  5 Stars
                </button>
                <button
                  onClick={() => setFilterRating(4)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    filterRating === 4
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  4+ Stars
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="w-12 text-neutral-400">5 Star</span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
                </div>
                <span className="w-8 text-right text-neutral-400">94%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-neutral-400">4 Star</span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400/70 rounded-full w-[6%]" />
                </div>
                <span className="w-8 text-right text-neutral-400">6%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-neutral-400">3 Star</span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400/40 rounded-full w-[0%]" />
                </div>
                <span className="w-8 text-right text-neutral-400">0%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl border border-white/10 bg-[#12141a] flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400"
                      />
                    ))}
                  </div>

                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>

              {/* Author and Helpful Counter */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{rev.author}</div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {rev.role} · {rev.date}
                  </div>
                </div>

                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[11px] text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="font-mono-numbers">{rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {showWriteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#12141a] p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Publish Your Studio Review
                </h3>
                <button
                  onClick={() => setShowWriteModal(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitMessage ? (
                <div className="py-8 text-center text-emerald-400 font-mono text-sm">
                  {submitMessage}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Adams"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Professional Role / Studio
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Broadcast Producer / Streamer"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 text-emerald-400"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newRating
                                ? 'fill-emerald-400 text-emerald-400'
                                : 'text-neutral-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-neutral-400 ml-2">
                        {newRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Headline Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Unbelievable low-light noise floor"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Detailed Review
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience regarding optics, focus tracking, or acoustic mic array..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowWriteModal(false)}
                      className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-xs font-medium text-neutral-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Publishing...' : 'Submit Review'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
