import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';
import {
	OptionType,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { type ToggleActions } from '../../hooks';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
	isFormOpen: boolean;
	actions: ToggleActions;
};

export const ArticleParamsForm = ({
	setArticleState,
	isFormOpen,
	actions,
}: ArticleParamsFormProps) => {
	const onChangeData = (state: ArticleStateType) => setArticleState(state);

	const [articleSettings, setArticleSettings] = useState({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	});

	const fonts = (option: OptionType) => {
		setArticleSettings({
			...articleSettings,
			fontFamilyOption: option,
		});
	};

	const colorsFont = (option: OptionType) => {
		setArticleSettings({
			...articleSettings,
			fontColor: option,
		});
	};

	const colorsBackground = (option: OptionType) => {
		setArticleSettings({
			...articleSettings,
			backgroundColor: option,
		});
	};

	const contentWidth = (option: OptionType) => {
		setArticleSettings({
			...articleSettings,
			contentWidth: option,
		});
	};

	const fontSize = (option: OptionType) => {
		setArticleSettings({
			...articleSettings,
			fontSizeOption: option,
		});
	};

	const submitParams = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (onChangeData) {
			onChangeData(articleSettings);
		}
	};

	const resetStyles = () => {
		setArticleSettings(defaultArticleState);
		if (onChangeData) {
			onChangeData(defaultArticleState);
		}
	};

	const handlerOpenWidget = (event: KeyboardEvent) => {
		if (isFormOpen === true && event.key === 'Escape') {
			actions.close();
		}
		if (!isFormOpen) return;
	};

	useEffect(() => {
		document.addEventListener('keydown', handlerOpenWidget);
		return () => {
			document.removeEventListener('keydown', handlerOpenWidget);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton onClick={() => actions.toggle()} isOpen={isFormOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={submitParams}
					onReset={resetStyles}>
					<fieldset style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							placeholder='Open Sans'
							options={fontFamilyOptions}
							title='Шрифт'
							selected={articleSettings.fontFamilyOption}
							onChange={fonts}
						/>
						<RadioGroup
							name={articleSettings.fontSizeOption.className}
							options={fontSizeOptions}
							title={'Размер шрифта'}
							selected={articleSettings.fontSizeOption}
							onChange={fontSize}
						/>
						<Select
							placeholder={articleSettings.fontColor.title}
							options={fontColors}
							title='Цвет шрифта'
							selected={articleSettings.fontColor}
							onChange={colorsFont}
						/>
						<Separator />
						<Select
							placeholder={articleSettings.backgroundColor.title}
							options={backgroundColors}
							title='Цвет фона'
							selected={articleSettings.backgroundColor}
							onChange={colorsBackground}
						/>
						<Select
							placeholder={articleSettings.contentWidth.title}
							options={contentWidthArr}
							title='Ширина контента'
							selected={articleSettings.contentWidth}
							onChange={contentWidth}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
