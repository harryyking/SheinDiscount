'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
  userId: string;
}

const ProductList: React.FC<ProductListProps> = ({ userId }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-bold mb-2">No products found</h3>
        <p>Add your first product to start collecting price feedback.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;