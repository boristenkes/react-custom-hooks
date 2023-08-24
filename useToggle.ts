import { useState } from 'react'

type ToggleFunction = {
	(): void
	(value: boolean): void
}

type ToggleHookReturnType = [boolean, ToggleFunction]

export default function useToggle(defaultValue: boolean): ToggleHookReturnType {
	const [value, setValue] = useState(defaultValue)

	// Toggles the value: If a boolean parameter is provided, sets the value to that parameter.
	// Otherwise, it inverts the current value.
	const toggleValue: ToggleFunction = (value?: boolean) => {
		setValue(currentValue =>
			typeof value === 'boolean' ? value : !currentValue
		)
	}

	return [value, toggleValue]
}
