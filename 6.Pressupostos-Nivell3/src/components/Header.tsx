import Navbar from "./Navbar.tsx"

const Header = () => {
	// const img = "bg-[url('/src/assets/pattern.jpg')]";

	return (
		<header className="lg:mx-20 md:mx-10 sm:mx-5 mx-2">
			<Navbar />
			<div className="outline hover:outline-4 outline-orange-500 text-balance bg-gradient-to-r from-orange-300 ring-1 ring-orange-400 to-red-300 p-10 md:p-16 rounded-3xl">
				<h1 className="text-center leading-relaxed">Aconsegueix la millor qualitat</h1>
			</div>
		</header>
	)
}

export default Header