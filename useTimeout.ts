import { useCallback, useEffect, useRef } from 'react'

type TimeoutControls = {
	reset: () => void
	clear: () => void
}

export default function useTimeout(
	callback: () => void,
	delay: number
): TimeoutControls {
	const callbackRef = useRef<() => void>(callback)
	const timeoutRef = useRef<number | undefined>()

	useEffect(
		function () {
			callbackRef.current = callback
		},
		[callback]
	)

	const set = useCallback(
		function () {
			timeoutRef.current = setTimeout(function () {
				callbackRef.current()
			}, delay)
		},
		[delay]
	)

	const clear = useCallback(function () {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}, [])

	useEffect(
		function () {
			set()
			return clear
		},
		[delay, set, clear]
	)

	const reset = useCallback(
		function () {
			clear()
			set()
		},
		[clear, set]
	)

	return { reset, clear }
}
