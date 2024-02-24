import './FilterForm.css'

const FilterForm = ({
	handleFilter,
	name,
	brand,
	price,
	setPrice,
	setName,
	setBrand,
	filter,
	setFilter,
}) => {
	const handleClick = e => {
		handleFilter()
	}

	return (
		<form className='form'>
			<input
				className='input'
				type='text'
				placeholder='Цена'
				value={price}
				onChange={e => {
					const value = +e.target.value.replace(/\D/g, '')
					setPrice(value)
					setFilter({ ...filter, price: value })
				}}
				pattern='[0-9]*'
			/>
			<input
				className='input'
				type='text'
				placeholder='Имя'
				value={name}
				onChange={e => {
					setFilter({ ...filter, product: e.target.value })
					setName(e.target.value)
				}}
			/>
			<input
				className='input'
				type='text'
				placeholder='Бренд'
				value={brand}
				onChange={e => {
					setFilter({ ...filter, brand: e.target.value })
					setBrand(e.target.value)
				}}
			/>
			<button className='button' type='button' onClick={handleClick}>
				Применить фильтр
			</button>
		</form>
	)
}

export default FilterForm
