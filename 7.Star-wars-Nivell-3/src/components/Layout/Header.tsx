import logo from "../../imgs/logo.svg" 

const Header = () => {

	return (
		<div className="w-[40%] md:w-[15%] self-center flex max-h-96 justify-center pt-2 pb-4">
			<img className="border p-2 rounded-lg" src={logo} alt="Star Wars logo" />
		</div>
	)
}

export default Header;