'use client';

import { motion, useInView, UseInViewOptions, HTMLMotionProps } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps extends HTMLMotionProps<'div'> {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    threshold?: number;
    triggerOnce?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function FadeIn({
    direction = 'up',
    delay = 0,
    duration = 0.5,
    threshold = 0.1,
    triggerOnce = true,
    className = '',
    children,
    ...props
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: threshold, once: triggerOnce });

    const getVariants = () => {
        switch (direction) {
            case 'up':
                return {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                };
            case 'down':
                return {
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                };
            case 'left':
                return {
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                };
            case 'right':
                return {
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                };
            case 'none':
            default:
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={getVariants()}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Consistent "Zen" ease
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function StaggerContainer({
    staggerDelay = 0.1,
    delayChildren = 0,
    children,
    className,
    viewportAmount = 0.1,
    viewportOnce = true,
    ...props
}: {
    staggerDelay?: number;
    delayChildren?: number;
    viewportAmount?: number;
    viewportOnce?: boolean;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: viewportOnce, amount: viewportAmount }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delayChildren,
                    },
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function ScaleIn({
    delay = 0,
    duration = 0.5,
    className,
    children,
    ...props
}: { delay?: number; duration?: number } & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
