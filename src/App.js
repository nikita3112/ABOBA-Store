import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/card/Card'
import FilterForm from './components/filter-form/FilterForm'
import Header from './components/header/Header'
import PaginateButton from './components/paginate-button/PaginateButton'
import Spinner from './components/spinner/Spinner'
import { getFilteredProducts, getProducts } from './utils/fetchData'

function App() {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [offset, setOffset] = useState(0)
	const [isPrev, setIsPrev] = useState(false)
	const [isNext, setIsNext] = useState(false)
	const [price, setPrice] = useState('')
	const [name, setName] = useState('')
	const [brand, setBrand] = useState('')
	const [filter, setFilter] = useState({})

	const prevPage = () => {
		if (offset === 0) {
			setIsPrev(false)
		}

		setOffset(offset - 50)
	}

	const nextPage = () => {
		setIsPrev(true)
		setOffset(offset + 50)
	}

	const handleFilter = async () => {
		try {
			setIsPrev(false)
			setIsNext(false)
			setIsLoading(true)
			setProducts([])

			const response = await getFilteredProducts(filter)
			setBrand('')
			setName('')
			setPrice('')
			setFilter({})

			const uniqueObjects = response.data.result.filter(
				(obj, index, self) => index === self.findIndex(t => t.id === obj.id)
			)
			setProducts(uniqueObjects)
		} catch (err) {
			console.error(err.response.data)
			setTimeout(handleFilter, 1000)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true)
				setProducts([])
				const response = await getProducts(offset, 50)

				if (response.data.result.length === 0) return setIsNext(false)

				const uniqueObjects = response.data.result.filter(
					(obj, index, self) => index === self.findIndex(t => t.id === obj.id)
				)
				setProducts(uniqueObjects)
				setIsNext(true)
			} catch (err) {
				console.error(err.response.data)
				setTimeout(fetchData, 1000)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [offset])

	return (
		<>
			<Header />
			<main className='app'>
				<div className='products-container'>
					<FilterForm
						handleFilter={handleFilter}
						brand={brand}
						setBrand={setBrand}
						name={name}
						setName={setName}
						price={price}
						setPrice={setPrice}
						filter={filter}
						setFilter={setFilter}
					/>
					<div className='products'>
						{isLoading && <Spinner />}
						{products.map(item => (
							<Card
								key={item.id}
								id={item.id}
								name={item.product}
								price={item.price}
								brand={item.brand}
							/>
						))}
					</div>
					{!isLoading && (
						<div className='pagination'>
							{isPrev && (
								<PaginateButton changePage={prevPage}>Prev</PaginateButton>
							)}
							{isNext && (
								<PaginateButton changePage={nextPage}>Next</PaginateButton>
							)}
						</div>
					)}
				</div>
			</main>
		</>
	)
}

export default App
