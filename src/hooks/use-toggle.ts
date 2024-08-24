import { useState } from 'react';

type ToggleActionTypes = 'open' | 'close' | 'toggle';
type ToggleActionResult = () => void;
export type ToggleActions = Record<ToggleActionTypes, ToggleActionResult>;
type UseToggleResult = [boolean, ToggleActions];

export function useToggle(defaultValue = false): UseToggleResult {
	const [isOpen, setIsOpen] = useState<boolean>(defaultValue);

	const open = () => setIsOpen(true);

	const close = () => setIsOpen(false);

	const toggle = () => setIsOpen((prev) => !prev);

	return [
		isOpen,
		{
			open,
			close,
			toggle,
		},
	];
}
