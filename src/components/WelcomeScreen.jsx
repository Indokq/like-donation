import { motion } from 'framer-motion';

export default function WelcomeScreen({ onEnter }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-500 to-blue-400 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div 
          className="mb-12 flex justify-center"
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
            className="h-32 sm:h-40 md:h-48 w-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Selamat Datang
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg text-white/90 mb-10 max-w-md mx-auto drop-shadow-md"
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
          className="relative bg-gradient-to-b from-teal-400 to-teal-600 text-white font-bold py-4 px-16 rounded-full shadow-lg text-xl overflow-hidden"
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
