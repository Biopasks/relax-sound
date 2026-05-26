import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePowerfulAnimations } from "@/hooks/use-animations"; // Import new animation

const NotFound = () => {
  const location = useLocation();
  const { backgroundShimmerGlow } = usePowerfulAnimations(); // Use new animation

  useEffect(() => {
    // Logging 404 error removed
  }, [location.pathname]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 select-none relative overflow-hidden"
      {...backgroundShimmerGlow('var(--app-global-accent-rgb)')} // Apply shimmer glow
    >
      <div className="text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Go back to home
        </a>
      </div>
    </motion.div>
  );
};

export default NotFound;