
import { createPortal } from 'react-dom';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ShieldCheck, EyeOff, Database, Megaphone, Info, Lock } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations'; // Updated import

interface PrivacyPolicyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

const PrivacyPolicyPanel: React.FC<PrivacyPolicyPanelProps> = ({ isOpen, onClose }) => {
  const { triggerHapticFeedback } = useSettings();
  const { hoverScale, tapScale } = useMicroAnimations(); // Using refactored import
  const { backgroundShimmerGlow, panelBounce } = usePowerfulAnimations(); // Import panelBounce

  return (
    isOpen && createPortal(
        <motion.div
          key="privacy-policy-modal"
          className="fixed inset-0 z-[99990] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={() => { onClose(); triggerHapticFeedback(); }}
          />

          {/* Modal Content - Centered and Adaptive */}
          <motion.div
            className={cn(
              "relative w-full max-w-md sm:max-w-lg md:max-w-xl", // Max width for modal
              "h-[90vh] sm:h-[80vh] md:h-[75vh] max-h-[600px]", // Adaptive height, max height added
              "bg-black/80 backdrop-blur-2xl",
              "text-foreground border border-white/[0.08] shadow-premium-lg p-6 sm:p-8",
              "flex flex-col rounded-2xl overflow-hidden z-[99991]"
            )}
            variants={panelBounce} // Use panelBounce for animation
            initial="initial"
            animate="animate"
            exit="exit"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            animate={{
              background: [
                `radial-gradient(circle at 10% 50%, rgba(var(--magic-cyan-accent-rgb), 0.05) 0%, transparent 70%)`,
                `radial-gradient(circle at 90% 50%, rgba(var(--magic-cyan-accent-rgb), 0.1) 0%, transparent 70%)`,
                `radial-gradient(circle at 10% 50%, rgba(var(--magic-cyan-accent-rgb), 0.05) 0%, transparent 70%)`
              ],
              scale: [1, 1.01, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* NEW: Background shimmer glow for the panel */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
          />

          <div className="flex justify-between items-center mb-6 relative z-10 flex-shrink-0">
            <h2 className="text-2xl font-bold text-primary font-flemmatico flex items-center gap-2">
              <ShieldCheck size={24} /> Privacy Policy
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onClose();
                triggerHapticFeedback();
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </Button>
          </div>

          <motion.div
            className="flex-1 py-4 text-sm text-muted-foreground space-y-4 font-flemmatico relative z-10 overflow-y-auto scrollbar-styled"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="flex items-start gap-2" variants={itemVariants}>
              <EyeOff size={20} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <strong className="text-primary font-semibold">Absolute Privacy:</strong> We do not collect, store, or share your personal data, such as name, email, or location. All settings and listening history are stored exclusively on your device.
              </div>
            </motion.p>
            <motion.p className="flex items-start gap-2" variants={itemVariants}>
              <Lock size={20} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <strong className="text-primary font-semibold">Local Storage:</strong> Your preferences, favorite sounds, and session history are saved in your device's local storage. This ensures quick access and full control over your data.
              </div>
            </motion.p>
            <motion.p className="flex items-start gap-2" variants={itemVariants}>
              <Megaphone size={20} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <strong className="text-primary font-semibold">Advertising Services:</strong> To support development and provide free content, we use advertising networks (e.g., AdMob). These networks may collect anonymous usage data to display relevant ads.
              </div>
            </motion.p>
            <motion.p className="flex items-start gap-2" variants={itemVariants}>
              <Database size={20} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <strong className="text-primary font-semibold">Third-Party Services:</strong> We do not use third-party analytics tools that could track your behavior within the application.
              </div>
            </motion.p>
            <motion.p className="flex items-start gap-2" variants={itemVariants}>
              <Info size={20} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <strong className="text-primary font-semibold">Your Consent:</strong> By using our application, you confirm that you have read and agree to our privacy policy, which is focused on protecting your anonymity.
              </div>
            </motion.p>
          </motion.div>

          <div className="mt-6 text-center relative z-10 flex-shrink-0">
            <Button
              onClick={() => {
                onClose();
                triggerHapticFeedback();
              }}
              className="bg-primary/20 hover:bg-primary/30 text-primary font-semibold py-3 px-6 rounded-full shadow-md border border-primary/30"
              {...hoverScale}
              {...tapScale}
            >
              <X size={20} className="mr-2" /> Close
            </Button>
          </div>
        </motion.div>
        </motion.div>,
      document.body
    )
  );
};

export default PrivacyPolicyPanel;