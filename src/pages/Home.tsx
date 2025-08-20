import React, { useMemo, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';
import { colors } from '../data/colors/theme';

const LazyImage = lazy(() => import('../components/LazyImage'));
const LazyVideo = lazy(() => import('../components/LazyVideo'));

// Import language files
import enHome from '../data/text/en/home.json';
import zhHome from '../data/text/zh/home.json';
import jaHome from '../data/text/ja/home.json';
import esHome from '../data/text/es/home.json';

const languageMap = {
  en: enHome,
  zh: zhHome,
  ja: jaHome,
  es: esHome,
};

// Define types for better type safety
type CardItem = {
  title?: string;
  description?: string;
  link?: string;
};

type TestimonialItem = {
  name?: string;
  role?: string;
  quote?: string;
};

interface HomeContent {
  page1?: {
    title?: string;
    slogan?: string;
    links?: Array<{ text?: string; to?: string }>;
  };
  page2?: {
    title?: string;
    cards?: CardItem[];
  };
  page3?: {
    title?: string;
    description?: string;
  };
  page4?: {
    title?: string;
    description?: string;
    links?: Array<{ text?: string; to?: string }>;
  };
  page6?: {
    title?: string;
    stats?: Array<{ number?: string; label?: string }>;
    testimonials?: TestimonialItem[];
  };
  page7?: {
    title?: string;
    cards?: CardItem[];
  };
  page8?: {
    title?: string;
    link?: { text?: string; to?: string };
  };
}

const processText = (text?: string): string => {
  if (!text) return '';
  return text
    .replace(/\{website\.name\}/g, websiteInfo?.name || '')
    .replace(/\{website\.slogan\}/g, websiteInfo?.slogan || '');
};

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as HomeContent;

  const pageContent = useMemo(() => {
    return languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  }, [currentLanguage?.code]);

  const processedContent = useMemo(() => {
    return {
      page1: {
        title: processText(pageContent.page1?.title),
        slogan: processText(pageContent.page1?.slogan),
        links: pageContent.page1?.links || []
      },
      page2: {
        title: processText(pageContent.page2?.title),
        cards: pageContent.page2?.cards || []
      },
      page3: {
        title: processText(pageContent.page3?.title),
        description: processText(pageContent.page3?.description)
      },
      page4: {
        title: processText(pageContent.page4?.title),
        description: processText(pageContent.page4?.description),
        links: pageContent.page4?.links || []
      },
      page6: {
        title: processText(pageContent.page6?.title),
        stats: pageContent.page6?.stats || [],
        testimonials: pageContent.page6?.testimonials || []
      },
      page7: {
        title: processText(pageContent.page7?.title),
        cards: pageContent.page7?.cards || []
      },
      page8: {
        title: processText(pageContent.page8?.title),
        link: pageContent.page8?.link
      }
    };
  }, [pageContent]);

  // Media assets with proper alt texts
  const mediaAssets = {
    heroVideo: 'https://sc.hudl.com/cms/assets/images/homepage/hudl_homepage_hero_20240112_720p.av1.mp4',
    featureCards: [
      {
        src: 'https://static.hudl.com/craft/_600xAUTO_crop_center-center_none_ns/1248070/hudl-titan-blog-social-og.jpg',
        alt: 'Athlete performance metrics dashboard'
      },
      {
        src: 'https://static.hudl.com/craft/_600xAUTO_crop_center-center_none/170304/homepage-focus.jpg',
        alt: 'Live game highlights on Hudl platform'
      },
      {
        src: 'https://static.hudl.com/craft/home/_600xAUTO_crop_center-center_none/home-see-sports-differently.jpg',
        alt: 'Sports analytics visualization'
      },
      {
        src: 'https://static.hudl.com/craft/home/_600xAUTO_crop_center-center_none/home-watch-live-games.jpg',
        alt: 'Fans watching live sports'
      }
    ],
    platformImage: {
      src: 'https://static.hudl.com/craft/homepage-competitive-products_updated.jpg',
      alt: 'Hudl sports technology platform'
    },
    actionImage: {
      src: 'https://static.hudl.com/craft/adp_fan_engagement_v2.jpg',
      alt: 'Athletes in action during game'
    },
    partnerLogos: [
      {
        src: 'https://static.hudl.com/craft/logo_fulhamfc_v3.webp',
        alt: 'Fulham FC logo'
      },
      {
        src: 'https://static.hudl.com/craft/logo_mcgregor_hs.webp',
        alt: 'McGregor High School logo'
      }
    ]
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Page 1 - Hero Video Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center min-h-screen"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Suspense fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
          }>
            <LazyVideo
              src={mediaAssets.heroVideo}
              className="absolute inset-0 object-cover w-full h-full"
              autoPlay
              loop
              muted
              playsInline
            />
          </Suspense>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {processedContent.page1.title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-white/90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {processedContent.page1.slogan}
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col gap-4 max-w-md mx-auto lg:mx-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {processedContent.page1.links?.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to || '#'}
                  className="relative px-8 py-6 text-lg font-semibold text-center border-2 border-white text-white hover:text-orange-500 overflow-hidden group transition-all duration-300"
                >
                  <span className="relative z-10">{link.text}</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Page 2 - Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {processedContent.page2.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedContent.page2.cards.map((card, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <Suspense fallback={
                    <div className="w-full h-full bg-gray-300 animate-pulse" />
                  }>
                    <LazyImage 
                      src={mediaAssets.featureCards[index].src}
                      alt={mediaAssets.featureCards[index].alt}
                      className="w-full h-full object-cover"
                    />
                  </Suspense>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <Link 
                    to={card.link || '#'} 
                    className="inline-flex items-center font-medium text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 3 - Platform Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {processedContent.page3.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {processedContent.page3.description}
          </p>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <Suspense fallback={
              <div className="aspect-video bg-gray-200 animate-pulse" />
            }>
              <LazyImage 
                src={mediaAssets.platformImage.src}
                alt={mediaAssets.platformImage.alt}
                className="w-full h-auto"
              />
            </Suspense>
          </div>
        </div>
      </motion.section>

      {/* Page 4 - CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 bg-gray-900 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {processedContent.page4.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {processedContent.page4.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {processedContent.page4.links.map((link, index) => (
              <Link
                key={index}
                to={link.to || '#'}
                className="px-8 py-3 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 5 - Full Width Image */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full aspect-video lg:aspect-[3/1]"
      >
        <Suspense fallback={
          <div className="absolute inset-0 bg-gray-200 mb-12 mt-12 animate-pulse" />
        }>
          <LazyImage 
            src={mediaAssets.actionImage.src}
            alt={mediaAssets.actionImage.alt}
            className="w-full h-full object-contain"
          />
        </Suspense>
      </motion.section>

      {/* Page 6 - Stats & Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            {processedContent.page6.title}
          </h2>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
            {processedContent.page6.stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl font-bold mb-2 text-orange-500">{stat.number}</div>
                <div className="text-xl text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {processedContent.page6.testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                    <Suspense fallback={
                      <div className="w-full h-full bg-gray-300 animate-pulse" />
                    }>
                      <LazyImage 
                        src={mediaAssets.partnerLogos[index].src}
                        alt={mediaAssets.partnerLogos[index].alt}
                        className="w-full h-full object-contain p-2"
                      />
                    </Suspense>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 7 - Features Repeat */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 bg-gray-900 text-white"
      > 
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {processedContent.page7.title}
            
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processedContent.page7.cards.map((card, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -8 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <Suspense fallback={
                    <div className="w-full h-full bg-gray-700 animate-pulse" />
                  }>
                    <LazyImage 
                      src={mediaAssets.featureCards[index].src}
                      alt={mediaAssets.featureCards[index].alt}
                      className="w-full h-full object-cover"
                    />
                  </Suspense>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{card.description}</p>
                  <Link 
                    to={card.link || '#'} 
                    className="inline-flex items-center font-medium text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 8 - Final CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {processedContent.page8.title}
          </h2>
          <Link
            to={processedContent.page8.link?.to || '#'}
            className="inline-block px-10 py-4 text-lg font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          >
            {processedContent.page8.link?.text}
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;