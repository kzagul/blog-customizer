import { useState, CSSProperties } from 'react';
import styles from './styles/index.module.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import { useToggle } from 'src/hooks';

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, actions] = useToggle();

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setArticleState={setArticleState}
				actions={actions}
				isFormOpen={isOpen}
			/>
			<Article onClick={() => actions.close()} />
		</main>
	);
};

export default App;
