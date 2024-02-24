import './Card.css'

const Card = ({ id, name, price, brand }) => {
	return (
		<div className='card'>
			<p className='card-id'>ID: {id}</p>
			<div className='product-card'>
				<div className='product-info'>
					<h3 className='product-name'>{name}</h3>
					<p className='product-brand'>{brand ? brand : 'Не указан'}</p>
				</div>
				<div className='product-price'>{price}</div>
			</div>
		</div>
	)
}

export default Card
