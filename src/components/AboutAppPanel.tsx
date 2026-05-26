
import { createPortal } from 'react-dom';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, DollarSign, Code, TrendingUp } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations'; // Updated import

interface AboutAppPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

const AboutAppPanel: React.FC<AboutAppPanelProps> = ({ isOpen, onClose }) => {
  const { triggerHapticFeedback } = useSettings();
  const { hoverScale, tapScale } = useMicroAnimations();
  const { particleFlow, backgroundShimmerGlow, panelBounce } = usePowerfulAnimations(); // Import panelBounce

  return (
    isOpen && createPortal(
        <motion.div
          key="about-modal"
          className="fixed inset-0 z-[99990] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={() => { onClose(); triggerHapticFeedback(); }}
          />

          <motion.div
            className={cn(
              "relative w-full max-w-md sm:max-w-lg md:max-w-xl",
              "h-[90vh] sm:h-[80vh] md:h-[75vh] max-h-[700px]",
              "bg-black/80 backdrop-blur-2xl",
              "text-foreground border border-white/[0.08] shadow-premium-lg p-6 sm:p-8",
              "flex flex-col rounded-2xl overflow-hidden z-[99991]"
            )}
            variants={panelBounce}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
              {...particleFlow('var(--magic-cyan-accent-rgb)')}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
              {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
            />

            <div className="flex justify-between items-center mb-6 relative z-10 flex-shrink-0">
              <h2 className="text-2xl font-bold text-primary font-flemmatico">About the App</h2>
              <Button variant="ghost" size="icon" onClick={() => { onClose(); triggerHapticFeedback(); }} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={24} />
              </Button>
            </div>

            <div className="flex-1 flex flex-col items-center text-center relative z-10 overflow-y-auto scrollbar-styled">
              <motion.img
                src="https://picsum.photos/seed/vector_dev/400/200"
                alt="Mobile Development Illustration"
                className="w-full h-32 object-cover rounded-lg mb-4 shadow-lg border border-border flex-shrink-0"
                initial={{ opacity: 0, y: -20, rotateX: 0, rotateY: 0, scale: 0.95 }}
                animate={{
                  opacity: 1, y: 0,
                  rotateX: [0, 2, -2, 0], rotateY: [0, -2, 2, 0], scale: [0.95, 1.01, 0.95],
                  transition: {
                    opacity: { duration: 0.6, ease: "easeOut" }, y: { duration: 0.6, ease: "easeOut" },
                    rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                  }
                }}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.3)", transition: { duration: 0.3, ease: "easeOut" } }}
              />
              <motion.div variants={contentItemVariants} className="flex-shrink-0">
                <h3 className="text-xl font-bold text-primary mb-1">RelaxSound: Your Path to Calmness</h3>
                <p className="text-sm text-muted-foreground mb-4">We create high-quality mobile applications for sleep, concentration, and meditation.</p>
              </motion.div>
              <motion.div className="py-4 text-foreground space-y-4 text-justify leading-relaxed" variants={contentContainerVariants} initial="hidden" animate="visible">
                <motion.p className="flex items-start gap-2" variants={contentItemVariants}>
                  <TrendingUp size={20} className="text-primary flex-shrink-0" />
                  <div className="flex-1 font-bold"><strong className="text-primary font-semibold">Focus on Quality:</strong> We use advanced technologies (TypeScript/JS) to ensure stable operation and excellent performance.</div>
                </motion.p>
                <motion.p className="flex items-start gap-2" variants={contentItemVariants}>
                  <Code size={20} className="text-primary flex-shrink-0" />
                  <div className="flex-1 font-bold"><strong className="text-primary font-semibold">Development:</strong> From idea to launch in app stores. We create products that bring value and revenue. Average project starts from 1000$ complex projects — from 5000$</div>
                </motion.p>
                <motion.p className="text-base font-semibold text-center text-muted-foreground mt-8 font-bold" variants={contentItemVariants}>Invest in the future of your business with us!</motion.p>
              </motion.div>
            </div>

            <div className="mt-6 text-center relative z-10 flex-shrink-0">
              <Button onClick={() => { onClose(); triggerHapticFeedback(); }} className="bg-primary/20 hover:bg-primary/30 text-primary font-semibold py-3 px-6 rounded-full shadow-md border border-primary/30" {...hoverScale} {...tapScale}>
                <X size={20} className="mr-2" /> Close
              </Button>
            </div>
          </motion.div>
        </motion.div>,
      document.body
    )
  );
};

export default AboutAppPanel;
