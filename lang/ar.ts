import Prayer from '../types/Prayer';

const AR_TRANSLATION = {
	metaDesc: 'أداة لإنشاء جدول لقضاء الصلوات الفائتة',
	metaKeywords: 'مسلم, صلوات, قضاء, الفائتة, جدول',
	donate: 'ادعمنا',
	generateSchedule: 'قم بإعداد جدول',
	home: 'الرئيسية',
	homeDescription: 'الخطوات الصغيرة هي ما تحدث فرقا, الفرق الذي سيغير حياتك الحقيقية.',
	homePageTitle: 'قضاء | الرئيسية',
	secondLang: 'English',
	schedulePageTitle: 'قضاء | إنشاء جدول',
	siteName: 'قضاء',
	changeToDarkTheme: 'قم بتفعيل الوضع الليلي',
	changeToLightTheme: 'قم بتفعيل الوضع الساطع',
	prayerTimes: 'مواقيت الصلاة',
	gregorianDateDesc: 'التاريخ الميلادي',
	hijriDateDesc: 'التاريخ الهجري',
	retry: 'أعد المحاولة',
	prayerTimeAPIFailed: 'فشل تحميل مواقيت الصلاة مؤقتا.',
	locationFailed: 'لم يتم التعرف على موقعك',
	years: 'السنوات',
	timeRange: 'مدة زمنية',
	prayersCount: 'عدد الصلوات',
	yearsHeading: 'قم بإدخال عدد السنوات الفائتة',
	timeRangeHeading: 'قم باختيار الفترة الزمنية',
	prayersCountHeading: 'قم بإدخال عدد الصلوات الفائتة',
	yearsDesc: 'قم بإنشاء جدول الصلوات بناءا على عدد السنوات الفائتة.',
	timeRangeDesc: 'قم بإنشاء جدول الصلوات عن طريق اختيار تاريخين من التقويم.',
	prayersCountDesc: 'قم بإنشاء جدول الصلاوات عن طريق إدخال عدد كل صلاة فائتة.',
	startDate: 'تاريخ البدء',
	endDate: 'تاريخ الانتهاء',
	generate: 'إنشاء',
	numberOfYears: 'عدد السنوات',

	// By years form
	yearsRequired: 'هذا الحقل مطلوب',
	minYears: 'يجب أن لا يقل عدد السنوات عن ',
	maxYears: 'يجب أن لا يزيد عدد السنوات عن ',

	// By range form
	startDateRequired: 'تاريخ البدأ مطلوب',
	endDateRequired: 'تاريخ الانتهاء مطلوب',
	rangeError: 'أدخل تاريخ أكبر من تاريخ البدأ',

	//By prayers count form
	minPrayers: 'من فضلك أدخل العدد لإحدى الصلوات على الأقل',

	// Schedule modal
	waitScheduleGeneration: 'برجاء الانتظار حتى يتم إنشاء الجدول',
	scheduleGenerated: 'تم إنشاء الجدول بنجاح',
	downloadSchedule: 'تحميل PDF',
	blockedDownload: 'في حال رفض التحميل, من فضلك راجع إضافات المتصفح.',

	notFoundHeading: 'الصفحة غير موجودة',
	notFoundDescription: 'الصفة التي تحاول زيارتها غير موجودة!',
	goBackHome: 'العودة للرئيسية',

	// Generated schedule PDF
	day: 'اليوم',
	year: 'السنة',
	prayer: 'الصلاة',
	number: 'الرقم',
	done: 'تم',
	prayers: 'الصلوات',

	// Prayers
	[Prayer.fajr]: Prayer.fajr,
	[Prayer.fajr]: 'الفجر',
	[Prayer.dhuhr]: 'الظهر',
	[Prayer.asr]: 'العصر',
	[Prayer.maghrib]: 'المغرب',
	[Prayer.isha]: 'العشاء',
};

export default AR_TRANSLATION;
