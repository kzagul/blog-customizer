import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import { useToggle } from 'src/hooks';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [isOpen, actions] = useToggle();
	const onChangeData = (props: ArticleStateType) => setArticleState(props);

	return (
		<div
			className={clsx(styles.main)}
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
				onChangeData={onChangeData}
				actions={actions}
				isFormOpen={isOpen}
			/>
			<Article onClick={() => actions.close()} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
