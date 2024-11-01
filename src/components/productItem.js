import ProductImage from "./productImage";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductExcerpt from "./productExcerpt";
import ProductAddToCart from "./productAddToCart";

const ProductItem = ({
	context,
	productId,
	featuredImageSize,
	productsLayout,
	productsAlign,
	productPadding,
	productSpacing,
	elementsToggle,
	imageSize,
	titleSize,
	priceSize,
	excerptSize,
	addToCartSize,
	productBackColor,
	fontColors
}) => {

	const isEdit = productId !== 0 && (context == 'edit' || context == 'both');

	const productStyle = {
		backgroundColor: productBackColor,
	}

	const imageStyle = {
		...((productsLayout === 'layout2' || productsLayout === 'layout4') && { flexBasis: imageSize })
	}

	const elementsStyle = {
		padding: productPadding,
		alignItems: productsAlign,
		...((productsLayout === 'layout2' || productsLayout === 'layout4') && { flexBasis: `calc( 100% - ${imageSize} )` })
	}

	const titleStyle = {
		fontSize: titleSize,
		...fontColors.titleColor && { color: fontColors.titleColor }
	};
	const priceStyle = {
		fontSize: priceSize,
		...fontColors.priceColor && { color: fontColors.priceColor }
	};
	const excerptStyle = {
		fontSize: excerptSize,
		...fontColors.excerptColor && { color: fontColors.excerptColor }
	};

	const addToCartStyle = {
		transform: `scale(${addToCartSize})`,
	}
	const spacing = {
		marginBottom: productSpacing
	}

	return (
		<div
			className={`wcspots-product align-${productsAlign}`}
			data-product-id={productId}
			style={productStyle}
		>

			{productsLayout === 'layout3' && (
				<div className="overlay" style={{ background: productBackColor }} aria-hidden />
			)}

			{elementsToggle.image && (
				<div className="product-featured-image" data-product-image={productId} style={imageStyle}>
					{isEdit && (
						<ProductImage productId={productId} featuredImageSize={featuredImageSize} />
					)}
				</div>
			)}

			<div className="product-elements" style={elementsStyle}>

				{elementsToggle.title && (
					<h4 className="product-title product-element" data-product-title={productId} style={Object.assign(titleStyle, spacing)}>
						{isEdit && (
							<ProductTitle productId={productId} />
						)}
					</h4>
				)}


				{elementsToggle.price && (
					<div className="product-price product-element" data-product-price={productId} style={Object.assign(priceStyle, spacing)}>
						{isEdit && (
							<ProductPrice productId={productId} />
						)}
					</div>
				)}


				{elementsToggle.excerpt && (
					<div className="product-excerpt product-element" data-product-excerpt={productId} style={Object.assign(excerptStyle, spacing)}>
						{isEdit && (
							<ProductExcerpt productId={productId} />
						)}
					</div>
				)}

				{elementsToggle.addToCart && (
					<div className="product-add-to-cart product-element" data-product-addtocart={productId} style={Object.assign(addToCartStyle, spacing)}>
						{isEdit && (
							<ProductAddToCart productId={productId} />
						)}
					</div>
				)}

			</div>

		</div>
	);
};

export default ProductItem;
