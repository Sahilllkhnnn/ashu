import React, { createContext, useContext, useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { supabase } from '../lib/supabaseClient';
import { TESTIMONIALS as DEFAULT_REVIEWS } from '../constants';

interface FeedbackContextType {
  reviews: Testimonial[];
  addReview: (review: Omit<Testimonial, 'id' | 'date'>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  loading: boolean;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        const formattedReviews: Testimonial[] = data.map(item => ({
          id: item.id,
          name: item.name,
          rating: item.rating,
          text: item.message,
          date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        }));
        setReviews(formattedReviews);
      } else {
        setReviews(DEFAULT_REVIEWS);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews(DEFAULT_REVIEWS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = async (reviewData: Omit<Testimonial, 'id' | 'date'>) => {
    try {
      const { error } = await supabase.from('feedback').insert([{
        name: reviewData.name,
        rating: reviewData.rating,
        message: reviewData.text,
      }]);

      if (error) throw error;
      await fetchReviews(); 
    } catch (err) {
      console.error('Error adding review:', err);
      throw err;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase.from('feedback').delete().eq('id', id);
      if (error) throw error;
      setReviews(prev => prev.filter(review => review.id !== id));
    } catch (err) {
      console.error('Error deleting review:', err);
      throw err;
    }
  };

  return (
    <FeedbackContext.Provider value={{ reviews, addReview, deleteReview, loading }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
