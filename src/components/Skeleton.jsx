


// Node modules
import { motion } from "framer-motion";


const Skeleton = () => {
    const skeletonLines = [1,2,3];

    // Define framer motion variants for skeleton loading animation.
    const skeletonVariant = {
        start: {},
        end: {
            transition: {
                staggerChildren: 0.15,
            }
        },
    }

    const skeletonChildVariant = {
        start: { opacity: 0.5 },
        end: { opacity: 1 },
    }

    return (
        <motion.div 
        variants={skeletonVariant}
        initial='start'
        animate='end'
        >
            {skeletonLines.map((item) => (
                <motion.div 
                className="skeleton"
                key={item}
                variants={skeletonChildVariant}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.5,
                }}
                />
            ))}
            
        </motion.div>
    )
}

export default Skeleton

