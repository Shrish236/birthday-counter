import { useState, useEffect } from 'react';
import './BirthdayGallery.css';
import { getGoogleDriveImages } from '../utils/imageDownloader';

interface BirthdayGalleryProps {
    birthYear: number;
}

const BirthdayGallery = ({ birthYear }: BirthdayGalleryProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [previousImageIndex, setPreviousImageIndex] = useState(0); // Track previous image for smooth crossfade
    const [age, setAge] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load images from Google Drive
    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            try {
                // Directly fetch fresh images from Google Drive
                const imageUrls = await getGoogleDriveImages();

                if (imageUrls.length > 0) {
                    setImages(imageUrls);
                } else {
                    // Fallback to placeholder if Google Drive fails or is empty
                    setImages(['/images/placeholder.jpg']);
                }
            } catch (error) {
                console.error('Error loading images:', error);
                setImages(['/images/placeholder.jpg']);
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
    }, []);

    // Calculate age
    useEffect(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        setAge(currentYear - birthYear);
    }, [birthYear]);

    // Auto-rotate images
    useEffect(() => {
        if (images.length === 0) return;

        const startInterval = () => {
            return setInterval(() => {
                setPreviousImageIndex((prev) => (prev + 1) % images.length === 0 ? images.length - 1 : (prev + 1) % images.length - 1); // This logic is tricky with async state
                // Simpler: Just resolve the next index based on current
                setCurrentImageIndex((prev) => {
                    setPreviousImageIndex(prev);
                    return (prev + 1) % images.length;
                });
            }, 4000); // 4 seconds per image
        };

        const interval = startInterval();
        return () => clearInterval(interval);
    }, [images.length]); // clean dependency

    const nextImage = () => {
        setPreviousImageIndex(currentImageIndex);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setPreviousImageIndex(currentImageIndex);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // ... (rest of returns) ...

    if (isLoading) {
        return (
            <div className="birthday-container">
                <div className="birthday-content">
                    <h1 className="birthday-title">Loading celebration... 🎉</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="birthday-container">
            <div className="birthday-content">
                <h1 className="birthday-title">
                    🎉 Happy {age}{getOrdinalSuffix(age)} Birthday! 🎉
                </h1>
                <h2 className="birthday-name">Mahima Singha</h2>

                <div className="gallery-card">
                    <div className="card-outer-frame">
                        {images.length > 0 ? (
                            <>
                                {/* Blurred Background Layer - Current */}
                                <div
                                    className="image-background"
                                    style={{ backgroundImage: `url(${images[currentImageIndex]})`, opacity: 0.5, zIndex: 1 }}
                                />
                                {/* Blurred Background Layer - Previous (for smooth transition) */}
                                <div
                                    className="image-background"
                                    style={{ backgroundImage: `url(${images[previousImageIndex]})`, zIndex: 0 }}
                                />

                                {/* 1. Previous Image (Underneath, Fading Out) */}
                                {previousImageIndex !== currentImageIndex && (
                                    <img
                                        key={`prev-${previousImageIndex}`}
                                        src={images[previousImageIndex]}
                                        alt=""
                                        className="gallery-image-main fade-out"
                                        style={{ zIndex: 2 }}
                                    />
                                )}

                                {/* 2. Current Image (Top, Fading In) */}
                                <img
                                    key={`img-${currentImageIndex}`}
                                    src={images[currentImageIndex]}
                                    alt={`Memory ${currentImageIndex + 1}`}
                                    className="gallery-image-main"
                                    style={{ zIndex: 3 }}
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${images[currentImageIndex]}`);
                                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                                    }}
                                />
                            </>
                        ) : (
                            <div className="no-images">
                                <p>No images available</p>
                            </div>
                        )}

                        {/* Controls overlaid */}
                        {images.length > 1 && (
                            <>
                                <button onClick={prevImage} className="nav-btn prev" aria-label="Previous image">
                                    ‹
                                </button>
                                <button onClick={nextImage} className="nav-btn next" aria-label="Next image">
                                    ›
                                </button>
                            </>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="image-counter">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    )}
                </div>

                <p className="birthday-message">
                    Wishing you a day filled with love, laughter, and unforgettable moments! 🎂✨
                </p>
            </div>
        </div>
    );
};


function getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

export default BirthdayGallery;
