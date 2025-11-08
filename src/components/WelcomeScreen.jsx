import { motion } from 'framer-motion';

export default function WelcomeScreen({ onEnter }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url(/2.jpg)' }}
    >
      {/* Dark overlay for better text visibility on mobile */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="text-center relative z-10 w-full max-w-md -mt-[3px]">
        <motion.div 
          className="mb-6 sm:mb-8 md:mb-10 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8
          }}
        >
          <motion.img 
            src="/3.png" 
            alt="LIKE Foundation" 
            className="h-24 xs:h-28 sm:h-36 md:h-48 w-auto max-w-[200px] sm:max-w-none"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.h1 
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Selamat Datang
        </motion.h1>
        
        <motion.p 
          className="text-xs xs:text-sm sm:text-base text-white/95 mb-6 sm:mb-8 max-w-md mx-auto drop-shadow-md px-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          LIKE Foundation - Lingkar Insan Kebaikan
          <br />
          Bersama membangun kebaikan untuk sesama
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="relative bg-gradient-to-b from-teal-400 to-teal-600 text-white font-bold py-2.5 xs:py-3 px-10 xs:px-12 rounded-full shadow-lg text-base xs:text-lg overflow-hidden"
          style={{
            boxShadow: '0 8px 15px rgba(0,0,0,0.3), inset 0 -2px 5px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.4)',
            border: '2px solid rgba(255,255,255,0.3)',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Masuk
        </motion.button>
      </div>
    </div>
  );
}
