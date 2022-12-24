import Head from 'next/head';
import { useContext, useEffect } from 'react';
import useMyRouter from '../../../hooks/useMyRouter';
import { LangContext } from '../../../Providers/Language';
import Language from '../../../types/Language';
import Navbar from '../Navbar/Navbar';
import PrayerTimes from '../PrayerTimes/PrayerTimes';
import BackgroundPattern from './BackgroundPattern';

interface PageInterface {
	title: string;
	alias?: string;
	children: any;
}

function Page({ title, alias, children }: PageInterface) {
	const { locale } = useMyRouter();
	const { metaDesc, metaKeywords } = useContext(LangContext);

	useEffect(() => {
		setDocumentDirection(locale);
	}, [locale]);

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={metaDesc} />
				<meta name="keywords" content={metaKeywords} />
			</Head>
			<div className={`page ${alias}`}>
				<BackgroundPattern />
				<div className="page__content">
					<Navbar />
					<main>{children}</main>
					<PrayerTimes />
				</div>
			</div>
		</>
	);
}

function setDocumentDirection(locale: string | undefined) {
	const dir = locale === Language.ar ? 'rtl' : 'ltr';
	document.body.setAttribute('dir', dir);
}

export default Page;
