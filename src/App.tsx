/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  X, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// --- Types ---

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
  details: {
    role: string;
    challenge: string;
    solution: string;
    images: string[];
  };
}

interface Creation {
  title: string;
  tags: string[];
  imageUrl: string;
}

// --- Data ---

const PROJECTS: Project[] = [
  {
    id: '01',
    number: '01',
    title: '企业官网设计',
    category: 'TOB 网页',
    year: '2025-2026',
    description: '为 B2B 平台提供全面的视觉系统，侧重于信息清晰度、专业信任感以及复杂数据可视化。',
    imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E6%99%BA%E6%85%A7%E7%89%A9%E4%B8%9A%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%20UIUX%20%E4%BA%A4%E4%BA%92%E6%96%87%E6%A1%A3_%E4%B8%BB%E9%A1%B5.png?v=2',
    details: {
      role: '主导 UI/UX 设计师',
      challenge: '在保持高密度信息架构的同时，简化企业级导航。',
      solution: '实现模块化组件库和数据优先的视觉策略，将信息可读性置于首位。',
      images: [
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E6%99%BA%E6%85%A7%E7%89%A9%E4%B8%9A%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%20UIUX%20%E4%BA%A4%E4%BA%92%E6%96%87%E6%A1%A3.jpg?v=2'
      ]
    }
  },
  {
    id: '02',
    number: '02',
    title: 'AIGC 视觉设计',
    category: 'AIGC',
    year: '2024-2025',
    description: '在生成式艺术和商业视觉系统中探索人工智能的边界。',
    imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/AI%E6%8F%92%E5%9B%BE-%E9%A6%96%E9%A1%B5.png?v=2',
    details: {
      role: 'AIGC 探索者 / 提示词工程师',
      challenge: '在纯 AI 生成的资产中保持品牌一致性。',
      solution: '开发了一套专有的提示词链接工作流，确保不同媒体输出间的风格统一。',
      images: [
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/AI%E6%8F%92%E5%9B%BE1.png?v=2',
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/AIGC%20%E5%BA%94%E7%94%A8-%E9%83%A8%E5%88%86.png?v=2',
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E5%BD%A9%E8%99%B9%E5%B0%8F%E9%A9%AC-ip%E8%A7%92%E8%89%B2.jpg?v=2'
      ]
    }
  },
  {
    id: '03',
    number: '03',
    title: '社交APP设计复盘',
    category: 'APP UI/UX',
    year: '2021-2024',
    description: '本项目执行于2021-2024，随着剑网 3 玩家需求的持续升级，推栏旧版产品逐渐暴露出信息层级混乱、场景割裂、体验不统一、留存能力不足四大核心体验问题，已无法适配玩家的使用诉求。\n\n我从产品层和业务侧对产品进行了梳理，进而推导出视觉解决方案，进行竞品分析市场数据调研方面，输出一系列主界面设计稿，并推动顺利上线部分界面。\n\n产品思维/运营增长思维/视觉/交互/设计落地/插画/平面设计/图标设计',
    imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/GCA%E7%A4%BE%E4%BA%A4%E7%A4%BE%E5%8C%BA-%E6%8E%A8%E6%A0%8F%20UIUX%20%E4%BA%A4%E4%BA%92%E6%96%87%E6%A1%A3_%E4%B8%BB%E9%A1%B5.png?v=2',
    details: {
      role: '资深 UI/UX 设计师',
      challenge: '优化高流量移动交互，实现低延迟的流畅体验。',
      solution: '利用微交互和渐进式信息披露模式，降低用户的认知负荷。',
      images: [
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/GCA%E7%A4%BE%E4%BA%A4%E7%A4%BE%E5%8C%BA-%E6%8E%A8%E6%A0%8F%20UIUX%20%E4%BA%A4%E4%BA%92%E6%96%87%E6%A1%A3_01.png?v=2'
      ]
    }
  },
  {
    id: '04',
    number: '04',
    title: 'APP/PC端游戏界面设计',
    category: 'PC DX UI/UX',
    year: '2018-2025',
    description: 'P1~P2 : MMO类型 - 剑网3项目\nP3 ：SLG类型 - 山河之志\nP4：MMO类型 - 凡人修仙传\nP5：休闲PX - 瑭灵纪元',
    imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E6%B8%B8%E6%88%8F%E7%95%8C%E9%9D%A2%E9%A6%96%E9%A1%B5.jpg?v=2',
    details: {
      role: '视觉设计师',
      challenge: '在保持一致品牌识别度的同时适应不同的屏幕尺寸和操作模式。',
      solution: '采用响应式设计系统和自适应组件。',
      images: [
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E5%89%91%E7%BD%913%E9%A1%B9%E7%9B%AE.jpg?v=2',
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E5%B1%B1%E6%B2%B3%E4%B9%8B%E5%BF%97ui.jpg?v=2',
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/mmo%E4%BB%99%E4%BE%A0.jpg?v=2',
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/DX.jpg?v=2'
      ]
    }
  },
  {
    id: '05',
    number: '05',
    title: '游戏启动器迭代',
    category: 'PC Launcher UI/UX',
    year: '2023-2024',
    description: '通过视觉重构和交互升级，为玩家打造更沉浸、高效的游戏启动与资产管理体验。',
    imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%90%AF%E5%8A%A8%E5%99%A8%E8%BF%AD%E4%BB%A3%20UIUX%20%E4%BA%A4%E4%BA%92%E6%96%87%E6%A1%A3_%E5%B0%81%E9%9D%A2.jpg?v=2',
    details: {
      role: '主导 UI/UX 设计师',
      challenge: '旧版启动器界面陈旧、功能堆砌，导致玩家查找游戏资产和活动信息的效率低下。',
      solution: '重新梳理信息层级，引入更现代的模块化设计，并增强了品牌视觉元素的融入。',
      images: [
        'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%90%AF%E5%8A%A8%E5%99%A8%E8%BF%AD%E4%BB%A3%20UIUX%20%E4%BA%A4%E4%BA%92%E6%96%87%E6%A1%A3.png?v=2'
      ]
    }
  }
];

