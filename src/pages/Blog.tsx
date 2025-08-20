import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, User } from 'react-feather';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';
// Import language files
import enBlogs from '../data/text/en/blogs.json';
import zhBlogs from '../data/text/zh/blogs.json';
import jaBlogs from '../data/text/ja/blogs.json';
import esBlogs from '../data/text/es/blogs.json';

const languageMap = {
  en: enBlogs,
  zh: zhBlogs,
  ja: jaBlogs,
  es: esBlogs,
};

interface BlogContent {
  hero: {
    title: string;
    subtitle: string;
  };
  blogs: {
    title: string;
    items: {
      id: number;
      title: string;
      description: string;
      author: string;
      date: string;
      image?: string;
    }[];
  };
}

const Blogs: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'Hudl')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center py-32 px-6 min-h-[70vh]"
        style={{ backgroundColor: colors.primaryColor1 }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {processText(pageContent.hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            {processText(pageContent.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
            style={{ color: colors.primaryColor1 }}
          >
            {processText(pageContent.blogs.title)}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageContent.blogs.items.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow hover:-translate-y-1"
              >
                <div className="flex flex-col">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 rounded-lg mb-4 object-cover border-2"
                      style={{ borderColor: colors.primaryColor1 }}
                    />
                  ) : (
                    <div
                      className="w-full h-48 rounded-lg mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primaryColor1}20` }}
                    >
                      <FileText size={40} color={colors.primaryColor1} />
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryColor1 }}>
                    {blog.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <User size={16} className="mr-2" />
                    {blog.author}
                    <Calendar size={16} className="ml-4 mr-2" />
                    {blog.date}
                  </div>
                  <p className="text-gray-600">
                    {processText(blog.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;