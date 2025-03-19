'use client';

import React from 'react';
import Link from 'next/link';
import VoteChart from './VoteChart';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    votes: {
      too_high: number;
      just_right: number;
      steal: number;
      total: number;
    };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        
        <div className="divider"></div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/2">
            <VoteChart data={product.votes} chartType="pie" />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="stats stats-vertical shadow">
              <div className="stat">
                <div className="stat-title">Total Votes</div>
                <div className="stat-value">{product.votes.total}</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Too High</div>
                <div className="stat-value text-error">
                  {product.votes.total > 0 
                    ? Math.round((product.votes.too_high / product.votes.total) * 100) 
                    : 0}%
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Just Right</div>
                <div className="stat-value text-success">
                  {product.votes.total > 0 
                    ? Math.round((product.votes.just_right / product.votes.total) * 100) 
                    : 0}%
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-title">A Steal</div>
                <div className="stat-value text-primary">
                  {product.votes.total > 0 
                    ? Math.round((product.votes.steal / product.votes.total) * 100) 
                    : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <Link href={`/dashboard/product/${product.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;