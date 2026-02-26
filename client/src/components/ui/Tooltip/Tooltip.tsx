'use client';

import {
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import styles from './Tooltip.module.scss';
import TooltipArrow from './TooltipArrow/TooltipArrow';

interface TooltipProps extends PropsWithChildren {
	targetRef: React.RefObject<HTMLElement | null>;
	className?: string;
}

const Tooltip = ({ targetRef, className, children }: TooltipProps) => {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
	const [visible, setVisible] = useState(false);
	const [arrowLeft, setArrowLeft] = useState(0);

	const updateTooltipPosition = useCallback(() => {
		if (targetRef.current && tooltipRef.current) {
			const targetRect = targetRef.current.getBoundingClientRect();
			const tooltipRect = tooltipRef.current.getBoundingClientRect();

			const top = targetRect.top - tooltipRect.height - 10 + window.scrollY;
			let left =
				targetRect.left +
				(targetRect.width - tooltipRect.width) / 2 +
				window.scrollX;

			if (left < 8) {
				left = 8;
			} else if (left + tooltipRect.width > window.innerWidth - 16) {
				left = window.innerWidth - tooltipRect.width - 16;
			}

			const targetCenterX =
				targetRect.left + targetRect.width / 2 + window.scrollX;
			const arrowOffset = targetCenterX - left;

			setTooltipPosition({ top, left });
			setArrowLeft(arrowOffset);
		}
	}, [targetRef]);

	useEffect(() => {
		const target = targetRef.current;
		if (!target) return;

		const show = () => {
			setVisible(true);
			updateTooltipPosition();
		};

		const hide = () => setVisible(false);

		target.addEventListener('mouseenter', show);
		target.addEventListener('mouseleave', hide);

		return () => {
			target.removeEventListener('mouseenter', show);
			target.removeEventListener('mouseleave', hide);
		};
	}, [targetRef, updateTooltipPosition]);

	return (
		<div
			ref={tooltipRef}
			className={`${styles.tooltip} ${className || ''}`}
			style={
				{
					'--top': `${tooltipPosition.top}px`,
					'--left': `${tooltipPosition.left}px`,
					'--visible': visible ? 'visible' : 'hidden',
				} as React.CSSProperties
			}
		>
			{children}
			<TooltipArrow left={arrowLeft} />
		</div>
	);
};

export default Tooltip;
