interface SwitchProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isSwitchOn: boolean;
}
const Switch: React.FC<SwitchProps> = ({onChange, isSwitchOn}) => {		// Hecho/robado solo con HTML y CSS

	return (
		<div className="flex justify-center gap-x-4 font-semibold">
			<p className="whitespace-nowrap">Pagament mensual</p>
			<label>
				<input checked={isSwitchOn} onChange={onChange} className="custom-switch" type="checkbox" />
			</label>
			<p className="whitespace-nowrap">Pagament anual</p>
		</div>
	)
}

export default Switch