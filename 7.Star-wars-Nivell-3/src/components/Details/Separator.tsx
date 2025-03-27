

const Separator = ({children}: {children: React.ReactNode}) => {
	return (
		<div className="mx-12 md:mx-20 py-4">
		<hr className="mt-6" />
		<h1 className="my-3">{children}</h1>
		<hr className="" />
	</div>
	)
}

export default Separator