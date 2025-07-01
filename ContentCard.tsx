'use client'

import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RootState, AppDispatch } from '@/store'
import { addToFavorites, removeFromFavorites } from '@/store/slices/contentSlice'
import { ContentItem, NewsArticle, Movie, SocialPost } from '@/types'
import { Heart, Share2, ExternalLink, Calendar, Star } from 'lucide-react'

interface ContentCardProps {
  item: ContentItem
  index: number
}

const ItemTypes = {
  CARD: 'card'
}

export function ContentCard({ item, index }: ContentCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { favorites } = useSelector((state: RootState) => state.content)
  const isFavorite = favorites.includes(item.id)
  const ref = useRef<HTMLDivElement>(null)

  // Drag and drop functionality
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem: { id: string; index: number }) => {
      if (draggedItem.index === index) {
        return
      }
      // Handle reordering logic here if needed
    },
  })

  drag(drop(ref))

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id))
    } else {
      dispatch(addToFavorites(item.id))
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'title' in item ? item.title : 'Check out this content!',
        url: 'url' in item ? item.url : window.location.href,
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText('url' in item ? item.url : window.location.href)
    }
  }

  const renderNewsCard = (article: NewsArticle) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover" data-testid="content-card">
      <div className="relative h-48">
        <Image
          src={article.urlToImage || 'https://via.placeholder.com/400x200'}
          alt={article.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          {article.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>{article.source.name}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Read More
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              data-testid="share-button"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleFavorite}
              className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              data-testid="favorite-button"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMovieCard = (movie: Movie) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover" data-testid="content-card">
      <div className="relative h-64">
        <Image
          src={movie.poster_path.startsWith('http') ? movie.poster_path : `https://via.placeholder.com/300x450/1f2937/ffffff?text=${encodeURIComponent(movie.title)}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
          <Star className="h-3 w-3 mr-1 fill-current" />
          {movie.vote_average}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {movie.overview}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>Release Date</span>
          <span>{new Date(movie.release_date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Movie
          </span>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              data-testid="share-button"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleFavorite}
              className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              data-testid="favorite-button"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSocialCard = (post: SocialPost) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover" data-testid="content-card">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(post.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          {post.content}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {post.hashtags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{post.likes} likes</span>
            <span>{post.shares} shares</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              data-testid="share-button"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleFavorite}
              className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              data-testid="favorite-button"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
    >
      {item.type === 'news' && renderNewsCard(item as NewsArticle)}
      {item.type === 'movie' && renderMovieCard(item as Movie)}
      {item.type === 'social' && renderSocialCard(item as SocialPost)}
    </motion.div>
  )
} 