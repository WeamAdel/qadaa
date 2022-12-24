import Link from 'next/link';
import useMyRouter from '../../../../hooks/useMyRouter';
import Latern from './Latern';

interface LinkItemInterface {
	title: string;
	withLatern: boolean;
	url: string;
	classes?: string;
	id?: string;
	isExternal?: boolean;
	target?: '_blank' | '_parent' | '_self' | '_top';
}

function LinkItem({
	title,
	withLatern,
	url,
	classes,
	id,
	isExternal = false,
	target = '_self',
}: LinkItemInterface) {
	const laternJSX = withLatern ? <Latern /> : null;
	const { locale } = useMyRouter();

	return (
		<li className={`navbar__nav-item ${classes}`}>
			{laternJSX}
			{isExternal ? (
				<a href={url} data-testid={id} target={target} rel="noreferrer">
					{title}
				</a>
			) : (
				<Link href={url} locale={locale}>
					<a data-testid={id} target={target}>
						{title}
					</a>
				</Link>
			)}
		</li>
	);
}

export default LinkItem;