const CREATIONS: Creation[] = [
  { title: '运营图系列', tags: ['Daily', 'Operations'], imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E6%8A%96%E9%9F%B3%E5%88%9B%E4%BD%9C%E5%AD%A3-%E8%8A%B1%E8%90%BC%E6%A5%BC%E8%BF%90%E8%90%A5%E5%9B%BE.png?v=2' },
  { title: '抽象几何', tags: ['C4D', 'Redshift'], imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
  { title: '山河之志-过场宣传图2', tags: ['Figma', 'System'], imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E5%B1%B1%E6%B2%B3%E4%B9%8B%E5%BF%97-%E5%AE%A3%E4%BC%A02.jpg?v=2' },
  { title: '山河之志-过场宣传图', tags: ['AIGC', 'Future'], imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E5%B1%B1%E6%B2%B3%E4%B9%8B%E5%BF%97-%E5%AE%A3%E4%BC%A01.jpg?v=2' },
  { title: '有机生长', tags: ['3D', 'Nature'], imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop' },
  { title: '二次元-主角界面', tags: ['Architecture', 'POV'], imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E4%BA%8C%E6%AC%A1%E5%85%83-%E8%A7%92%E8%89%B2%E7%95%8C%E9%9D%A2.png?v=2' },
  { title: '水彩风格-明信片正面(板绘)', tags: ['Generative', 'Fluid'], imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E4%B9%98%E6%A2%A6%E6%B1%9F%E6%B9%96%E6%98%8E%E4%BF%A1%E7%89%87%E6%AD%A3%E9%9D%A2.jpg?v=2' },
  { title: '工业核心', tags: ['Metal', 'Structure'], imageUrl: 'https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/%E7%90%97%E7%81%B5%E7%BA%AA%E5%85%83-%E6%98%93%E6%8B%89%E5%AE%9D%E5%9B%BE.jpg?v=2' },
];


// --- Components ---

const Navbar = ({ onOpenAbout }: { onOpenAbout: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 px-6 md:px-12 py-6 flex justify-between items-center ${isScrolled ? 'bg-[#080808]/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-white font-black text-2xl tracking-tighter leading-none uppercase">YMH - DESIGN</span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] mt-1 font-medium">UI/UX 设计师 • AIGC 探索者</span>
          </div>
        </div>
        <div className="hidden md:flex gap-10 items-center text-[10px] uppercase tracking-[0.2em] font-black text-white/40">
          <a href="#about" className="hover:text-white transition-colors">工作经历</a>
          <a href="#works" className="hover:text-white transition-colors">精选作品</a>
          <a href="#other" className="hover:text-white transition-colors">其他创作</a>
          <button onClick={onOpenAbout} className="px-6 py-2.5 bg-white text-black rounded-sm hover:bg-zinc-200 transition-all font-black uppercase snap-button">关于我</button>
        </div>
        <div 
          className="md:hidden cursor-pointer p-2 relative z-[70]" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[2px]' : 'mb-1.5'}`}></div>
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`}></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-black uppercase tracking-widest hover:text-zinc-400 transition-colors"
            >
              工作经历
            </a>
            <a 
              href="#works" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-black uppercase tracking-widest hover:text-zinc-400 transition-colors"
            >
              精选作品
            </a>
            <a 
              href="#other" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-black uppercase tracking-widest hover:text-zinc-400 transition-colors"
            >
              其他创作
            </a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAbout();
              }} 
              className="mt-8 px-10 py-4 bg-white text-black rounded-sm hover:bg-zinc-200 transition-all font-black uppercase text-xl"
            >
              关于我
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionHeading = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-baseline gap-4 mb-10 md:mb-16 border-l-4 border-white pl-6">
    <span className="text-zinc-600 font-mono text-xs opacity-50">{number}</span>
    <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase">{title}</h2>
  </div>
);

const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  return (
    <motion.div 
      layoutId={`project-${project.id}`}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden bg-brand-surface border border-white/5 flex flex-col aspect-auto md:aspect-[16/11] rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute top-4 left-4 z-10 text-[10px] font-mono text-white/40 uppercase group-hover:text-white transition-colors">
        {project.number} / {project.year}
      </div>
      
      <div className="w-full h-full overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-auto md:h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest mb-1">{project.category}</span>
                  <h3 className="text-white text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">{project.title}</h3>
                </div>
                <div className="w-10 h-10 bg-white flex items-center justify-center snap-button translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <ArrowRight className="w-4 h-4 text-black" />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-6xl max-h-full overflow-y-auto bg-zinc-900 rounded-3xl no-scrollbar overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 md:top-12 md:right-12 z-10 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full h-[50vh] relative">
          <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900" />
        </div>

        <div className="p-8 md:p-16 lg:p-24 -mt-32 relative">
          <div className="max-w-4xl mx-auto">
            <span className="text-zinc-500 font-mono text-sm uppercase mb-4 block">{project.category} • {project.year}</span>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter mb-8">{project.title}</h2>
            <div className="text-zinc-400 text-sm md:text-base leading-relaxed mb-12 whitespace-pre-wrap">
              {project.description}
            </div>
            
            <div className="space-y-8 overflow-hidden rounded-2xl">
              {project.details.images.map((img, i) => {
                // 单独为特殊图片做适配：原比例居中显示，不强制拉伸满宽，不裁剪
                const isSpecialImage = img.includes('DX.jpg');
                
                if (isSpecialImage) {
                  return (
                    <div key={i} className="w-full relative flex justify-center py-4 bg-transparent">
                      <img src={img} className="max-w-full h-auto shadow-2xl rounded-xl" style={{ objectFit: 'contain' }} alt="Design Detail" />
                    </div>
                  );
                }

                return (
                  <div key={i} className="w-full relative overflow-hidden" style={{ margin: '-10px -2px 0 -2px', width: 'calc(100% + 4px)' }}>
                    <img src={img} className="w-full h-auto shadow-2xl" alt="Design Detail" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


const Lightbox = ({ items, currentIndex, onClose, onPrev, onNext }: { items: Creation[], currentIndex: number, onClose: () => void, onPrev: () => void, onNext: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  const currentItem = items[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 bg-black/98"
    >
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[120] w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center gap-4">
        <button 
          onClick={onPrev}
          className="p-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              src={currentItem.imageUrl} 
              alt={currentItem.title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </AnimatePresence>
          
          <div className="mt-8 mb-8 shrink-0 text-center">
            <h3 className="text-white text-2xl font-black uppercase tracking-tight mb-2">{currentItem.title}</h3>
            <div className="flex justify-center gap-3">
              {currentItem.tags.map(tag => (
                <span key={tag} className="text-[10px] text-white/40 uppercase tracking-[0.2em]">{tag}</span>
              ))}
            </div>
            <div className="mt-4 text-zinc-600 font-mono text-xs">
              {currentIndex + 1} / {items.length}
            </div>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="p-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCreationIndex, setSelectedCreationIndex] = useState<number | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isAboutOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsAboutOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAboutOpen]);

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black text-white overflow-x-hidden">
      {/* Fixed Video Background */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-50 overflow-hidden bg-black">
        <iframe
          src="https://player.mux.com/wTC2uAyHw021wAY9EMaD9n00vvHDZTjxvmz025y02X9v01GE?autoplay=true&loop=true&muted=true&controls=false"
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2"
          style={{ border: 'none' }}
          allow="autoplay; fullscreen"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 mb-12">
              <div className="flex flex-col">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">精选作品集 / 2026</span>
                <h1 className="text-[10vw] md:text-[6vw] font-black leading-[0.8] tracking-tighter uppercase flex flex-col mb-4">
                  <span>杨明澔</span>
                  <span className="flex items-center gap-4">
                    <span className="font-serif italic font-normal normal-case text-[12vw] md:text-[8vw] lowercase">-</span>
                    <span className="text-[6vw] md:text-[4vw] tracking-[0.1em]">ui/ux 个人作品集</span>
                  </span>
                </h1>
              </div>
              <div className="max-w-xs text-right hidden md:block">
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <p className="text-[#c4c4c4] text-sm md:text-lg font-medium tracking-[0.1em] leading-tight max-w-3xl">
                  产品思维/运营增长思维/视觉/交互/设计落地/项目推动执行/插画/平面设计
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-6 md:items-end">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">联系方式 / 中国</span>
                  <p className="text-sm font-black">电话： 18529220604 / 微信：ymh407323040</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-widest font-mono">向下滑动</span>
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="about" className="relative z-10 px-6 md:px-12 py-24 md:py-40 bg-black/40 backdrop-blur-md border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeading number="01" title="工作经历" />
          
          <div className="space-y-0">
            {[
              { company: "金山西山居", role: "UI/UX 资深视觉设计师", period: "2021 – 2025", desc: "负责游戏UI/UX设计、游戏宣传海报及推栏APP设计工作。" },
              { company: "珠海天朗互动科技", role: "UI/UX 设计师", period: "2019.6 – 2021.8", desc: "负责游戏UI/UX设计、游戏宣传海报及H5小游戏设计工作。" },
              { company: "广州酷骇科技", role: "UI/UX 设计师", period: "2018.06 – 2019.10", desc: "负责游戏UI/UX设计、游戏宣传海报及整体视觉设计工作。" }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:grid md:grid-cols-12 md:items-center py-12 border-b border-white/5 hover:bg-white/5 transition-colors px-6 -mx-6"
              >
                <div className="md:col-span-4 flex flex-col">
                  <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">{exp.company}</h3>
                  <span className="text-zinc-600 font-mono text-[10px] uppercase mt-2 tracking-widest">{exp.role}</span>
                </div>
                <div className="md:col-span-5 text-zinc-400 text-sm py-4 md:py-0 leading-relaxed max-w-md">
                  {exp.desc}
                </div>
                <div className="md:col-span-3 text-right">
                  <span className="text-[#c4c4c4] font-mono text-xs tracking-[0.3em] uppercase">{exp.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works Grid */}
      <section id="works" className="relative z-10 px-6 md:px-12 py-24 md:py-40 max-w-7xl mx-auto">
        <SectionHeading number="02" title="精选作品" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={index % 2 === 1 ? 'md:mt-32' : ''}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>
      </section>

      {/* HVAC Visual Section */}
      <section id="other" className="relative z-10 px-6 md:px-12 py-24 md:py-40 max-w-7xl mx-auto">
        <SectionHeading number="03" title="其他创作" />
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {CREATIONS.map((creation, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCreationIndex(i)}
              className="group relative overflow-hidden bg-brand-surface border border-white/5 break-inside-avoid snap-button cursor-pointer mb-8 rounded-2xl"
            >
              <img 
                src={creation.imageUrl} 
                className="w-full h-auto transition-all duration-700 group-hover:scale-105" 
                alt={creation.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-white text-xl font-black uppercase tracking-tight mb-1">{creation.title}</span>
                <div className="flex gap-4">
                  {creation.tags.map(tag => (
                    <span key={tag} className="text-[9px] text-white/40 uppercase tracking-[0.2em]">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-12 flex justify-between items-end max-w-7xl mx-auto border-t border-zinc-900 border-dashed">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">© 2026 杨明澔</span>
          <p className="text-zinc-400 text-sm max-w-xs">保留所有权利。倾注对 AI 与设计的热爱而作。</p>
        </div>
        <div className="flex gap-4">
          {['LinkedIn', 'Behance', 'Dribbble'].map(social => (
            <a key={social} href="#" className="text-zinc-600 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-mono">
              {social}
            </a>
          ))}
        </div>
      </footer>

      {/* Animating the project details */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {selectedCreationIndex !== null && (
          <Lightbox 
            items={CREATIONS} 
            currentIndex={selectedCreationIndex} 
            onClose={() => setSelectedCreationIndex(null)}
            onPrev={() => setSelectedCreationIndex(prev => prev !== null ? (prev - 1 + CREATIONS.length) % CREATIONS.length : null)}
            onNext={() => setSelectedCreationIndex(prev => prev !== null ? (prev + 1) % CREATIONS.length : null)}
          />
        )}
        {isAboutOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 bg-black/98"
          >
            <button 
              onClick={() => setIsAboutOpen(false)}
              className="fixed top-8 right-8 z-[120] w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative max-w-5xl max-h-[85vh] overflow-hidden flex flex-col items-center">
                <motion.img 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  src="https://raw.githubusercontent.com/z4hgvp9yzs-ai/my-image-jianli/main/01-自我介绍.png" 
                  alt="About Me"
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-white text-2xl font-black uppercase tracking-tight">杨明澔</h3>
                  <p className="text-zinc-400 mt-2 tracking-widest uppercase text-sm">ui/ux 个人作品集</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
