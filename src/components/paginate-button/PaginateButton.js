import './PaginateButton.css'

const PaginateButton = ({ changePage, children }) => {
	return (
		<button type='button' className='paginate-button' onClick={changePage}>
			{children}
		</button>
	)
}

export default PaginateButton
