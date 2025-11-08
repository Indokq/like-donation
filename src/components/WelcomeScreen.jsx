import { motion } from 'framer-motion';

export default function WelcomeScreen({ onEnter }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url(/2.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="text-center relative z-10 w-full max-w-md -mt-12 sm:-mt-16">
        {/* Logo */}
        <motion.div 
          className="mb-0 flex justify-center pt-4"
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
            className="h-48 sm:h-56 md:h-64 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg -mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Selamat Datang
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg text-white mb-10 sm:mb-14 max-w-sm mx-auto drop-shadow-md leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          LIKE Foundation - Lingkar Insan Kebaikan
          <br />
          Bersama membangun kebaikan untuk sesama
        </motion.p>

        {/* Button */}
        <motion.button
          onClick={onEnter}
          className="bg-gradient-to-b from-teal-400 to-teal-600 text-white font-bold py-3 px-16 rounded-full shadow-lg text-lg mt-16 sm:mt-20"
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
