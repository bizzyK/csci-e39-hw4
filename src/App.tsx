import React, { useState, useEffect } from 'react';
import productsData from './db.json'; // Assuming db.json is correctly imported
import './index.css'; // TailwindCSS styles

// Define Product interface with optional brand
interface Product {
    id: number;
    title: string;
    description: string;
    brand?: string; // Optional, as not all products may have this
    tags: string[];
    price: number;
    thumbnail: string;
}

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Simulating fetch from db.json
        setProducts(productsData);
    }, []);

    // Function to truncate text to 100 characters
    const truncateText = (text: string, length: number) => {
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };

    // Define tag color options (TailwindCSS colors)
    const tagColors = [
        'bg-red-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card w-80 bg-white shadow-md m-4 rounded-lg p-4 flex flex-col relative"
                    >
                        {/* Product Thumbnail with alt text as the title */}
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-40 w-full object-cover mb-4"
                        />

                        {/* Product Title */}
                        <h2 className="text-lg font-bold mb-2">{product.title}</h2>

                        {/* Truncated Product Description with a custom hover tooltip */}
                        <div className="relative group">
                            <p className="text-sm text-gray-600 mb-2">
                                {truncateText(product.description, 100)}
                            </p>
                            {/* Tooltip */}
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg p-2 w-72 z-10 shadow-lg">
                                {product.description}
                            </div>
                        </div>

                        {/* Product Brand (if available) */}
                        {product.brand && (
                            <p className="text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
                        )}

                        {/* Product Price */}
                        <p className="text-lg font-semibold text-green-600 mb-4">${product.price}</p>

                        {/* Tags rendered as pills */}
                        <div className="flex flex-wrap mt-auto">
                            {product.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`text-xs text-white px-2 py-1 rounded-full m-1 ${tagColors[index % tagColors.length]}`}
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;