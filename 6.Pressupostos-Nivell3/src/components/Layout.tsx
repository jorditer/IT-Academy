import Header from "./Header.tsx"
import Form from "./Form.tsx"
import Budget from "./Budget/Budget.tsx"
import { CounterProvider } from "../context/CounterContext.tsx"

const Layout = () => {
	
	return (
		<CounterProvider>
		 <div className="bg-orange-100 pb-5">
		  <Header />
		  <div className="cardsContainer">
			<Form />
			<Budget />
		  </div>
		 </div>
	   </CounterProvider>
	  )
}

export default Layout