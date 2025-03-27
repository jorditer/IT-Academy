// interface cardProps {
	
// }

const Price = ({ price }: { price: number }) => {


	return (
		<div className="mb-2 self-center md:self-end">
			<h2>Preu pressupostat: <span>{price}</span>€</h2>
		</div>
	)
}

export default Price;