/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RichText, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { Toolbar, DropdownMenu } from '@wordpress/components';

const WCSpotsBlockTitle = (props) => {
	const { attributes, setAttributes, context } = props;
	const {
		title,
		settingsTitleDesc
	} = attributes;


	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};
	const onChangeTagName = (newTagName) => {
		setAttributes({ settingsTitleDesc: { ...settingsTitleDesc, tagName: newTagName } });
	};
	const formatTypes = [
		{ name: 'p', title: 'Paragraph' },
		{ name: 'h2', title: 'Heading 2' },
		{ name: 'h3', title: 'Heading 3' },
		{ name: 'h4', title: 'Heading 4' },
		{ name: 'h5', title: 'Heading 5' },
		{ name: 'h6', title: 'Heading 6' },
	];

	return (
		<Fragment>
			{context === 'edit' &&
				(<Fragment>

					<BlockControls>
						<Toolbar>
							<AlignmentControl
								label={__('Align title and description')}
								value={settingsTitleDesc.align}
								onChange={(nextAlign) => {
									setAttributes({ settingsTitleDesc: { ...settingsTitleDesc, align: nextAlign } });
								}}
							/>
							<DropdownMenu
								label={__('Format WCSpots Title', 'wcspots')}
								icon="heading"
								controls={formatTypes.map((type) => ({
									title: type.title,
									onClick: () => onChangeTagName(type.name),
									isActive: settingsTitleDesc.tagName === type.name,
								}))}
							/>
						</Toolbar>
					</BlockControls>
				</Fragment>)
			}
			{context === 'edit' ? (
				<RichText
					tagName={settingsTitleDesc.tagName}
					value={title}
					onChange={onChangeTitle}
					style={{
						textAlign: settingsTitleDesc.align,
						margin: `${settingsTitleDesc.spacingTitle} 0`
					}}
					placeholder={__('Enter your title here', 'wcspots')}
					keepPlaceholderOnFocus
				/>
			) : (
				<RichText.Content
					tagName={settingsTitleDesc.tagName}
					value={title}
					style={{
						textAlign: settingsTitleDesc.align,
						margin: `${settingsTitleDesc.spacingTitle} 0`
					}}
				/>
			)}

		</Fragment>
	);
};

export default WCSpotsBlockTitle;
